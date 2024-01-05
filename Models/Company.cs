using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Models
{

    public class Company
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string Name { get; set; }
        public string AbbrName { get; set; }
        public string FullName { get; set; }
        public List<Area> Areas { get; set; } = new List<Area>();

    }
}
