using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Respository
{
    public class SQLServerDBContext : DbContext
    {
        public SQLServerDBContext(DbContextOptions<SQLServerDBContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Area>().HasOne(t => t.Company).WithMany(i => i.Areas).HasForeignKey(i => i.CompanyID);
            modelBuilder.Entity<Station>().HasOne(t => t.Area).WithMany(i => i.Stations).HasForeignKey(i => i.AreaID);
            modelBuilder.Entity<Equipment>().HasOne(t => t.Station).WithMany(i => i.Equipments).HasForeignKey(i => i.StationID);
            modelBuilder.Entity<Loop>().HasOne(t => t.Station).WithMany(i => i.Loops).HasForeignKey(i => i.StationID);
            modelBuilder.Entity<TrendGroup>().HasOne(t => t.Loop).WithMany(i => i.TrendGroups).HasForeignKey(i => i.LoopID);
        }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Company> companies { get; set; }
        public DbSet<CompanyInfo> CompanyInfos { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Loop> Loops { get; set; }
        public DbSet<Trend> Trends { get; set; }
        public DbSet<Alarm> Alarms { get; set; }
        public DbSet<DiagnosticAlarm> DiagnosticAlarms { get; set; }
        public DbSet<AlarmKPI> AlarmKPIs { get; set; }
        public DbSet<LoopDiagnosticData> LoopDiagnosticDatas { get; set; }
        public DbSet<EquipmentDiagnosticData> EquipmentDiagnosticDatas { get; set; }
        public DbSet<LoopCheckData> LoopCheckDatas { get; set; }
        public DbSet<EquipmentCheckData> EquipmentCheckDatas { get; set; }
        public DbSet<VOSKeyCheckData> VOSKeyCheckDatas { get; set; }
        public DbSet<LoopUncertain> LoopUncertains { get; set; }
        public DbSet<DataItem> FlowrateData { get; set; }
        public DbSet<DiagnosticDataDetail> DiagnosticDataDetails { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<TrendGroup> TrendGroups { get; set; }
        public DbSet<DataItem> DataItems { get; set; }
        public DbSet<ProductionReport> ProductionReports { get; set; }
        public DbSet<ExpertKnowledge> ExpertKnowledges { get; set; }
        public DbSet<UserLogRecord> UserLogRecords { get; set; }
        public DbSet<AlarmKnowledgeBase> AlarmKnowledgeBases { get; set; }
        public DbSet<EarlyWarningConfigureCondition> EarlyWarningConfigureConditions { get; set; }
        public DbSet<EarlyWarningDetail> earlyWarningDetails { get; set; }
        public DbSet<EarlyWarning> earlyWarnings { get; set; }
        public DbSet<AlsrmKnowledgeBaseParametersConfigureCondition> AlsrmKnowledgeBaseParametersConfigureConditions { get; set; }
        public DbSet<KnowledgeBaseParametersConfigureCondition> KnowledgeBaseParametersConfigureConditions { get; set; }
        public DbSet<AlarmInfo> AlarmInfos { get; set; }
        public DbSet<StationInfo> StationInfos { get; set; }
        public DbSet<Collector> Collectors { get; set; }
        public DbSet<StationLoop> StationLoops { get; set; }
        public DbSet<HisCheckDataAlarm> hisCheckDataAlarms { get; set; }
        public DbSet<EarlyWarning> EarlyWarnings { get; set; }
        public DbSet<EarlyWarningDetailRecord> EarlyWarningDetailRecords { get; set; }
        public DbSet<HistoricalEarlyWarning> HistoricalEarlyWarnings { get; set; }
        public DbSet<LoopGasTransmissionCapacity> LoopGasTransmissionCapacities { get; set; }
    }
}
