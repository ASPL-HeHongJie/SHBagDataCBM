using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tEarlyWarningDetail")]
    public class EarlyWarningDetail
    {
        public int ID { get; set; }

        public int LoopID { get; set; }

        public bool IsWarn { get; set; }

        public bool IsRead { get; set; }

        public string Description { get; set; }

        public int ConfigureConditionID { get; set; }

        public DateTime UpdateDateTime { get; set; }

        [NotMapped]
        public string Solution { get; set; }
    }
}
