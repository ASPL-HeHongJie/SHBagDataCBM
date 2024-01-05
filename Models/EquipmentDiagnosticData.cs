using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    [Keyless]
    public class EquipmentDiagnosticData
    {
        public int ID { get; set; }
        public string DateTime { get; set; }
        public string Name { get; set; }
        public string EquipmentTypeName { get; set; }
        public string EquipmentTypeDescription { get; set; }
        public string BrandName { get; set; }
        public string DiagnosticResult { get; set; }
    }
}
