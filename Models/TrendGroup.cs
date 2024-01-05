using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class TrendGroup
    {
        public int ID { get; set; }

        public int TrendGroupID { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public int LoopID { get; set; }
        [JsonIgnore]
        public Loop Loop { get; set; }
    }
}
