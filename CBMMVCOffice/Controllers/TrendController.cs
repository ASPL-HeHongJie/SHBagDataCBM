using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Models;
using Services;

namespace CBMMVC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrendController : ControllerBase
    {
        // GET: api/Trend
        private readonly IPDBService _PDBService;
        private readonly ITrendService _trendService;
        public TrendController(IPDBService PDBService, ITrendService trendService)
        {
            _PDBService = PDBService;
            _trendService = trendService;
        }
        [HttpPost]
        public async Task<Dictionary<string, object>> GetHistoricalTrends([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            int loopID = int.Parse(condition["LoopID"]);
            int trendGroupID = int.Parse(condition["TrendGroupID"]);
            int Interval = int.Parse(condition["Interval"]);
            DateTime startDateTime = DateTime.Parse(condition["StartDateTime"]);
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"]);

            return await _trendService.GetHistoricalTrendsData(loopID, trendGroupID, startDateTime, endDateTime, "CBMDB", "tHistoricalTagData", Interval);
        }
    }
}
