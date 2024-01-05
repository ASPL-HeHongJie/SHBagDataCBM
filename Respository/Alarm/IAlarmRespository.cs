using System;
using System.Collections.Generic;
using System.Text;
using Models;

namespace Respository
{
    public interface IAlarmRespository
    {
        public IEnumerable<Alarm> GetRealtimeAlarm(string alarmArea, string priority);

        public IEnumerable<Alarm> GetOfficeRealtimeAlarm(string alarmArea, string priority);
        public IEnumerable<Alarm> GetHistoricalAlarm(string startDateTime, string endDateTime, string alarmArea);
        public IEnumerable<Alarm> GetOfficeHistoricalAlarm(string startDateTime, string endDateTime, string alarmArea);
        public IEnumerable<AlarmKPI> GetHistoricalAlarmKPI(string topNumber, string sortType, string startDateTime, string endDateTime, string alarmArea);
        public IEnumerable<AlarmKnowledgeBase> GetAlarmKnowledgeBase(string alarmDescription);
        public IEnumerable<EarlyWarningConfigureCondition> GetEarlyWarningConfigureCondition(int loopID);

        public IEnumerable<EarlyWarningDetail> GetEarlyWarning(int loopID);

        public IEnumerable<EarlyWarningDetail> GetEarlyWarningByAll();
        public DataItem GetAlarmCountByStation(string alarmArea);
        public IEnumerable<DiagnosticAlarm> GetRealtimeDiagnosticAlarm(string stationID, string loopID);
        public IEnumerable<HisCheckDataAlarm> GetHistoricalCheckDataAlarm(string loopIDs, string beginDateTime, string endDateTime);
        public IEnumerable<DiagnosticAlarm> GetOfficeRealtimeDiagnosticAlarm(string stationID, string loopID);
        public IEnumerable<KnowledgeBaseParametersConfigureCondition> GetAlarmKnowledgeBaseConfigureConditions(string description, int collectDataTypeID);

        public IEnumerable<DataItem> GetSameStationOtherLoop(string stationAbbrName, string loopAbbrName);
        public string GetAlarmKnowledgeBaseConfigureConditionsForCaliber(string abbrStation, string abbrloop, string value);
        public IEnumerable<DataItem> GetBandName(string stationAbbrName, string loopAbbrName);
        
    }
}
