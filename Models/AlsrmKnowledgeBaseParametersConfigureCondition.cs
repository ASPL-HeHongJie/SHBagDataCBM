using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tAlsrmKnowledgeBaseParametersConfigureCondition")]
    public class AlsrmKnowledgeBaseParametersConfigureCondition
    {
        public int ID { get; set; }

        public int AlarmID { get; set; }

        public int KnowledgeBaseParametersConfigureConditionID { get; set; }
    }
}
