using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Respository
{
    public interface IDiagnosticDataRespository
    {
        public IEnumerable<LoopDiagnosticData> GetLoopDiagnosticDataByStation(string stationID);
        public IEnumerable<EquipmentDiagnosticData> GetEquipmentDiagnosticDataByStation(string stationID);
        //public IEnumerable<LoopDiagnositcData> GetEquipmentDiagnosticDataByStation(string stationName);
        public IEnumerable<DiagnosticDataDetail> GetFlowMeterDiagnosticDataDetail(string LoopID,string BrandName);
        public IEnumerable<DiagnosticDataDetail> GetFlowComputerDiagnosticDataDetail(string LoopID, string BrandName);
        public IEnumerable<DiagnosticDataDetail> GetPressureTransmitterDiagnosticDataDetail(string LoopID, string BrandName);
        public IEnumerable<DiagnosticDataDetail> GetTemperatureTransmitterDiagnosticDataDetail(string LoopID, string BrandName);
        public IEnumerable<DiagnosticDataDetail> GetVOSDiagnosticDataDetail(string LoopID, string BrandName);
        public IEnumerable<DiagnosticDataDetail> GetEquipmentDiagnosticDataDetail(string equipmentID, string equipmentType, string brandName);
    }
}
