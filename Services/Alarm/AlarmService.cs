using Microsoft.EntityFrameworkCore.ChangeTracking;
using Models;
using Respository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using GeFanuc.iFixToolkit.Adapter;
using Microsoft.Extensions.Configuration;
using System.Collections;

namespace Services
{
    public class AlarmService : IAlarmService
    {
        private IAlarmRespository _alarmRespository;
        private readonly IConfiguration _configuration;
        public AlarmService(IAlarmRespository alarmRespository, IConfiguration configuration)
        {
            _alarmRespository = alarmRespository;
            _configuration = configuration;
        }
        public Task<IEnumerable<Alarm>> GetRealtimeAlarm(string alarmArea, string priority)
        {
            return Task.Run(() => _alarmRespository.GetRealtimeAlarm(alarmArea, priority));
        }

        public Task<IEnumerable<Alarm>> GetOfficeRealtimeAlarm(string alarmArea, string priority)
        {
            return Task.Run(() => _alarmRespository.GetOfficeRealtimeAlarm(alarmArea, priority));
        }

        public Task<IEnumerable<Alarm>> GetHistoricalAlarm(string startDateTime, string endDateTime, string alarmArea)
        {
            return Task.Run(() => _alarmRespository.GetHistoricalAlarm(startDateTime, endDateTime, alarmArea));
        }

        public Task<IEnumerable<Alarm>> GetOfficeHistoricalAlarm(string startDateTime, string endDateTime, string alarmArea)
        {
            return Task.Run(() => _alarmRespository.GetOfficeHistoricalAlarm(startDateTime, endDateTime, alarmArea));
        }

        public Task<IEnumerable<AlarmKPI>> GetHistoricalAlarmKPI(string topNumber, string sortType, string startDateTime, string endDateTime, string alarmArea)
        {
            return Task.Run(() => _alarmRespository.GetHistoricalAlarmKPI(topNumber, sortType, startDateTime, endDateTime, alarmArea));
        }

        public Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarningByAll()
        {
            return Task.Run(() => _alarmRespository.GetEarlyWarningByAll());
        }
        public Task<string> GetAlarmKnowledgeBase(string description, string stationAbbrName, string loopAbbrName,DateTime startDateTime)
        {
            return Task.Run(() =>
            {
                try
                {
                    //DateTime aaa= Convert.ToDateTime("2023-07-11 16:22:11");
                    List<DataItem> DataItems = _alarmRespository.GetBandName(stationAbbrName, loopAbbrName).ToList();
                    int collectDataTypeID = Int16.Parse(DataItems.FirstOrDefault().Value);
                    string strMessage = "";
                    switch (DataItems.FirstOrDefault().Name) 
                    {
                        case "Daniel":
                            strMessage = GetDanielKnowledgeBase(description, stationAbbrName, loopAbbrName, startDateTime, collectDataTypeID);
                            break;
                        case "Elster":
                            strMessage = GetElsterKnowledgeBase(description, stationAbbrName, loopAbbrName, startDateTime, collectDataTypeID);
                            break;
                        case "Sick":
                            strMessage = GetSickKnowledgeBase(description, stationAbbrName, loopAbbrName, startDateTime, collectDataTypeID);
                            break;
                        case "Weise":
                            strMessage=GetWeiseKnowledgeBase(description, stationAbbrName, loopAbbrName, startDateTime, collectDataTypeID);
                            break;
                    }
                    return strMessage;
                }
                catch (Exception ex)
                {

                    return ex.ToString();
                }
              
            });
        }

        public Task<IEnumerable<EarlyWarningConfigureCondition>> GetEarlyWarningConfigureCondition(int loopID)
        {
            return Task.Run(() =>

            _alarmRespository.GetEarlyWarningConfigureCondition(loopID)

            );
        }

        public Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarning(int loopID)
        {
            return Task.Run(() =>

            _alarmRespository.GetEarlyWarning(loopID)

            );
        }


        public Task<Dictionary<string, Dictionary<string, DataItem>>> GetAlarmCountByStation(Station station)
        {
            return Task.Run(() =>
            {
                Dictionary<string, Dictionary<string, DataItem>> alarms = new Dictionary<string, Dictionary<string, DataItem>>();
                Dictionary<string, DataItem> loopAlarm = new Dictionary<string, DataItem>();
                foreach (Loop loop in station.Loops)
                {
                    loopAlarm = new Dictionary<string, DataItem>();
                    loopAlarm["PT"] = _alarmRespository.GetAlarmCountByStation(station.AbbrName + "_" + loop.AbbrName + "_P");
                    loopAlarm["TT"] = _alarmRespository.GetAlarmCountByStation(station.AbbrName + "_" + loop.AbbrName + "_T");
                    loopAlarm["FM"] = _alarmRespository.GetAlarmCountByStation(station.AbbrName + "_" + loop.AbbrName + "_M");
                    loopAlarm["FC"] = _alarmRespository.GetAlarmCountByStation(station.AbbrName + "_" + loop.AbbrName + "_F");
                    alarms[loop.AbbrName] = loopAlarm;
                }
                Dictionary<string, DataItem> EquipmentpAlarm = new Dictionary<string, DataItem>();
                foreach (Equipment equipment in station.Equipments)
                {
                    EquipmentpAlarm["GCAnalyzer"] = _alarmRespository.GetAlarmCountByStation(station.AbbrName + "_" + equipment.AbbrName);
                    alarms[equipment.AbbrName] = EquipmentpAlarm;
                }
                return alarms;
            });

        }

        public Task<IEnumerable<DiagnosticAlarm>> GetRealtimeDiagnosticAlarm(string stationID, string loopID)
        {
            return Task.Run(() => _alarmRespository.GetRealtimeDiagnosticAlarm(stationID, loopID));
        }

        public Task<IEnumerable<HisCheckDataAlarm>> GetHistoricalCheckDataAlarm(string loopIDs, string beginDateTime, string endDateTime)
        {
            return Task.Run(() => _alarmRespository.GetHistoricalCheckDataAlarm(loopIDs, beginDateTime, endDateTime));
        }

        public Task<IEnumerable<DiagnosticAlarm>> GetOfficeRealtimeDiagnosticAlarm(string stationID, string loopID)
        {
            return Task.Run(() => _alarmRespository.GetOfficeRealtimeDiagnosticAlarm(stationID, loopID));
        }
        public string GetDanielKnowledgeBase(string description, string stationName, string loopName, DateTime dateTime, int collectDataTypeID)
        {
            string Solution = "";
            DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
            DateTime endDateTime = dateTime.AddMinutes(-2);
            string interval = "00:01:00";

            switch (description)
            {
                case "声道1噪音超限":
                case "声道2噪音超限":
                case "声道3噪音超限":
                case "声道4噪音超限":
                case "声道1信噪比过低":
                case "声道2信噪比过低":
                case "声道3信噪比过低":
                case "声道4信噪比过低":
                case "声道1传输时间自检失败":
                case "声道2传输时间自检失败":
                case "声道3传输时间自检失败":
                case "声道4传输时间自检失败":
                case "声道1自检声速范围超差":
                case "声道2自检声速范围超差":
                case "声道3自检声速范围超差":
                case "声道4自检声速范围超差":
                case "声道1传输时间差自检失败":
                case "声道2传输时间差自检失败":
                case "声道3传输时间差自检失败":
                case "声道4传输时间差自检失败":
                case "声道1信号质量差":
                case "声道2信号质量差":
                case "声道3信号质量差":
                case "声道4信号质量差":
                case "声道1测量声速范围超差":
                case "声道2测量声速范围超差":
                case "声道3测量声速范围超差":
                case "声道4测量声速范围超差":
                case "声道1批量信号停止":
                case "声道2批量信号停止":
                case "声道3批量信号停止":
                case "声道4批量信号停止":
                case "声道1批量信号故障":
                case "声道2批量信号故障":
                case "声道3批量信号故障":
                case "声道4批量信号故障":
                case "声道1信号自检模式":
                case "声道2信号自检模式":
                case "声道3信号自检模式":
                case "声道4信号自检模式":
                case "声道1指示故障":
                case "声道2指示故障":
                case "声道3指示故障":
                case "声道4指示故障":
                case "声道A1信号接受率低报警":
                case "声道A2信号接受率低报警":
                case "声道B1信号接受率低报警":
                case "声道B2信号接受率低报警":
                case "声道C1信号接受率低报警":
                case "声道C2信号接受率低报警":
                case "声道D1信号接受率低报警":
                case "声道D2信号接受率低报警":
                case "声道A1信号增益高报警":
                case "声道A2信号增益高报警":
                case "声道B1信号增益高报警":
                case "声道B2信号增益高报警":
                case "声道C1信号增益高报警":
                case "声道C2信号增益高报警":
                case "声道D1信号增益高报警":
                case "声道D2信号增益高报警":
                case "声道A1信噪比报警":
                case "声道A2信噪比报警":
                case "声道B1信噪比报警":
                case "声道B2信噪比报警":
                case "声道C1信噪比报警":
                case "声道C2信噪比报警":
                case "声道D1信噪比报警":
                case "声道D2信噪比报警":
                case "声道A声速偏差率报警":
                case "声道B声速偏差率报警":
                case "声道C声速偏差率报警":
                case "声道D声速偏差率报警":
                    {

                        string duration = Duration(startDateTime, endDateTime);
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流量计参数指标报警", collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                        var ParametersCaliber = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditionsForCaliber(stationName, loopName, "DN200");
                        ParametersConfigureCondition.ForEach(e => { if (e.Description != "剖面系数" || (e.Description == "剖面系数" && e.Caliber == ParametersCaliber)) Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}"); });
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);

                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        Dictionary<string, string> Result = new Dictionary<string, string>();
                        foreach (var d in data)
                        {
                            parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                        }

                        foreach (var parameter in parameters)
                        {
                            var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                            Result.Add(Condition.TagName, CheckFMParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                        }

                        foreach (var result in Result)
                        {
                            if (result.Value == "采样点位不足或通讯有中断情况")
                            {
                                Solution = "采样点位不足或通讯有中断情况";
                                break;
                            }
                        }

                        if (Solution == "采样点位不足或通讯有中断情况") break;

                        var GainAbnormal = Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常"
                            || Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常";
                        var PerformanceAbnormal = Result["Path1APerformance"] == "异常" || Result["Path1BPerformance"] == "异常" || Result["Path2APerformance"] == "异常" || Result["Path2BPerformance"] == "异常"||
                            Result["Path3APerformance"] == "异常" || Result["Path3BPerformance"] == "异常" || Result["Path4APerformance"] == "异常" || Result["Path4APerformance"] == "异常";
                        var SNRAbnormal = Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常" || Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常"
                            || Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常" || Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常";
                        if (GainAbnormal || PerformanceAbnormal || SNRAbnormal)
                        {
                            if (Result["SwirlAngle"] == "正常" && Result["ProfileFactor"] == "正常" && Result["Symmetry"] == "正常")
                            {
                                Solution = "排查临近设备噪声干扰";
                                break;
                            }
                            else
                            {
                                int SoundChannelNumber = 0;
                                SoundChannelNumber += Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path1Performance"] == "异常" || Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常" ? 1 : 0;
                                SoundChannelNumber += Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常" || Result["Path2Performance"] == "异常" || Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常" ? 1 : 0;
                                SoundChannelNumber += Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path3Performance"] == "异常" || Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常" ? 1 : 0;
                                SoundChannelNumber += Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常" || Result["Path4Performance"] == "异常" || Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常" ? 1 : 0;
                                if (SoundChannelNumber == 1)
                                {
                                    Solution = "检查探头状态（清洗探头、更换探头）";
                                    break;
                                }
                                else if (SoundChannelNumber >= 2)
                                {
                                    Solution = "检查紊流因素（整流器堵塞情况、前端管道长度、前端阀门开度）、检查管道内脏污情况";
                                    break;
                                }
                                else
                                {
                                    Solution = "流量计参数指标数据正常，无解决方案";
                                    break;
                                }
                            }
                        }
                        else
                        {
                            Solution = "流量计参数指标数据正常，无解决方案";
                            break;
                        }
                    }
                case "剖面系数超上限":
                case "剖面系数超下限":
                case "剖面系数超上上限":
                case "剖面系数超下下限":
                case "漩涡角超上限":
                case "漩涡角超下限":
                case "漩涡角超上上限":
                case "漩涡角超下下限": 
                    {
                        //DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-5);
                        //DateTime endDateTime = dateTime.AddMinutes(-5);
                        //string interval = "00:14:30";
                        string duration = Duration(startDateTime, endDateTime);
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流场指标报警", collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                        var ParametersCaliber = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditionsForCaliber(stationName, loopName, "DN200");
                        ParametersConfigureCondition.ForEach(e => { if (e.Description != "剖面系数" || (e.Description == "剖面系数" && e.Caliber == ParametersCaliber)) Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}"); });
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);

                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        Dictionary<string, string> Result = new Dictionary<string, string>();
                        foreach (var d in data)
                        {
                            parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                        }

                        foreach (var parameter in parameters)
                        {
                            var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                            Result.Add(Condition.TagName, CheckFMVOSKeyParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                        }

                        foreach (var result in Result)
                        {
                            if (result.Value == "采样点位不足或通讯有中断情况")
                            {
                                Solution = "采样点位不足或通讯有中断情况";
                                break;
                            }
                        }

                        if (Solution == "采样点位不足或通讯有中断情况") break;

                        if (Result["SwirlAngle"] == "异常" || Result["ProfileFactor"] == "异常" || Result["Symmetry"] == "异常")
                        {
                            int SoundChannelNumber = 0;
                            SoundChannelNumber += Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path1Performance"] == "异常" || Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常" ? 1 : 0;
                            SoundChannelNumber += Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常" || Result["Path2Performance"] == "异常" || Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常" ? 1 : 0;
                            SoundChannelNumber += Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path3Performance"] == "异常" || Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常" ? 1 : 0;
                            SoundChannelNumber += Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常" || Result["Path4Performance"] == "异常" || Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常" ? 1 : 0;
                            if (SoundChannelNumber >= 2)
                            {
                                Solution = "检查紊流因素（整流器堵塞情况、前端管道长度、前端阀门开度）、检查管道内脏污情况";
                                break;
                            }
                            else if (SoundChannelNumber == 1)
                            {
                                Solution = "检查探头状态（清洗探头、更换探头）";
                                break;
                            }
                            else
                            {
                                Solution = "流场指标数据正常，无解决方案";
                                break;
                            }
                        }
                        else
                        {
                            Solution = "流场指标数据正常，无解决方案";
                            break;
                        }
                    }
                case "流量计与流量计算机通讯报警":
                    {
                        Solution = "检查中间线路";
                        break;
                    }
            }
            return Solution;
        }
        public string GetSickKnowledgeBase(string description, string stationName, string loopName, DateTime dateTime, int collectDataTypeID)
        {
            string Solution = "";
            DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
            DateTime endDateTime = dateTime.AddMinutes(-2);
            string interval = "00:01:00";
            string duration = Duration(startDateTime, endDateTime);
            switch (description)
            {
                case "声道1信噪比低":
                case "声道1增益偏差超限":
                case "声道1增益超限":
                case "声道1声速偏差超限":
                case "声道1故障声道数量超限":
                case "声道1故障":
                case "声道2信噪比低":
                case "声道2增益偏差超限":
                case "声道2增益超限":
                case "声道2声速偏差超限":
                case "声道2故障声道数量超限":
                case "声道2故障":
                case "声道3信噪比低":
                case "声道3增益偏差超限":
                case "声道3增益超限":
                case "声道3声速偏差超限":
                case "声道3故障声道数量超限":
                case "声道3故障":
                case "声道4信噪比低":
                case "声道4增益偏差超限":
                case "声道4增益超限":
                case "声道4声速偏差超限":
                case "声道4故障声道数量超限":
                case "声道4故障":
                case "声道1状态":
                case "声道2状态":
                case "声道3状态":
                case "声道4状态":
                case "声道1报警":
                case "声道2报警":
                case "声道3报警":
                case "声道4报警":
                case "声道1信号接收率低报警":
                case "声道2信号接收率低报警":
                case "声道3信号接收率低报警":
                case "声道4信号接收率低报警":
                case "声道1AB信号增益高报警":
                case "声道1BA信号增益高报警":
                case "声道2AB信号增益高报警":
                case "声道2BA信号增益高报警":
                case "声道3AB信号增益高报警":
                case "声道3BA信号增益高报警":
                case "声道4AB信号增益高报警":
                case "声道4BA信号增益高报警":
                case "声道1AB信噪比低报警":
                case "声道1BA信噪比低报警":
                case "声道2AB信噪比低报警":
                case "声道2BA信噪比低报警":
                case "声道3AB信噪比低报警":
                case "声道3BA信噪比低报警":
                case "声道4AB信噪比低报警":
                case "声道4BA信噪比低报警":
                case "声道1声速偏差率报警":
                case "声道2声速偏差率报警":
                case "声道3声速偏差率报警":
                case "声道4声速偏差率报警":
                    {
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流量计参数指标报警", collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                        ParametersConfigureCondition.ForEach(e => {
                                Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}");   
                        });
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);

                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        Dictionary<string, string> Result = new Dictionary<string, string>();
                        foreach (var d in data)
                        {
                            parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                        }

                        foreach (var parameter in parameters)
                        {
                            var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                            Result.Add(Condition.TagName, CheckFMParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                        }
                        int pathGain = 0;
                        int pathPerformance = 0;
                        int pathSNR = 0;
                        foreach (var result in Result)
                        {
                            if (result.Value == "采样点位不足或通讯有中断情况")
                            {
                                Solution = "采样点位不足或通讯有中断情况";
                                break;
                            }
                            if (result.Key == "Path1Performance" || result.Key == "Path2Performance" || result.Key == "Path3Performance" || result.Key == "Path4Performance")
                            {
                                if (result.Value == "异常")
                                    pathPerformance++;
                            }
                        }
                        if (Solution == "采样点位不足或通讯有中断情况") break;

                        var allAbnormal = Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常" || Result["Path3AGain"] == "异常"
                            || Result["Path3BGain"] == "异常" || Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常" || Result["Path1Performance"] == "异常" || Result["Path2Performance"] == "异常"
                            || Result["Path3Performance"] == "异常" || Result["Path4Performance"] == "异常" || Result["Path1ASNR"]== "异常" || Result["Path1BSNR"] == "异常" || Result["Path2ASNR"] == "异常" 
                            || Result["Path2BSNR"] == "异常" || Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常" || Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常";
                        int soundChannel = 0;
                        soundChannel += (Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path1Performance"] == "异常" || Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常" || Result["Path2Performance"] == "异常" || Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path3Performance"] == "异常" || Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常" || Result["Path4Performance"] == "异常" || Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常") ? 1 : 0;

                        if (Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常") { pathGain++; }
                        if (Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常") { pathGain++; }
                        if (Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常") { pathGain++; }
                        if (Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常") { pathGain++; }
                        if (Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常") { pathSNR++; }
                        if (Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常") { pathSNR++; }
                        if (Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常") { pathSNR++; }
                        if (Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常") { pathSNR++; }
                        
                        if (allAbnormal && Result["ProfileFactor"] == "正常" && Result["SwirlAngle"] == "正常" && Result["Symmetry"] == "正常")
                        {
                            Solution = "排查临近设备噪声干扰";
                            break;
                        }
                        else if (soundChannel==1&& (Result["ProfileFactor"] == "异常" || Result["SwirlAngle"] == "异常" || Result["Symmetry"] == "异常"))
                        {
                            Solution = "更换探头";
                            break;
                        }
                        else if ((pathGain>=2 || pathPerformance>=2 || pathSNR>=2) && (Result["ProfileFactor"] == "异常" || Result["SwirlAngle"] == "异常" || Result["Symmetry"] == "异常"))
                        {
                            Solution = "检查阀门开度、检查整流器";
                            break;
                        }
                        else
                        {
                            Solution = "流量计参数指标数据正常，无解决方案";
                            break;
                        }
                    }
                case "剖面系数超上限":
                case "剖面系数超下限":
                case "剖面系数超上上限":
                case "剖面系数超下下限":
                case "对称性超上限":
                case "对称性超下限":
                case "对称性超上上限":
                case "对称性超下下限":
                case "交叉流超上限":
                case "交叉流超下限":
                case "交叉流超上上限":
                case "交叉流超下下限":
                case "漩涡角超上限":
                case "漩涡角超下限":
                case "漩涡角超上上限":
                case "漩涡角超下下限":
                    {
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流场指标报警", collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                        ParametersConfigureCondition.ForEach(e => { 
                            Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}"); });
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);

                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        Dictionary<string, string> Result = new Dictionary<string, string>();
                        foreach (var d in data)
                        {
                            parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                        }

                        foreach (var parameter in parameters)
                        {
                            var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                            Result.Add(Condition.TagName, CheckFMVOSKeyParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                        }

                        foreach (var result in Result)
                        {
                            if (result.Value == "采样点位不足或通讯有中断情况")
                            {
                                Solution = "采样点位不足或通讯有中断情况";
                                break;
                            }
                        }

                        if (Solution == "采样点位不足或通讯有中断情况") break;

                        if (Result["SwirlAngle"] == "异常" || Result["ProfileFactor"] == "异常" || Result["Symmetry"] == "异常")
                        {
                            int SoundChannelNumber = 0;
                            SoundChannelNumber += Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path1Performance"] == "异常" || Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常" ? 1 : 0;
                            SoundChannelNumber += Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常" || Result["Path2Performance"] == "异常" || Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常" ? 1 : 0;
                            SoundChannelNumber += Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path3Performance"] == "异常" || Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常" ? 1 : 0;
                            SoundChannelNumber += Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常" || Result["Path4Performance"] == "异常" || Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常" ? 1 : 0;
                            if (SoundChannelNumber >= 2)
                            {
                                Solution = "检查前后直管段长度、阀门开度，检查整流器";
                                break;
                            }
                            else if (SoundChannelNumber == 1)
                            {
                                Solution = "更换探头";
                                break;
                            }
                            else
                            {
                                Solution = "流场指标数据正常，无解决方案";
                                break;
                            }
                        }
                        else
                        {
                            Solution = "流场指标数据正常，无解决方案";
                            break;
                        }
                    }
                case "温度变送器通讯故障":
                case "压力变送器通讯故障":
                case "色谱分析仪器与流量计算机通":
                case "流量计与流量计算机通讯报警":
                    {
                        Solution = "检查中间线路";
                        break;
                    }
            }
            return Solution;
        }
        public string GetElsterKnowledgeBase(string description, string stationName, string loopName, DateTime dateTime, int collectDataTypeID)
        {
            string Solution = "";
            DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
            DateTime endDateTime = dateTime.AddMinutes(-2);
            string interval = "00:01:00";
            string duration = Duration(startDateTime, endDateTime);
            switch (description)
            {
                case "声道1报警":
                case "声道2报警":
                case "声道3报警":
                case "声道4报警":
                case "声道5报警":
                case "声道6报警":
                case "声速偏差超过0.25%报警":
                case "声速偏差超过0.2%报警":
                case "流量计通道报警":
                case "声道报警":
                case "声道1接受率低报警":
                case "声道2接受率低报警":
                case "声道3接受率低报警":
                case "声道4接受率低报警":
                case "声道5接受率低报警":
                case "声道6接受率低报警":
                case "声道A1信号增益高报警":
                case "声道B1信号增益高报警":
                case "声道A2信号增益高报警":
                case "声道B2信号增益高报警":
                case "声道A3信号增益高报警":
                case "声道B3信号增益高报警":
                case "声道A4信号增益高报警":
                case "声道B4信号增益高报警":
                case "声道A5信号增益高报警":
                case "声道B5信号增益高报警":
                case "声道A6信号增益高报警":
                case "声道B6信号增益高报警":
                case "声道A1信噪比报警":
                case "声道B1信噪比报警":
                case "声道A2信噪比报警":
                case "声道B2信噪比报警":
                case "声道A3信噪比报警":
                case "声道B3信噪比报警":
                case "声道A4信噪比报警":
                case "声道B4信噪比报警":
                case "声道A5信噪比报警":
                case "声道B5信噪比报警":
                case "声道A6信噪比报警":
                case "声道B6信噪比报警":
                case "通道1声速偏差率高报警":
                case "通道2声速偏差率高报警":
                case "通道3声速偏差率高报警":
                case "通道4声速偏差率高报警":
                case "通道5声速偏差率高报警":
                case "通道6声速偏差率高报警":
                    {
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流量计参数指标报警", collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                        ParametersConfigureCondition.ForEach(e => {
                            Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}");
                        });
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);

                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        Dictionary<string, string> Result = new Dictionary<string, string>();
                        foreach (var d in data)
                        {
                            parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                        }

                        foreach (var parameter in parameters)
                        {
                            var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                            Result.Add(Condition.TagName, CheckFMParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                        }
                        int pathPerformance = 0;
                        int pathGain = 0;
                        foreach (var result in Result)
                        {
                            if (result.Value == "采样点位不足或通讯有中断情况")
                            {
                                Solution = "采样点位不足或通讯有中断情况";
                                break;
                            }
                            if (result.Key == "Path1Performance" || result.Key == "Path2Performance" || result.Key == "Path3Performance" || result.Key == "Path4Performance")
                            {
                                if (result.Value == "异常")
                                    pathPerformance++;
                            }
                        }
                        if (Solution == "采样点位不足或通讯有中断情况") break;

                        var gainAbnormal = Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常" || Result["Path3AGain"] == "异常"
                            || Result["Path3BGain"] == "异常" || Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常" || Result["Path1Performance"] == "异常" || Result["Path2Performance"] == "异常"
                            || Result["Path3Performance"] == "异常" || Result["Path4Performance"] == "异常";
                        int soundChannel = 0;
                        soundChannel += (Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path1Performance"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常" || Result["Path2Performance"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path3Performance"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常" || Result["Path4Performance"] == "异常") ? 1 : 0;

                        if (Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常") { pathGain++; }
                        if (Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常") { pathGain++; }
                        if (Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常") { pathGain++; }
                        if (Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常") { pathGain++; }
                        if (gainAbnormal && Result["ProfileFactor"] == "正常" && Result["SwirlAngle"] == "正常")
                        {
                            Solution = "排查临近设备噪声干扰";
                            break;
                        }
                        else if (soundChannel == 1 && (Result["ProfileFactor"] == "异常" || Result["SwirlAngle"] == "异常"))
                        {
                            Solution = "更换探头";
                            break;
                        }
                        else if ((pathGain >= 2 || pathPerformance >= 2) && (Result["ProfileFactor"] == "异常" || Result["SwirlAngle"] == "异常"))
                        {
                            Solution = "检查阀门开度、检查整流器";
                            break;
                        }
                        else
                        {
                            Solution = "流量计参数指标数据正常，无解决方案";
                            break;
                        }
                    }
                case "剖面系数超上限":
                case "剖面系数超下限":
                case "剖面系数超上上限":
                case "剖面系数超下下限":
                case "漩涡角超上限":
                case "漩涡角超下限":
                case "漩涡角超上上限":
                case "漩涡角超下下限":
                    {
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流场指标报警", collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                        ParametersConfigureCondition.ForEach(e => {
                            Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}");
                        });
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);

                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        Dictionary<string, string> Result = new Dictionary<string, string>();
                        foreach (var d in data)
                        {
                            parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                        }

                        foreach (var parameter in parameters)
                        {
                            var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                            Result.Add(Condition.TagName, CheckFMVOSKeyParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                        }
                        int pathPerformance = 0;
                        foreach (var result in Result)
                        {
                            if (result.Value == "采样点位不足或通讯有中断情况")
                            {
                                Solution = "采样点位不足或通讯有中断情况";
                                break;
                            }
                            if (result.Key == "Path1Performance" || result.Key == "Path2Performance" || result.Key == "Path3Performance" || result.Key == "Path4Performance")
                            {
                                if (result.Value == "异常")
                                    pathPerformance++;
                            }
                        }
                        if (Solution == "采样点位不足或通讯有中断情况") break;
                        int pathGain = 0;
                        int pathASNR = 0;
                        if (Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常") { pathGain++; }
                        if (Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常") { pathGain++; }
                        if (Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常") { pathGain++; }
                        if (Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常") { pathGain++; }
                        if (Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常") { pathASNR++; }
                        if (Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常") { pathASNR++; }
                        if (Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常") { pathASNR++; }
                        if (Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常") { pathASNR++; }

                        int soundChannel = 0;
                        soundChannel += (Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path1Performance"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常" || Result["Path2Performance"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path3Performance"] == "异常") ? 1 : 0;
                        soundChannel += (Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常" || Result["Path4Performance"] == "异常") ? 1 : 0;

                        if ((pathGain >= 2 || pathPerformance >= 2 || pathASNR >= 2) && (Result["ProfileFactor"] == "异常" || Result["SwirlAngle"] == "异常"))
                        {
                            Solution = "检查前后直管段长度、阀门开度，检查整流器";
                            break;
                        }
                        else if (soundChannel == 1 && (Result["ProfileFactor"] == "异常" || Result["SwirlAngle"] == "异常"))
                        {
                            Solution = "更换探头";
                            break;
                        }
                        else
                        {
                            Solution = "流场指标数据正常，无解决方案";
                            break;
                        }
                    }
                case "温度变送器通讯故障":
                case "压力变送器通讯故障":
                case "流量计与流量计算机通讯报警":
                    {
                        Solution = "检查中间线路";
                        break;
                    }
            }
            return Solution;
        }
        public  string GetWeiseKnowledgeBase(string description, string stationName, string loopName,DateTime dateTime, int collectDataTypeID)
        {
            string Solution = "";

            switch (description)
            {
                case "压力高报警":
                case "压力低报警":
                    {

                        DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
                        DateTime endDateTime = dateTime.AddMinutes(-2);
                        string interval = "00:07:13";
                        string duration = Duration(startDateTime, endDateTime);
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions(description, collectDataTypeID).FirstOrDefault();
                        List<string> Tags = new List<string>();
                        Tags.Add(_configuration["IFIXNodeName"].ToString() + ":" + stationName + "_" + loopName + "_" + ParametersConfigureCondition.TagAbbrName);
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);
                        if (data.Count == 0)
                        {
                            Solution = "采集数据异常！无法分析";
                            break;
                        }
                        List<float?> PressureInuse = (List<float?>)data.FirstOrDefault()["TrendDatas"];
                        //List<float?> PressureInuse = new List<float?>();
                        //for (int i = 0; i < 100; i++)
                        //{
                        //    if (i < 80)
                        //    {
                        //        PressureInuse.Add(1);
                        //    }
                        //    else
                        //    {
                        //        PressureInuse.Add(90);
                        //    }
                        //}

                        string Result = CheckParameters(PressureInuse, ParametersConfigureCondition.LowLimit, ParametersConfigureCondition.HighLimit);
                        if (Result == "采样点位不足,无法分析")
                        {
                            Solution = "采样点位不足,无法分析";
                            break;
                        }
                        if (Result == "正常")
                        {
                            Solution = "压力数据正常，无解决方案";
                            break;
                        }
                        else
                        {
                            List<DataItem> DataItems = _alarmRespository.GetSameStationOtherLoop(stationName, loopName).ToList();
                            if (DataItems.Count == 0)
                            {
                                Solution = "该站无其他回路，无法分析。无解决方案";
                                break;
                            }
                            Tags = new List<string>();
                            Tags.Add(_configuration["IFIXNodeName"].ToString() + ":" + DataItems.FirstOrDefault().Value + "_" + ParametersConfigureCondition.TagAbbrName);
                            data = new List<Dictionary<string, object>>();
                            data = GetHistoricalData(startDateTime, interval, duration, Tags);
                            if (data.Count == 0)
                            {
                                Solution = "采集数据异常！无法分析";
                                break;
                            }
                            List<float?> OtherPressureInuse = (List<float?>)data.FirstOrDefault()["TrendDatas"]; 
                            //List<float?> OtherPressureInuse = new List<float?>();
                            //for (int i = 0; i < 100; i++)
                            //{
                            //    if (i < 95)
                            //    {
                            //        OtherPressureInuse.Add(1);
                            //    }
                            //    else
                            //    {
                            //        OtherPressureInuse.Add(90);
                            //    }
                            //}
                            Result = CheckParameters(OtherPressureInuse, ParametersConfigureCondition.LowLimit, ParametersConfigureCondition.HighLimit);
                            if (Result == "采样点位不足,无法分析")
                            {
                                Solution = "采样点位不足,无法分析";
                                break;
                            }
                            if (Result == "正常")
                            {
                                Solution = "更换压力变送器";
                                break;
                            }
                            else
                            {
                                Solution = "调整压力高报上限或降低进站压力";
                                break;
                            }

                        }
                    }
                case "温度高报警":
                case "温度低报警":
                    {

                        DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
                        DateTime endDateTime = dateTime.AddMinutes(-2);
                        string interval = "00:07:13";
                        string duration = Duration(startDateTime, endDateTime);
                        var ConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions(description, collectDataTypeID).FirstOrDefault();
                        List<string> Tags = new List<string>();
                        Tags.Add(_configuration["IFIXNodeName"].ToString() + ":" + stationName + "_" + loopName + "_" + ConfigureCondition.TagAbbrName);
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);
                        if (data.Count == 0)
                        {
                            Solution = "采集数据异常！无法分析";
                            break;
                        }
                        List<float?> parameters = (List<float?>)data.FirstOrDefault()["TrendDatas"];
                        //List<float?> PressureInuse = new List<float?>();
                        //for (int i = 0; i < 100; i++)
                        //{
                        //    if (i < 80)
                        //    {
                        //        PressureInuse.Add(1);
                        //    }
                        //    else
                        //    {
                        //        PressureInuse.Add(90);
                        //    }
                        //}

                        string Result = CheckParameters(parameters, ConfigureCondition.LowLimit, ConfigureCondition.HighLimit);
                        if (Result == "采样点位不足,无法分析")
                        {
                            Solution = "采样点位不足,无法分析";
                            break;
                        }
                        if (Result == "正常")
                        {
                            Solution = "温度数据正常，无解决方案";
                            break;
                        }
                        else
                        {
                            List<DataItem> DataItems = _alarmRespository.GetSameStationOtherLoop(stationName, loopName).ToList();
                            if (DataItems.Count == 0)
                            {
                                Solution = "该站无其他回路，无法分析。无解决方案";
                                break;
                            }
                            Tags = new List<string>();
                            Tags.Add(_configuration["IFIXNodeName"].ToString() + ":" + DataItems.FirstOrDefault().Value + "_" + ConfigureCondition.TagAbbrName);
                            data = new List<Dictionary<string, object>>();
                            data = GetHistoricalData(startDateTime, interval, duration, Tags);
                            if (data.Count == 0)
                            {
                                Solution = "采集数据异常！无法分析";
                                break;
                            }
                            List<float?> OtherParameters = (List<float?>)data.FirstOrDefault()["TrendDatas"];
                            //List<float?> OtherPressureInuse = new List<float?>();
                            //for (int i = 0; i < 100; i++)
                            //{
                            //    if (i < 95)
                            //    {
                            //        OtherPressureInuse.Add(1);
                            //    }
                            //    else
                            //    {
                            //        OtherPressureInuse.Add(90);
                            //    }
                            //}
                            Result = CheckParameters(OtherParameters, ConfigureCondition.LowLimit, ConfigureCondition.HighLimit);
                            if (Result == "采样点位不足,无法分析")
                            {
                                Solution = "采样点位不足,无法分析";
                                break;
                            }
                            if (Result == "正常")
                            {
                                Solution = "更换温度变送器";
                                break;
                            }
                            else
                            {
                                Solution = "调整温度高报上限或降低进站温度";
                                break;
                            }

                        }
                    }
                case "甲烷超下限":
                case "甲烷超上限":
                case "其他组分超上限":
                case "其他组分超下限":
                    {
                        if (description == "甲烷超下限" || description == "甲烷超上限") 
                        {
                            //DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-5);
                            //DateTime endDateTime = dateTime.AddMinutes(-5);
                            //string interval = "00:07:15";
                            DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
                            DateTime endDateTime = dateTime.AddMinutes(-2);
                            string interval = "00:07:13";
                            string duration = Duration(startDateTime, endDateTime);
                            var ConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions(description, collectDataTypeID).FirstOrDefault();
                            List<string> Tags = new List<string>();
                            Tags.Add(_configuration["IFIXNodeName"].ToString() + ":" + stationName + "_" + loopName + "_" + ConfigureCondition.TagAbbrName);
                            List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                            data = GetHistoricalData(startDateTime, interval, duration, Tags);
                            if (data.Count == 0)
                            {
                                Solution = "采集数据异常！无法分析";
                                break;
                            }
                            List<float?> parameters = (List<float?>)data.FirstOrDefault()["TrendDatas"];
                           
                            string Result = CheckParameters(parameters, ConfigureCondition.LowLimit, ConfigureCondition.HighLimit);
                            if (Result == "采样点位不足,无法分析")
                            {
                                Solution = "采样点位不足,无法分析";
                                break;
                            }
                            if (Result == "正常")
                            {
                                Solution = "C1数据正常，无解决方案";
                                break;
                            }
                            else
                            {
                                Solution = "检查色谱更换标准气罐";
                                break;
                            }
                        }
                        else
                        {
                            DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
                            DateTime endDateTime = dateTime.AddMinutes(-2);
                            string interval = "00:07:13";
                            string duration = Duration(startDateTime, endDateTime);
                            var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions(description,3).ToList();
                            List<string> Tags = new List<string>();
                            string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                            ParametersConfigureCondition.ForEach(e => { Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}"); });
                            List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                            data = GetHistoricalData(startDateTime, interval, duration, Tags);
                           
                            Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                            Dictionary<string, string> Result = new Dictionary<string, string>();
                            foreach (var d in data)
                            {
                                parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                            }

                            foreach (var parameter in parameters)
                            {
                                var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                                Result.Add(Condition.TagName, CheckParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                            }

                            foreach (var result in Result)
                            {
                                if (result.Value == "采样点位不足,无法分析")
                                {
                                    Solution = "采样点位不足,无法分析";
                                    break;
                                }
                            }
                            if (Solution == "采样点位不足,无法分析") break;
                            foreach (var result in Result)
                            {
                                if (result.Value == "异常")
                                {
                                    Solution = "检查色谱更换标准气罐";
                                }
                            }
                            if (Solution == "检查色谱更换标准气罐") break;

                            Solution = "数据正常，无解决方案！";
                        }
                        break;
                    }
                case "声道1流速报警":
                case "声道2流速报警":
                case "声道3流速报警":
                case "声道4流速报警":
                case "声道1声速报警":
                case "声道2声速报警":
                case "声道3声速报警":
                case "声道4声速报警":
                case "声道1流速比报警":
                case "声道2流速比报警":
                case "声道3流速比报警":
                case "声道4流速比报警":
                case "声道1声速比报警":
                case "声道2声速比报警":
                case "声道3声速比报警":
                case "声道4声速比报警":
                case "声道1换能器A使用率报警":
                case "声道2换能器A使用率报警":
                case "声道3换能器A使用率报警":
                case "声道4换能器A使用率报警":
                case "声道1换能器B使用率报警":
                case "声道2换能器B使用率报警":
                case "声道3换能器B使用率报警":
                case "声道4换能器B使用率报警":
                case "声道1换能器A增益报警":
                case "声道2换能器A增益报警":
                case "声道3换能器A增益报警":
                case "声道4换能器A增益报警":
                case "声道1换能器B增益报警":
                case "声道2换能器B增益报警":
                case "声道3换能器B增益报警":
                case "声道4换能器B增益报警":
                case "声道1换能器A信号弱":
                case "声道2换能器A信号弱":
                case "声道3换能器A信号弱":
                case "声道4换能器A信号弱":
                case "声道1换能器B信号弱":
                case "声道2换能器B信号弱":
                case "声道3换能器B信号弱":
                case "声道4换能器B信号弱":
                case "声道1换能器A信噪比报警":
                case "声道2换能器A信噪比报警":
                case "声道3换能器A信噪比报警":
                case "声道4换能器A信噪比报警":
                case "声道1换能器B信噪比报警":
                case "声道2换能器B信噪比报警":
                case "声道3换能器B信噪比报警":
                case "声道4换能器B信噪比报警":
                case "声道1指示故障":
                case "声道2指示故障":
                case "声道3指示故障":
                case "声道4指示故障":
                case "正常声道数低":
                case "正常声道数量报警":
                case "声道报警":
                case "声道1信号接收率低报警":
                case "声道2信号接收率低报警":
                case "声道3信号接收率低报警":
                case "声道4信号接收率低报警":
                case "声道1A信号增益报警":
                case "声道1B信号增益报警":
                case "声道2A信号增益报警":
                case "声道2B信号增益报警":
                case "声道3A信号增益报警":
                case "声道3B信号增益报警":
                case "声道4A信号增益报警":
                case "声道4B信号增益报警":
                case "声道1A信噪比低报警":
                case "声道1B信噪比低报警":
                case "声道2A信噪比低报警":
                case "声道2B信噪比低报警":
                case "声道3A信噪比低报警":
                case "声道3B信噪比低报警":
                case "声道4A信噪比低报警":
                case "声道4B信噪比低报警":
                case "声道1声速偏差率高报警":
                case "声道2声速偏差率高报警":
                case "声道3声速偏差率高报警":
                case "声道4声速偏差率高报警":
                    {

                        DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
                        DateTime endDateTime = dateTime.AddMinutes(-2);
                        string interval = "00:01:00";
                        string duration = Duration(startDateTime, endDateTime);
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流量计参数指标报警", collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                        ParametersConfigureCondition.ForEach(e => { if (e.Description != "压力") Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}"); });
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);

                        interval = "00:07:13";
                        Tags.Clear();
                        Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{ParametersConfigureCondition.FirstOrDefault(x => x.Description == "压力")?.TagAbbrName ?? "P_PRESS-INUSE.F_CV"}");
                        var PressureInuse = GetHistoricalData(startDateTime, interval, duration, Tags);
                        PressureInuse.ForEach(e => { data.Add(e); });

                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        Dictionary<string, string> Result = new Dictionary<string, string>();
                        foreach (var d in data)
                        {
                            parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                        }

                        foreach (var parameter in parameters)
                        {
                            var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                            Result.Add(Condition.TagName, CheckFMParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                        }

                        foreach (var result in Result)
                        {
                            if (result.Value == "采样点位不足或通讯有中断情况")
                            {
                                Solution = "采样点位不足或通讯有中断情况";
                                break;
                            }
                        }

                        if (Solution == "采样点位不足或通讯有中断情况") break;

                        var GainAbnormal = Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常"
                            || Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常";
                        var PerformanceAbnormal = Result["Path1Performance"] == "异常" || Result["Path2Performance"] == "异常" ||
                            Result["Path3Performance"] == "异常" || Result["Path4Performance"] == "异常";
                        var SNRAbnormal = Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常" || Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常"
                            || Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常" || Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常";
                        if (GainAbnormal || PerformanceAbnormal || SNRAbnormal)
                        {
                            GainAbnormal = Result["Path4AGain"] == "异常" && Result["Path4BGain"] == "异常";
                            PerformanceAbnormal = Result["Path4Performance"] == "异常";
                            SNRAbnormal = Result["Path2BSNR"] == "异常";
                            var Path1VOSDevRate = parameters.FirstOrDefault(x => x.Key.Contains("Path1VOSDevRate")).Value.Average();
                            var Path2VOSDevRate = parameters.FirstOrDefault(x => x.Key.Contains("Path2VOSDevRate")).Value.Average();
                            var Path3VOSDevRate = parameters.FirstOrDefault(x => x.Key.Contains("Path3VOSDevRate")).Value.Average();
                            var Path4VOSDevRate = parameters.FirstOrDefault(x => x.Key.Contains("Path4VOSDevRate")).Value.Average();
                            var VOSDevRateAbnormal = Path4VOSDevRate > (Path1VOSDevRate + Path2VOSDevRate + Path3VOSDevRate) / 3;
                            if ((GainAbnormal || PerformanceAbnormal || SNRAbnormal) && VOSDevRateAbnormal)
                            {
                                Solution = "检查管道积水、积碳情况";
                                break;
                            }

                            if (Result["SwirlAngle"] == "正常" && Result["ProfileFactor"] == "正常" && Result["Symmetry"] == "正常")
                            {
                                Solution = "排查临近设备噪声干扰";
                                break;
                            }
                            else if (Result["SwirlAngle"] == "异常" && Result["ProfileFactor"] == "异常" && Result["Symmetry"] == "异常")
                            {
                                GainAbnormal = Result["Path1AGain"] == "异常" && Result["Path1BGain"] == "异常" && Result["Path2AGain"] == "异常" && Result["Path2BGain"] == "异常" &&
                                    Result["Path3AGain"] == "异常" && Result["Path3BGain"] == "异常" && Result["Path4AGain"] == "异常" && Result["Path4BGain"] == "异常";
                                PerformanceAbnormal = Result["Path1Performance"] == "异常" && Result["Path2Performance"] == "异常" &&
                                    Result["Path3Performance"] == "异常" && Result["Path4Performance"] == "异常";
                                SNRAbnormal = Result["Path1ASNR"] == "异常" && Result["Path1BSNR"] == "异常" && Result["Path2ASNR"] == "异常" && Result["Path2BSNR"] == "异常"
                                    && Result["Path3ASNR"] == "异常" && Result["Path3BSNR"] == "异常" && Result["Path4ASNR"] == "异常" && Result["Path4BSNR"] == "异常";
                                if (GainAbnormal || PerformanceAbnormal || SNRAbnormal)
                                {
                                    Solution = "检查阀门开度、检查整流器";
                                    break;
                                }
                                else
                                {
                                    Solution = "更换探头";
                                    break;
                                }
                            }
                            else
                            {
                                Solution = "流量计参数指标数据正常，无解决方案";
                                break;
                            }
                        }
                        else
                        {
                            Solution = "流量计参数指标数据正常，无解决方案";
                            break;
                        }
                    }
                case "剖面系数超下下限":
                case "剖面系数超上限":
                case "剖面系数超下限":
                case "剖面系数超上上限":
                case "对称性超上限":
                case "对称性超下限":
                case "对称性超上上限":
                case "对称性超下下限":
                case "交叉流超上限":
                case "交叉流超下限":
                case "交叉流超上上限":
                case "交叉流超下下限":
                case "漩涡角超上限":
                case "漩涡角超下限":
                case "漩涡角超上上限":
                case "漩涡角超下下限":
                    {

                        DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
                        DateTime endDateTime = dateTime.AddMinutes(-2);
                        string interval = "00:01:00";
                        string duration = Duration(startDateTime, endDateTime);
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流场指标报警", collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
                        string IFIXNodeName = _configuration["IFIXNodeName"].ToString();
                        ParametersConfigureCondition.ForEach(e => { Tags.Add($"{IFIXNodeName}:{stationName}_{loopName}_{e.TagAbbrName}"); });
                        data = GetHistoricalData(startDateTime, interval, duration, Tags);

                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        Dictionary<string, string> Result = new Dictionary<string, string>();
                        foreach (var d in data)
                        {
                            parameters.Add(d["Address"].ToString(), (List<float?>)d["TrendDatas"]);
                        }

                        foreach (var parameter in parameters)
                        {
                            var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                            Result.Add(Condition.TagName, CheckFMVOSKeyParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit));
                        }

                        foreach (var result in Result)
                        {
                            if (result.Value == "采样点位不足或通讯有中断情况")
                            {
                                Solution = "采样点位不足或通讯有中断情况";
                                break;
                            }
                        }

                        if (Solution == "采样点位不足或通讯有中断情况") break;

                        if (Result["SwirlAngle"] == "异常" && Result["ProfileFactor"] == "异常" && Result["Symmetry"] == "异常")
                        {
                            var GainAbnormal = Result["Path1AGain"] == "异常" || Result["Path1BGain"] == "异常" || Result["Path2AGain"] == "异常" || Result["Path2BGain"] == "异常"
                            || Result["Path3AGain"] == "异常" || Result["Path3BGain"] == "异常" || Result["Path4AGain"] == "异常" || Result["Path4BGain"] == "异常";
                            var PerformanceAbnormal = Result["Path1Performance"] == "异常" || Result["Path2Performance"] == "异常" ||
                                Result["Path3Performance"] == "异常" || Result["Path4Performance"] == "异常";
                            var SNRAbnormal = Result["Path1ASNR"] == "异常" || Result["Path1BSNR"] == "异常" || Result["Path2ASNR"] == "异常" || Result["Path2BSNR"] == "异常"
                                || Result["Path3ASNR"] == "异常" || Result["Path3BSNR"] == "异常" || Result["Path4ASNR"] == "异常" || Result["Path4BSNR"] == "异常";
                            if (GainAbnormal || PerformanceAbnormal || SNRAbnormal)
                            {
                                GainAbnormal = Result["Path1AGain"] == "异常" && Result["Path1BGain"] == "异常" && Result["Path2AGain"] == "异常" && Result["Path2BGain"] == "异常" &&
                                    Result["Path3AGain"] == "异常" && Result["Path3BGain"] == "异常" && Result["Path4AGain"] == "异常" && Result["Path4BGain"] == "异常";
                                PerformanceAbnormal = Result["Path1Performance"] == "异常" && Result["Path2Performance"] == "异常" &&
                                    Result["Path3Performance"] == "异常" && Result["Path4Performance"] == "异常";
                                SNRAbnormal = Result["Path1ASNR"] == "异常" && Result["Path1BSNR"] == "异常" && Result["Path2ASNR"] == "异常" && Result["Path2BSNR"] == "异常"
                                    && Result["Path3ASNR"] == "异常" && Result["Path3BSNR"] == "异常" && Result["Path4ASNR"] == "异常" && Result["Path4BSNR"] == "异常";
                                if (GainAbnormal || PerformanceAbnormal || SNRAbnormal)
                                {
                                    Solution = "检查前后直管段长度、阀门开度，检查整流器";
                                    break;
                                }
                                else
                                {
                                    Solution = "更换探头";
                                    break;
                                }
                            }
                            else
                            {
                                Solution = "流场指标数据正常，无解决方案";
                                break;
                            }
                        }
                        else
                        {
                            Solution = "流场指标数据正常，无解决方案";
                            break;
                        }
                    }
                case "工况体积流量超上限":
                case "工况体积流量超下限":
                case "标况体积流量超上限":
                case "标况体积流量超下限":
                case "质量流量超上限":
                case "质量流量超下限":
                case "能量流量超上限":
                case "能量流量超下限":
                    {

                        if (description == "工况体积流量超上限" || description == "工况体积流量超下限" || description == "标况体积流量超上限" || description == "标况体积流量超下限" || description == "质量流量超上限" || description == "质量流量超下限" || description == "能量流量超上限" || description == "能量流量超下限")
                        {
                            List<string> Tags = new List<string>();
                            List<string> PressurOrTemperatureTags = new List<string>();
                            var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions("流量超限", collectDataTypeID).ToList();
                            var ParametersCaliber = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditionsForCaliber(stationName, loopName,"DN150");
                            List<KnowledgeBaseParametersConfigureCondition> ParametersConfigureConditionList = new List<KnowledgeBaseParametersConfigureCondition>();
                            List<KnowledgeBaseParametersConfigureCondition> PreTempParametersConfigureConditionList = new List<KnowledgeBaseParametersConfigureCondition>();
                            foreach (KnowledgeBaseParametersConfigureCondition item in ParametersConfigureCondition)
                            {
                                if (item.Description == "工况流量")
                                {
                                    if (item.Caliber == ParametersCaliber)
                                    {
                                        ParametersConfigureConditionList.Add(item);
                                        Tags.Add(_configuration["IFIXNodeName"].ToString() + ":" + stationName + "_" + loopName + "_" + item.TagAbbrName);
                                    }
                                }
                                else
                                {
                                    if (item.Description == "压力" || item.Description == "温度")
                                    {
                                        PreTempParametersConfigureConditionList.Add(item);
                                        PressurOrTemperatureTags.Add(_configuration["IFIXNodeName"].ToString() + ":" + stationName + "_" + loopName + "_" + item.TagAbbrName);
                                    }
                                    else
                                    {
                                        ParametersConfigureConditionList.Add(item);
                                        Tags.Add(_configuration["IFIXNodeName"].ToString() + ":" + stationName + "_" + loopName + "_" + item.TagAbbrName);
                                    }

                                }
                            }
                            List<Dictionary<string, object>> tagDatas = new List<Dictionary<string, object>>();
                            List<Dictionary<string, object>> PressurOrTemperatureTagsDatas = new List<Dictionary<string, object>>();
                            DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
                            DateTime endDateTime = dateTime.AddMinutes(-2);
                            string duration = Duration(startDateTime, endDateTime);
                            PressurOrTemperatureTagsDatas = GetHistoricalData(startDateTime, "00:07:13", duration, PressurOrTemperatureTags);
                            tagDatas = GetHistoricalData(startDateTime, "00:01:00", duration, Tags);
                            Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                            foreach (var tagDat in tagDatas)
                            {
                                parameters.Add(tagDat["Address"].ToString(), (List<float?>)tagDat["TrendDatas"]);
                            }
                            Dictionary<string, List<float?>> PressurOrTemperatureparameters = new Dictionary<string, List<float?>>();
                            foreach (var tagDat in PressurOrTemperatureTagsDatas)
                            {
                                PressurOrTemperatureparameters.Add(tagDat["Address"].ToString(), (List<float?>)tagDat["TrendDatas"]);
                            }
                            Solution = CheckFlowmeterParameters(parameters, PressurOrTemperatureparameters, ParametersConfigureConditionList, PreTempParametersConfigureConditionList);
                        }
                        break;
                    }
                case "声速偏差率超上限":
                case "声速偏差率超下限":
                case "声速偏差率超上上限":
                case "声速偏差率超下下限":
                    {
                        var ParametersConfigureCondition = _alarmRespository.GetAlarmKnowledgeBaseConfigureConditions(description, collectDataTypeID).ToList();
                        List<string> Tags = new List<string>();
                        List<float?> C1s = new List<float?>();
                        List<Dictionary<string, object>> tagDatas = new List<Dictionary<string, object>>();
                        foreach (KnowledgeBaseParametersConfigureCondition item in ParametersConfigureCondition)
                        {
                            Tags.Add(_configuration["IFIXNodeName"].ToString() + ":" + stationName + "_" + loopName + "_" + item.TagAbbrName);
                        }
                        DateTime startDateTime = dateTime.AddHours(-12).AddMinutes(-2);
                        DateTime endDateTime = dateTime.AddMinutes(-2);
                        string duration = Duration(startDateTime, endDateTime);
                        tagDatas = GetHistoricalData(startDateTime, "00:07:13", duration, Tags);
                        Dictionary<string, List<float?>> parameters = new Dictionary<string, List<float?>>();
                        foreach (var tagDat in tagDatas)
                        {
                            parameters.Add(tagDat["Address"].ToString(), (List<float?>)tagDat["TrendDatas"]);
                        }
                        Solution = CheckFCVOSDeviationParameters(parameters, ParametersConfigureCondition);
                        break;
                    }
                case "温度变送器通讯故障":
                case "压力变送器通讯故障":
                case "色谱分析仪器与流量计算机通":
                case "流量计与流量计算机通讯报警":
                    {
                        Solution = "检查中间线路";
                        break;
                    }
            }
            return Solution;
        }

        public static string CheckParameters(List<float?> parameters, double? lowLimit, double? highLimit)
        {
            int abnormalNumber = 0;
            foreach (float? parameter in parameters)
            {
                if (parameter == null)
                {
                    return "采样点位不足,无法分析";
                }
                if (highLimit != null)
                {
                    if (parameter > highLimit)
                        abnormalNumber++;

                }
                if (lowLimit != null)
                {
                    if (parameter < lowLimit)
                        abnormalNumber++;
                }
            }
            if (abnormalNumber > 90)
            {
                return "异常";
            }
            else
            {
                return "正常";
            }
        }

        private string Duration(DateTime startTime, DateTime endTime)
        {
            TimeSpan duration = endTime.Subtract(startTime);
            return duration.Days.ToString() + ":" + duration.Hours.ToString() + ":" + duration.Minutes.ToString() + ":" + duration.Seconds.ToString();
        }

        private List<Dictionary<string, object>> GetHistoricalData(
                                              DateTime startDateTime,
                                              string interval,
                                              string duration,
                                              List<string> tagsAddress
                                              )
        {
           
                List<Dictionary<string, object>> trends = new List<Dictionary<string, object>>();
                //List<string> times = new List<string>();
                foreach (string tagAddress in tagsAddress)
                {
                    Dictionary<string, object> tags = new Dictionary<string, object>();
                    tags["Address"] = tagAddress;
                    trends.Add(tags);
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
                        return new List<Dictionary<string, object>>();
                    }

                    for (int i = 0; i < count; i++)
                    {
                        err = Hda.AddNtf(groupHandle, out tagsHandle[i], tags[i]);
                        if (err != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return "Error adding an NTF";
                            return new List<Dictionary<string, object>>();
                        }
                    }

                    if ((err = Hda.SetStart(groupHandle, startDateTime.ToString("yyyy/MM/dd"), startDateTime.ToString("HH:mm:ss"))) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting start date and time";
                        return new List<Dictionary<string, object>>();
                    }

                    if ((err = Hda.SetInterval(groupHandle, interval)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting interval time";
                        return new List<Dictionary<string, object>>();
                    }

                    if ((err = Hda.SetDuration(groupHandle, duration)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error setting duration time";
                        return new List<Dictionary<string, object>>();
                    }


                    if ((err = Hda.Read(groupHandle, 0)) != FixError.FTK_OK)
                    {
                        Hda.DeleteGroup(groupHandle);
                        //return "Error reading data";
                        return new List<Dictionary<string, object>>();
                    }
                    #endregion

                    for (int i = 0; i < count; i++)
                    {
                        if ((err = Hda.GetNumSamples(groupHandle, tagsHandle[i], out samplesNum[i])) != FixError.FTK_OK)
                        {
                            Hda.DeleteGroup(groupHandle);
                            //return "Error getting number of samples";
                            return new List<Dictionary<string, object>>();
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
                            return new  List<Dictionary<string, object>>();
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
                return trends;
        }
        private static string CheckPressurOrTemperatureOrOther(List<float?> parameters)
        {
            int abnormalNumber = 0;
            for (int i = 0; i < parameters.Count - 1; i++)
            {
                if (parameters[i] == null)
                {
                    return "采样点位不足或通讯有中断情况";
                }
                if ((parameters[i + 1].Value - parameters[i].Value) / parameters[i + 1].Value >= 3)
                    abnormalNumber++;
            }
            if (abnormalNumber > 90)
            {
                return "异常";
            }
            else
            {
                return "正常";
            }
        }

        /// <summary>
        /// 流量超限
        /// </summary>
        /// <returns></returns>
        public static string CheckFlowmeterParameters(Dictionary<string, List<float?>> parameters, Dictionary<string, List<float?>> PressurOrTemperatureparameters, IList<KnowledgeBaseParametersConfigureCondition> ParametersConfigureCondition, IList<KnowledgeBaseParametersConfigureCondition> PreTempParametersConfigureConditionList)
        {
            string CheckPressur = "";
            string Temperature = "";
            foreach (var parameter in parameters)
            {
                var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                if (Condition.Description == "工况流量")
                {
                    string result = CheckFlowLimitParameters(parameter.Value, Condition.LowLimit, Condition.HighLimit);
                    if (result == "异常")
                    {
                        return "多支路运行";
                    }
                    else if (result == "正常")
                    {
                        foreach (var parameterItem in PressurOrTemperatureparameters)
                        {
                            var ConditionPreTemp = PreTempParametersConfigureConditionList.FirstOrDefault(x => parameterItem.Key.Contains(x.TagAbbrName));
                            if (ConditionPreTemp.Description == "压力")
                            {
                                CheckPressur = CheckPressurOrTemperatureOrOther(parameterItem.Value);
                            }
                            if (ConditionPreTemp.Description == "温度")
                            {
                                Temperature = CheckPressurOrTemperatureOrOther(parameterItem.Value);
                            }
                        }
                        if (CheckPressur == "异常" && Temperature == "异常")
                        {
                            return "维修压力变送器，维修温度变送器";
                        }
                        else if (CheckPressur == "异常" && Temperature == "正常")
                        {
                            return "维修压力变送器";
                        }
                        else if (CheckPressur == "正常" && Temperature == "异常")
                        {
                            return "维修温度变送器";
                        }
                        else if (CheckPressur == "采样点位不足或通讯有中断情况" || Temperature == "采样点位不足或通讯有中断情况")
                        {
                            return "维修温度变送器";
                        }
                        else
                        {
                            foreach (var parameterPar in parameters)
                            {
                                var ConditionPara = ParametersConfigureCondition.FirstOrDefault(x => parameterPar.Key.Contains(x.TagAbbrName));
                                if (ConditionPara.Description == "声速偏差率")
                                {
                                    if (parameterPar.Value[49] > 0.2)
                                    {
                                        return "维修/更换流量计";
                                    }
                                }
                            }
                            foreach (var parameterPar in parameters)
                            {
                                var ConditionPara = ParametersConfigureCondition.FirstOrDefault(x => parameterPar.Key.Contains(x.TagAbbrName));
                                if (ConditionPara.Description == "增益" || ConditionPara.Description == "信噪比" || ConditionPara.Description == "声道信号接收率")
                                {
                                    string resultOthers = CheckFlowLimitParameters(parameterPar.Value, ConditionPara.LowLimit, ConditionPara.HighLimit);
                                    if (resultOthers == "异常")
                                    {
                                        return "维修/更换流量计";
                                    }
                                    else if (resultOthers == "正常")
                                    {
                                        return "无方案";
                                    }
                                    else
                                    {
                                        return resultOthers;
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        return result;
                    }
                }
            }
            return "";
        }
        public static string CheckFlowLimitParameters(List<float?> parameters, double? lowLimit, double? highLimit)
        {
            int abnormalNumber = 0;
            foreach (float? parameter in parameters)
            {
                if (parameter == null)
                {
                    return "采样点位不足或通讯有中断情况";
                }
                if (highLimit != null)
                {
                    if (parameter > highLimit)
                        abnormalNumber++;
                }
                if (lowLimit != null)
                {
                    if (parameter < lowLimit)
                        abnormalNumber++;
                }
            }
            if (abnormalNumber >649)
            {
                return "异常";
            }
            else
            {
                return "正常";
            }
        }

        /// <summary>
        /// 流量计参数指标报警
        /// </summary>
        /// <returns></returns>
        public static string CheckFMParameters(List<float?> parameters, double? lowLimit, double? highLimit)
        {
            int abnormalNumber = 0;
            foreach (float? parameter in parameters)
            {
                if (parameter == null)
                {
                    return "采样点位不足或通讯有中断情况";
                }
                if (highLimit != null)
                {
                    if (parameter > highLimit)
                        abnormalNumber++;

                }
                if (lowLimit != null)
                {
                    if (parameter < lowLimit)
                        abnormalNumber++;
                }
            }
            if (abnormalNumber > 649)
            {
                return "异常";
            }
            else
            {
                return "正常";
            }
        }


        /// <summary>
        /// FC声速偏差过大
        /// </summary>
        /// <returns></returns>
        public static string CheckFCVOSDeviationParameters(Dictionary<string, List<float?>> parameters, IList<KnowledgeBaseParametersConfigureCondition> ParametersConfigureCondition)
        {
            string checkPressur = "";
            string checkTemperature = "";
            string checkOther = "";
            foreach (var parameter in parameters)
            {
                var Condition = ParametersConfigureCondition.FirstOrDefault(x => parameter.Key.Contains(x.TagAbbrName));
                switch (Condition.Description)
                {
                    case "压力":
                        checkPressur = CheckPressurOrTemperatureOrOther(parameter.Value);
                        break;
                    case "温度":
                        checkTemperature = CheckPressurOrTemperatureOrOther(parameter.Value);
                        break;
                    default:
                        checkOther = CheckPressurOrTemperatureOrOther(parameter.Value);
                        break;
                }
            }
            if (checkPressur == "异常" && checkTemperature == "正常" && checkOther == "正常")
            {
                return "维修压力变送器";
            }
            else if (checkPressur == "异常" && checkTemperature == "异常" && checkOther == "正常")
            {
                return "维修压力变送器，维修温度变送器";
            }
            else if (checkPressur == "异常" && checkTemperature == "异常" && checkOther == "异常")
            {
                return "维修压力变送器，维修温度变送器，检查色谱更换标准气罐";
            }
            else if (checkPressur == "正常" && checkTemperature == "异常" && checkOther == "正常")
            {
                return "维修温度变送器";
            }
            else if (checkPressur == "正常" && checkTemperature == "异常" && checkOther == "异常")
            {
                return "维修温度变送器，检查色谱更换标准气罐";
            }
            else if (checkPressur == "正常" && checkTemperature == "正常" && checkOther == "异常")
            {
                return "检查色谱更换标准气罐";
            }
            else if (checkPressur == "异常" && checkTemperature == "正常" && checkOther == "异常")
            {
                return "维修压力变送器，检查色谱更换标准气罐";
            }
            else if (checkPressur == "正常" && checkTemperature == "异常" && checkOther == "正常")
            {
                return "维修温度变送器，检查色谱更换标准气罐";
            }
            else if (checkPressur == "正常" && checkTemperature == "正常" && checkOther == "正常")
            {
                return "检查流量计工作状态";
            }
            return "正常";
        }


        /// <summary>
        /// 流场指标报警
        /// </summary>
        /// <returns></returns>
        public static string CheckFMVOSKeyParameters(List<float?> parameters, double? lowLimit, double? highLimit)
        {
            int abnormalNumber = 0;
            foreach (float? parameter in parameters)
            {
                if (parameter == null)
                {
                    return "采样点位不足或通讯有中断情况";
                }
                if (highLimit != null)
                {
                    if (parameter > highLimit)
                        abnormalNumber++;

                }
                if (lowLimit != null)
                {
                    if (parameter < lowLimit)
                        abnormalNumber++;
                }
            }
            if (abnormalNumber > 649)
            {
                return "异常";
            }
            else
            {
                return "正常";
            }
        }
    }
}
