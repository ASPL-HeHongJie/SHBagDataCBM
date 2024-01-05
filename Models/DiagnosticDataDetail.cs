using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    [Keyless]
    public class DiagnosticDataDetail
    {
        public string Name { get; set; }
        public string Result { get; set; }
        public string Value {get;set;}
    }
}
