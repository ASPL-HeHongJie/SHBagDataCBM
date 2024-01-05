using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    [Keyless]
    public class LoopDiagnosticData
    {
        //Loop ID
        public int ID { get; set; }
        public string DateTime { get; set; }
        //Loop Name
        public string Name { get; set; }
        public string FlowmeterTypeName { get; set; }
        public string FlowmeterTypeDescription { get; set; }
        public string BrandName { get; set; }
        public string FMDiagnosticResult { get; set; }
        public string TTDiagnosticResult { get; set; }
        public string PTDiagnosticResult { get; set; }
        public string FCDiagnosticResult { get; set; }
        public string VOSDiagnosticResult { get; set; }
    }
}
