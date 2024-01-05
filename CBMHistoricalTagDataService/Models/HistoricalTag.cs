using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CBMHistoricalTagDataService
{
    [Keyless]
    public class HistoricalTag
    {
        public string Name { get; set; }
        public double? Value { get; set; }
    }
}
