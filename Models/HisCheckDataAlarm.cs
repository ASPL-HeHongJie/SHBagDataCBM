using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tHisCheckDataAlarm")]
    public class HisCheckDataAlarm
    {
        [Key]
        public int ID { get; set; }
        [Column("ALM_NATIVETIMEIN")]
        public DateTime StartTime { get; set; }
        [Column("ALM_NATIVETIMELAST")]
        public DateTime EndTime { get; set; }
        [Column("ALM_DESCR")]
        public string Description { get; set; }
        [Column("ALM_VALUE")]
        public string Value { get; set; }
        [Column("ALM_CURRENTVALUE")]
        public string CurrentValue { get; set; }
        [Column("ALM_ALMSTATUS")]
        public string Status { get; set; }
        [Column("ALM_ALMPRIORITY")]
        public string Priority { get; set; }
        [Column("ALM_LOOPID")]
        public int LoopID { get; set; }
        [Column("ALM_BRAND")]
        public string Brand { get; set; }
        [Column("ALM_DEVICE")]
        public string Device { get; set; }
        [Column("ALM_TAGNAME")]
        public string TagName { get; set; }
    }

    public class HisCheckDataAlarmStatistics 
    {
        public string Description { get; set; }
        public int Number { get; set; }
        public int LoopID { get; set; }

    }
}
