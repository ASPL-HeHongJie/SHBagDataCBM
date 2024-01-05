using Models;
using Respository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ExpertKnowledgeService:IExpertKnowledgeService
    {
        private IExpertKnowledgeRespository _expertKnowledgeRespository;
        public ExpertKnowledgeService(IExpertKnowledgeRespository expertKnowledgeRespository)
        {
            _expertKnowledgeRespository = expertKnowledgeRespository;
        }
        public Task<IEnumerable<ExpertKnowledge>> GetExpertKnowledge(string brand)
        {
            return Task.Run(() => _expertKnowledgeRespository.GetExpertKnowledge(brand));
        }
    }
}
