using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tCollector")]
    public class Collector
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string AbbrName { get; set; }
        public string IFixNodeName { get; set; }
        public string IPAddress { get; set; }
        public string IPPort { get; set; }

        public bool IsUse { get; set; }
    }
}
