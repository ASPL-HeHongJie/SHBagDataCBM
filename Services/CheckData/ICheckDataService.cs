using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface ICheckDataService
    {
        public Task<IEnumerable<LoopCheckData>> GetHistoricalLoopCheckReport(string loopID, string brandName, string startDateTime, string endDateTime);
        public Task<IEnumerable<LoopCheckData>> GetHistoricalFlowrateCheckReport(string loopID, string brandName, string startDateTime, string endDateTime);
        public Task<IEnumerable<LoopCheckData>> GetHistoricalVOSCheckReport(string loopID, string brandName, string startDateTime, string endDateTime);
        public Task<IEnumerable<EquipmentCheckData>> GetHistoricalGCCheckReport(string equipmentID, string brandName, string startDateTime, string endDateTime);
        public Task<IEnumerable<LoopCheckData>> GetRealtimeFlowrateCheckReport(string loopID, string brandName);
        public Task<IEnumerable<LoopCheckData>> GetRealtimeVOSCheckReport(string loopID, string brandName);
        public Task<IEnumerable<DataItem>> GetRealtimeFRCheckData(string loopID, string brandName);
        public Task<IEnumerable<ProductionReport>> GetProductionReportData(string loopID, string startDateTime, string endDateTime);
        public Task<IEnumerable<VOSKeyCheckData>> GetVOSKeyCheckData(string loopIDs, string startDateTime, string endDateTime);
        public Task<byte[]> ExportVOSKeyCheckData(List<VOSKeyCheckData> VOSKeyCheckDatas, string templatePath);
        public Task<LoopUncertain> GetLoopUncertain(string loopID);
    }
}
