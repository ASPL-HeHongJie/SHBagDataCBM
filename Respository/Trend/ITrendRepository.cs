using System;
using System.Collections.Generic;
using System.Text;
using Models;

namespace Respository
{
    public interface ITrendRepository
    {
        public IEnumerable<Trend> GetHistoricalTrend(string IFIXNodeName, int loopID, int trendGroupID);
        public IEnumerable<Trend> GetRealtimeTrend(int loopID, int trendGroupID);
        public IEnumerable<EarlyWarningConfigureCondition> GetEarlyWarningTrend(string IFIXNodeName, int loopID, int configureConditionID);
    }
}
