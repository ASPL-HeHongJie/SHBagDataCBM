using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Models;
using Newtonsoft.Json;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBMMVC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserLogRecordController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public UserLogRecordController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        public async Task<IEnumerable<UserLogRecord>> GetUserLogRecord([FromBody] string conditionString)
        {
            Dictionary<string, string> condition = JsonConvert.DeserializeObject<Dictionary<string, string>>(conditionString);
            int userID = Convert.ToInt32(condition["UserID"]);
            string startDateTime = condition["StartDateTime"].ToString();
            string endDateTime = condition["EndDateTime"].ToString();

            return await _userService.GetUserLogRecords(userID, startDateTime, endDateTime);
        }
    }
}
