using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBMMVC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ExpertKnowledgeBaseController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IExcelExportHelper _excelExportHelper;
        private readonly IExpertKnowledgeService _expertKnowledgeService;

        public ExpertKnowledgeBaseController(IConfiguration configuration, IExpertKnowledgeService expertKnowledgeService, IExcelExportHelper excelExportHelper)
        {
            _configuration = configuration;
            _expertKnowledgeService = expertKnowledgeService;
            _excelExportHelper = excelExportHelper;
        }

        public async Task<IEnumerable<ExpertKnowledge>> GetExpertKnowledgeBase([FromBody] string brand)
        {
            return await _expertKnowledgeService.GetExpertKnowledge(brand);
        }
    }
}
