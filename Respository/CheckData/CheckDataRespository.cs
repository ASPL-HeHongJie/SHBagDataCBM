using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Respository
{
    public class CheckDataRespository : ICheckDataRespository
    {
        private readonly SQLServerDBContext _context;
        public CheckDataRespository(SQLServerDBContext context)
        {
            _context = context;
        }

        public IEnumerable<LoopCheckData> GetHistoricalLoopCheckReport(string loopID, string brandName, string startDateTime, string endDateTime)
        {
            string sql = "SELECT [tHistoricalCheckData{0}Loop].[ID] as HisID " +
                        ",[LoopID] " +
                        ",Convert(nvarchar(50),[tHistoricalCheckData{0}Loop].Datetime,120) as [DateTime]  " +
                        ",[tStationLoop].Name as LoopName " +
                        ",[tStation].Name as StationName " +
                        ",N'{0}' as BrandName " +
                        ", tLine.LineName " +
                        ",[tStationLoop].Customer  " +
                        ", tStationLoop.FlowmeterModel " +
                        ",[tCheckDescriptionStatus].Description as CheckDataStatus " +
                        ",Case when [ReportMode]=0 then N'自动' else N'手动' end as ReportMode " +
                        "FROM[dbo].[tHistoricalCheckData{0}Loop] " +
                        "inner join " +
                        "[dbo].[tStationLoop] " +
                        "on " +
                        "[tStationLoop].ID=[tHistoricalCheckData{0}Loop].LoopID " +
                        "inner join " +
                        "[dbo].[tStation] " +
                        "on " +
                        "[tStation].ID=[tStationLoop].StationID " +
                        "inner join " +
                        "tLine " +
                        "on " +
                        "tLine.ID = tStationLoop.LineID " +
                        "inner join " +
                        "[dbo].[tCheckDescriptionStatus] " +
                        "on " +
                        "[tCheckDescriptionStatus].ID=[tHistoricalCheckData{0}Loop].CheckDataStatus " +
                        "where " +
                        "LoopID={1} and " +
                        "[Datetime] >= '{2}' and " +
                        "[Datetime] <= '{3}' " +
                        "order by [DateTime] DESC ";
            sql = string.Format(sql, brandName, loopID, startDateTime, endDateTime);
            return _context.LoopCheckDatas.FromSqlRaw(sql);
        }

        public IEnumerable<LoopCheckData> GetHistoricalFlowrateCheckReport(string loopID, string brandName, string startDateTime, string endDateTime)
        {
            string sql = "SELECT [tHistoricalCheckData{0}FR].[ID] as HisID " +
                        ",[LoopID] " +
                        ",Convert(nvarchar(50),[tHistoricalCheckData{0}FR].Datetime,120) as [DateTime]  " +
                        ",[tStationLoop].Name as LoopName " +
                        ",[tStation].Name as StationName " +
                        ",N'{0}' as BrandName " +
                         ", tLine.LineName " +
                        ",[tStationLoop].Customer  " +
                        ", tStationLoop.FlowmeterModel " +
                        ",[tCheckDescriptionStatus].Description as CheckDataStatus " +
                        ",Case when [ReportMode]=0 then N'自动' else N'手动' end as ReportMode " +
                        "FROM[dbo].[tHistoricalCheckData{0}FR] " +
                        "inner join " +
                        "[dbo].[tStationLoop] " +
                        "on " +
                        "[tStationLoop].ID=[tHistoricalCheckData{0}FR].LoopID " +
                        "inner join " +
                        "[dbo].[tStation] " +
                        "on " +
                        "[tStation].ID=[tStationLoop].StationID " +
                         "inner join " +
                        "tLine " +
                        "on " +
                        "tLine.ID = tStationLoop.LineID " +
                        "inner join " +
                        "[dbo].[tCheckDescriptionStatus] " +
                        "on " +
                        "[tCheckDescriptionStatus].ID=[tHistoricalCheckData{0}FR].CheckDataStatus " +
                        "where " +
                        "LoopID={1} and " +
                        "[Datetime] >= '{2}' and " +
                        "[Datetime] <= '{3}' " +
                        "order by [DateTime] DESC ";
            sql = string.Format(sql, brandName, loopID, startDateTime, endDateTime);
            return _context.LoopCheckDatas.FromSqlRaw(sql);
        }

        public IEnumerable<LoopCheckData> GetHistoricalVOSCheckReport(string loopID, string brandName, string startDateTime, string endDateTime)
        {
            string sql = "SELECT [tHistoricalCheckData{0}VOS].[ID] as HisID " +
                        ",[LoopID] " +
                        ",Convert(nvarchar(50),[tHistoricalCheckData{0}VOS].Datetime,120) as [DateTime]  " +
                        ",[tStationLoop].Name as LoopName " +
                        ",[tStation].Name as StationName " +
                        ",N'{0}' as BrandName " +
                        ", tLine.LineName " +
                        ",[tStationLoop].Customer  " +
                        ", tStationLoop.FlowmeterModel " +
                        ",[tCheckDescriptionStatus].Description as CheckDataStatus " +
                        ",Case when [ReportMode]=0 then N'自动' else N'手动' end as ReportMode " +
                        "FROM[dbo].[tHistoricalCheckData{0}VOS] " +
                        "inner join " +
                        "[dbo].[tStationLoop] " +
                        "on " +
                        "[tStationLoop].ID=[tHistoricalCheckData{0}VOS].LoopID " +
                        "inner join " +
                        "[dbo].[tStation] " +
                        "on " +
                        "[tStation].ID=[tStationLoop].StationID " +
                       "inner join " +
                        "tLine " +
                        "on " +
                        "tLine.ID = tStationLoop.LineID " +
                        "inner join " +
                        "[dbo].[tCheckDescriptionStatus] " +
                        "on " +
                        "[tCheckDescriptionStatus].ID=[tHistoricalCheckData{0}VOS].CheckDataStatus " +
                        "where " +
                        "LoopID={1} and " +
                        "[Datetime] >= '{2}' and " +
                        "[Datetime] <= '{3}' " +
                        "order by [DateTime] DESC ";
            sql = string.Format(sql, brandName, loopID, startDateTime, endDateTime);
            return _context.LoopCheckDatas.FromSqlRaw(sql);
        }

        public IEnumerable<EquipmentCheckData> GetHistoricalGCCheckReport(string equipmentID, string brandName, string startDateTime, string endDateTime)
        {

            string sql = "SELECT [tHistoricalCheckData{0}GC].[ID] as HisID " +
                         "        ,[GCID] as EquipmentID  " +
                         "        ,Convert(nvarchar(50),[tHistoricalCheckData{0}GC].Datetime,120) as [DateTime]  " +
                         "        ,[tStationEquipment].Name as EquipmentName " +
                         "        ,[tStation].Name as StationName " +
                         "        ,N'{0}' as BrandName " +
                         "	      ,[tStationEquipment].Model as EquipmentModel " +
                         "        ,[tCheckDescriptionStatus].Description as CheckDataStatus " +
                         "        ,Case when [ReportMode]=0 then N'自动' else N'手动' end as ReportMode " +
                         "FROM[dbo].[tHistoricalCheckData{0}GC] " +
                         "inner join " +
                         "[dbo].[tStationEquipment] " +
                         "on " +
                         "[tStationEquipment].ID=[tHistoricalCheckData{0}GC].GCID " +
                         "inner join " +
                         "[dbo].[tStation] " +
                         "on " +
                         "[tStation].ID=[tStationEquipment].StationID " +
                         "inner join " +
                         "[dbo].[tCheckDescriptionStatus] " +
                         "on " +
                         "[tCheckDescriptionStatus].ID=[tHistoricalCheckData{0}GC].CheckDataStatus " +
                         "where " +
                         "GCID={1} and " +
                         "[Datetime] >= '{2}' and " +
                         "[Datetime] <= '{3}' " +
                         "order by [DateTime] DESC ";
            sql = string.Format(sql, brandName, equipmentID, startDateTime, endDateTime);
            return _context.EquipmentCheckDatas.FromSqlRaw(sql);
        }

        public IEnumerable<LoopCheckData> GetRealtimeFlowrateCheckReport(string loopID, string brandName)
        {
            string sql = "EXEC [dbo].[pr_GetManualCheckReport] N'{0}', N'{1}',{2} ";
            sql = string.Format(sql, "FR", brandName, loopID);
            return _context.LoopCheckDatas.FromSqlRaw(sql);
        }

        public IEnumerable<LoopCheckData> GetRealtimeVOSCheckReport(string loopID, string brandName)
        {
            string sql = "EXEC [dbo].[pr_GetManualCheckReport] N'{0}', N'{1}',{2} ";
            sql = string.Format(sql, "VOS", brandName, loopID);
            return _context.LoopCheckDatas.FromSqlRaw(sql);
        }

        public IEnumerable<DataItem> GetRealtimeFRCheckData(string loopID, string brandName)
        {
            string sql = "SELECT Name=attribute, Convert(nvarchar(50),convert(numeric(10,2), Value)) as Value " +
                         "from " +
                         "( " +
                         "   SELECT [Pressure] " +
                         "         ,[Temperature] " +
                         "         ,[PathsVOGAverage] " +
                         "         ,[C1] " +
                         "         ,[C2] " +
                         "         ,[C3] " +
                         "         ,[nC4] " +
                         "         ,[iC4] " +
                         "         ,[nC5] " +
                         "         ,[iC5] " +
                         "         ,[NeoC5] " +
                         "         ,[C6] " +
                         "         ,[N2] " +
                         "         ,[CO2] " +
                         "         ,[GrossFlowrate] " +
                         "         ,[StandardFlowrate] " +
                         "         ,[MassFlowrate] " +
                         "         ,[EnergyFlowrate] " +
                         "         ,[CalculatedGrossFlowrate] " +
                         "         ,[CalculatedStandardFlowrate] " +
                         "         ,[CalculatedMassFlowrate] " +
                         "         ,[CalculatedEnergyFlowrate] " +
                         "         ,[GrossFlowrateDeviationRate] " +
                         "         ,[StandardFlowrateDeviationRate] " +
                         "         ,[MassFlowrateDeviationRate] " +
                         "         ,[EnergyFlowrateDeviationRate] " +
                         "FROM[CBMDB].[dbo].[tRealtimeCheckData{0}FR] " +
                         "where ID = {1}  " +
                         ") as tblResults  " +
                         "unpivot  " +
                         "(  " +
                         "   value for attribute in (  [Pressure] " +
                         "                           ,[Temperature] " +
                         "                           ,[PathsVOGAverage] " +
                         "                           ,[C1] " +
                         "                           ,[C2] " +
                         "                             ,[C3] " +
                         "                             ,[nC4] " +
                         "                             ,[iC4] " +
                         "                             ,[nC5] " +
                         "                             ,[iC5] " +
                         "                             ,[NeoC5] " +
                         "                             ,[C6] " +
                         "                             ,[N2] " +
                         "                             ,[CO2] " +
                         "                             ,[GrossFlowrate] " +
                         "                             ,[StandardFlowrate] " +
                         "                             ,[MassFlowrate] " +
                         "                             ,[EnergyFlowrate] " +
                         "                             ,[CalculatedGrossFlowrate] " +
                         "                             ,[CalculatedStandardFlowrate] " +
                         "                             ,[CalculatedMassFlowrate] " +
                         "                             ,[CalculatedEnergyFlowrate] " +
                         "                             ,[GrossFlowrateDeviationRate] " +
                         "                             ,[StandardFlowrateDeviationRate] " +
                         "                             ,[MassFlowrateDeviationRate] " +
                         "                             ,[EnergyFlowrateDeviationRate] " +
                         "                          ) " +
                         ") UPV";
            sql = string.Format(sql, brandName, loopID);
            return _context.FlowrateData.FromSqlRaw(sql);
        }

        public IEnumerable<VOSKeyCheckData> GetVOSKeyCheckData(string loopIDs, string startDateTime, string endDateTime)
        {
            string sql = "EXEC [dbo].[pr_GetVOSKeyCheckDataDetial] '{0}', '{1}', '{2}'";
            sql = string.Format(sql, loopIDs, startDateTime, endDateTime);
            return _context.VOSKeyCheckDatas.FromSqlRaw(sql);
        }

        public IEnumerable<ProductionReport> GetProductionReportData(string loopID, string startDateTime, string endDateTime)
        {

            try
            {
                string sql = "SELECT " +
                             " LEFT(CONVERT(varchar(100), [RptDateTime], 20), Len(CONVERT(varchar(100), [RptDateTime], 20)) - 6) + ' :00:00' AS[ReportDateTime] " +
                             " ,Convert(nvarchar(50), Convert(numeric(18, 2),[GrossFR]))  As[GrossFR] " +
                            " , ( case (SELECT BrandName from tStationDeviceCollectDataType where ID = tStationLoop.CollectDataTypeID) when 'Turbo'then 'N/A' else Convert(nvarchar(50), Convert(numeric(18, 2),[StandardPreHou]))end) As[StandardPreHou] " +
                            "  , ( case (SELECT BrandName from tStationDeviceCollectDataType where ID = tStationLoop.CollectDataTypeID) when 'Turbo'then 'N/A' else Convert(nvarchar(50), Convert(numeric(18, 2),[StandardPreDay]))end) As[StandardPreDay] " +
                             " ,Convert(nvarchar(50), Convert(numeric(18, 0),[StandardTotal])) As[StandardTotal] " +
                             " ,Convert(nvarchar(50), Convert(numeric(18, 4),[HighCalorific])) As[HighCalorific] " +
                             " ,Convert(nvarchar(50), Convert(numeric(18, 4),[LowCalorific])) As[LowCalorific] " +
                             " ,Convert(nvarchar(50), Convert(numeric(18, 0),[EnergyFR])) AS [EnergyFR] " +
                             " ,Convert(nvarchar(50), Convert(numeric(18, 0),[EnergyCurHou])) AS[EnergyCurHou] " +
                             " ,Convert(nvarchar(50), Convert(numeric(18, 0),[EnergyPreHou])) AS[EnergyPreHou] " +
                             "  ,Convert(nvarchar(50), Convert(numeric(18, 0),[EnergyCurDay])) AS[EnergyCurDay] " +
                             "  ,Convert(nvarchar(50), Convert(numeric(18, 0),[EnergyPreDay])) AS[EnergyPreDay] " +
                             "  ,Convert(nvarchar(50), Convert(numeric(18, 0),[EnergyTotal])) AS[EnergyTotal] " +
                             "  ,(SELECT BrandName from tStationDeviceCollectDataType where ID = tStationLoop.CollectDataTypeID) as [Brand] " +
                             "  ,tStationLoop.AbbrName as [LoopName] " +
                             "  ,(SELECT[Name] from tStation where ID = tStationLoop.StationID) as [StationName] " +
                              ", tLine.LineName " +
                             ",[tStationLoop].Customer  " +
                             ", tStationLoop.FlowmeterModel " +
                             " FROM [tHistoricalProductionDailyReport] " +
                             " inner join tStationLoop " +
                             " on " +
                             "  [tHistoricalProductionDailyReport].[LoopID] = tStationLoop.ID " +
                             "inner join " +
                             "tLine " +
                             "on " +
                             "tLine.ID = tStationLoop.LineID " +
                             " where[LoopID] in({0}) " +
                             " and " +
                             " RptDateTime > N'{1}' and RptDateTime< N'{2}' " +
                             " ORDER BY [tHistoricalProductionDailyReport].[LoopID], [tHistoricalProductionDailyReport].[RptDateTime] desc ";
                sql = string.Format(sql, loopID, startDateTime, endDateTime);
                var list = _context.ProductionReports.FromSqlRaw(sql).ToList<ProductionReport>();
                return _context.ProductionReports.FromSqlRaw(sql).ToList<ProductionReport>();
            }
            catch (Exception ex)
            {
                ex.ToString();
                List<ProductionReport> l = new List<ProductionReport>();
                return l;
            }
        }

        public LoopUncertain GetLoopUncertain(string loopID)
        {
            string sql = "SELECT [LoopID] " +
                         "        ,convert(nvarchar(20),[DateTime],120) as [DateTime] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[StandardFlowrateAvg]) else NULL end as [StandardFlowrateAverage] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[StandardFlowrateUncertain]) else NULL end as [StandardFlowrateUncertain] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[MassFlowrateAvg]) else NULL end as [MassFlowrateAverage] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[MassFlowrateUncertain]) else NULL end as [MassFlowrateUncertain] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[EnergyFlowrateAvg]) else NULL end as [EnergyFlowrateAverage] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[EnergyFlowrateUncertain]) else NULL end as [EnergyFlowrateUncertain] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[PressureAvg]) else NULL end as [PressureAverage] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[PressureUncertain]) else NULL end as [PressureUncertain] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[TemperatureAvg]) else NULL end as [TemperatureAverage] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[TemperatureUncertain]) else NULL end as [TemperatureUncertain] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[DensityAvg]) else NULL end as [DensityAverage] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[DensityUncertain]) else NULL end as [DensityUncertain] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[StandardDensityAvg]) else NULL end as [StandardDensityAverage] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[StandardDensityUncertain]) else NULL end as [StandardDensityUncertain] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[CalorificValueAvg]) else NULL end as [CalorificValueAverage] " +
                         "        ,case when [tUncertain].[CheckDataStatus]=0 then Convert(numeric(18,2),[CalorificValueUncertain]) else NULL end as [CalorificValueUncertain] " +
                         "        ,[tCheckDescriptionStatus].Description as [CheckDataStatus] " +
                         "FROM [tUncertain] " +
                         "inner join " +
                         "[tCheckDescriptionStatus] " +
                         "on " +
                         "[tCheckDescriptionStatus].ID=[tUncertain].[CheckDataStatus] " +
                         "where " +
                         "LoopID = {0}";
            sql = string.Format(sql, loopID);
            return _context.LoopUncertains.FromSqlRaw(sql).FirstOrDefault<LoopUncertain>();
        }
    }
}
