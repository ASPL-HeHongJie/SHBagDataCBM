using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Respository
{
    public class TrendRespository:ITrendRepository
    {
        private readonly SQLServerDBContext _context;
        public TrendRespository(SQLServerDBContext context)
        {
            _context = context;
        }
        public IEnumerable<Trend> GetHistoricalTrend(string IFIXNodeName, int loopID,int trendGroupID)
        {
            string sql = "select [tTrendGroup].Name as GroupName, " +
                         "       [tStation].AbbrName + '_' + [tStationLoop].AbbrName + '_' +[tTrendTag].Name as Name, " +
                         "       N'{0}:' + [tStation].AbbrName + '_' + [tStationLoop].AbbrName + '_' +[tTrendTag].[Address] as Address,   " +
                         "       [tTrendTag].HighLimit,  " +
                         "       [tTrendTag].LowLimit,     " +
                         "       [tTrendTag].Description " +
                         "from[dbo].[tStationLoop] " +
                         "inner join " +
                         "[dbo].[tStation] " +
                         "on " +
                         "[tStationLoop].StationID=[tStation].ID " +
                         "inner join " +
                         "[dbo].[tTrendGroup] " +
                         "on " +
                         "[tStationLoop].CollectDataTypeID  = [tTrendGroup].CollectDataTypeID " +
                         "inner join " +
                         "[dbo].[tTrendTag] " +
                         "on " +
                         "[tTrendGroup].ID=[tTrendTag].TrendGroupID " +
                         "where[tStationLoop].ID= {1}  and[tTrendGroup].ID= {2} " +
                         "order by[tTrendTag].ID ";
            sql = string.Format(sql, IFIXNodeName, loopID.ToString(), trendGroupID.ToString());
            return _context.Trends.FromSqlRaw(sql);
        }
        public IEnumerable<Trend> GetRealtimeTrend( int loopID, int trendGroupID)
        {
            string sql = "select [tTrendGroup].Name as GroupName, " +
                         "       [tStation].AbbrName + '_' + [tStationLoop].AbbrName + '_' +[tTrendTag].Name as Name, " +
                         "       [tStation].AbbrName + '_' + [tStationLoop].AbbrName + '_' +[tTrendTag].[Address] as Address,   " +
                         "       [tTrendTag].HighLimit,  " +
                         "       [tTrendTag].LowLimit,     " +
                         "       [tTrendTag].Description " +
                         "from[dbo].[tStationLoop] " +
                         "inner join " +
                         "[dbo].[tStation] " +
                         "on " +
                         "[tStationLoop].StationID=[tStation].ID " +
                         "inner join " +
                         "[dbo].[tTrendGroup] " +
                         "on " +
                         "[tStationLoop].CollectDataTypeID  = [tTrendGroup].CollectDataTypeID " +
                         "inner join " +
                         "[dbo].[tTrendTag] " +
                         "on " +
                         "[tTrendGroup].ID=[tTrendTag].TrendGroupID " +
                         "where[tStationLoop].ID= {0}  and[tTrendGroup].ID= {1} " +
                         "order by[tTrendTag].ID ";
            sql = string.Format(sql, loopID.ToString(), trendGroupID.ToString());
            return _context.Trends.FromSqlRaw(sql);
        }

        public IEnumerable<EarlyWarningConfigureCondition> GetEarlyWarningTrend(string IFIXNodeName, int loopID, int configureConditionID)
        {
            string sql = @"SELECT [tEarlyWarningConfigureCondition].[ID]
                                ,[LoopID]
                                ,[tEarlyWarningConfigureCondition].[Description]
                                ,[HighLimit]
                                ,[LowLimit]
                                ,[AlarmHighLimit]
                                ,[AlarmLowLimit]
                                , tStation.AbbrName+'_'+tStationLoop.AbbrName+'_'+  [TagName] as TagName
                                , N'{0}:' + tStation.AbbrName+'_'+tStationLoop.AbbrName+'_'+  [TagAbbrName] as TagAbbrName
                            FROM [CBMDB].[dbo].[tEarlyWarningConfigureCondition]
                            inner join
                            tStationLoop
                            on
                            tStationLoop.ID=tEarlyWarningConfigureCondition.LoopID
                            inner join
                            tStation
                            on
                            tStation.ID=tStationLoop.StationID
                            where [tEarlyWarningConfigureCondition].ID={2} and [tEarlyWarningConfigureCondition].LoopID={1}";
            sql = string.Format(sql, IFIXNodeName, loopID.ToString(), configureConditionID.ToString());
            return _context.EarlyWarningConfigureConditions.FromSqlRaw(sql);
        }
    }
}
