using System;
using System.Collections.Generic;
using System.Text;
using Models;

namespace Respository
{
    public interface IEarlyWarningRespository
    {
        public IEnumerable<EarlyWarning> GetEarlyWarning(List<int> loopIDs, List<string> status);
        public IEnumerable<EarlyWarningDetail> GetEarlyWarningDetail(int loopID);
        public IEnumerable<EarlyWarningStatistics> GetEarlyWarningStatistics(List<int> loopIDs, List<string> status);
        public IEnumerable<EarlyWarningDetailRecord> GetEarlyWarningDetailRecords(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime);
        public Dictionary<string, object> GetEarlyWarningDetailRecordStatistics(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime);
        public Dictionary<string, object> GetEarlyWarningDetailRecordByBrandStatistics(List<int> collectDataTypeIDs, DateTime beginDateTime, DateTime endDateTime, List<int> companyIDs);
        public Dictionary<string, object> GetEarlyWarningNotificationRate(List<int> collectDataTypeIDs, DateTime beginDateTime, DateTime endDateTime);
        public Dictionary<string, object> BigDataAnalysisOverview( DateTime beginDateTime, DateTime endDateTime, List<int> companyIDs);
        public Dictionary<string, object> NotificationRateOverview(DateTime beginDateTime, DateTime endDateTime, List<int> companyIDs);
        public Dictionary<string, object> GetEquipmentStatisticAvalability(List<int> CompanyIDs, DateTime beginDateTime, DateTime endDateTime);
        public List<HistoricalEarlyWarning> GetEarlyWarningAccuracys(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime);
        public string UpdateEarlyWarningAccuracy(int id, string sceneSolution);
        public List<EarlyWarningAccuracyStatistics> GetEarlyWarningAccuracyStatistics(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime);
    }
}
