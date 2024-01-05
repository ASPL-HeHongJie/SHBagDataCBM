using Models;
using Respository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class DiagnosticDataService : IDiagnosticDataService
    {
        private readonly IDiagnosticDataRespository _diagnosticDataRespository;
        public DiagnosticDataService(IDiagnosticDataRespository diagnosticDataRespository)
        {
            _diagnosticDataRespository = diagnosticDataRespository;
        }
        public Task<IEnumerable<LoopDiagnosticData>> GetLoopDiagnosticDataByStation(string stationID)
        {
            return Task.Run(() => _diagnosticDataRespository.GetLoopDiagnosticDataByStation(stationID));
        }

        public Task<IEnumerable<EquipmentDiagnosticData>> GetEquipmentDiagnosticDataByStation(string stationID)
        {
            return Task.Run(() => _diagnosticDataRespository.GetEquipmentDiagnosticDataByStation(stationID));
        }

        public Task<IEnumerable<DiagnosticDataDetail>> GetFlowMeterDiagnosticDataDetail(string loopID, string brandName)
        {
            return Task.Run(() => _diagnosticDataRespository.GetFlowMeterDiagnosticDataDetail(loopID, brandName));
        }
        public Task<IEnumerable<DiagnosticDataDetail>> GetFlowComputerDiagnosticDataDetail(string loopID, string brandName)
        {
            return Task.Run(() => _diagnosticDataRespository.GetFlowComputerDiagnosticDataDetail(loopID, brandName));
        }
        public Task<IEnumerable<DiagnosticDataDetail>> GetPressureTransmitterDiagnosticDataDetail(string loopID, string brandName)
        {
            return Task.Run(() => _diagnosticDataRespository.GetPressureTransmitterDiagnosticDataDetail(loopID, brandName));
        }
        public Task<IEnumerable<DiagnosticDataDetail>> GetTemperatureTransmitterDiagnosticDataDetail(string loopID, string brandName)
        {
            return Task.Run(() => _diagnosticDataRespository.GetTemperatureTransmitterDiagnosticDataDetail(loopID, brandName));
        }
        public Task<IEnumerable<DiagnosticDataDetail>> GetVOSDiagnosticDataDetail(string loopID, string brandName)
        {
            return Task.Run(() => _diagnosticDataRespository.GetVOSDiagnosticDataDetail(loopID, brandName));
        }
        public Task<IEnumerable<DiagnosticDataDetail>> GetEquipmentDiagnosticDataDetail(string equipmentID, string equipmentType, string brandName)
        {
            return Task.Run(() => _diagnosticDataRespository.GetEquipmentDiagnosticDataDetail(equipmentID, equipmentType, brandName));
        }
    }
}
