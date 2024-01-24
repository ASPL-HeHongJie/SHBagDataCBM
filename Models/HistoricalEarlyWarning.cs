using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tHistoricalEarlyWarning")]
    public class HistoricalEarlyWarning
    {
        public int ID { get; set; }
        public int LoopID { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string KnowledgeSolution { get; set; }
        public string SceneSolution { get; set; }
        [NotMapped]
        public string LoopName { get; set; }
        [NotMapped]
        public string StationName { get; set; }
        [NotMapped]
        public string AreaName { get; set; }
        [NotMapped]
        public string CompanyName { get; set; }
        [NotMapped]
        public string FlowmeterManufacturer { get; set; }
        [NotMapped]
        public string Caliber { get; set; }
    }

    public class EarlyWarningAccuracyStatistics
    {
        public string Description { get; set; }
        public int CorrectNumber { get; set; }
        public int ErrorNumber { get; set; }
        public double Accuracy { get; set; }
    }
}
