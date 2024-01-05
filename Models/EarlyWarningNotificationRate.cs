using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class EarlyWarningNotificationRate
    {
        public string CompanyName { get; set; }
        public string StationName { get; set; }
        public string LoopName { get; set; }

        public int EarlywarningNumber { get; set; }
        public int AlarmNumber { get; set; }
        public float NotificationRate { get; set; }

        public string BrandName { get; set; }

        public int  LoopID { get; set; }
        [NotMapped]
        public string FlowmeterModel { get; set; }
        [NotMapped]
        public double? ForwordPreDayStandardCumulative { get; set; }
        [NotMapped]
        public string Caliber { get; set; }

    }

    public class NotificationRateBrandStatistics
    {
        public string BrandName { get; set; }
        public int NotificationRate { get; set; }
    }
}
