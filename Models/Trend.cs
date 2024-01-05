using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    [Keyless]
    public class Trend
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public double HighLimit { get; set; }
        public double LowLimit { get; set; }
        public string Description { get; set; }
    }
}
