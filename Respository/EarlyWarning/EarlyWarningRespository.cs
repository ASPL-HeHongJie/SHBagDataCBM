using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Models;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Respository
{
    public class EarlyWarningRespository : IEarlyWarningRespository
    {
        private readonly SQLServerDBContext _context;
        private readonly IConfiguration _configuration;

        public EarlyWarningRespository(SQLServerDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public IEnumerable<EarlyWarning> GetEarlyWarning(List<int> loopIDs, List<string> status)
        {
            return (from warning in _context.EarlyWarnings.Where(warning => loopIDs.Contains(warning.LoopID) && status.Contains(warning.Status))
                    join loop in _context.StationLoops
                    on warning.LoopID equals loop.ID
                    join station in _context.StationInfos
                    on loop.StationID equals station.ID
                    join area in _context.Areas
                    on station.AreaID equals area.ID
                    join company in _context.CompanyInfos
                    on area.CompanyID equals company.ID
                    join loopGasTransmission in _context.LoopGasTransmissionCapacities
                    on loop.ID equals loopGasTransmission.LoopID into matches
                    from loopGasTransmission in matches.DefaultIfEmpty()
                    select new EarlyWarning
                    {
                        ID = warning.ID,
                        LoopID = warning.LoopID,
                        Status = warning.Status == "流量计存在预警" ? "存在预警" : (warning.Status == "流量计运行正常" ? "运行正常" : "通讯失败"),
                        StatusNumber = warning.Status == "流量计存在预警" ? 1 : (warning.Status == "流量计运行正常" ? 2 : 3),
                        Solution = warning.Solution,
                        StationName = station.Name,
                        LoopName = loop.AbbrName,
                        AreaName = area.Name,
                        CompanyName = company.Name,
                        DateTime = warning.DateTime,
                        FlowmeterManufacturer = loop.FlowmeterManufacturer,
                        ForwordPreDayStandardCumulative = loopGasTransmission == null ? 0 : loopGasTransmission.ForwordPreDayStandardCumulative,
                        EarlyWarningParameterDetail = string.Join("、", _context.earlyWarningDetails.Where(detail => detail.LoopID == warning.LoopID && detail.IsWarn == true).Select(detail => detail.Description))
                    }).ToList().OrderByDescending(warning => warning.ForwordPreDayStandardCumulative).ThenBy(warning => warning.StatusNumber);
        }

        public IEnumerable<EarlyWarningDetail> GetEarlyWarningDetail(int loopID)
        {
            return _context.earlyWarningDetails.Where(detail => detail.LoopID == loopID);
        }

        public IEnumerable<EarlyWarningStatistics> GetEarlyWarningStatistics(List<int> loopIDs, List<string> status)
        {
            return from warning in _context.EarlyWarnings.Where(warning => loopIDs.Contains(warning.LoopID) && status.Contains(warning.Status))
                   group warning by warning.Status into warningGroup
                   select new EarlyWarningStatistics
                   {
                       Status = warningGroup.Key,
                       Number = warningGroup.Count()
                   };
        }
        public IEnumerable<EarlyWarningDetailRecord> GetEarlyWarningDetailRecords(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            return from record in _context.EarlyWarningDetailRecords.Where(warning => loopIDs.Contains(warning.LoopID)
                                      && DateTime.Compare(warning.BeginDate, beginDateTime) >= 0
                                      && DateTime.Compare(warning.EndDate, endDateTime) <= 0)
                   join loop in _context.StationLoops
                   on record.LoopID equals loop.ID
                   join station in _context.StationInfos
                   on loop.StationID equals station.ID
                   join area in _context.Areas
                   on station.AreaID equals area.ID
                   join company in _context.CompanyInfos
                   on area.CompanyID equals company.ID
                   join loopGasTransmission in _context.LoopGasTransmissionCapacities
                   on loop.ID equals loopGasTransmission.LoopID into matches
                   from loopGasTransmission in matches.DefaultIfEmpty()
                   select new EarlyWarningDetailRecord
                   {
                       ID = record.ID,
                       LoopID = record.LoopID,
                       Description = record.Description,
                       BeginDate = record.BeginDate,
                       EndDate = record.EndDate,
                       StationName = station.Name,
                       LoopName = loop.AbbrName,
                       AreaName = area.Name,
                       CompanyName = company.Name,
                       Caliber = loop.Caliber,
                       FlowmeterManufacturer = loop.FlowmeterManufacturer,
                       ForwordPreDayStandardCumulative = loopGasTransmission == null ? 0 : loopGasTransmission.ForwordPreDayStandardCumulative
                   };
        }

        public IEnumerable<EarlyWarningDetailRecordStatistics> GetEarlyWarningDetailRecordStatistics(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            var records = from record in _context.EarlyWarningDetailRecords.Where(record => loopIDs.Contains(record.LoopID)
                                     && DateTime.Compare(record.BeginDate, beginDateTime) >= 0
                                     && DateTime.Compare(record.EndDate, endDateTime) <= 0)
                          join loop in _context.StationLoops
                          on record.LoopID equals loop.ID
                          join station in _context.StationInfos
                          on loop.StationID equals station.ID
                          join area in _context.Areas
                          on station.AreaID equals area.ID
                          join company in _context.CompanyInfos
                          on area.CompanyID equals company.ID
                          select new EarlyWarningDetailRecord
                          {
                              ID = record.ID,
                              LoopID = record.LoopID,
                              Description = station.Name + "-" + loop.AbbrName + "-" + record.Description,
                              BeginDate = record.BeginDate,
                              EndDate = record.EndDate,
                          };
            return from record in records
                   group record by record.Description into recordGroup
                   select new EarlyWarningDetailRecordStatistics
                   {
                       Description = recordGroup.Key,
                       Number = recordGroup.Count()
                   };
        }

        public Dictionary<string, object> GetEarlyWarningDetailRecordByBrandStatistics(List<int> collectDataTypeIDs, DateTime beginDateTime, DateTime endDateTime, List<int> companyIDs)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            var records = (from record in _context.EarlyWarningDetailRecords.Where(record => DateTime.Compare(record.BeginDate, beginDateTime) >= 0
                                     && DateTime.Compare(record.EndDate, endDateTime) <= 0)
                           join loop in _context.StationLoops.Where(loop => collectDataTypeIDs.Contains(loop.CollectDataTypeID))
                           on record.LoopID equals loop.ID
                           join station in _context.StationInfos
                           on loop.StationID equals station.ID
                           join area in _context.Areas
                           on station.AreaID equals area.ID
                           join company in _context.CompanyInfos.Where(company => companyIDs.Contains(company.ID))
                           on area.CompanyID equals company.ID
                           select new EarlyWarningDetailRecord
                           {
                               Description = record.Description,
                               TagName = station.Name + "-" + loop.AbbrName + "-" + record.Description,
                               BeginDate = record.BeginDate,
                               EndDate = record.EndDate,
                               CompanyName = company.Name
                           }).ToList();
            var tagstatistics = (from record in records
                                 group record by new
                                 {
                                     record.TagName,
                                     record.Description,
                                     record.CompanyName
                                 }

                       into recordGroup
                                 select new EarlyWarningDetailRecordStatistics
                                 {
                                     TagName = recordGroup.Key.TagName,
                                     Description = recordGroup.Key.Description,
                                     CompanyName = recordGroup.Key.CompanyName,
                                     Number = recordGroup.Count(),
                                     Duration = TimeSpan.FromSeconds(recordGroup.Sum(grp => (grp.EndDate - grp.BeginDate).TotalSeconds)),
                                 }).ToList();

            var tableList = (from tags in tagstatistics
                             group tags by new
                             {
                                 tags.Description,
                                 tags.CompanyName
                             }
                                          into taggroup
                             select new EarlyWarningDetailRecordStatistics
                             {
                                 Description = taggroup.Key.Description,
                                 CompanyName = taggroup.Key.CompanyName,
                                 Number = taggroup.Sum(grp => grp.Number),
                                 Duration = TimeSpan.FromSeconds(taggroup.Sum(grp => grp.Duration.TotalSeconds))
                             }).ToList();
            var statisticsByCompanyList = (from tags in tagstatistics
                                           group tags by tags.CompanyName
                                           into taggroup
                                           select new EarlyWarningDetailRecordStatistics
                                           {
                                               CompanyName = taggroup.Key,
                                               Number = taggroup.Sum(grp => grp.Number),
                                               Duration = TimeSpan.FromSeconds(taggroup.Sum(grp => grp.Duration.TotalSeconds))
                                           }).ToList();
            var statisticsByDescriptionList = (from tags in tagstatistics
                                               group tags by tags.Description
                                           into taggroup
                                               select new EarlyWarningDetailRecordStatistics
                                               {
                                                   Description = taggroup.Key,
                                                   Number = taggroup.Sum(grp => grp.Number),
                                                   Duration = TimeSpan.FromSeconds(taggroup.Sum(grp => grp.Duration.TotalSeconds))
                                               }).ToList();
            var companies = _context.CompanyInfos.Where(company => companyIDs.Contains(company.ID)).Select(company => company.Name);
            var descriotions = tableList.Select(item => item.Description).Distinct();
            Dictionary<string, object> item = new Dictionary<string, object>();
            List<Dictionary<string, object>> items = new List<Dictionary<string, object>>();
            foreach (string companyName in companies)
            {
                item = new Dictionary<string, object>();
                List<int> numbers = new List<int>();
                foreach (string descrotion in descriotions)
                {
                    var statistic = tableList.Where(item => item.CompanyName == companyName && item.Description == descrotion).FirstOrDefault();
                    if (statistic == null)
                    {
                        numbers.Add(0);
                    }
                    else
                    {
                        numbers.Add(statistic.Number);
                    }
                }
                item["company"] = companyName;
                item["descriotionNumber"] = numbers;
                items.Add(item);
            }

            data["TableData"] = tableList.OrderBy(item => item.CompanyName);
            data["statisticsByCompany"] = statisticsByCompanyList;
            data["statisticsByDescription"] = statisticsByDescriptionList;
            data["descriotions"] = descriotions;
            data["statisticsByNumber"] = items;
            return data;
        }

        public Dictionary<string, object> GetEarlyWarningNotificationRate(List<int> collectDataTypeIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            Dictionary<string, object> NotificationRateData = new Dictionary<string, object>();
            List<EarlyWarningNotificationRate> earlyWarningNotificationRates = new List<EarlyWarningNotificationRate>();
            var records = (from record in _context.EarlyWarningDetailRecords.Where(record => DateTime.Compare(record.BeginDate, beginDateTime) >= 0
                                      && DateTime.Compare(record.EndDate, endDateTime) <= 0)
                           join loop in _context.StationLoops.Where(loop => collectDataTypeIDs.Contains(loop.CollectDataTypeID))
                           on record.LoopID equals loop.ID
                           select new EarlyWarningDetailRecord
                           {
                               LoopID = record.LoopID,
                               Description = record.Description,
                               CollectDataTypeID = loop.CollectDataTypeID
                           }).ToList();

            var recordStatistics = from record in records
                                   group record by new
                                   {
                                       record.Description,
                                       record.LoopID,
                                       record.CollectDataTypeID
                                   }
                                   into recordGroup
                                   select new EarlyWarningDetailRecordStatistics
                                   {
                                       Description = recordGroup.Key.Description,
                                       LoopID = recordGroup.Key.LoopID,
                                       CollectDataTypeID = recordGroup.Key.CollectDataTypeID
                                   };

            List<string> collectorIPs = (from loop in _context.StationLoops.Where(loop => collectDataTypeIDs.Contains(loop.CollectDataTypeID) && loop.FlowmeterTypeID == 1)
                                         join station in _context.StationInfos
                                         on loop.StationID equals station.ID
                                         join collector in _context.Collectors
                                         on station.CollectorID equals collector.ID
                                         select collector.IPAddress).Distinct().ToList();
            List<HisCheckDataAlarmStatistics> hisCheckDataAlarmStatistics = new List<HisCheckDataAlarmStatistics>();
            List<StationLoop> loops = (from loop in _context.StationLoops.Where(loop => collectDataTypeIDs.Contains(loop.CollectDataTypeID) && loop.FlowmeterTypeID == 1)
                                       join station in _context.StationInfos
                                       on loop.StationID equals station.ID
                                       join area in _context.Areas
                                       on station.AreaID equals area.ID
                                       join company in _context.CompanyInfos
                                       on area.CompanyID equals company.ID
                                       join collector in _context.Collectors
                                       on station.CollectorID equals collector.ID
                                       select new StationLoop
                                       {
                                           ID = loop.ID,
                                           AbbrName = loop.AbbrName,
                                           CompanyName = company.Name,
                                           StationName = station.Name,
                                           IPAddress = collector.IPAddress,
                                           CollectDataTypeID = loop.CollectDataTypeID
                                       }).ToList();

            foreach (string ip in collectorIPs)
            {
                List<int> loopIDs = loops.Where(loop => loop.IPAddress == ip).Select(loop => loop.ID).ToList();
                // = _configuration["CollectorSQLConnection"].Replace("@IPAddress@", ip);
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                string connectionString = Configuration.GetConnectionString("CollectorSQLConnection").Replace("@IPAddress@", ip);
                using (var mycontext = new MyDBContext(connectionString))
                {
                    List<HisCheckDataAlarmStatistics> checkalarmStatistics = (from alarm in mycontext.hisCheckDataAlarms.Where(alarm => loopIDs.Contains(alarm.LoopID) && DateTime.Compare(alarm.StartTime, beginDateTime) >= 0
                                      && DateTime.Compare(alarm.EndTime, endDateTime) <= 0)

                                                                              group alarm by new
                                                                              {
                                                                                  alarm.Description,
                                                                                  alarm.LoopID,
                                                                              }
                                                                              into alarmGroup
                                                                              select new HisCheckDataAlarmStatistics
                                                                              {
                                                                                  Description = alarmGroup.Key.Description,
                                                                                  LoopID = alarmGroup.Key.LoopID
                                                                              }).ToList();

                    hisCheckDataAlarmStatistics.AddRange(checkalarmStatistics);
                }
            }
            foreach (StationLoop loop in loops)
            {
                switch (loop.CollectDataTypeID)
                {
                    case 1:
                        {
                            var loopRecordstatistics = recordStatistics.Where(statistics => statistics.LoopID == loop.ID);
                            EarlyWarningNotificationRate rate = new EarlyWarningNotificationRate();
                            rate.BrandName = "Daniel";
                            rate.StationName = loop.StationName;
                            rate.LoopName = loop.AbbrName;
                            rate.CompanyName = loop.CompanyName;
                            rate.LoopID = loop.ID;
                            if (loopRecordstatistics.Count() == 0)
                            {
                                rate.AlarmNumber = 0;
                                rate.EarlywarningNumber = 0;
                                rate.NotificationRate = 100;
                            }
                            else
                            {
                                rate.EarlywarningNumber = loopRecordstatistics.Count();
                                int AlarmNumber = 0;
                                foreach (EarlyWarningDetailRecordStatistics earlyWarningDetailRecordStatistics in loopRecordstatistics)
                                {
                                    switch (earlyWarningDetailRecordStatistics.Description)
                                    {
                                        case "增益(1A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(1B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(2A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(2B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(3A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(3B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(4A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(1A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(1B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(2A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(2B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(3A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(3B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(4A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "性能(1A)":
                                        case "性能(1B)":
                                        case "性能(2A)":
                                        case "性能(2B)":
                                        case "性能(3A)":
                                        case "性能(3B)":
                                        case "性能(4A)":
                                        case "性能(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("性能") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }

                                        case "声道1声速偏差率":
                                        case "声道4声速偏差率":
                                        case "声道2声速偏差率":
                                        case "声道3声速偏差率":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声速偏差率") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "对称性":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("对称性") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "漩涡角":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("漩涡角") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "剖面系数":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("剖面系数") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                    }
                                }
                                rate.AlarmNumber = AlarmNumber;
                                rate.NotificationRate = AlarmNumber / rate.EarlywarningNumber * 100;
                            }
                            earlyWarningNotificationRates.Add(rate);
                            break;
                        }
                    case 3:
                        {
                            EarlyWarningNotificationRate rate = new EarlyWarningNotificationRate();
                            rate.BrandName = "Weise";
                            rate.StationName = loop.StationName;
                            rate.LoopName = loop.AbbrName;
                            rate.CompanyName = loop.CompanyName;
                            rate.LoopID = loop.ID;
                            var loopRecordstatistics = recordStatistics.Where(statistics => statistics.LoopID == loop.ID);
                            if (loopRecordstatistics.Count() == 0)
                            {

                                rate.AlarmNumber = 0;
                                rate.EarlywarningNumber = 0;
                                rate.NotificationRate = 100;
                            }
                            else
                            {
                                rate.EarlywarningNumber = loopRecordstatistics.Count();
                                int AlarmNumber = 0;
                                foreach (EarlyWarningDetailRecordStatistics earlyWarningDetailRecordStatistics in loopRecordstatistics)
                                {
                                    switch (earlyWarningDetailRecordStatistics.Description)
                                    {
                                        case "增益(A1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(A2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(B1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(B2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(C1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(C2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(D1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(D2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(A1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(A2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(B1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(B2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(C1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(C2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(D1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(D2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "声道1声速偏差率":
                                        case "声道4声速偏差率":
                                        case "声道2声速偏差率":
                                        case "声道3声速偏差率":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声速偏差率") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "对称性":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("对称性") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "漩涡角":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("漩涡角") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "剖面系数":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("剖面系数") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                    }
                                }
                                rate.AlarmNumber = AlarmNumber;
                                rate.NotificationRate = AlarmNumber / rate.EarlywarningNumber * 100;
                            }
                            earlyWarningNotificationRates.Add(rate);
                            break;
                        }
                    case 9:
                        {
                            EarlyWarningNotificationRate rate = new EarlyWarningNotificationRate();
                            rate.BrandName = "Sick";
                            rate.StationName = loop.StationName;
                            rate.LoopName = loop.AbbrName;
                            rate.CompanyName = loop.CompanyName;
                            rate.LoopID = loop.ID;
                            var loopRecordstatistics = recordStatistics.Where(statistics => statistics.LoopID == loop.ID);
                            if (loopRecordstatistics.Count() == 0)
                            {

                                rate.AlarmNumber = 0;
                                rate.EarlywarningNumber = 0;
                                rate.NotificationRate = 100;
                            }
                            else
                            {
                                rate.EarlywarningNumber = loopRecordstatistics.Count();
                                int AlarmNumber = 0;
                                foreach (EarlyWarningDetailRecordStatistics earlyWarningDetailRecordStatistics in loopRecordstatistics)
                                {
                                    switch (earlyWarningDetailRecordStatistics.Description)
                                    {
                                        case "增益(1A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(1B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(2A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(2B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(3A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(3B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(4A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(1A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(1B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(2A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(2B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(3A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(3B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(4A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "声道1声速偏差率":
                                        case "声道4声速偏差率":
                                        case "声道2声速偏差率":
                                        case "声道3声速偏差率":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声速偏差率") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "对称性":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("对称性") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "漩涡角":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("漩涡角") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "剖面系数":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("剖面系数") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                    }
                                }
                                rate.AlarmNumber = AlarmNumber;
                                rate.NotificationRate = AlarmNumber / rate.EarlywarningNumber * 100;
                            }
                            earlyWarningNotificationRates.Add(rate);
                            break;
                        }
                    case 2:
                    case 7:
                    case 10:
                    case 12:
                        {
                            EarlyWarningNotificationRate rate = new EarlyWarningNotificationRate();
                            rate.BrandName = "Elster";
                            rate.StationName = loop.StationName;
                            rate.LoopName = loop.AbbrName;
                            rate.CompanyName = loop.CompanyName;
                            rate.LoopID = loop.ID;
                            var loopRecordstatistics = recordStatistics.Where(statistics => statistics.LoopID == loop.ID);
                            if (loopRecordstatistics.Count() == 0)
                            {
                                rate.AlarmNumber = 0;
                                rate.EarlywarningNumber = 0;
                                rate.NotificationRate = 100;
                            }
                            else
                            {
                                rate.EarlywarningNumber = loopRecordstatistics.Count();
                                int AlarmNumber = 0;
                                foreach (EarlyWarningDetailRecordStatistics earlyWarningDetailRecordStatistics in loopRecordstatistics)
                                {
                                    switch (earlyWarningDetailRecordStatistics.Description)
                                    {
                                        case "增益(A1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(A2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(B1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(B2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(C1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(C2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(D1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(D2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "声道1声速偏差率":
                                        case "声道4声速偏差率":
                                        case "声道2声速偏差率":
                                        case "声道3声速偏差率":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声速偏差率") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "漩涡角":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("漩涡角") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "剖面系数":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("剖面系数") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                    }
                                }
                                rate.AlarmNumber = AlarmNumber;
                                rate.NotificationRate = AlarmNumber / rate.EarlywarningNumber * 100;
                            }
                            earlyWarningNotificationRates.Add(rate);
                            break;
                        }
                }
            }
            earlyWarningNotificationRates = (from rate in earlyWarningNotificationRates
                                             join loop in _context.StationLoops
                                             on rate.LoopID equals loop.ID
                                             join loopGasTransmission in _context.LoopGasTransmissionCapacities
                                             on loop.ID equals loopGasTransmission.LoopID into matches
                                             from loopGasTransmission in matches.DefaultIfEmpty()
                                             select new EarlyWarningNotificationRate
                                             {
                                                 CompanyName = rate.CompanyName,
                                                 StationName = rate.StationName,
                                                 LoopName = rate.LoopName,
                                                 EarlywarningNumber = rate.EarlywarningNumber,
                                                 AlarmNumber = rate.AlarmNumber,
                                                 NotificationRate = rate.NotificationRate,
                                                 LoopID = rate.LoopID,
                                                 BrandName = rate.BrandName,
                                                 FlowmeterModel = loop.FlowmeterModel,
                                                 Caliber = loop.Caliber,
                                                 ForwordPreDayStandardCumulative = loopGasTransmission == null ? 0 : loopGasTransmission.ForwordPreDayStandardCumulative
                                             }).OrderByDescending(rate => rate.ForwordPreDayStandardCumulative).ThenBy(rate => rate.CompanyName).ToList();

            var notificationRateBrandStatistics = (from rate in earlyWarningNotificationRates
                                                   group rate by new
                                                   {
                                                       rate.BrandName
                                                   }
                                                  into rateGroup
                                                   select new NotificationRateBrandStatistics
                                                   {
                                                       BrandName = rateGroup.Key.BrandName,
                                                       NotificationRate = (int)rateGroup.Average(rete => rete.NotificationRate)
                                                   }).ToList();
            NotificationRateData["NotificationRate"] = earlyWarningNotificationRates;
            NotificationRateData["notificationRateBrandStatistics"] = notificationRateBrandStatistics;
            return NotificationRateData;
        }

        public Dictionary<string, object> BigDataAnalysisOverview(DateTime beginDateTime, DateTime endDateTime)
        {
            Dictionary<string, object> OverviewRateData = new Dictionary<string, object>();
            List<EarlyWarningNotificationRate> earlyWarningNotificationRates = new List<EarlyWarningNotificationRate>();
            #region 实时预警
            var earlyWarnings = (from warning in _context.EarlyWarnings
                                 join loop in _context.StationLoops
                                 on warning.LoopID equals loop.ID
                                 join station in _context.StationInfos
                                 on loop.StationID equals station.ID
                                 join area in _context.Areas
                                 on station.AreaID equals area.ID
                                 join company in _context.CompanyInfos
                                 on area.CompanyID equals company.ID
                                 join loopGasTransmission in _context.LoopGasTransmissionCapacities
                                 on loop.ID equals loopGasTransmission.LoopID into matches
                                 from loopGasTransmission in matches.DefaultIfEmpty()
                                 select new EarlyWarning
                                 {
                                     ID = warning.ID,
                                     LoopID = warning.LoopID,
                                     Status = warning.Status == "流量计存在预警" ? "存在预警" : (warning.Status == "流量计运行正常" ? "运行正常" : "通讯失败"),
                                     StatusNumber = warning.Status == "流量计存在预警" ? 1 : (warning.Status == "流量计运行正常" ? 2 : 3),
                                     Solution = warning.Solution,
                                     StationName = station.Name,
                                     LoopName = loop.AbbrName,
                                     AreaName = area.Name,
                                     CompanyName = company.Name,
                                     DateTime = warning.DateTime,
                                     FlowmeterManufacturer = loop.FlowmeterManufacturer,
                                     ForwordPreDayStandardCumulative = loopGasTransmission == null ? 0 : loopGasTransmission.ForwordPreDayStandardCumulative,
                                     EarlyWarningParameterDetail = string.Join("、", _context.earlyWarningDetails.Where(detail => detail.LoopID == warning.LoopID && detail.IsWarn == true).Select(detail => detail.Description))
                                 }).ToList().OrderByDescending(warning => warning.ForwordPreDayStandardCumulative).ThenBy(warning => warning.StatusNumber);
            Dictionary<string, object> earlyWarningNumber = new Dictionary<string, object>();
            earlyWarningNumber["EarlyWarningNumber"] = earlyWarnings.Where(item => item.Status == "存在预警").Count();
            earlyWarningNumber["NormalNumber"] = earlyWarnings.Where(item => item.Status == "运行正常").Count();
            earlyWarningNumber["CommunicationBadNumber"] = earlyWarnings.Where(item => item.Status == "通讯失败" ).Count();
            #endregion
            #region 告知率
            var records = (from record in _context.EarlyWarningDetailRecords.Where(record => DateTime.Compare(record.BeginDate, beginDateTime) >= 0
                                     && DateTime.Compare(record.EndDate, endDateTime) <= 0)
                           join loop in _context.StationLoops.Where(loop => loop.FlowmeterTypeID == 1)
                           on record.LoopID equals loop.ID
                           select new EarlyWarningDetailRecord
                           {
                               LoopID = record.LoopID,
                               Description = record.Description,
                               CollectDataTypeID = loop.CollectDataTypeID
                           }).ToList();

            var recordStatistics = from record in records
                                   group record by new
                                   {
                                       record.Description,
                                       record.LoopID,
                                       record.CollectDataTypeID
                                   }
                                   into recordGroup
                                   select new EarlyWarningDetailRecordStatistics
                                   {
                                       Description = recordGroup.Key.Description,
                                       LoopID = recordGroup.Key.LoopID,
                                       CollectDataTypeID = recordGroup.Key.CollectDataTypeID
                                   };

            List<string> collectorIPs = (from loop in _context.StationLoops.Where(loop => loop.FlowmeterTypeID == 1)
                                         join station in _context.StationInfos
                                         on loop.StationID equals station.ID
                                         join collector in _context.Collectors
                                         on station.CollectorID equals collector.ID
                                         select collector.IPAddress).Distinct().ToList();
            List<HisCheckDataAlarmStatistics> hisCheckDataAlarmStatistics = new List<HisCheckDataAlarmStatistics>();
            List<StationLoop> loops = (from loop in _context.StationLoops.Where(loop => loop.FlowmeterTypeID == 1)
                                       join station in _context.StationInfos
                                       on loop.StationID equals station.ID
                                       join area in _context.Areas
                                       on station.AreaID equals area.ID
                                       join company in _context.CompanyInfos
                                       on area.CompanyID equals company.ID
                                       join collector in _context.Collectors
                                       on station.CollectorID equals collector.ID
                                       select new StationLoop
                                       {
                                           ID = loop.ID,
                                           AbbrName = loop.AbbrName,
                                           CompanyName = company.Name,
                                           StationName = station.Name,
                                           IPAddress = collector.IPAddress,
                                           CollectDataTypeID = loop.CollectDataTypeID
                                       }).ToList();

            foreach (string ip in collectorIPs)
            {
                List<int> loopIDs = loops.Where(loop => loop.IPAddress == ip).Select(loop => loop.ID).ToList();
                // = _configuration["CollectorSQLConnection"].Replace("@IPAddress@", ip);
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                string connectionString = Configuration.GetConnectionString("CollectorSQLConnection").Replace("@IPAddress@", ip);
                using (var mycontext = new MyDBContext(connectionString))
                {
                    List<HisCheckDataAlarmStatistics> checkalarmStatistics = (from alarm in mycontext.hisCheckDataAlarms.Where(alarm => loopIDs.Contains(alarm.LoopID) && DateTime.Compare(alarm.StartTime, beginDateTime) >= 0
                                      && DateTime.Compare(alarm.EndTime, endDateTime) <= 0)

                                                                              group alarm by new
                                                                              {
                                                                                  alarm.Description,
                                                                                  alarm.LoopID,
                                                                              }
                                                                              into alarmGroup
                                                                              select new HisCheckDataAlarmStatistics
                                                                              {
                                                                                  Description = alarmGroup.Key.Description,
                                                                                  LoopID = alarmGroup.Key.LoopID
                                                                              }).ToList();

                    hisCheckDataAlarmStatistics.AddRange(checkalarmStatistics);
                }
            }
            foreach (StationLoop loop in loops)
            {
                switch (loop.CollectDataTypeID)
                {
                    case 1:
                        {
                            var loopRecordstatistics = recordStatistics.Where(statistics => statistics.LoopID == loop.ID);
                            EarlyWarningNotificationRate rate = new EarlyWarningNotificationRate();
                            rate.BrandName = "Daniel";
                            rate.StationName = loop.StationName;
                            rate.LoopName = loop.AbbrName;
                            rate.CompanyName = loop.CompanyName;
                            rate.LoopID = loop.ID;
                            if (loopRecordstatistics.Count() == 0)
                            {
                                rate.AlarmNumber = 0;
                                rate.EarlywarningNumber = 0;
                                rate.NotificationRate = 100;
                            }
                            else
                            {
                                rate.EarlywarningNumber = loopRecordstatistics.Count();
                                int AlarmNumber = 0;
                                foreach (EarlyWarningDetailRecordStatistics earlyWarningDetailRecordStatistics in loopRecordstatistics)
                                {
                                    switch (earlyWarningDetailRecordStatistics.Description)
                                    {
                                        case "增益(1A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(1B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(2A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(2B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(3A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(3B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(4A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(1A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(1B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(2A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(2B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(3A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(3B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(4A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "性能(1A)":
                                        case "性能(1B)":
                                        case "性能(2A)":
                                        case "性能(2B)":
                                        case "性能(3A)":
                                        case "性能(3B)":
                                        case "性能(4A)":
                                        case "性能(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("性能") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }

                                        case "声道1声速偏差率":
                                        case "声道4声速偏差率":
                                        case "声道2声速偏差率":
                                        case "声道3声速偏差率":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声速偏差率") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "对称性":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("对称性") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "漩涡角":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("漩涡角") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "剖面系数":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("剖面系数") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                    }
                                }
                                rate.AlarmNumber = AlarmNumber;
                                rate.NotificationRate = AlarmNumber / rate.EarlywarningNumber * 100;
                            }
                            earlyWarningNotificationRates.Add(rate);
                            break;
                        }
                    case 3:
                        {
                            EarlyWarningNotificationRate rate = new EarlyWarningNotificationRate();
                            rate.BrandName = "Weise";
                            rate.StationName = loop.StationName;
                            rate.LoopName = loop.AbbrName;
                            rate.CompanyName = loop.CompanyName;
                            rate.LoopID = loop.ID;
                            var loopRecordstatistics = recordStatistics.Where(statistics => statistics.LoopID == loop.ID);
                            if (loopRecordstatistics.Count() == 0)
                            {

                                rate.AlarmNumber = 0;
                                rate.EarlywarningNumber = 0;
                                rate.NotificationRate = 100;
                            }
                            else
                            {
                                rate.EarlywarningNumber = loopRecordstatistics.Count();
                                int AlarmNumber = 0;
                                foreach (EarlyWarningDetailRecordStatistics earlyWarningDetailRecordStatistics in loopRecordstatistics)
                                {
                                    switch (earlyWarningDetailRecordStatistics.Description)
                                    {
                                        case "增益(A1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(A2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(B1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(B2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(C1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(C2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(D1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(D2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(A1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(A2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(B1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(B2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(C1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(C2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(D1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(D2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "声道1声速偏差率":
                                        case "声道4声速偏差率":
                                        case "声道2声速偏差率":
                                        case "声道3声速偏差率":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声速偏差率") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "对称性":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("对称性") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "漩涡角":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("漩涡角") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "剖面系数":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("剖面系数") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                    }
                                }
                                rate.AlarmNumber = AlarmNumber;
                                rate.NotificationRate = AlarmNumber / rate.EarlywarningNumber * 100;
                            }
                            earlyWarningNotificationRates.Add(rate);
                            break;
                        }
                    case 9:
                        {
                            EarlyWarningNotificationRate rate = new EarlyWarningNotificationRate();
                            rate.BrandName = "Sick";
                            rate.StationName = loop.StationName;
                            rate.LoopName = loop.AbbrName;
                            rate.CompanyName = loop.CompanyName;
                            rate.LoopID = loop.ID;
                            var loopRecordstatistics = recordStatistics.Where(statistics => statistics.LoopID == loop.ID);
                            if (loopRecordstatistics.Count() == 0)
                            {

                                rate.AlarmNumber = 0;
                                rate.EarlywarningNumber = 0;
                                rate.NotificationRate = 100;
                            }
                            else
                            {
                                rate.EarlywarningNumber = loopRecordstatistics.Count();
                                int AlarmNumber = 0;
                                foreach (EarlyWarningDetailRecordStatistics earlyWarningDetailRecordStatistics in loopRecordstatistics)
                                {
                                    switch (earlyWarningDetailRecordStatistics.Description)
                                    {
                                        case "增益(1A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(1B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(2A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(2B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(3A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(3B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(4A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(1A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(1B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(2A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(2B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(3A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(3B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(4A)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "信噪比(4B)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4B信噪比") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "声道1声速偏差率":
                                        case "声道4声速偏差率":
                                        case "声道2声速偏差率":
                                        case "声道3声速偏差率":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声速偏差率") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "对称性":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("对称性") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "漩涡角":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("漩涡角") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "剖面系数":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("剖面系数") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                    }
                                }
                                rate.AlarmNumber = AlarmNumber;
                                rate.NotificationRate = AlarmNumber / rate.EarlywarningNumber * 100;
                            }
                            earlyWarningNotificationRates.Add(rate);
                            break;
                        }
                    case 2:
                    case 7:
                    case 10:
                    case 12:
                        {
                            EarlyWarningNotificationRate rate = new EarlyWarningNotificationRate();
                            rate.BrandName = "Elster";
                            rate.StationName = loop.StationName;
                            rate.LoopName = loop.AbbrName;
                            rate.CompanyName = loop.CompanyName;
                            rate.LoopID = loop.ID;
                            var loopRecordstatistics = recordStatistics.Where(statistics => statistics.LoopID == loop.ID);
                            if (loopRecordstatistics.Count() == 0)
                            {
                                rate.AlarmNumber = 0;
                                rate.EarlywarningNumber = 0;
                                rate.NotificationRate = 100;
                            }
                            else
                            {
                                rate.EarlywarningNumber = loopRecordstatistics.Count();
                                int AlarmNumber = 0;
                                foreach (EarlyWarningDetailRecordStatistics earlyWarningDetailRecordStatistics in loopRecordstatistics)
                                {
                                    switch (earlyWarningDetailRecordStatistics.Description)
                                    {
                                        case "增益(A1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(A2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道1B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(B1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(B2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道2B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(C1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(C2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道3B增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(D1)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "增益(D2)":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声道4A增益") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "声道1声速偏差率":
                                        case "声道4声速偏差率":
                                        case "声道2声速偏差率":
                                        case "声道3声速偏差率":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("声速偏差率") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "漩涡角":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("漩涡角") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                        case "剖面系数":
                                            {
                                                if (hisCheckDataAlarmStatistics.Where(statistics => statistics.Description.Contains("剖面系数") && statistics.LoopID == earlyWarningDetailRecordStatistics.LoopID).Count() > 0)
                                                    AlarmNumber++;
                                                break;
                                            }
                                    }
                                }
                                rate.AlarmNumber = AlarmNumber;
                                rate.NotificationRate = AlarmNumber / rate.EarlywarningNumber * 100;
                            }
                            earlyWarningNotificationRates.Add(rate);
                            break;
                        }
                }
            }
            earlyWarningNotificationRates = (from rate in earlyWarningNotificationRates
                                             join loop in _context.StationLoops
                                             on rate.LoopID equals loop.ID
                                             join loopGasTransmission in _context.LoopGasTransmissionCapacities
                                             on loop.ID equals loopGasTransmission.LoopID into matches
                                             from loopGasTransmission in matches.DefaultIfEmpty()
                                             select new EarlyWarningNotificationRate
                                             {
                                                 CompanyName = rate.CompanyName,
                                                 StationName = rate.StationName,
                                                 LoopName = rate.LoopName,
                                                 EarlywarningNumber = rate.EarlywarningNumber,
                                                 AlarmNumber = rate.AlarmNumber,
                                                 NotificationRate = rate.NotificationRate,
                                                 LoopID = rate.LoopID,
                                                 BrandName = rate.BrandName,
                                                 FlowmeterModel = loop.FlowmeterModel,
                                                 Caliber = loop.Caliber,
                                                 ForwordPreDayStandardCumulative = loopGasTransmission == null ? 0 : loopGasTransmission.ForwordPreDayStandardCumulative
                                             }).OrderByDescending(rate => rate.ForwordPreDayStandardCumulative).ThenBy(rate => rate.CompanyName).ToList();

            var notificationRateBrandStatistics = (from rate in earlyWarningNotificationRates
                                                   group rate by new
                                                   {
                                                       rate.BrandName
                                                   }
                                                  into rateGroup
                                                   select new NotificationRateBrandStatistics
                                                   {
                                                       BrandName = rateGroup.Key.BrandName,
                                                       NotificationRate = (int)rateGroup.Average(rete => rete.NotificationRate)
                                                   }).ToList();

            #endregion
            OverviewRateData["EarlyWarnings"] = earlyWarnings;
            OverviewRateData["EarlyWarningStatistics"] = earlyWarningNumber;
            OverviewRateData["EarlyWarningNotificationRateBrandStatistics"] = notificationRateBrandStatistics;
            return OverviewRateData;
        }

        public List<HistoricalEarlyWarning> GetEarlyWarningAccuracys(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            var historicalEarlyWarnings = _context.HistoricalEarlyWarnings.Where(x => loopIDs.Contains(x.LoopID)
                                      && x.BeginDateTime >= beginDateTime
                                      && x.EndDateTime <= endDateTime);
            return (from accuracy in historicalEarlyWarnings
                    join loop in _context.StationLoops
                    on accuracy.LoopID equals loop.ID
                    join station in _context.StationInfos
                    on loop.StationID equals station.ID
                    join area in _context.Areas
                    on station.AreaID equals area.ID
                    join company in _context.CompanyInfos
                    on area.CompanyID equals company.ID
                    select new HistoricalEarlyWarning
                    {
                        ID = accuracy.ID,
                        LoopID = accuracy.LoopID,
                        BeginDateTime = accuracy.BeginDateTime,
                        EndDateTime = accuracy.EndDateTime,
                        KnowledgeSolution = accuracy.KnowledgeSolution,
                        SceneSolution = accuracy.SceneSolution,
                        StationName = station.Name,
                        LoopName = loop.AbbrName,
                        AreaName = area.Name,
                        CompanyName = company.Name,
                        FlowmeterManufacturer = loop.FlowmeterManufacturer
                    }).ToList();
        }

        public string UpdateEarlyWarningAccuracy(int id, string sceneSolution)
        {
            using var tran = _context.Database.BeginTransaction(IsolationLevel.ReadCommitted);
            try
            {
                var historicalEarlyWarning = _context.HistoricalEarlyWarnings.FirstOrDefault(x => x.ID == id);
                if (historicalEarlyWarning != null)
                {
                    historicalEarlyWarning.SceneSolution = sceneSolution;
                    _context.HistoricalEarlyWarnings.Update(historicalEarlyWarning);
                    _context.SaveChanges();
                }
                tran.Commit();
            }
            catch (Exception)
            {
                tran.Rollback();
                return "OtherError";
            }
            return "OK";
        }

        public List<EarlyWarningAccuracyStatistics> GetEarlyWarningAccuracyStatistics(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            var historicalEarlyWarnings = _context.HistoricalEarlyWarnings.Where(x => loopIDs.Contains(x.LoopID)
                                      && x.BeginDateTime >= beginDateTime
                                      && x.EndDateTime <= endDateTime);
            var accuracys = from accuracy in historicalEarlyWarnings
                            join loop in _context.StationLoops
                            on accuracy.LoopID equals loop.ID
                            join station in _context.StationInfos
                            on loop.StationID equals station.ID
                            join area in _context.Areas
                            on station.AreaID equals area.ID
                            join company in _context.CompanyInfos
                            on area.CompanyID equals company.ID
                            select new HistoricalEarlyWarning
                            {
                                ID = accuracy.ID,
                                LoopID = accuracy.LoopID,
                                KnowledgeSolution = accuracy.KnowledgeSolution,
                                SceneSolution = accuracy.SceneSolution,
                                FlowmeterManufacturer = loop.FlowmeterManufacturer
                            };
            return (from statistic in accuracys
                    group statistic by statistic.FlowmeterManufacturer into g
                    select new EarlyWarningAccuracyStatistics
                    {
                        Description = g.Key,
                        CorrectNumber = g.Sum(s => s.KnowledgeSolution == s.SceneSolution ? 1 : 0),
                        ErrorNumber = g.Sum(s => s.KnowledgeSolution != s.SceneSolution ? 1 : 0),
                        Accuracy = g.Sum(s => s.KnowledgeSolution == s.SceneSolution ? 1 : 0) / g.Count()
                    }).ToList();
        }
    }
}
