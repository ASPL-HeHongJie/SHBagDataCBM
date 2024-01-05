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

namespace CBMAPI.Controllers
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
        public async Task<IEnumerable<Alarm>> GetRealtimeAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string,string>>(conditionString);
            return await _alarmService.GetRealtimeAlarm(condition["AlarmArea"], condition["Priority"]);
        }

        [HttpPost]
        public async Task<FileContentResult> ExportExcelRealtimeAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            IEnumerable<Alarm> list = await _alarmService.GetRealtimeAlarm(condition["AlarmArea"], condition["Priority"]);
            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\ExcelTempate\实时报警统计表.xlsx");
            string[] columnNames = JsonConvert.DeserializeObject<string[]>(_Configuration["RealtimeAlarmExportColumnNames"]);
            byte[] filecontent = await _excelExportHelper.ExportExcel<Alarm>(list.ToList<Alarm>(), columnNames, templatePath, 2, true);
            return File(filecontent, _excelExportHelper.ExcelContentType, "实时报警统计表.xlsx");
        }

        [HttpPost]
        public async Task<IEnumerable<DiagnosticAlarm>> GetRealtimeDiagnosticAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            
            return await _alarmService.GetRealtimeDiagnosticAlarm(condition["StationID"], condition["LoopID"]);
        }


        [HttpPost]
        public async Task<IEnumerable<HisCheckDataAlarm>> GetHistoricalCheckDataAlarm([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string beginDateTime = condition["BeginDateTime"].ToString();
            string endDateTime = condition["EndDateTime"].ToString();
            return await _alarmService.GetHistoricalCheckDataAlarm(condition["LoopIDs"], beginDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<FileContentResult> ExportExcelRealtimeDiagnosticAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            IEnumerable<DiagnosticAlarm> list = await _alarmService.GetRealtimeDiagnosticAlarm(condition["StationID"], condition["LoopID"]);
            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\ExcelTempate\实时诊断报警统计表.xlsx");
            string[] columnNames = JsonConvert.DeserializeObject<string[]>(_Configuration["RealtimeDiagnosticAlarmExportColumnNames"]);
            byte[] filecontent = await _excelExportHelper.ExportExcel<DiagnosticAlarm>(list.ToList<DiagnosticAlarm>(), columnNames, templatePath, 2, true);
            return File(filecontent, _excelExportHelper.ExcelContentType, "实时诊断报警统计表.xlsx");
        }

        [HttpPost]
        public async Task<IEnumerable<Alarm>> GetHistoricalAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            return await _alarmService.GetHistoricalAlarm(condition["StartDateTime"], condition["EndDateTime"], condition["AlarmArea"]);
        }
        [HttpPost]
        public async Task<FileContentResult> ExportExcelHistoricalAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            IEnumerable<Alarm> list = await _alarmService.GetHistoricalAlarm(condition["StartDateTime"], condition["EndDateTime"], condition["AlarmArea"]);
            string templatePath= Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\ExcelTempate\历史报警统计表.xlsx");
            string[] columnNames = JsonConvert.DeserializeObject<string[]>(_Configuration["HistoricalAlarmExportColumnNames"]);
            byte[] filecontent = await _excelExportHelper.ExportExcel<Alarm>(list.ToList<Alarm>(), columnNames, templatePath, 2, true);
            return File(filecontent, _excelExportHelper.ExcelContentType, "历史报警统计表.xlsx");
        }

        [HttpPost]
        public async Task<IEnumerable<AlarmKPI>> GetHistoricalAlarmKPI([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            return await _alarmService.GetHistoricalAlarmKPI(condition["TopNumber"], condition["SortType"], condition["StartDateTime"], condition["EndDateTime"], condition["AlarmArea"]);
        }
        [HttpPost]
        public async Task<string> GetAlarmKnowledgeBase([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);

            string[] DescriptionArray = condition["AlarmDescription"].Trim().Split('-');
            DateTime startDateTime = DateTime.Parse(condition["StartDateTime"]);
            string[] AlarmTagArray = condition["AlarmTagName"].Trim().Split('_');
            return await _alarmService.GetAlarmKnowledgeBase(DescriptionArray[2], AlarmTagArray[0], AlarmTagArray[1], startDateTime);
        }

     
        //[HttpGet]
        //public async Task<IEnumerable<AlarmKnowledgeBase>> GetAlarmKnowledgeBaseTest()
        //{
        //  //  Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
        //    return await _alarmService.GetAlarmKnowledgeBase("");
        //}
        //[HttpPost]
        //public async Task<IEnumerable<EarlyWarningConfigureCondition>> GetEarlyWarningConfigureCondition([FromBody] string conditionString)
        //{
        //    Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
        //    return await _alarmService.GetEarlyWarningConfigureCondition(Convert.ToInt32(condition["LoopID"]));
        //}

        [HttpPost]
        public async Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarning([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            int a = Convert.ToInt32(condition["LoopID"]);
            return await _alarmService.GetEarlyWarning(Convert.ToInt32(condition["LoopID"]));
        }
    }
}
