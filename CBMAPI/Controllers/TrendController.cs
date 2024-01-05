using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Models;
using Services;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace CBMAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrendController : ControllerBase
    {
        // GET: api/Trend
        private readonly IPDBService _PDBService;
        private readonly ITrendService _trendService;
        private readonly IConfiguration _configuration;
        public TrendController(IPDBService PDBService, ITrendService trendService, IConfiguration configuration)
        {
            _PDBService = PDBService;
            _trendService = trendService;
            _configuration = configuration;
        }
        [HttpPost]
        public async Task<Dictionary<string, object>> GetHistoricalTrends([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            int loopID = int.Parse(condition["LoopID"]);
            int trendGroupID = int.Parse(condition["TrendGroupID"]);
            DateTime startDateTime = DateTime.Parse(condition["StartDateTime"]);
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"]);
            string interval = condition["Interval"];
            string duration = Duration(startDateTime, endDateTime);
            return await _trendService.GetHistoricalTrendsData(loopID, trendGroupID, startDateTime, interval, duration);
        }
        [HttpPost]
        public async Task<List<Dictionary<string, object>>> GetRealtimeTrends([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            int loopID = int.Parse(condition["LoopID"]);
            int trendGroupID = int.Parse(condition["TrendGroupID"]);
            List<Trend> trendsInfo = (await _trendService.GetRealtimeTrend(loopID, trendGroupID)).ToList<Trend>();
            List<Dictionary<string, object>> trends = new List<Dictionary<string, object>>();
            List<string> tagNames = new List<string>();
            foreach (Trend trendInfo in trendsInfo)
            {
                tagNames.Add(trendInfo.Name);
            }
            Dictionary<string, Tag> tags = await _PDBService.GetPDBTags(tagNames);

            foreach (Trend trendInfo in trendsInfo)
            {
                Dictionary<string, object> trend = new Dictionary<string, object>();
                trend["Name"] = trendInfo.Name;
                trend["Address"] = trendInfo.Address;
                trend["HighLimit"] = trendInfo.HighLimit;
                trend["LowLimit"] = trendInfo.LowLimit;
                trend["Description"] = trendInfo.Description;
                trend["Value"] = tags[trendInfo.Name].Quality == "Good" ? tags[trendInfo.Name].Value : null;
                trends.Add(trend);
            }
            return trends;
        }

        private string Duration(DateTime startTime, DateTime endTime)
        {
            TimeSpan duration = endTime.Subtract(startTime);
            return duration.Days.ToString() + ":" + duration.Hours.ToString() + ":" + duration.Minutes.ToString() + ":" + duration.Seconds.ToString();
        }

        [HttpPost]
        public async Task<Dictionary<string, object>> GetEarlyWarningTrend([FromBody] string conditionString)
        {
            Dictionary<string, object> keyValuePairs = new Dictionary<string, object>();
            try
            {
                Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
                int loopID = int.Parse(condition["LoopID"]);
                int configureConditionID = int.Parse(condition["ConfigureConditionID"]);
                DateTime startDateTime = DateTime.Now.AddDays(Convert.ToDouble(_configuration["EarlyWarningTrendDay"]));
                DateTime endDateTime = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["EarlyWarningTrendDelayMinute"]));
                string interval = _configuration["EarlyWarningInterval"];
                string duration = Duration(startDateTime, endDateTime);
                keyValuePairs = await _trendService.GetEarlyWarningTrendData(loopID, configureConditionID, startDateTime, interval, duration);
                return keyValuePairs;
            }
            catch (Exception ex)
            {
                keyValuePairs["Er"] = ex.ToString();
                return keyValuePairs;
            }

        }

       
        //[HttpGet]
        //public async Task<Dictionary<string, object>> GetEarlyWarningTrendTest()
        //{
        //}

        //[HttpPost]
        //public async Task<Dictionary<string, object>> GetEarlyWarningTrendTest()
        //{

        //    int loopID = 23;
        //    int configureConditionID = 17;
        //    DateTime startDateTime = Convert.ToDateTime("2022-8-16 0:0:0");
        //    DateTime endDateTime = Convert.ToDateTime("2022-8-22 9:45:0");
        //    string interval = "01:00:00";
        //    string duration = Duration(startDateTime, endDateTime);
        //    return await _trendService.GetEarlyWarningTrendData(loopID, configureConditionID, startDateTime, interval, duration);
        //}
    }
}
