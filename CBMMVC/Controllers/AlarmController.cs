using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Services;
using Models;
using System.IO;
using Microsoft.Extensions.Hosting;

namespace CBMVC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AlarmController : ControllerBase
    {
        private readonly IConfiguration _Configuration;
        private readonly IAlarmService _alarmService;
        private readonly IExcelExportHelper _excelExportHelper;
        public AlarmController(IAlarmService alarmService,IExcelExportHelper excelExportHelper, IConfiguration configuration)
        {
            _alarmService = alarmService;
            _excelExportHelper = excelExportHelper;
            _Configuration = configuration;
        }

        [HttpPost]
        public async Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarning([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            return await _alarmService.GetEarlyWarning(Convert.ToInt32(condition["LoopID"]));
        }

        [HttpPost]
        public async Task<IEnumerable<HisCheckDataAlarm>> GetHistoricalCheckDataAlarm([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string beginDateTime = condition["BeginDateTime"].ToString();
            string endDateTime = condition["EndDateTime"].ToString();
            return await _alarmService.GetHistoricalCheckDataAlarm(condition["LoopIDs"], beginDateTime, endDateTime);
        }
    }
}
