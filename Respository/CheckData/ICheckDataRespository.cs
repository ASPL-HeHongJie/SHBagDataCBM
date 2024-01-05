using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Respository
{
    public interface ICheckDataRespository
    {
        public IEnumerable<LoopCheckData> GetHistoricalLoopCheckReport(string loopID, string brandName, string startDateTime, string endDateTime);
        public IEnumerable<LoopCheckData> GetHistoricalFlowrateCheckReport(string loopID, string brandName, string startDateTime, string endDateTime);
        public IEnumerable<LoopCheckData> GetHistoricalVOSCheckReport(string loopID, string brandName, string startDateTime, string endDateTime);
        public IEnumerable<EquipmentCheckData> GetHistoricalGCCheckReport(string equipmentID, string brandName, string startDateTime, string endDateTime);
        public IEnumerable<LoopCheckData> GetRealtimeFlowrateCheckReport(string loopID, string brandName);
        public IEnumerable<LoopCheckData> GetRealtimeVOSCheckReport(string loopID, string brandName);
        public IEnumerable<DataItem> GetRealtimeFRCheckData(string loopID, string brandName);
        public IEnumerable<VOSKeyCheckData> GetVOSKeyCheckData(string loopIDs, string startDateTime, string endDateTime);
        public IEnumerable<ProductionReport> GetProductionReportData(string loopID, string startDateTime, string endDateTime);
        public LoopUncertain GetLoopUncertain(string loopID);
    }
}
