using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tEarlyWarningConfigureCondition")]
    public class EarlyWarningConfigureCondition
    {
        public int ID { get; set; }

        public int LoopID { get; set; }

        public string Description { get; set; }
        public double? HighLimit { get; set; }

        public double? LowLimit { get; set; }

        public double? AlarmHighLimit { get; set; }

        public double? AlarmLowLimit { get; set; }

        public string TagName { get; set; }

        public string TagAbbrName { get; set; }
    }

}
