using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    [Keyless]
    public class ProductionReport
    {
        public string StationName { get; set; }
        public string LoopName { get; set; }
        public string Brand { get; set; }
        public string LineName { get; set; }
        public string FlowmeterModel { get; set; }
        public string Customer { get; set; }
        public string ReportDateTime { get; set; }
        public string? GrossFR { get; set; }
        public string? StandardPreHou { get; set; }
        public string? StandardPreDay { get; set; }
        public string? StandardTotal { get; set; }
        public string? HighCalorific { get; set; }
        public string? LowCalorific { get; set; }
        public string? EnergyFR { get; set; }
        public string? EnergyCurHou { get; set; }
        public string? EnergyPreHou { get; set; }
        public string? EnergyCurDay { get; set; }
        public string? EnergyPreDay { get; set; }
        public string? EnergyTotal { get; set; }
    }
}
