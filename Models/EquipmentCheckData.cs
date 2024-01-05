using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Keyless]
    public class EquipmentCheckData
    {
        
        public int HisID { get; set; }
        public string DateTime { get; set; }
        public int EquipmentID { get; set; }
        public string EquipmentName { get; set; }
        public string StationName { get; set; }
        public string BrandName { get; set; }
        public string CheckDataStatus { get; set; }
        public string ReportMode { get; set; }
        public string EquipmentModel { get; set; }
    }
}
