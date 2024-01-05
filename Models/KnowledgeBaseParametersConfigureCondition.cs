using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tKnowledgeBaseParametersConfigureCondition")]
    public class KnowledgeBaseParametersConfigureCondition
    {
        public int ID { get; set; }
        public double? HighLimit { get; set; }
        public double? LowLimit { get; set; }
        public string Description { get; set; }
        public string TagName { get; set; }
        public string TagAbbrName { get; set; }
        public string Caliber { get; set; }
    }
}
