using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Keyless]
    public class LoopUncertain
    {
        public int LoopID { get; set; }
        public string DateTime { get; set; }
        public decimal? StandardFlowrateAverage { get; set; }
        public decimal? StandardFlowrateUncertain { get; set; }
        public decimal? MassFlowrateAverage { get; set; }
        public decimal? MassFlowrateUncertain { get; set; }
        public decimal? EnergyFlowrateAverage { get; set; }
        public decimal? EnergyFlowrateUncertain { get; set; }
        public decimal? PressureAverage { get; set; }
        public decimal? PressureUncertain { get; set; }
        public decimal? TemperatureAverage { get; set; }
        public decimal? TemperatureUncertain { get; set; }
        public decimal? DensityAverage { get; set; }
        public decimal? DensityUncertain { get; set; }
        public decimal? StandardDensityAverage { get; set; }
        public decimal? StandardDensityUncertain { get; set; }
        public decimal? CalorificValueAverage { get; set; }
        public decimal? CalorificValueUncertain { get; set; }
        public string CheckDataStatus { get; set; }
    }
}
