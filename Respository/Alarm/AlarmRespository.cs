using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Models;
using System.Linq;

namespace Respository
{
    public class AlarmRespository : IAlarmRespository
    {
        private readonly SQLServerDBContext _context;
        public AlarmRespository(SQLServerDBContext context)
        {
            _context = context;
        }
        public IEnumerable<Alarm> GetRealtimeAlarm(string alarmArea, string priority)
        {
            string Sql = "SELECT convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN] " +
                        "       ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST] " +
                        "       ,RTRIM([ALM_PHYSLNODE]) as [ALM_PHYSLNODE] " +
                        "       ,RTRIM([ALM_TAGNAME]) as [ALM_TAGNAME] " +
                        "       ,RTRIM([ALM_VALUE]) as [ALM_VALUE] " +
                        "       ,RTRIM([ALM_MSGTYPE]) as [ALM_MSGTYPE] " +
                        "       ,RTRIM([ALM_DESCR]) as [ALM_DESCR] " +
                        "       ,RTRIM([ALM_ALMPRIORITY]) as [ALM_ALMPRIORITY] " +
                        "       ,RTRIM([ALM_ALMSTATUS]) as [ALM_ALMSTATUS] " +
                        "       ,RTRIM([ALM_ALMAREA]) as [ALM_ALMAREA] " +
                        "       ,RTRIM([ALM_OPNAME]) as [ALM_OPNAME] " +
                        "       ,RTRIM([ALM_OPFULLNAME]) as [ALM_OPFULLNAME] " +
                        "FROM  [tRealtimeAlarm] " +
                        "where [ALM_ALMAREA] like N'%{0}%' and " +
                         "     [ALM_ALMSTATUS]  Not in ('OK') and " +
                        "      [ALM_ALMPRIORITY] like '%{1}%' " +
                        "order by ALM_NATIVETIMEIN desc, ALM_NATIVETIMELAST desc";
            Sql = string.Format(Sql, alarmArea, priority);
            return _context.Alarms.FromSqlRaw(Sql);
        }

        public IEnumerable<Alarm> GetOfficeRealtimeAlarm(string alarmArea, string priority)
        {
            string Sql = "SELECT convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN] " +
                        "       ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST] " +
                        "       ,RTRIM([ALM_PHYSLNODE]) as [ALM_PHYSLNODE] " +
                        "       ,RTRIM([ALM_TAGNAME]) as [ALM_TAGNAME] " +
                        "       ,RTRIM([ALM_VALUE]) as [ALM_VALUE] " +
                        "       ,RTRIM([ALM_MSGTYPE]) as [ALM_MSGTYPE] " +
                        "       ,RTRIM([ALM_DESCR]) as [ALM_DESCR] " +
                        "       ,RTRIM([ALM_ALMPRIORITY]) as [ALM_ALMPRIORITY] " +
                        "       ,RTRIM([ALM_ALMSTATUS]) as [ALM_ALMSTATUS] " +
                        "       ,RTRIM([ALM_ALMAREA]) as [ALM_ALMAREA] " +
                        "       ,RTRIM([ALM_OPNAME]) as [ALM_OPNAME] " +
                        "       ,RTRIM([ALM_OPFULLNAME]) as [ALM_OPFULLNAME] " +
                        "FROM  [tRealtimeAlarm] " +
                        "where [ALM_ALMAREA] like N'%{0}%' and " +
                         "     [ALM_ALMSTATUS]  Not in ('OK') and " +
                        "      [ALM_ALMPRIORITY] like '%{1}%' and" +
                        "       id in (select max(id) as id from [tRealtimeAlarm] group by [ALM_DESCR])" +
                        "order by ALM_NATIVETIMEIN desc, ALM_NATIVETIMELAST desc";
            Sql = string.Format(Sql, alarmArea, priority);
            return _context.Alarms.FromSqlRaw(Sql);
        }
        public IEnumerable<Alarm> GetHistoricalAlarm(string startDateTime, string endDateTime, string alarmArea)
        {
            string Sql = "SELECT convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN] " +
                        "      ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST] " +
                        "      ,RTRIM([ALM_PHYSLNODE]) as [ALM_PHYSLNODE] " +
                        "      ,RTRIM([ALM_TAGNAME]) as [ALM_TAGNAME] " +
                        "      ,RTRIM([ALM_VALUE]) as [ALM_VALUE] " +
                        "      ,RTRIM([ALM_MSGTYPE]) as [ALM_MSGTYPE] " +
                        "      ,RTRIM([ALM_DESCR]) as [ALM_DESCR] " +
                        "      ,RTRIM([ALM_ALMPRIORITY]) as [ALM_ALMPRIORITY] " +
                        "      ,RTRIM([ALM_ALMSTATUS]) as [ALM_ALMSTATUS] " +
                        "      ,RTRIM([ALM_ALMAREA]) as [ALM_ALMAREA] " +
                        "      ,RTRIM([ALM_OPNAME]) as [ALM_OPNAME] " +
                        "      ,RTRIM([ALM_OPFULLNAME]) as [ALM_OPFULLNAME] " +
                        "FROM tHistoricalAlarm " +
                        "where [ALM_NATIVETIMEIN] > '{0}' and " +
                        "      [ALM_NATIVETIMELAST] < '{1}' and " +
                        "      [ALM_MSGTYPE] like '%ALARM%' and " +
                        "      [ALM_ALMAREA] like N'%{2}%' " +
                        "order by ALM_NATIVETIMEIN desc, ALM_NATIVETIMELAST desc";
            Sql = string.Format(Sql, startDateTime, endDateTime, alarmArea);
            return _context.Alarms.FromSqlRaw(Sql);
        }
        public IEnumerable<Alarm> GetOfficeHistoricalAlarm(string startDateTime, string endDateTime, string alarmArea)
        {
            string Sql = @"SELECT convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN] 
                             ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST] 
                             ,RTRIM([ALM_PHYSLNODE]) as [ALM_PHYSLNODE] 
                             ,RTRIM([ALM_TAGNAME]) as [ALM_TAGNAME] 
                             ,RTRIM([ALM_VALUE]) as [ALM_VALUE] 
                             ,RTRIM([ALM_MSGTYPE]) as [ALM_MSGTYPE] 
                             ,RTRIM([ALM_DESCR]) as [ALM_DESCR] 
                             ,RTRIM([ALM_ALMPRIORITY]) as [ALM_ALMPRIORITY] 
                             ,RTRIM([ALM_ALMSTATUS]) as [ALM_ALMSTATUS] 
                             ,RTRIM([ALM_ALMAREA]) as [ALM_ALMAREA] 
                             ,RTRIM([ALM_OPNAME]) as [ALM_OPNAME] 
                             ,RTRIM([ALM_OPFULLNAME]) as [ALM_OPFULLNAME] 
                       FROM tHistoricalAlarm 
                       where [ALM_NATIVETIMEIN] > '{0}' and 
					         [ALM_NATIVETIMELAST] < '{1}' and 
							 [ALM_ALMAREA] like N'%{2}%' and
                             [ALM_MSGTYPE] like '%ALARM%'  
                       union
					   SELECT convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN] 
                               ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST] 
                               ,RTRIM([ALM_PHYSLNODE]) as [ALM_PHYSLNODE] 
                               ,RTRIM([ALM_TAGNAME]) as [ALM_TAGNAME] 
                               ,RTRIM([ALM_VALUE]) as [ALM_VALUE] 
                               ,RTRIM([ALM_MSGTYPE]) as [ALM_MSGTYPE] 
                               ,RTRIM([ALM_DESCR]) as [ALM_DESCR] 
                               ,RTRIM([ALM_ALMPRIORITY]) as [ALM_ALMPRIORITY] 
                               ,RTRIM([ALM_ALMSTATUS]) as [ALM_ALMSTATUS] 
                               ,RTRIM([ALM_ALMAREA]) as [ALM_ALMAREA] 
                               ,RTRIM([ALM_OPNAME]) as [ALM_OPNAME] 
                               ,RTRIM([ALM_OPFULLNAME]) as [ALM_OPFULLNAME] 
                        FROM  [tRealtimeAlarm] 
                        where [ALM_NATIVETIMEIN] > '{0}' and 
					           [ALM_NATIVETIMELAST] < '{1}' and 
                               [ALM_ALMAREA] like N'%{2}%' and 
                               [ALM_ALMSTATUS]  Not in ('OK') and
                             
							   [ALM_MSGTYPE] like '%ALARM%'";
            //id in (select max(id) as id from [tRealtimeAlarm] group by [ALM_DESCR]) and
            Sql = string.Format(Sql, startDateTime, endDateTime, alarmArea);
            return _context.Alarms.FromSqlRaw(Sql);
        }
        public IEnumerable<AlarmKPI> GetHistoricalAlarmKPI(string topNumber, string sortType, string startDateTime, string endDateTime, string alarmArea)
        {
            string Sql = "select top  {0}  Description, " +
                         "               Status, " +
                         "               Duration as DurationValue, " +
                         "               CAST(CAST(Duration / (60 * 60 * 24) AS INT) AS VARCHAR) + N'天' + " +
                         "               CAST(CAST(Duration % 86400 / 3600 AS INT) AS VARCHAR) + N'小时' + " +
                         "               CAST(CAST(Duration % 3600 / 60 AS INT) AS VARCHAR) + N'分' + " +
                         "               CAST(CAST(Duration % 60 AS INT) AS VARCHAR) + N'秒' as Duration, " +
                         "               AlarmCount " +
                         "from " +
                         "( " +
                         "  SELECT RTRIM([ALM_DESCR]) as Description " +
                         "        ,Sum(datediff(s,[ALM_NATIVETIMEIN],[ALM_NATIVETIMELAST])) as Duration " +
                         "        ,[ALM_ALMSTATUS] as Status " +
                         "        , count(*) as AlarmCount " +
                         "  from " +
                         "  tHistoricalAlarm " +
                         "  where " +
                         "  [ALM_ALMSTATUS] like '%OK%' " +
                         "  AND[ALM_NATIVETIMEIN]>='{1}' " +
                         "  AND[ALM_NATIVETIMELAST]<='{2}' " +
                         "  AND[ALM_ALMAREA] like N'%{3}%' " +
                         "  group by[ALM_DESCR],[ALM_ALMSTATUS] " +
                         ") as tKPI " +
                         "order by {4} desc ";
            Sql = string.Format(Sql, topNumber, startDateTime, endDateTime, alarmArea, sortType);
            return _context.AlarmKPIs.FromSqlRaw(Sql);
        }
        public IEnumerable<AlarmKnowledgeBase> GetAlarmKnowledgeBase(string alarmDescription)
        {
            // "潼关站-5201-声道2声速报警"
            string[] StringArray = alarmDescription.Split('-');
            DataItem dataItem = new DataItem();
            string sql = @"SELECT [tStationLoop].AbbrName  as Name
                            ,tStationDeviceCollectDataType.BrandName as Value   
                             FROM [CBMDB].[dbo].[tStationLoop]
                             inner join
                             tStation
                             on
                             tStationLoop.StationID=tStation.ID
                             inner join
                             tStationDeviceCollectDataType
                             on
                             tStationLoop.CollectDataTypeID=tStationDeviceCollectDataType.ID
                             where tStationLoop.AbbrName ='{0}' and tStation.Name='{1}'";
            sql = string.Format(sql, StringArray[1], StringArray[0]);
            dataItem = _context.DataItems.FromSqlRaw(sql).ToList<DataItem>().FirstOrDefault();

            return _context.AlarmKnowledgeBases.Where(knowledgebase => knowledgebase.Brand == dataItem.Value
                                                                     && knowledgebase.AlarmDescription == StringArray[2]
                                                                     ).OrderBy(knowledgebase => knowledgebase.Priority);
        }

        public IEnumerable<EarlyWarningConfigureCondition> GetEarlyWarningConfigureCondition(int loopID)
        {
            return _context.EarlyWarningConfigureConditions.Where(configureCondition => configureCondition.LoopID == loopID);
        }
        public IEnumerable<EarlyWarningDetail> GetEarlyWarning(int loopID)
        {
            return from detail in _context.earlyWarningDetails.Where(warning => warning.LoopID == loopID)
                   join earlywarning in _context.earlyWarnings
                   on detail.LoopID equals earlywarning.LoopID
                   select new EarlyWarningDetail
                   {
                       ID = detail.ID,
                       LoopID = detail.LoopID,
                       IsWarn = detail.IsWarn,
                       IsRead = detail.IsRead,
                       Description = detail.Description,
                       ConfigureConditionID = detail.ConfigureConditionID,
                       UpdateDateTime = detail.UpdateDateTime,
                       Solution = earlywarning.Solution,
                   };

        }

        public DataItem GetAlarmCountByStation(string alarmArea)
        {
            DataItem dataItem = new DataItem();
            string sql = "DECLARE @Count INT  " +
                          "SELECT @Count = count(*)   FROM[tRealtimeAlarm]  where ALM_MSGTYPE = 'ALARM' and[ALM_ALMSTATUS] not in('OK') and ALM_ALMAREA  like '%{0}%' " +
                          "select '{0}' as Name , Convert(nvarchar(50),@Count) as Value";
            sql = string.Format(sql, alarmArea);
            dataItem = _context.DataItems.FromSqlRaw(sql).ToList<DataItem>().First();
            return dataItem;
        }

        public IEnumerable<DiagnosticAlarm> GetRealtimeDiagnosticAlarm(string stationID, string loopID)
        {

            string Sql = @"";

            if (loopID == "-1")
            {
                Sql = @"SELECT convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN]
                        ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST]
	                    ,[tStationLoop].Name+N' '+[ALM_DESCR] as [ALM_DESCR]
                        ,[ALM_VALUE]
	                    ,convert(nvarchar, round([ALM_CURRENTVALUE], 2)) as [ALM_CURRENTVALUE]
                        ,[ALM_ALMSTATUS]    
                        FROM [tRealtimeDiagnosticAlarm] 
                        inner join 
                        [tStationLoop] 
                        on 
                        [tStationLoop].ID =[tRealtimeDiagnosticAlarm].ALM_LOOPID 
                        where 
                        [ALM_ALMSTATUS]  Not in ('OK') and 
                        tStationLoop.StationID = {0}";
                Sql = string.Format(Sql, stationID);
            }
            else
            {
                Sql = @"SELECT  convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN]
                            ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST]
                            ,[tStationLoop].Name+N' '+[ALM_DESCR] as [ALM_DESCR]
                            ,[ALM_VALUE]
                            ,convert(nvarchar, round([ALM_CURRENTVALUE], 2)) as [ALM_CURRENTVALUE]
                            ,[ALM_ALMSTATUS]     
                          FROM [tRealtimeDiagnosticAlarm] 
                          inner join 
                          [tStationLoop] 
                          on 
                          [tStationLoop].ID =[tRealtimeDiagnosticAlarm].ALM_LOOPID 
                          where 
                          [ALM_ALMSTATUS]  Not in ('OK') and 
                          [tRealtimeDiagnosticAlarm].ALM_LOOPID = {0}";
                Sql = string.Format(Sql, loopID);
            }

            return _context.DiagnosticAlarms.FromSqlRaw(Sql);
        }

        public IEnumerable<HisCheckDataAlarm> GetHistoricalCheckDataAlarm(string loopIDs, string beginDateTime, string endDateTime)
        {
            string Sql = @"SELECT [tHisCheckDataAlarm].ID,
                               [ALM_NATIVETIMEIN]
                              ,[ALM_NATIVETIMELAST]
                              ,tStation.Name+'-'+tStationLoop.AbbrName+'-'+[ALM_VALUE] as [ALM_VALUE]
	                          ,tStation.AbbrName+'_'+tStationLoop.AbbrName+'_'+ALM_TAGNAME as ALM_TAGNAME
                              ,[ALM_DESCR] as [ALM_DESCR]
	                           , convert(nvarchar(50), [ALM_CURRENTVALUE]) as ALM_CURRENTVALUE
                              ,[ALM_ALMSTATUS]
                              ,[ALM_ALMPRIORITY]
                              ,[ALM_LOOPID]
                              ,[ALM_BRAND]
                              ,[ALM_DEVICE]
                          FROM [CBMDB].[dbo].[tHisCheckDataAlarm]
                           inner join 
                           [tStationLoop] 
                           on 
                           [tStationLoop].ID =[tHisCheckDataAlarm].ALM_LOOPID 
                           inner join
                           tStation
                           on
                           tStation.ID=[tStationLoop].StationID 
                           where  [tStationLoop].ID in({0})  and ALM_ALMSTATUS ='ALARM'
                           and ALM_NATIVETIMEIN >'{1}'
                           and ALM_NATIVETIMELAST<'{2}'";
            Sql = string.Format(Sql, loopIDs, beginDateTime, endDateTime);
            return _context.hisCheckDataAlarms.FromSqlRaw(Sql);
        }

        public IEnumerable<DiagnosticAlarm> GetOfficeRealtimeDiagnosticAlarm(string stationID, string loopID)
        {

            string Sql = @"";

            if (loopID == "-1")
            {
                Sql = @"SELECT convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN]
                        ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST]
	                    ,[tStationLoop].Name+N' '+[ALM_DESCR] as [ALM_DESCR]
                        ,[ALM_VALUE]
	                    ,convert(nvarchar, round([ALM_CURRENTVALUE], 2)) as [ALM_CURRENTVALUE]
                        ,[ALM_ALMSTATUS]    
                        FROM [tRealtimeDiagnosticAlarm] 
                        inner join 
                        [tStationLoop] 
                        on 
                        [tStationLoop].ID =[tRealtimeDiagnosticAlarm].ALM_LOOPID 
                        where 
                        [ALM_ALMSTATUS]  Not in ('OK') and 
                        tStationLoop.StationID = {0} and
                          [tRealtimeDiagnosticAlarm].id in (select max([tRealtimeDiagnosticAlarm].id) as id from [tRealtimeDiagnosticAlarm] group by [tRealtimeDiagnosticAlarm].[ALM_DESCR],[tRealtimeDiagnosticAlarm].[ALM_LOOPID])";
                Sql = string.Format(Sql, stationID);
            }
            else
            {
                Sql = @"SELECT  convert(nvarchar(50), [ALM_NATIVETIMEIN],120) as [ALM_NATIVETIMEIN]
                            ,convert(nvarchar(50), [ALM_NATIVETIMELAST],120) as [ALM_NATIVETIMELAST]
                            ,[tStationLoop].Name+N' '+[ALM_DESCR] as [ALM_DESCR]
                            ,[ALM_VALUE]
                            ,convert(nvarchar, round([ALM_CURRENTVALUE], 2)) as [ALM_CURRENTVALUE]
                            ,[ALM_ALMSTATUS]     
                          FROM [tRealtimeDiagnosticAlarm] 
                          inner join 
                          [tStationLoop] 
                          on 
                          [tStationLoop].ID =[tRealtimeDiagnosticAlarm].ALM_LOOPID 
                          where 
                          [ALM_ALMSTATUS]  Not in ('OK') and 
                          [tRealtimeDiagnosticAlarm].ALM_LOOPID = {0} and
                          [tRealtimeDiagnosticAlarm].id in (select max([tRealtimeDiagnosticAlarm].id) as id from [tRealtimeDiagnosticAlarm] group by [tRealtimeDiagnosticAlarm].[ALM_DESCR],[tRealtimeDiagnosticAlarm].[ALM_LOOPID])";
                Sql = string.Format(Sql, loopID);
            }

            return _context.DiagnosticAlarms.FromSqlRaw(Sql);
        }

        public IEnumerable<KnowledgeBaseParametersConfigureCondition> GetAlarmKnowledgeBaseConfigureConditions(string description, int collectDataTypeID)
        {

            return from alarmParametersConfigureCondition in _context.AlsrmKnowledgeBaseParametersConfigureConditions
                   join alarm in _context.AlarmInfos.Where(alarm => alarm.Description == description && alarm.CollectDataTypeID == collectDataTypeID)
                          on alarmParametersConfigureCondition.AlarmID equals alarm.ID

                   join parametersConfigureCondition in _context.KnowledgeBaseParametersConfigureConditions
                   on alarmParametersConfigureCondition.KnowledgeBaseParametersConfigureConditionID equals parametersConfigureCondition.ID
                   select parametersConfigureCondition;
        }

        public IEnumerable<DataItem> GetSameStationOtherLoop(string stationAbbrName, string loopAbbrName)
        {
            List<DataItem> DataItem = new List<DataItem>();

            string Sql = @"select tStationLoop.Name as  Name, tStation.AbbrName+'_'+ tStationLoop.AbbrName as Value from  tStationLoop
                                  inner join
                                  tStation
                                  on
                                  tStationLoop.StationID=tStation.ID
                                  where tStation.AbbrName ='{0}' and tStationLoop.AbbrName !='{1}'";
            Sql = string.Format(Sql, stationAbbrName, loopAbbrName);
            return _context.DataItems.FromSqlRaw(Sql);
        }
        public string GetAlarmKnowledgeBaseConfigureConditionsForCaliber(string abbrStation, string abbrloop, string value)
        {
            string Sql = @"SELECT [tStationLoop].*
                            FROM  [dbo].[tStationLoop] 
                            left join [dbo].[tStation] on [tStationLoop].StationID=[tStation].ID
                            where [tStation].AbbrName='{0}' and [tStationLoop].AbbrName='{1}' ";
            Sql = string.Format(Sql, abbrStation, abbrloop);
            StationLoop stationLoop = _context.StationLoops.FromSqlRaw(Sql).FirstOrDefault();
            string strCaliber = "";
            if (stationLoop == null)
            {
                strCaliber = value;
            }
            else
            {
                strCaliber = stationLoop.Caliber;
            }
            return strCaliber;
        }

        public IEnumerable<EarlyWarningDetail> GetEarlyWarningByAll()
        {
            return _context.earlyWarningDetails;
        }
        public IEnumerable<DataItem> GetBandName(string stationAbbrName, string loopAbbrName)
        {
            string Sql = @"SELECT tStationDeviceCollectDataType.[BrandName] as Name ,
                                 CONVERT(varchar(5),tStationDeviceCollectDataType.ID) as Value
                          FROM tStationLoop  left join tStation on tStationLoop.StationID=tStation.ID 
                               left join  tStationDeviceCollectDataType on tStationDeviceCollectDataType.ID=tStationLoop.CollectDataTypeID
                          where tStation.AbbrName ='{0}' and tStationLoop.AbbrName ='{1}'";
            Sql = string.Format(Sql, stationAbbrName, loopAbbrName);
            return _context.DataItems.FromSqlRaw(Sql);
        }
    }
}
