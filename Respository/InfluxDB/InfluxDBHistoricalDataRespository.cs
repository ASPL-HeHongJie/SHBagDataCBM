using Models;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using InfluxDB.Client;

namespace Respository
{
    public class InfluxDBHistoricalDataRespository : IInfluxDBHistoricalDataRespository
    {
        private readonly IConfiguration _configuration;
        public InfluxDBHistoricalDataRespository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<List<InfluxDBData>>> GetHistoricalData(string bucket,
                                                                 DateTime startTime,
                                                                 DateTime endTime,
                                                                 string measurement,
                                                                 int interval,
                                                                 List<Trend> trends)
        {
            string url = _configuration["InfluxDBURL"];
            string token = _configuration["InfluxDBToken"];
            List<List<InfluxDBData>> trendsData = new List<List<InfluxDBData>>();
            using (var client = InfluxDBClientFactory.Create(url, token.ToCharArray()))
            { 
                string queryString = "from(bucket: \"" + bucket + "\") " +
                                     "|> range(start: " + startTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss") + "Z, stop: " + endTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss") + "Z) " +
                                     "|> filter(fn: (r) => r[\"_measurement\"] == \"" + measurement + "\") " +
                                     "|> filter(fn: (r) => r[\"TagName\"] ==\"{0}\") " +
                                     "|> filter(fn: (r) => r[\"_field\"] == \"Value\") " +
                                     "|> aggregateWindow(every: " + interval + "s, fn: last, createEmpty: true) " +
                                     "|> yield(name: \"last\")";
                var queryApi = client.GetQueryApi();
                foreach (Trend trend in trends)
                {
                    string query = string.Format(queryString, trend.Name);
                    List<InfluxDBData> datas = await queryApi.QueryAsync<InfluxDBData>(query, "AlliedSolutions");
                    trendsData.Add(datas);
                }

            }
            return trendsData;
        }
    }
}
