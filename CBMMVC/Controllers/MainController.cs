using CBMMVC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using Services;
using Models;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.IO;
using Newtonsoft.Json;

namespace CBMMVC.Controllers
{
    public class MainController : Controller
    {
        private readonly ILogger<MainController> _logger;
        private readonly IUserService _userService;
        private readonly IConfiguration _Configuration;
        public MainController(ILogger<MainController> logger, IUserService userService, IConfiguration configuration)
        {
            _logger = logger;
            _userService = userService;
            _Configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Overview()
        {
            ViewBag.Title = "总览";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                return View("Overview");
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult Station(string id)
        {
            ViewBag.Title = "场站";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                int[] Loops = JsonConvert.DeserializeObject<int[]>(_Configuration["EarlyWarningStettingLoops"]);
                ViewBag.EarlyWarningStettingLoops = Loops;
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            int index = area.Stations.FindIndex(obj => obj.AbbrName == id);
                            if (index != -1)
                            {
                                ViewBag.Area = area;
                                ViewBag.Station = area.Stations.Find(obj => obj.AbbrName == id);
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            int index = area.Stations.FindIndex(obj => obj.AbbrName == id);
                            if (index != -1)
                            {
                                ViewBag.Company = company;
                                ViewBag.Station = area.Stations.Find(obj => obj.AbbrName == id);
                                break;
                            }
                        }
                    }
                }
                return View("Station", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult RealtimeAlarm(string id)
        {
            ViewBag.Title = "实时报警";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("RealtimeAlarm", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult HistoricalAlarm(string id)
        {
            ViewBag.Title = "历史报警";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("HistoricalAlarm", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult EarlyEarning(string id)
        {
            ViewBag.Title = "实时预警";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("EarlyWarning", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult EarlyWarningDetailRecord(string id)
        {
            ViewBag.Title = "预警记录";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("EarlyWarningDetailRecord", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }
        public IActionResult HistoricalCheckDataAlarm(string id)
        {
            ViewBag.Title = "核查历史报警";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("HistoricalCheckDataAlarm", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult EarlyWarningDetailRecordStatistics(string id)
        {
            ViewBag.Title = "预警参数统计";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.Companies = user.companies;
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("EarlyWarningDetailRecordStatistics", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }
        public IActionResult EarlyWarningNotificationRate(string id)
        {
            ViewBag.Title = "预警告知率统计";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("EarlyWarningNotificationRate", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult EarlyWarningAccuracy(string id)
        {
            ViewBag.Title = "建议告知率统计";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("EarlyWarningAccuracy", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult EquipmentGoodRate(string id)
        {
            ViewBag.Title = "设备完好统计";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.Companies = user.companies;
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("EquipmentGoodRate", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult BigDataAnalysisOverview(string id)
        {
            ViewBag.Title = "大数据分析总览";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.Companies = user.companies;
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.CompanyAbbrName = id;
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("BigDataAnalysisOverview", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult KeyParametersChangeRecord(string id)
        {
            ViewBag.Title = "关键参数变更记录";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("KeyParametersChangeRecord", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult RealtimeTread(string id)
        {
            ViewBag.Title = "实时趋势";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("RealtimeTread", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult HistoricalTread(string id)
        {
            ViewBag.Title = "历史趋势";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("HistoricalTread", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult RealtimeUncertain(string id)
        {
            ViewBag.Title = "实时不确定度";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("RealtimeUncertain", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult ManualCheckReport(string id)
        {
            ViewBag.Title = "手动核查报告";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.ReportServerIpAndPort = Configuration.GetConnectionString("ReportServerIpAndPort").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("ManualCheckReport", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult VOSCheckKeyParameter(string id)
        {
            ViewBag.Title = "声速核查重要参数";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("VOSCheckKeyParameter", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult VOSCheckReport(string id)
        {
            ViewBag.Title = "声速报告";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.ReportServerIpAndPort = Configuration.GetConnectionString("ReportServerIpAndPort").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("VOSCheckReport", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult FRCheckReport(string id)
        {
            ViewBag.Title = "流量报告";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.ReportServerIpAndPort = Configuration.GetConnectionString("ReportServerIpAndPort").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("FRCheckReport", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult LoopCheckReport(string id)
        {
            ViewBag.Title = "回路报告";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.ReportServerIpAndPort = Configuration.GetConnectionString("ReportServerIpAndPort").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("LoopCheckReport", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult GCCheckReport(string id)
        {
            ViewBag.Title = "色谱分析仪报告";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.ReportServerIpAndPort = Configuration.GetConnectionString("ReportServerIpAndPort").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("GCCheckReport", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult DailyReport(string id)
        {
            ViewBag.Title = "生产日报";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                ViewBag.ReportServerIpAndPort = Configuration.GetConnectionString("ReportServerIpAndPort").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("DailyReport", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult ProductionReport(string id)
        {
            ViewBag.Title = "能量报告";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("ProductionReport", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult ExpertKnowledgeBase(string id)
        {
            ViewBag.Title = "专家知识库";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("ExpertKnowledgeBase", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }

        public IActionResult UserLogRecord(string id)
        {
            ViewBag.Title = "操作日志";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.UserID = user.ID;
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.UserID = user.ID;
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("UserLogRecord", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }
        public IActionResult EquipmentManagement(string id)
        {
            ViewBag.Title = "设备管理";
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString() + "计量远程诊断系统";
            if (SessionExtensions.Get<User>(HttpContext.Session, "User") != null)
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
                ViewBag.IsArea = Configuration.GetConnectionString("IsArea").ToString();
                if (ViewBag.IsArea == "true")
                {
                    foreach (Company company in user.companies)
                    {
                        foreach (Area area in company.Areas)
                        {
                            if (area.AbbrName == id)
                            {
                                ViewBag.Area = area;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (Company company in user.companies)
                    {
                        if (company.AbbrName == id)
                        {
                            ViewBag.Company = company;
                            break;
                        }
                    }
                }
                return View("EquipmentManagement", id);
            }
            else
            {
                return RedirectToAction("LossSession", "Login");
            }
        }
    }
}
