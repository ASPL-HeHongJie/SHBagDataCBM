using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Keyless]
    public class Alarm
    {
        [Column("ALM_NATIVETIMEIN")]
        public string StartTime { get; set; }
        [Column("ALM_NATIVETIMELAST")]
        public string EndTime { get; set; }
        [Column("ALM_PHYSLNODE")]
        public string NodeName { get; set; }
        [Column("ALM_TAGNAME")]
        public string TagName { get; set; }
        [Column("ALM_VALUE")]
        public string Value { get; set; }
        [Column("ALM_MSGTYPE")]
        public string MessageType { get; set; }
        [Column("ALM_DESCR")]
        public string Description { get; set; }
        [Column("ALM_ALMPRIORITY")]
        public string Priority { get; set; }
        [Column("ALM_ALMSTATUS")]
        public string Status { get; set; }
        [Column("ALM_ALMAREA")]
        public string Area { get; set; }
        [Column("ALM_OPNAME")]
        public string OperatorName { get; set; }
        [Column("ALM_OPFULLNAME")]
        public string FullOperatorName { get; set; }

    }

    [Table("tRealtimeAlarm")]
    public class RealtimeAlarm
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("ALM_NATIVETIMEIN")]
        public DateTime StartTime { get; set; }
        [Column("ALM_NATIVETIMELAST")]
        public DateTime EndTime { get; set; }
        [Column("ALM_PHYSLNODE")]
        public string? NodeName { get; set; }
        [Column("ALM_TAGNAME")]
        public string? TagName { get; set; }
        [Column("ALM_VALUE")]
        public string? Value { get; set; }
        [Column("ALM_MSGTYPE")]
        public string? MessageType { get; set; }
        [Column("ALM_DESCR")]
        public string? Description { get; set; }
        [Column("ALM_ALMPRIORITY")]
        public string? Priority { get; set; }
        [Column("ALM_ALMSTATUS")]
        public string? Status { get; set; }
        [Column("ALM_ALMAREA")]
        public string Area { get; set; }
        [Column("ALM_OPNAME")]
        public string? OperatorName { get; set; }
        [NotMapped]
        public string CompanyAbbrName { get; set; }
        [NotMapped]
        public string AlarmDescription { get; set; }
    }

    [Table("tHistoricalAlarm")]
    public class HistoricalAlarm
    {
        [Key]
        [Column("ID")]
        public int HisID { get; set; }
        [Column("ALM_NATIVETIMEIN")]
        public DateTime StartTime { get; set; }
        [Column("ALM_NATIVETIMELAST")]
        public DateTime EndTime { get; set; }
        [Column("ALM_PHYSLNODE")]
        public string? NodeName { get; set; }
        [Column("ALM_TAGNAME")]
        public string? TagName { get; set; }
        [Column("ALM_VALUE")]
        public string? Value { get; set; }
        [Column("ALM_MSGTYPE")]
        public string? MessageType { get; set; }
        [Column("ALM_DESCR")]
        public string? Description { get; set; }
        [Column("ALM_ALMPRIORITY")]
        public string? Priority { get; set; }
        [Column("ALM_ALMSTATUS")]
        public string? Status { get; set; }
        [Column("ALM_ALMAREA")]
        public string? Area { get; set; }

        [NotMapped]
        public string CompanyAbbrName { get; set; }
        [NotMapped]
        public string AlarmDescription { get; set; }

        [NotMapped]
        public double AlarmSpan { get; set; }

    }

    public class HistoricalStatisticalAlarm
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public TimeSpan Duration { get; set; }
        public int Count { get; set; }
        public string TagName { get; set; }
        public string Description { get; set; }

    }

    public class AlarmCount
    {
        public string Name { get; set; }
        public string AlarmName { get; set; }
        public string AlarmArea { get; set; }
        public int Count { get; set; }

        public double? AlarmSpan { get; set; }
    }

    public class Avalability
    {
        public string Company { get; set; }
        public decimal Rate { get; set; }
    }

}
