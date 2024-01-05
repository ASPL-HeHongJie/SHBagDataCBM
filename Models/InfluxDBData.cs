using System;
using System.Collections.Generic;
using System.Text;
using InfluxDB.Client.Core;

namespace Models
{
    public class InfluxDBData
    {
        [Column("TagName", IsTag = true)] 
        public string Name { get; set; }

        [Column("Value")] 
        public double? Value { get; set; }

        [Column(IsTimestamp = true)] 
        public DateTime Time { get; set; }
    }
}
