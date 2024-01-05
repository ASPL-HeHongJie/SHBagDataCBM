using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [JsonObject(MemberSerialization.OptOut)]
    public  class Station
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string AbbrName { get; set; }
        public int AreaID { get; set; }
        public string IPAddress { get; set; }
        public string IPPort { get; set; }
        [JsonIgnore]
        public Area Area { get; set; }
        public List<Loop> Loops { get; set; } = new List<Loop>();
        public List<Equipment> Equipments { get; set; } = new List<Equipment>();
    }
}
