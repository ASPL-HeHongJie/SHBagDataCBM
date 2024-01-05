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

namespace CBMMVCOffice.Controllers
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
            return await _alarmService.GetOfficeRealtimeAlarm(condition["AlarmArea"], condition["Priority"]);
        }

        [HttpPost]
        public async Task<FileContentResult> ExportExcelRealtimeAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            IEnumerable<Alarm> list = await _alarmService.GetOfficeRealtimeAlarm(condition["AlarmArea"], condition["Priority"]);
            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\ExcelTempate\实时报警统计表.xlsx");
            string[] columnNames = JsonConvert.DeserializeObject<string[]>(_Configuration["RealtimeAlarmExportColumnNames"]);
            byte[] filecontent = await _excelExportHelper.ExportExcel<Alarm>(list.ToList<Alarm>(), columnNames, templatePath, 2, true);
            return File(filecontent, _excelExportHelper.ExcelContentType, "实时报警统计表.xlsx");
        }

        [HttpPost]
        public async Task<IEnumerable<DiagnosticAlarm>> GetRealtimeDiagnosticAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            
            return await _alarmService.GetOfficeRealtimeDiagnosticAlarm(condition["StationID"], condition["LoopID"]);
        }

        [HttpPost]
        public async Task<FileContentResult> ExportExcelRealtimeDiagnosticAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            IEnumerable<DiagnosticAlarm> list = await _alarmService.GetOfficeRealtimeDiagnosticAlarm(condition["StationID"], condition["LoopID"]);
            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\ExcelTempate\实时诊断报警统计表.xlsx");
            string[] columnNames = JsonConvert.DeserializeObject<string[]>(_Configuration["RealtimeDiagnosticAlarmExportColumnNames"]);
            byte[] filecontent = await _excelExportHelper.ExportExcel<DiagnosticAlarm>(list.ToList<DiagnosticAlarm>(), columnNames, templatePath, 2, true);
            return File(filecontent, _excelExportHelper.ExcelContentType, "实时诊断报警统计表.xlsx");
        }

        [HttpPost]
        public async Task<IEnumerable<Alarm>> GetHistoricalAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            return await _alarmService.GetOfficeHistoricalAlarm(condition["StartDateTime"], condition["EndDateTime"], condition["AlarmArea"]);
        }
        [HttpPost]
        public async Task<FileContentResult> ExportExcelHistoricalAlarm([FromBody]string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            IEnumerable<Alarm> list = await _alarmService.GetOfficeHistoricalAlarm(condition["StartDateTime"], condition["EndDateTime"], condition["AlarmArea"]);
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
    }
}
