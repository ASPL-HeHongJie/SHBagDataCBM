using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IEarlyWarningService
    {
        public Task<IEnumerable<EarlyWarning>> GetEarlyWarning(List<int> loopIDs, List<string> status);
        public Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarningDetail(int loopID);
        public Task<IEnumerable<EarlyWarningStatistics>> GetEarlyWarningStatistics(List<int> loopIDs, List<string> status);
        public Task<IEnumerable<EarlyWarningDetailRecord>> GetEarlyWarningDetailRecords(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime);
        public Task<IEnumerable<EarlyWarningDetailRecordStatistics>> GetEarlyWarningDetailRecordStatistics(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime);
        public Task<Dictionary<string, object>> GetEarlyWarningDetailRecordByBrandStatistics(List<int> collectDataTypeIDs, DateTime beginDateTime, DateTime endDateTime, List<int> companyIDs);

        public Task<Dictionary<string, object>> GetEarlyWarningNotificationRate(List<int> collectDataTypeIDs, DateTime beginDateTime, DateTime endDateTime);

        public Task<Dictionary<string, object>> GetEquipmentStatisticAvalability(List<int> CompanyIDs, DateTime beginDateTime, DateTime endDateTime);
        public Task<Dictionary<string, object>> BigDataAnalysisOverview(DateTime beginDateTime, DateTime endDateTime,  List<int> companyIDs);
        public Task<byte[]> ExportEarlyWarningNotificationRate(List<EarlyWarningNotificationRate> notificationRate, List<NotificationRateBrandStatistics> StatisticsList , string[] columnNames, string templatePath, string imagePath, int startRowFrom = 2, bool isShowSlNo = false);

        public Task<List<HistoricalEarlyWarning>> GetEarlyWarningAccuracys(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime);
        public Task<string> UpdateEarlyWarningAccuracy(int id, string sceneSolution);
        public Task<List<EarlyWarningAccuracyStatistics>> GetEarlyWarningAccuracyStatistics(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime);
    }
}
