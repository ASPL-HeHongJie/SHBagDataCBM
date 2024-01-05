using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Keyless]
    public class DataItem
    {
        public string Name { get; set; }
        public string Value { get; set; } = "????";
    }
}
