using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IExpertKnowledgeService
    {
        public Task<IEnumerable<ExpertKnowledge>> GetExpertKnowledge(string brand);
    }
}
