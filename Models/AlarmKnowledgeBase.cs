using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tAlarmKnowledgeBase")]
    public class AlarmKnowledgeBase
    {
        public int ID { get; set; }
        public string AlarmDescription { get; set; }
        public string Solution { get; set; }
        public string Brand { get; set; }

        public int Priority { get; set; }

    }
}
