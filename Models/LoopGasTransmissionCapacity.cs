using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("tLoopGasTransmissionCapacity")]
    public class LoopGasTransmissionCapacity
    {
        [Key]
        public int ID { get; set; }

        public int LoopID { get; set; }

        public double? ForwordPreDayStandardCumulative { get; set; }

        public DateTime DateTime { get; set; }
    }
}
