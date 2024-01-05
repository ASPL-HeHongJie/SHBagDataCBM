using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tStation")]
    public class StationInfo
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string AbbrName { get; set; }
        public int AreaID { get; set; }
        public int CollectorID { get; set; }
    }
}
