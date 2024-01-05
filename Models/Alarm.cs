using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Keyless]
    public class Alarm
    {
        [Column("ALM_NATIVETIMEIN")]
        public string StartTime { get; set; }
        [Column("ALM_NATIVETIMELAST")]
        public string EndTime { get; set; }
        [Column("ALM_PHYSLNODE")]
        public string NodeName { get; set; }
        [Column("ALM_TAGNAME")]
        public string TagName { get; set; }
        [Column("ALM_VALUE")]
        public string Value { get; set; }
        [Column("ALM_MSGTYPE")]
        public string MessageType { get; set; }
        [Column("ALM_DESCR")]
        public string Description { get; set; }
        [Column("ALM_ALMPRIORITY")]
        public string Priority { get; set; }
        [Column("ALM_ALMSTATUS")]
        public string Status { get; set; }
        [Column("ALM_ALMAREA")]
        public string Area { get; set; }
        [Column("ALM_OPNAME")]
        public string OperatorName { get; set; }
        [Column("ALM_OPFULLNAME")]
        public string FullOperatorName { get; set; }

    }
}
