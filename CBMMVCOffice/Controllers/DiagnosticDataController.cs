using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services;
using Models;

namespace CBMMVCOffice.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DiagnosticDataController : ControllerBase
    {
        private readonly IDiagnosticDataService _diagnosticDataService;
        public DiagnosticDataController(IDiagnosticDataService diagnosticDataService)
        {
            _diagnosticDataService = diagnosticDataService;
        }
        // POST: api/DiagnosticData
        [HttpPost]
        public async Task<IEnumerable<LoopDiagnosticData>> GetLoopDiagnosticDataByStation([FromBody] string stationID)
        {
            return await _diagnosticDataService.GetLoopDiagnosticDataByStation(stationID);
        }

        [HttpPost]
        public async Task<IEnumerable<EquipmentDiagnosticData>> GetEquipmentDiagnosticDataByStation([FromBody] string stationID)
        {
            return await _diagnosticDataService.GetEquipmentDiagnosticDataByStation(stationID);
        }

        [HttpPost]
        public async Task<IEnumerable<DiagnosticDataDetail>> GetFlowMeterDiagnosticDataDetail([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            return await _diagnosticDataService.GetFlowMeterDiagnosticDataDetail(loopID, brandName);
        }
        [HttpPost]
        public async Task<IEnumerable<DiagnosticDataDetail>> GetFlowComputerDiagnosticDataDetail([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            return await _diagnosticDataService.GetFlowComputerDiagnosticDataDetail(loopID, brandName);
        }
        [HttpPost]
        public async Task<IEnumerable<DiagnosticDataDetail>> GetPressureTransmitterDiagnosticDataDetail([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            return await _diagnosticDataService.GetPressureTransmitterDiagnosticDataDetail(loopID, brandName);
        }
        [HttpPost]
        public async Task<IEnumerable<DiagnosticDataDetail>> GetTemperatureTransmitterDiagnosticDataDetail([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            return await _diagnosticDataService.GetTemperatureTransmitterDiagnosticDataDetail(loopID, brandName);
        }
        [HttpPost]
        public async Task<IEnumerable<DiagnosticDataDetail>> GetVOSDiagnosticDataDetail([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string loopID = condition["LoopID"];
            string brandName = condition["BrandName"];
            return await _diagnosticDataService.GetVOSDiagnosticDataDetail(loopID, brandName);
        }

        [HttpPost]
        public async Task<IEnumerable<DiagnosticDataDetail>> GetEquipmentDiagnosticDataDetail([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            string equipmentID = condition["EquipmentID"];
            string equipmentType = condition["EquipmentType"];
            string brandName = condition["BrandName"];
            return await _diagnosticDataService.GetEquipmentDiagnosticDataDetail(equipmentID, equipmentType, brandName);
        }
    }
}
