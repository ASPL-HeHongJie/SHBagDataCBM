using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using Models;

namespace Services
{
    public interface IDiagnosticDataService
    {
        public Task<IEnumerable<LoopDiagnosticData>> GetLoopDiagnosticDataByStation(string stationID);
        public Task<IEnumerable<EquipmentDiagnosticData>> GetEquipmentDiagnosticDataByStation(string stationID);
        public Task<IEnumerable<DiagnosticDataDetail>> GetFlowMeterDiagnosticDataDetail(string loopID, string brandName);
        public Task<IEnumerable<DiagnosticDataDetail>> GetFlowComputerDiagnosticDataDetail(string boopID, string brandName);
        public Task<IEnumerable<DiagnosticDataDetail>> GetPressureTransmitterDiagnosticDataDetail(string loopID, string brandName);
        public Task<IEnumerable<DiagnosticDataDetail>> GetTemperatureTransmitterDiagnosticDataDetail(string loopID, string brandName);
        public Task<IEnumerable<DiagnosticDataDetail>> GetVOSDiagnosticDataDetail(string loopID, string brandName);
        public Task<IEnumerable<DiagnosticDataDetail>> GetEquipmentDiagnosticDataDetail(string equipmentID, string equipmentType, string brandName);
    }
}
