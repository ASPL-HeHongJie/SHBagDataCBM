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
using System.Drawing;

namespace CBMMVC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EarlyWarningController : ControllerBase
    {
        private readonly IConfiguration _Configuration;
        private readonly IEarlyWarningService _earlyWarningService;
        private readonly IExcelExportHelper _excelExportHelper;
        public EarlyWarningController(IConfiguration configuration, IEarlyWarningService earlyWarningService, IExcelExportHelper excelExportHelper)
        {
            _Configuration = configuration;
            _earlyWarningService = earlyWarningService;
            _excelExportHelper = excelExportHelper;
        }
        [HttpPost]
        public async Task<IEnumerable<EarlyWarning>> GetEarlyWarning([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<int> loopIDs = JsonConvert.DeserializeObject<List<int>>(condition["loopIDs"].ToString());
            List<string> status = JsonConvert.DeserializeObject<List<string>>(condition["status"].ToString());
            return await _earlyWarningService.GetEarlyWarning(loopIDs, status);
        }
        [HttpPost]
        public async Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarningDetail([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            int loopID = Convert.ToInt32(condition["loopID"]);
            return await _earlyWarningService.GetEarlyWarningDetail(loopID);
        }
        [HttpPost]
        public async Task<IEnumerable<EarlyWarningStatistics>> GetEarlyWarningStatistics([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<int> loopIDs = JsonConvert.DeserializeObject<List<int>>(condition["loopIDs"].ToString());
            List<string> status = JsonConvert.DeserializeObject<List<string>>(condition["status"].ToString());
            return await _earlyWarningService.GetEarlyWarningStatistics(loopIDs, status);
        }
        [HttpPost]
        public async Task<IEnumerable<EarlyWarningDetailRecord>> GetEarlyWarningDetailRecords([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<int> loopIDs = JsonConvert.DeserializeObject<List<int>>(condition["loopIDs"].ToString());
            DateTime beginDateTime = DateTime.Parse(condition["BeginDateTime"].ToString());
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"].ToString());
            return await _earlyWarningService.GetEarlyWarningDetailRecords(loopIDs, beginDateTime, endDateTime);
        }
        [HttpPost]
        public async Task<IEnumerable<EarlyWarningDetailRecordStatistics>> GetEarlyWarningDetailRecordStatistics([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<int> loopIDs = JsonConvert.DeserializeObject<List<int>>(condition["loopIDs"].ToString());
            DateTime beginDateTime = DateTime.Parse(condition["BeginDateTime"].ToString());
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"].ToString());
            return await _earlyWarningService.GetEarlyWarningDetailRecordStatistics(loopIDs, beginDateTime, endDateTime);
        }
        [HttpPost]
        public async Task<Dictionary<string, object>> GetEarlyWarningDetailRecordByBrandStatistics([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<int> CompanyIDs = JsonConvert.DeserializeObject<List<int>>(condition["CompanyIDs"].ToString());
            string brand = condition["Brand"].ToString();
            DateTime beginDateTime = DateTime.Parse(condition["BeginDateTime"].ToString());
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"].ToString());
            List<int> collectDataTypeIDs = new List<int>();
            if (brand == "Daniel") collectDataTypeIDs.Add(1);
            if (brand == "Weise") collectDataTypeIDs.Add(3);
            if (brand == "Sick") collectDataTypeIDs.Add(9);
            if (brand == "Elster") { collectDataTypeIDs.Add(2); collectDataTypeIDs.Add(7); collectDataTypeIDs.Add(10); collectDataTypeIDs.Add(12); }
            return await _earlyWarningService.GetEarlyWarningDetailRecordByBrandStatistics(collectDataTypeIDs, beginDateTime, endDateTime, CompanyIDs);
        }
        [HttpPost]
        public async Task<Dictionary<string, object>> GetEarlyWarningNotificationRate([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<string> Brands = JsonConvert.DeserializeObject<List<string>>(condition["Brands"].ToString());
            DateTime beginDateTime = DateTime.Parse(condition["BeginDateTime"].ToString());
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"].ToString());
            List<int> collectDataTypeIDs = new List<int>();
            foreach (string brand in Brands)
            {
                if (brand == "Daniel") collectDataTypeIDs.Add(1);
                if (brand == "Weise") collectDataTypeIDs.Add(3);
                if (brand == "Sick") collectDataTypeIDs.Add(9);
                if (brand == "Elster") { collectDataTypeIDs.Add(2); collectDataTypeIDs.Add(7); collectDataTypeIDs.Add(10); collectDataTypeIDs.Add(12); }

            }
            return await _earlyWarningService.GetEarlyWarningNotificationRate(collectDataTypeIDs, beginDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<FileContentResult> ExportEarlyWarningNotificationRate([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<string> Brands = JsonConvert.DeserializeObject<List<string>>(condition["Brands"].ToString());
            DateTime beginDateTime = DateTime.Parse(condition["BeginDateTime"].ToString());
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"].ToString());
            List<int> collectDataTypeIDs = new List<int>();
            foreach (string brand in Brands)
            {
                if (brand == "Daniel") collectDataTypeIDs.Add(1);
                if (brand == "Weise") collectDataTypeIDs.Add(3);
                if (brand == "Sick") collectDataTypeIDs.Add(9);
                if (brand == "Elster") { collectDataTypeIDs.Add(2); collectDataTypeIDs.Add(7); collectDataTypeIDs.Add(10); collectDataTypeIDs.Add(12); }

            }
            string image = condition["Image"].ToString();
            string imageName = Guid.NewGuid().ToString();
            string imagePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\TempFile\" + imageName + ".png");
            if (image != null)
            {
                byte[] byteArray = Convert.FromBase64String(image);
                MemoryStream memoryStream = new MemoryStream(byteArray);
                Bitmap picture = new Bitmap(memoryStream);
                picture.Save(imagePath, System.Drawing.Imaging.ImageFormat.Png);
                picture.Dispose();
            }
            var data = await _earlyWarningService.GetEarlyWarningNotificationRate(collectDataTypeIDs, beginDateTime, endDateTime);
            List<EarlyWarningNotificationRate> list = (List<EarlyWarningNotificationRate>)data["NotificationRate"];
            List<NotificationRateBrandStatistics> statisticsList = (List<NotificationRateBrandStatistics>)data["notificationRateBrandStatistics"];
            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot\ExcelTempate\预警告知率.xlsx");
            string[] columnNames = JsonConvert.DeserializeObject<string[]>(_Configuration["EarlyWarningNotificationRateExportColumnNames"]);
            byte[] filecontent = await _earlyWarningService.ExportEarlyWarningNotificationRate(list, statisticsList, columnNames, templatePath, imagePath, 8, true);
            return File(filecontent, _excelExportHelper.ExcelContentType, "预警告知率.xlsx");
        }


        [HttpPost]
        public async Task<Dictionary<string, object>> BigDataAnalysisOverview([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            DateTime beginDateTime = DateTime.Parse(condition["BeginDateTime"].ToString());
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"].ToString());

            return await _earlyWarningService.BigDataAnalysisOverview(beginDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<List<HistoricalEarlyWarning>> GetEarlyWarningAccuracys([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<int> loopIDs = JsonConvert.DeserializeObject<List<int>>(condition["loopIDs"].ToString());
            DateTime beginDateTime = DateTime.Parse(condition["BeginDateTime"].ToString());
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"].ToString());
            return await _earlyWarningService.GetEarlyWarningAccuracys(loopIDs, beginDateTime, endDateTime);
        }

        [HttpPost]
        public async Task<string> UpdateEarlyWarningAccuracy([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            int id = JsonConvert.DeserializeObject<int>(condition["ID"].ToString());
            string sceneSolution = condition["SceneSolution"].ToString();
            return await _earlyWarningService.UpdateEarlyWarningAccuracy(id, sceneSolution);
        }

        [HttpPost]
        public async Task<List<EarlyWarningAccuracyStatistics>> GetEarlyWarningAccuracyStatistics([FromBody] string conditionString)
        {
            Dictionary<string, object> condition = JsonConvert.DeserializeObject<Dictionary<string, object>>(conditionString);
            List<int> loopIDs = JsonConvert.DeserializeObject<List<int>>(condition["loopIDs"].ToString());
            DateTime beginDateTime = DateTime.Parse(condition["BeginDateTime"].ToString());
            DateTime endDateTime = DateTime.Parse(condition["EndDateTime"].ToString());
            return await _earlyWarningService.GetEarlyWarningAccuracyStatistics(loopIDs, beginDateTime, endDateTime);
        }
    }
}
