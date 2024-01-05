using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Newtonsoft.Json;

namespace CBMMVCOffice.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StationController : ControllerBase
    {
        private readonly IPDBService _PDBService;
        private readonly IDiagnosticDataService _diagnosticDataService;
        private readonly IAlarmService _alarmService;
        public StationController(IPDBService PDBService, IDiagnosticDataService diagnosticDataService, IAlarmService alarmService)
        {
            _PDBService = PDBService;
            _diagnosticDataService = diagnosticDataService;
            _alarmService = alarmService;
        }

        //[HttpPost]
        //public async Task<Dictionary<string, Tag>> GetTags(List<string> tagNames)
        //{
        //    return await _PDBService.GetPDBTags(tagNames);
        //}

        //[HttpPost]
        //public async Task<Dictionary<string, Dictionary<string, Dictionary<string, Tag>>>> GetStationInfo(Station station)
        //{
        //    return await _PDBService.GetPDBTagsByStation(station);
        //}
        //[HttpPost]
        //public async Task<Dictionary<string, object>> GetStationData([FromBody]string conditionString)
        //{
        //    Station station = JsonConvert.DeserializeObject<Station>(conditionString);
        //    Dictionary<string, object> stationData = new Dictionary<string, object>();
        //    Dictionary<string, object> diagnosticData = new Dictionary<string, object>();

        //    Dictionary<string, Dictionary<string, Dictionary<string, Tag>>> data = await _PDBService.GetPDBTagsByStation(station);
        //    IEnumerable<LoopDiagnosticData> loopDiagnosticData = await _diagnosticDataService.GetLoopDiagnosticDataByStation(station.ID.ToString());
        //    IEnumerable<EquipmentDiagnosticData> equipmentDiagnosticData = await _diagnosticDataService.GetEquipmentDiagnosticDataByStation(station.ID.ToString());
        //    diagnosticData["LoopDiagnosticData"] = loopDiagnosticData.ToList();
        //    diagnosticData["EquipmentDiagnosticData"] = equipmentDiagnosticData.ToList();
        //    stationData["Data"] = data;
        //    stationData["DiagnosticData"] = diagnosticData;
        //    stationData["AlarmCount"] = await _alarmService.GetAlarmCountByStation(station);
        //    return stationData;
        //}
        [HttpPost]
        public async Task<Dictionary<string, object>> GetStationData([FromBody]string conditionString)
        {
            Station station = JsonConvert.DeserializeObject<Station>(conditionString);
            Dictionary<string, object> Data = new Dictionary<string, object>();
            Dictionary<string, object> loopDatas = new Dictionary<string, object>();
            Dictionary<string, object> loopData = new Dictionary<string, object>();
            Dictionary<string, object> equipmentData = new Dictionary<string, object>();
            Dictionary<string, object> equipmentDatas = new Dictionary<string, object>();
            Dictionary<string, object> stationData = new Dictionary<string, object>();
            Dictionary<string, Dictionary<string, DataItem>> alarms = await _alarmService.GetAlarmCountByStation(station);
            IEnumerable<Tag> stationTags = await _PDBService.GetTagsByStationOffice(station);
            IEnumerable<LoopDiagnosticData> loopDiagnosticData = await _diagnosticDataService.GetLoopDiagnosticDataByStation(station.ID.ToString());
            IEnumerable<EquipmentDiagnosticData> equipmentDiagnosticData = await _diagnosticDataService.GetEquipmentDiagnosticDataByStation(station.ID.ToString());

            foreach (Loop loop in station.Loops)
            {
                loopData = new Dictionary<string, object>();
                loopData["Loop"] = stationTags.ToList<Tag>().FindAll(tag => tag.Name.Split('_')[1] == loop.AbbrName).ToDictionary(key => key.Name, value => value);
                loopData["Diagnostic"] = loopDiagnosticData.ToList<LoopDiagnosticData>().Find(x => x.Name == loop.AbbrName);
                loopData["AlarmCount"] = alarms[loop.AbbrName];
                loopDatas[loop.AbbrName] = loopData;
            }
            foreach (Equipment equipment in station.Equipments)
            {
                equipmentData = new Dictionary<string, object>();
                equipmentData["Equipment"] = stationTags.ToList<Tag>().FindAll(tag => tag.Name.Split('_')[1] == equipment.AbbrName).ToDictionary(key => key.Name, value => value);
                equipmentData["Diagnostic"] = equipmentDiagnosticData.ToList<EquipmentDiagnosticData>().Find(x => x.Name == equipment.AbbrName);
                equipmentData["AlarmCount"] = alarms[equipment.AbbrName];
                equipmentDatas[equipment.AbbrName] = equipmentData;
            }
            stationData["LoopDatas"] = loopDatas;
            stationData["EquipmentDatas"] = equipmentDatas;
            Data["Data"] = stationData;
            return Data;
        }

        [HttpPost]
        public string CCC()
        {
            return "CCC";
        }

    }
}
