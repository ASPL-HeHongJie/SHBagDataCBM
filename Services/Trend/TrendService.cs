using GeFanuc.iFixToolkit.Adapter;
using System;
using System.Collections.Generic;
using Respository;
using System.Text;
using System.Linq;
using Models;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;
using Microsoft.Extensions.Configuration;

namespace Services
{
    public class TrendService : ITrendService
    {
        private readonly ITrendRepository _trendRepository;
        private readonly IInfluxDBHistoricalDataRespository _influxDBHistoricalDataRespository;
        private readonly string _IFixNodeName;

        public TrendService(IConfiguration configuration,
                            ITrendRepository trendRepository,
                            IInfluxDBHistoricalDataRespository influxDBHistoricalDataRespository,
                            IPDBRespository PDBRespository)
        {
            _trendRepository = trendRepository;
            _influxDBHistoricalDataRespository = influxDBHistoricalDataRespository;
            _IFixNodeName = configuration["IFIXNodeName"];
        }
        public TrendService(IConfiguration configuration,
                            ITrendRepository trendRepository)
        {
            _trendRepository = trendRepository;
            _IFixNodeName = configuration["IFIXNodeName"];
        }


        public Task<Dictionary<string, object>> GetHistoricalTrendsData(int LoopID,
                                            int TrendGroupID,
                                            DateTime startDateTime,
                                            string interval,
                                            string duration)
        {
            return Task.Run(() =>
            {
                List<Dictionary<string, object>> trends = new List<Dictionary<string, object>>();
                List<string> times = new List<string>();

                List<Trend> trendInfos = _trendRepository.GetHistoricalTrend(_IFixNodeName, LoopID, TrendGroupID).ToList<Trend>();
                foreach (Trend trendInfo in trendInfos)
                {
                    Dictionary<string, object> trend = new Dictionary<string, object>();
                    trend["Name"] = trendInfo.Name;
                    trend["Address"] = trendInfo.Address;
                    trend["HighLimit"] = trendInfo.HighLimit;
                    trend["LowLimit"] = trendInfo.LowLimit;
                    trend["Description"] = trendInfo.Description;
                    trends.Add(trend);
                }
                int[] intervalTimes = null;
                int count = 0;
                int groupNumber = trends.Count / 8;
                if (trends.Count % 8 > 0)
                {
                    groupNumber = groupNumber + 1;
                }
                for (int num = 0; num < groupNumber; num++)
                {
                    int err = 0;
                    int groupHandle = 0;
                    int[] tagsHandle = null;
                    string[] tags = null;
                    if (num == groupNumber - 1)
                    {
                        tagsHandle = new int[trends.Count - 8 * num];
                        tags = new string[trends.Count - 8 * num];
                        count = trends.Count - 8 * num;

                    }
                    else
                    {
                        tagsHandle = new int[8];
                        tags = new string[8];
                        count = 8;
                    }
                    for (int i = 0; i < count; i++)
                    {
                        tags[i] = trends[8 * num + i]["Address"].ToString();
                    }
                    int[] samplesNum = new int[count];
                    #region "Setting"
                    if ((err = Hda.DefineGroup(out groupHandle)) != FixError.FTK_OK)
                    {
                        //return string.Format("Error defining group,Error = {0}", err);
                        return new Dictionary<string, object>();
                    }

                    for (int i = 0; i < count; i++)
                    {
                        err = Hda.AddNtf(groupHandle, out tagsHandle[i], tags[i]);
                        if (err != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return "Error adding an NTF";
                            return new Dictionary<string, object>();
                        }
                    }

                    if ((err = Hda.SetStart(groupHandle, startDateTime.ToString("yyyy/MM/dd"), startDateTime.ToString("HH:mm:ss"))) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting start date and time";
                        return new Dictionary<string, object>();
                    }

                    if ((err = Hda.SetInterval(groupHandle, interval)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting interval time";
                        return new Dictionary<string, object>();
                    }

                    if ((err = Hda.SetDuration(groupHandle, duration)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting duration time";
                        return new Dictionary<string, object>();
                    }


                    if ((err = Hda.Read(groupHandle, 0)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error reading data";
                        return new Dictionary<string, object>();
                    }
                    #endregion

                    for (int i = 0; i < count; i++)
                    {
                        if ((err = Hda.GetNumSamples(groupHandle, tagsHandle[i], out samplesNum[i])) != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return "Error getting number of samples";
                            return new Dictionary<string, object>();
                        }
                    }

                    for (int i = 0; i < count; i++)
                    {
                        float[] values = new float[samplesNum[i]];
                        intervalTimes = new int[samplesNum[i]];
                        int[] statuses = new int[samplesNum[i]];
                        int[] alarms = new int[samplesNum[i]];
                        // Read data into arrays 
                        if ((err = Hda.GetData(groupHandle, tagsHandle[i], 0, samplesNum[i], values, intervalTimes, statuses, alarms)) != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return string.Format("Error getting data for tag: {0}", tags[i]);
                            return new Dictionary<string, object>();
                        }
                        List<float?> datas = new List<float?>();
                        for (int j = 0; j < statuses.Count(); j++)
                        {
                            if (statuses[j] == 0)
                            {
                                datas.Add(values[j]);
                            }
                            else
                            {
                                datas.Add(null);
                            }
                        }
                        trends[8 * num + i]["TrendDatas"] = datas;
                    }
                    Hda.DeleteGroup(groupHandle);
                }

                foreach (int interval in intervalTimes.ToList<int>())
                {
                    times.Add(startDateTime.AddSeconds(interval).ToString("yyyy-MM-dd HH:mm:ss"));
                }
                Dictionary<string, object> chartData = new Dictionary<string, object>();
                chartData["Trends"] = trends;
                chartData["Times"] = times;
                return chartData;
            });
        }



        public Task<IEnumerable<Trend>> GetRealtimeTrend(int loopID, int trendGroupID)
        {
            return Task.Run(() => _trendRepository.GetRealtimeTrend(loopID, trendGroupID));
        }

        public async Task<Dictionary<string, object>> GetHistoricalTrendsData(int LoopID,
                                            int TrendGroupID,
                                            DateTime startDateTime,
                                            DateTime endDateTime,
                                            string bucket,
                                            string measurement,
                                            int interval)
        {

            List<Dictionary<string, object>> trends = new List<Dictionary<string, object>>();
            List<string> times = new List<string>();
            List<Trend> trendInfos = _trendRepository.GetHistoricalTrend(_IFixNodeName, LoopID, TrendGroupID).ToList<Trend>();
            List<List<InfluxDBData>> trendsDatas = await _influxDBHistoricalDataRespository.GetHistoricalData(bucket,
                                                                                                         startDateTime,
                                                                                                         endDateTime,
                                                                                                         measurement,
                                                                                                         interval,
                                                                                                         trendInfos
                                                                                                        );
            foreach (Trend trendInfo in trendInfos)
            {
                Dictionary<string, object> trend = new Dictionary<string, object>();
                trend["Name"] = trendInfo.Name;
                trend["Address"] = trendInfo.Address;
                trend["HighLimit"] = trendInfo.HighLimit;
                trend["LowLimit"] = trendInfo.LowLimit;
                trend["Description"] = trendInfo.Description;
                trend["TrendDatas"] = null;
                trends.Add(trend);
            }
            foreach (var datas in trendsDatas)
            {
                if (datas.Count > 0)
                {
                    foreach (var data in datas)
                    {
                        times.Add(data.Time.ToLocalTime().ToString("yyyy-MM-dd HH:mm:ss"));
                    }
                    break;
                }
            }
            if (times.Count > 0)
            {
                for (int i = 0; i < trends.Count; i++)
                {
                    if (trendsDatas[i].Count > 0)
                    {
                        List<double?> trendDatas = new List<double?>();
                        for (int j = 0; j < times.Count; j++)
                        {
                            trendDatas.Add(trendsDatas[i][j].Value);
                        }
                        trends[i]["TrendDatas"] = trendDatas;
                    }
                    else
                    {
                        List<double?> trendDatas = new List<double?>();
                        for (int j = 0; j < times.Count; j++)
                        {
                            trendDatas.Add(null);
                        }
                        trends[i]["TrendDatas"] = trendDatas;
                    }
                }
            }
            else
            {
                int seconds = (int)endDateTime.Subtract(startDateTime).TotalSeconds;
                int count = seconds / interval;
                for (int i = 0; i < count; i++)
                {
                    times.Add(startDateTime.AddSeconds((double)i * interval).ToString("yyyy-MM-dd HH:mm:ss"));
                }
                for (int i = 0; i < trends.Count; i++)
                {
                    List<double?> trendDatas = new List<double?>();
                    for (int j = 0; j < times.Count; j++)
                    {
                        trendDatas.Add(null);
                    }
                    trends[i]["TrendDatas"] = trendDatas;
                }

            }


            Dictionary<string, object> chartData = new Dictionary<string, object>();
            chartData["Trends"] = trends;
            chartData["Times"] = times;
            return chartData;
        }

        public Task<Dictionary<string, object>> GetEarlyWarningTrendData(int LoopID,
                                          int configureConditionID,
                                           DateTime startDateTime,
                                           string interval,
                                           string duration)
        {
            return Task.Run(() =>
            {

                List<Dictionary<string, object>> trends = new List<Dictionary<string, object>>();
                List<string> times = new List<string>();

                List<EarlyWarningConfigureCondition> earlyWarningTrendInfos = _trendRepository.GetEarlyWarningTrend(_IFixNodeName, LoopID, configureConditionID).ToList<EarlyWarningConfigureCondition>();
                foreach (EarlyWarningConfigureCondition trendInfo in earlyWarningTrendInfos)
                {
                    Dictionary<string, object> trend = new Dictionary<string, object>();
                    trend["TagName"] = trendInfo.TagName;
                    trend["TagAbbrName"] = trendInfo.TagAbbrName;
                    trend["HighLimit"] = trendInfo.HighLimit;
                    trend["LowLimit"] = trendInfo.LowLimit;
                    trend["AlarmHighLimit"] = trendInfo.AlarmHighLimit;
                    trend["AlarmLowLimit"] = trendInfo.AlarmLowLimit;
                    trend["Description"] = trendInfo.Description;
                    if (trendInfo.TagName.Contains("VOSDevRate"))
                    {
                        if (trendInfo.HighLimit != null && trendInfo.AlarmHighLimit != null)
                            trend["TrendMaxVal"] = trendInfo.HighLimit > trendInfo.AlarmHighLimit ? trendInfo.HighLimit + 0.2 : trendInfo.AlarmHighLimit + 0.2;
                        else
                            trend["TrendMaxVal"] = null;
                    }
                    else
                    {
                        if (trendInfo.HighLimit != null && trendInfo.AlarmHighLimit != null)
                            trend["TrendMaxVal"] = trendInfo.HighLimit > trendInfo.AlarmHighLimit ? trendInfo.HighLimit + 5 : trendInfo.AlarmHighLimit + 5;
                        else
                            trend["TrendMaxVal"] = null;
                        if (trendInfo.LowLimit != null && trendInfo.AlarmLowLimit != null)
                            trend["TrendMinVal"] = trendInfo.LowLimit < trendInfo.AlarmLowLimit ? trendInfo.LowLimit - 5 : trendInfo.AlarmLowLimit - 5;
                        else
                            trend["TrendMinVal"] = null;

                    }

                    trends.Add(trend);
                }
                int[] intervalTimes = null;
                int count = 0;
                int groupNumber = trends.Count / 8;
                if (trends.Count % 8 > 0)
                {
                    groupNumber = groupNumber + 1;
                }
                for (int num = 0; num < groupNumber; num++)
                {
                    int err = 0;
                    int groupHandle = 0;
                    int[] tagsHandle = null;
                    string[] tags = null;
                    if (num == groupNumber - 1)
                    {
                        tagsHandle = new int[trends.Count - 8 * num];
                        tags = new string[trends.Count - 8 * num];
                        count = trends.Count - 8 * num;

                    }
                    else
                    {
                        tagsHandle = new int[8];
                        tags = new string[8];
                        count = 8;
                    }
                    for (int i = 0; i < count; i++)
                    {
                        tags[i] = trends[8 * num + i]["TagAbbrName"].ToString();
                    }
                    int[] samplesNum = new int[count];
                    #region "Setting"
                    if ((err = Hda.DefineGroup(out groupHandle)) != FixError.FTK_OK)
                    {
                        //return string.Format("Error defining group,Error = {0}", err);
                        return new Dictionary<string, object>();
                    }

                    for (int i = 0; i < count; i++)
                    {
                        err = Hda.AddNtf(groupHandle, out tagsHandle[i], tags[i]);
                        if (err != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return "Error adding an NTF";
                            return new Dictionary<string, object>();
                        }
                    }

                    if ((err = Hda.SetStart(groupHandle, startDateTime.ToString("yyyy/MM/dd"), startDateTime.ToString("HH:mm:ss"))) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting start date and time";
                        return new Dictionary<string, object>();
                    }

                    if ((err = Hda.SetInterval(groupHandle, interval)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting interval time";
                        return new Dictionary<string, object>();
                    }

                    if ((err = Hda.SetDuration(groupHandle, duration)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting duration time";
                        return new Dictionary<string, object>();
                    }


                    if ((err = Hda.Read(groupHandle, 0)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error reading data";
                        return new Dictionary<string, object>();
                    }
                    #endregion

                    for (int i = 0; i < count; i++)
                    {
                        if ((err = Hda.GetNumSamples(groupHandle, tagsHandle[i], out samplesNum[i])) != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return "Error getting number of samples";
                            return new Dictionary<string, object>();
                        }
                    }

                    for (int i = 0; i < count; i++)
                    {
                        float[] values = new float[samplesNum[i]];
                        intervalTimes = new int[samplesNum[i]];
                        int[] statuses = new int[samplesNum[i]];
                        int[] alarms = new int[samplesNum[i]];
                        // Read data into arrays 
                        if ((err = Hda.GetData(groupHandle, tagsHandle[i], 0, samplesNum[i], values, intervalTimes, statuses, alarms)) != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return string.Format("Error getting data for tag: {0}", tags[i]);
                            return new Dictionary<string, object>();
                        }
                        List<float?> datas = new List<float?>();
                        for (int j = 0; j < statuses.Count(); j++)
                        {
                            if (statuses[j] == 0)
                            {
                                datas.Add(values[j]);
                            }
                            else
                            {
                                datas.Add(null);
                            }
                        }
                        trends[8 * num + i]["TrendDatas"] = datas;
                        if (trends[8 * num + i]["TagName"].ToString().Contains("VOSDevRate"))
                        {
                            trends[8 * num + i]["TrendMinVal"] = 0;
                            trends[8 * num + i]["TrendMaxVal"] = datas.Max() > Convert.ToDouble(trends[8 * num + i]["TrendMaxVal"]) - 0.2 ? datas.Max() + 0.5 : trends[8 * num + i]["TrendMaxVal"];
                        }
                        else
                        {
                            if (trends[8 * num + i]["TrendMaxVal"] == null)
                                trends[8 * num + i]["TrendMaxVal"] = datas.Max() + 5;
                            else
                            {
                                if (trends[8 * num + i]["TrendMaxVal"] != null && trends[8 * num + i]["TrendMinVal"] != null)
                                {
                                    if ((Convert.ToDouble(trends[8 * num + i]["TrendMaxVal"]) - Convert.ToDouble(trends[8 * num + i]["TrendMinVal"])) < 11)
                                        trends[8 * num + i]["TrendMaxVal"] = datas.Max() > Convert.ToDouble(trends[8 * num + i]["TrendMaxVal"]) - 5 ? datas.Max() + 0.1 : (Convert.ToDouble(trends[8 * num + i]["TrendMaxVal"]) - 4.9);
                                    else
                                        trends[8 * num + i]["TrendMaxVal"] = datas.Max() > Convert.ToDouble(trends[8 * num + i]["TrendMaxVal"]) - 5 ? datas.Max() + 5 : trends[8 * num + i]["TrendMaxVal"];
                                }
                                else
                                {
                                    trends[8 * num + i]["TrendMaxVal"] = datas.Max() > Convert.ToDouble(trends[8 * num + i]["TrendMaxVal"]) - 5 ? datas.Max() + 5 : trends[8 * num + i]["TrendMaxVal"];
                                }
                            }
                            if (trends[8 * num + i]["TrendMinVal"] == null)
                                trends[8 * num + i]["TrendMinVal"] = datas.Min() - 5;
                            else
                            {
                                if (trends[8 * num + i]["TrendMaxVal"] != null && trends[8 * num + i]["TrendMinVal"] != null)
                                {
                                    if ((Convert.ToDouble(trends[8 * num + i]["TrendMaxVal"]) - Convert.ToDouble(trends[8 * num + i]["TrendMinVal"])) < 11)
                                        trends[8 * num + i]["TrendMinVal"] = datas.Min() < Convert.ToDouble(trends[8 * num + i]["TrendMinVal"]) + 5 ? datas.Min() - 0.1 : (Convert.ToDouble(trends[8 * num + i]["TrendMinVal"]) + 4.9);
                                    else
                                        trends[8 * num + i]["TrendMinVal"] = datas.Min() < Convert.ToDouble(trends[8 * num + i]["TrendMinVal"]) + 5 ? datas.Min() - 5 : trends[8 * num + i]["TrendMinVal"];
                                }
                                else
                                {
                                    trends[8 * num + i]["TrendMinVal"] = datas.Min() < Convert.ToDouble(trends[8 * num + i]["TrendMinVal"]) + 5 ? datas.Min() - 5 : trends[8 * num + i]["TrendMinVal"];
                                }
                            }
                        }

                        trends[8 * num + i]["TrendMinVal"] = Math.Round(Convert.ToDouble(trends[8 * num + i]["TrendMinVal"]), 1);
                        trends[8 * num + i]["TrendMaxVal"] = Math.Round(Convert.ToDouble(trends[8 * num + i]["TrendMaxVal"]), 1);
                        trends[8 * num + i]["Min"] = datas.Min();

                    }
                    Hda.DeleteGroup(groupHandle);
                }

                foreach (int interval in intervalTimes.ToList<int>())
                {
                    times.Add(startDateTime.AddSeconds(interval).ToString("yyyy-MM-dd HH:mm:ss"));
                }
                Dictionary<string, object> chartData = new Dictionary<string, object>();
                chartData["Trends"] = trends;
                chartData["Times"] = times;
                return chartData;
            });
        }


        public Task<Dictionary<string, object>> GetHistoricalData(
                                               DateTime startDateTime,
                                               string interval,
                                               string duration,
                                               List<Trend> trend
                                               )
        {
            return Task.Run(() =>
            {
                List<Dictionary<string, object>> trends = new List<Dictionary<string, object>>();
                List<string> times = new List<string>();
                List<Trend> trendInfos = trend;
                foreach (Trend trendInfo in trendInfos)
                {
                    Dictionary<string, object> trend = new Dictionary<string, object>();
                    trend["Name"] = trendInfo.Name;
                    trend["Address"] = trendInfo.Address;
                    trends.Add(trend);
                }
                int[] intervalTimes = null;
                int count = 0;
                int groupNumber = trends.Count / 8;
                if (trends.Count % 8 > 0)
                {
                    groupNumber = groupNumber + 1;
                }
                for (int num = 0; num < groupNumber; num++)
                {
                    int err = 0;
                    int groupHandle = 0;
                    int[] tagsHandle = null;
                    string[] tags = null;
                    if (num == groupNumber - 1)
                    {
                        tagsHandle = new int[trends.Count - 8 * num];
                        tags = new string[trends.Count - 8 * num];
                        count = trends.Count - 8 * num;

                    }
                    else
                    {
                        tagsHandle = new int[8];
                        tags = new string[8];
                        count = 8;
                    }
                    for (int i = 0; i < count; i++)
                    {
                        tags[i] = trends[8 * num + i]["Address"].ToString();
                    }
                    int[] samplesNum = new int[count];
                    #region "Setting"
                    if ((err = Hda.DefineGroup(out groupHandle)) != FixError.FTK_OK)
                    {
                        //return string.Format("Error defining group,Error = {0}", err);
                        return new Dictionary<string, object>();
                    }

                    for (int i = 0; i < count; i++)
                    {
                        err = Hda.AddNtf(groupHandle, out tagsHandle[i], tags[i]);
                        if (err != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return "Error adding an NTF";
                            return new Dictionary<string, object>();
                        }
                    }

                    if ((err = Hda.SetStart(groupHandle, startDateTime.ToString("yyyy/MM/dd"), startDateTime.ToString("HH:mm:ss"))) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting start date and time";
                        return new Dictionary<string, object>();
                    }

                    if ((err = Hda.SetInterval(groupHandle, interval)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting interval time";
                        return new Dictionary<string, object>();
                    }

                    if ((err = Hda.SetDuration(groupHandle, duration)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting duration time";
                        return new Dictionary<string, object>();
                    }


                    if ((err = Hda.Read(groupHandle, 0)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error reading data";
                        return new Dictionary<string, object>();
                    }
                    #endregion

                    for (int i = 0; i < count; i++)
                    {
                        if ((err = Hda.GetNumSamples(groupHandle, tagsHandle[i], out samplesNum[i])) != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return "Error getting number of samples";
                            return new Dictionary<string, object>();
                        }
                    }

                    for (int i = 0; i < count; i++)
                    {
                        float[] values = new float[samplesNum[i]];
                        intervalTimes = new int[samplesNum[i]];
                        int[] statuses = new int[samplesNum[i]];
                        int[] alarms = new int[samplesNum[i]];
                        // Read data into arrays 
                        if ((err = Hda.GetData(groupHandle, tagsHandle[i], 0, samplesNum[i], values, intervalTimes, statuses, alarms)) != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return string.Format("Error getting data for tag: {0}", tags[i]);
                            return new Dictionary<string, object>();
                        }
                        List<float?> datas = new List<float?>();
                        for (int j = 0; j < statuses.Count(); j++)
                        {
                            if (statuses[j] == 0)
                            {
                                datas.Add(values[j]);
                            }
                            else
                            {
                                datas.Add(null);
                            }
                        }
                        trends[8 * num + i]["TrendDatas"] = datas;
                    }
                    Hda.DeleteGroup(groupHandle);
                }

                foreach (int interval in intervalTimes.ToList<int>())
                {
                    times.Add(startDateTime.AddSeconds(interval).ToString("yyyy-MM-dd HH:mm:ss"));
                }
                Dictionary<string, object> chartData = new Dictionary<string, object>();
                chartData["Trends"] = trends;
                //chartData["Times"] = times;
                return chartData;
            });
        }
    }

}
