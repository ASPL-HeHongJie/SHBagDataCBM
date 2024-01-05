using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Respository
{

   public  class ExpertKnowledgeRespository : IExpertKnowledgeRespository
    {

        private readonly SQLServerDBContext _context;
        public ExpertKnowledgeRespository(SQLServerDBContext context)
        {
            _context = context;
        }
        public IEnumerable<ExpertKnowledge> GetExpertKnowledge(string brand)
        {
            string Sql = "SELECT [DescriptionEN],[DescriptionCN],[SolutionEN],[SolutionCN],[Brand],[Device] FROM [tExpertKnowledgeBase] where [Brand] like '%{0}%'";
            Sql = string.Format(Sql,brand);
            return _context.ExpertKnowledges.FromSqlRaw(Sql);
        }
    }
}
