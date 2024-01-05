using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore; 

namespace Models
{
    [Keyless]
    public class Tag
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Value { get; set; } = "????";
        public string Quality { get; set; } = "Uncertain";
    }
}
