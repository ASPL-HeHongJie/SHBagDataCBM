using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Models;
using Newtonsoft.Json;
using Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CBMAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CheckDataController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IExcelExportHelper _excelExportHelper;
        private readonly ICheckDataService _checkDataService;

        public CheckDataController(IConfiguration configuration, ICheckDataService checkDataService, IExcelExportHelper excelExportHelper)
        {
            _configuration = configuration;
            _checkDataService = checkDataService;
            _excelExportHelper = excelExportHelper;
        }
        [HttpPost]
        public async Task<IEnumerable<ProductionReport>> CheckDateProductionReport([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopIDs = condition["LoopIDs"];
            string startDateTime = condition["StartDateTime"];
            string endDateTime = condition["EndDateTime"];
            return await _checkDataService.GetProductionReportData(loopIDs, startDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<FileContentResult> ExportExcelCheckDateProductionReport([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopIDs = condition["LoopIDs"];
            string startDateTime = condition["StartDateTime"];
            string endDateTime = condition["EndDateTime"];
            IEnumerable<ProductionReport> ProductionReportlist = await _checkDataService.GetProductionReportData(loopIDs, startDateTime, endDateTime);
            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\ExcelTempate\能量报告.xlsx");
            string[] columnNames = JsonConvert.DeserializeObject<string[]>(_configuration["ProductionReportExportColumnNames"]);
            byte[] filecontent = await _excelExportHelper.ExportExcel<ProductionReport>(ProductionReportlist.ToList<ProductionReport>(), columnNames, templatePath, 2, true);
            return File(filecontent, _excelExportHelper.ExcelContentType, "能量报告.xlsx");
        }


        public string KeepSession()
        {
            return "ok";
        }
    }
}
