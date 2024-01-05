using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IAlarmService
    {
        public Task<IEnumerable<Alarm>> GetRealtimeAlarm(string alarmArea,string priority);
        public Task<IEnumerable<Alarm>> GetOfficeRealtimeAlarm(string alarmArea, string priority);
        public Task<IEnumerable<Alarm>> GetHistoricalAlarm(string startDateTime, string endDateTime, string alarmArea);
        public Task<IEnumerable<Alarm>> GetOfficeHistoricalAlarm(string startDateTime, string endDateTime, string alarmArea);
        public Task<IEnumerable<AlarmKPI>> GetHistoricalAlarmKPI(string topNumber, string sortType, string startDateTime, string endDateTime, string alarmArea);
        public Task<string> GetAlarmKnowledgeBase(string Description, string stationName, string loopName, DateTime startDateTime);
        public Task<IEnumerable<EarlyWarningConfigureCondition>> GetEarlyWarningConfigureCondition(int loopID);
        public Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarning(int loopID);
        public Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarningByAll();
        public Task< Dictionary<string, Dictionary<string, DataItem>>> GetAlarmCountByStation(Station station);
        public Task<IEnumerable<DiagnosticAlarm>> GetRealtimeDiagnosticAlarm(string stationID, string loopID);
        public Task<IEnumerable<HisCheckDataAlarm>> GetHistoricalCheckDataAlarm(string loopIDs, string beginDateTime,string endDateTime);
        public Task<IEnumerable<DiagnosticAlarm>> GetOfficeRealtimeDiagnosticAlarm(string stationID, string loopID);




    }
}
