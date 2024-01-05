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

namespace CBMMVC.Controllers
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

        [HttpPost]
        public async Task<IEnumerable<LoopCheckData>> GetHistoricalLoopCheckReport([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            string startDateTime = condition["StartDateTime"];
            string endDateTime = condition["EndDateTime"];
            return await _checkDataService.GetHistoricalLoopCheckReport(loopID, brandName, startDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<IEnumerable<LoopCheckData>> GetHistoricalFlowrateCheckReport([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            string startDateTime = condition["StartDateTime"];
            string endDateTime = condition["EndDateTime"];
            return await _checkDataService.GetHistoricalFlowrateCheckReport(loopID, brandName, startDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<IEnumerable<LoopCheckData>> GetHistoricalVOSCheckReport([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            string startDateTime = condition["StartDateTime"];
            string endDateTime = condition["EndDateTime"];
            return await _checkDataService.GetHistoricalVOSCheckReport(loopID, brandName, startDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<IEnumerable<EquipmentCheckData>> GetHistoricalGCCheckReport([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string equipmentID = condition["EquipmentID"];
            string brandName = condition["BrandName"];
            string startDateTime = condition["StartDateTime"];
            string endDateTime = condition["EndDateTime"];
            return await _checkDataService.GetHistoricalGCCheckReport(equipmentID, brandName, startDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<Dictionary<string, object>> GetManualCheckData([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            Dictionary<string, object> data = new Dictionary<string, object>();
            IEnumerable<LoopCheckData> frCheckData = await _checkDataService.GetRealtimeFlowrateCheckReport(loopID, brandName);
            IEnumerable<LoopCheckData> vosCheckData = await _checkDataService.GetRealtimeVOSCheckReport(loopID, brandName);
            IEnumerable<DataItem> frCheckDataDetail = await _checkDataService.GetRealtimeFRCheckData(loopID, brandName);
            data["FRCheckData"] = frCheckData.ToList();
            data["VOSCheckData"] = vosCheckData.ToList();
            data["FRCheckDataDetail"] = frCheckDataDetail.ToList().ToDictionary(key => key.Name, value => value);
            return data;
        }

        [HttpPost]
        public async Task<IEnumerable<VOSKeyCheckData>> GetVOSKeyCheckData([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopIDs = condition["LoopIDs"];
            string startDateTime = condition["StartDateTime"];
            string endDateTime = condition["EndDateTime"];
            return await _checkDataService.GetVOSKeyCheckData(loopIDs, startDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<FileContentResult> ExportExcelVOSKeyCheckData([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopIDs = condition["LoopIDs"];
            string startDateTime = condition["StartDateTime"];
            string endDateTime = condition["EndDateTime"];
            IEnumerable<VOSKeyCheckData> list = await _checkDataService.GetVOSKeyCheckData(loopIDs, startDateTime, endDateTime);
            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\ExcelTempate\声速核查重要参数统计表.xlsx");
            string[] columnNames = JsonConvert.DeserializeObject<string[]>(_configuration["VOSKeyCheckDataExportColumnNames"]);
            byte[] filecontent = await _excelExportHelper.ExportExcel<VOSKeyCheckData>(list.ToList<VOSKeyCheckData>(), columnNames, templatePath, 2, true);
            return File(filecontent, _excelExportHelper.ExcelContentType, "声速核查重要参数统计表.xlsx");
        }

        [HttpPost]
        public async Task<LoopUncertain> GetLoopUncertain([FromBody] string loopID)
        {
            return await _checkDataService.GetLoopUncertain(loopID);
        }
    }
}
