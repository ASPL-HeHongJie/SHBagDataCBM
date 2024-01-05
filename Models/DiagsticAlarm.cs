using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Keyless]
    public class DiagnosticAlarm
    {
        [Column("ALM_NATIVETIMEIN")]
        public string StartTime { get; set; }
        [Column("ALM_NATIVETIMELAST")]
        public string EndTime { get; set; }
        [Column("ALM_DESCR")]
        public string Description { get; set; }
        [Column("ALM_VALUE")]
        public string DiagnosticResult { get; set; }
        [Column("ALM_CURRENTVALUE")]
        public string Value { get; set; }
        [Column("ALM_ALMSTATUS")]
        public string Status { get; set; }
    }
}
