using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Keyless]
    public class AlarmKPI
    {
        public string Description { get; set; }
        public string Status { get; set; }
        public int DurationValue { get; set; }
        public string Duration { get; set; }
        public int AlarmCount { get; set; }
    }
}
