using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Models
{
    [JsonObject(MemberSerialization.OptOut)]
    public class Loop
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string AbbrName { get; set; }
        public string BrandName { get; set; }
        public int CollectType { get; set; }
        public int CollectDataTypeID { get; set; }
        public string FlowmeterType { get; set; }
        public string Caliber { get; set; }
        public string Customer { get; set; }
        public string FlowmeterManufacturer { get; set; }
        public string FlowComputerManufacturer { get; set; }
        public string FlowmeterModel { get; set; }
        public string FlowComputerModel { get; set; }

        public int StationID { get; set; }
        [JsonIgnore]
        public Station Station { get; set; }
        public List<TrendGroup> TrendGroups { get; set; } = new List<TrendGroup>();
    }
}
