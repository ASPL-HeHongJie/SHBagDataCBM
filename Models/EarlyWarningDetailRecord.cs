using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tEarlyWarningDetailRecord")]
    public class EarlyWarningDetailRecord
    {
        [Key]
        public int ID { get; set; }
        public int LoopID { get; set; }
        public string Description { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }

        [NotMapped]
        public string LoopName { get; set; }

        [NotMapped]
        public string StationName { get; set; }

        [NotMapped]
        public string AreaName { get; set; }

        [NotMapped]
        public string CompanyName { get; set; }

        [NotMapped]
        public string TagName { get; set; }

        [NotMapped]
        public int CollectDataTypeID { get; set; }

        [NotMapped]
        public string FlowmeterManufacturer { get; set; }
        [NotMapped]
        public double? ForwordPreDayStandardCumulative { get; set; }
        [NotMapped]
        public string Caliber { get; set; }
    }

    public class EarlyWarningDetailRecordStatistics
    {
        public string Description { get; set; }
        public int Number { get; set; }
        public TimeSpan Duration { get; set; }
        public string TagName { get; set; }

        public int LoopID { get; set; }

        public int CollectDataTypeID { get; set; }

        public string CompanyName { get; set; }
    }

}
