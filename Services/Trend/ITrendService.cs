using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface ITrendService
    {
        public Task<Dictionary<string, object>> GetHistoricalTrendsData(int LoopID,
                                             int TrendGroupID,
                                             DateTime startDateTime,
                                             string interval,
                                             string duration);
        public Task<Dictionary<string, object>> GetHistoricalTrendsData(int LoopID,
                                             int TrendGroupID,
                                             DateTime startDateTime,
                                             DateTime endDateTime,
                                             string bucket,
                                             string measurement,
                                             int interval);
        public Task<IEnumerable<Trend>> GetRealtimeTrend(int loopID, int trendGroupID);
        //public Task<Dictionary<string, object>> GetHistoricalTrendsDataOffice(int LoopID, int TrendGroupID, DateTime startDateTime, DateTime endDateTime, string invterval);

        public Task<Dictionary<string, object>> GetEarlyWarningTrendData(int LoopID,
                                              int configureConditionID,
                                              DateTime startDateTime,
                                              string interval,
                                              string duration);

        public Task<Dictionary<string, object>> GetHistoricalData(
                                               DateTime startDateTime,
                                               string interval,
                                               string duration,
                                               List<Trend> trend
                                               );
    }
}
