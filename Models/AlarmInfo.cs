using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
 
    [Table("tAlarm")]
    public class AlarmInfo
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public int CollectDataTypeID { get; set; }
        public byte IsCommunicationAlarm { get; set; }
    }
}
