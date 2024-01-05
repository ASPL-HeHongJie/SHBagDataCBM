using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("tStationLoop")]
    public  class StationLoop
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public string AbbrName { get; set; }

        public int CollectDataTypeID { get; set; }

        public int FlowmeterTypeID { get; set; }
        public int StationID { get; set; }
        public int? LineID { get; set; }

        public string Caliber { get; set; }

        public string Customer { get; set; }

        public string FlowmeterManufacturer { get; set; }
        public string FlowmeterModel { get; set; }

        public string FlowComputerManufacturer { get; set; }

        public string FlowComputerModel { get; set; }

        [NotMapped]
        public string StationName { get; set; }

        [NotMapped]
        public string StationAbbrName { get; set; }

        [NotMapped]
        public string IPAddress { get; set; }

        [NotMapped]
        public string CompanyName { get; set; }
    }
}
