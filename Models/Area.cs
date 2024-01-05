using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Newtonsoft.Json;

namespace Models
{
    [JsonObject(MemberSerialization.OptOut)]
    [Table("tArea")]
    public  class Area
    {

        public int ID { get; set; }
        public string Name { get; set; }
        public string AbbrName { get; set; }
        public string FullName { get; set; }
        [JsonIgnore]
        public Company Company { get; set; }
        public int CompanyID { get; set; }
        public List<Station> Stations { get; set; } = new List<Station>();
    }
}
