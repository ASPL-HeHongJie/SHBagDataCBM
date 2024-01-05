using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{

    [Keyless]
    public class ExpertKnowledge
    {
        public string DescriptionEN { get; set; }
        public string DescriptionCN { get; set; }
        public string SolutionEN { get; set; }
        public string SolutionCN { get; set; }
        public string Brand { get; set; }
        public string Device { get; set; }
    }
}
