using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Models
{
    [JsonObject(MemberSerialization.OptOut)]
    public class Equipment
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string EquipmentType { get; set; }

        public int  CollectType { get; set; }
        public string AbbrName { get; set; }
        public string BrandName { get; set; }
        public int StationID { get; set; }
        [JsonIgnore]
        public Station Station { get; set; }
    }
}
