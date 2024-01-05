using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Services;

namespace CBMAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        public readonly IPDBService _pdbService;
        //public readonly IUserService _userService;
        public readonly ITrendService _trendService;
        public readonly IAlarmService _alarmService;
        private static Random random = new Random();
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ITrendService trendService, IPDBService PDBService,IAlarmService alarmService)
        {
            _logger = logger;
            _trendService = trendService;
            _pdbService = PDBService;
            _alarmService = alarmService;
            //_userService = userService;
        }

        [HttpGet]
        //public async Task<Dictionary<string,object>> Get()
        //{
        //    var rng = new Random();
        //    List<Dictionary<string, object>> trends = new List<Dictionary<string, object>>();
        //    List<string> times = new List<string>();
        //    //Dictionary<string, object> trend = new Dictionary<string, object>();
        //    //trend["TagAddress"] = "CBM001:JIJ_5101_LPD.F_PRESSURE";
        //    //trends.Add(trend);
        //    DateTime startDateTime = DateTime.Now.AddMinutes(-5);

        //    //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    //{
        //    //    Date = DateTime.Now.AddDays(index),
        //    //    TemperatureC = rng.Next(-20, 55),
        //    //    Summary = Summaries[rng.Next(Summaries.Length)]
        //    //})
        //    //.ToArray();
        //    return await _trendService.GetHistoricalTrendsData(1, 1, startDateTime, "30", "00:00:05:00");
        //}

        //public async Task<IEnumerable<Alarm>> Get()
        //{
        //    return await _alarmService.GetHistoricalAlarm("2021-3-10 00:00:00", "2021-3-16 00:00:00","%");
        //}

        public int Get()
        {
            int start = 0;
            int end = 100;
            return random.Next(start, end);
        }

    }
}
