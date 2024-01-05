using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tEarlyWarning")]
    public class EarlyWarning
    {
        public int ID { get; set; }

        public int LoopID { get; set; }

        public string Solution { get; set; }

        public string Status { get; set; }

        public DateTime DateTime { get; set; }

        [NotMapped]
        public string LoopName { get; set; }

        [NotMapped]
        public string StationName { get; set; }

        [NotMapped]
        public string AreaName { get; set; }

        [NotMapped]
        public string CompanyName { get; set; }

        [NotMapped]
        public string EarlyWarningParameterDetail { get; set; }
        [NotMapped]
        public string FlowmeterManufacturer { get; set; }
        [NotMapped]
        public double? ForwordPreDayStandardCumulative { get; set; }
        [NotMapped]
        public int StatusNumber { get; set; }
    }

    public class EarlyWarningStatistics
    {
        public string Status { get; set; }
        public int Number { get; set; }    
    }
}
