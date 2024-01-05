using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string PersonName { get; set; }
        public string ContactNumber { get; set; }
        public string RoleName { get; set; }
        public List<Company> companies { get; set; }
        [NotMapped]
        public int LoopNumber { get; set; }
        //public List<EquipmentManufacturer> EquipmentManufacturers { get; set; }
        //public List<EquipmentCategory> EquipmentCategorys { get; set; }
    }
}
