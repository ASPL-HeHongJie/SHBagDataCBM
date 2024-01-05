using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Respository
{
    public interface IExpertKnowledgeRespository 
    {
        public IEnumerable<ExpertKnowledge> GetExpertKnowledge(string brand);
    }
}
