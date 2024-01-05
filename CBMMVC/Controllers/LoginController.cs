using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Models;
using Services;
using Microsoft.AspNetCore.Session;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace CBMMVC.Controllers
{
    public class LoginController : Controller
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _Configuration;
        public LoginController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _Configuration = configuration;
        }
        public IActionResult Index()
        {
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString();
            return View();
        }

        [HttpPost]
        public ActionResult Login()
        {
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString();
            User user = new User();
            UserLogRecord userLogRecord = new UserLogRecord();
            userLogRecord.UserName = Request.Form["form-username"].ToString();
            userLogRecord.DateTime = System.DateTime.Now;
            switch (_userService.Login(ref user, Request.Form["form-username"].ToString(), Request.Form["form-password"].ToString()))
            {
                case "DatabaseError":
                    {
                        return View("Index", (object)"数据库读写错误!");
                    }
                case "LogFailed":
                    {
                        userLogRecord.Description = "数据库读写错误";
                        //_userService.AddUserLogRecord(userLogRecord);
                        return View("Index", (object)"用户名或密码不正确!");
                    }
                case "NoSuchUser":
                    {
                        userLogRecord.Description = "系统中无此用户";
                        //_userService.AddUserLogRecord(userLogRecord);
                        return View("Index", (object)"系统中无此用户!");
                    }
                default:
                    {
                        userLogRecord.Description = "登录成功";
                        SessionExtensions.Set<User>(HttpContext.Session, "User", user);
                        return RedirectToAction("Overview", "Main");
                       // _userService.AddUserLogRecord(userLogRecord);
                      
                        if(user.LoopNumber==885)
                        {
                            SessionExtensions.Set<User>(HttpContext.Session, "User", user);
                            return RedirectToAction("Overview", "Main");
                        }
                        else
                        {
                            return View("Index", (object)"系统通讯有问题,无法登录!");
                        }

                    }
            }
        }

        public ActionResult Logout()
        {
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString();
            try
            {
                ViewData["User"] = SessionExtensions.Get<User>(HttpContext.Session, "User");
                User user = ViewData["User"] as User;
                UserLogRecord userLogRecord = new UserLogRecord();
                userLogRecord.UserName = user.Name;
                userLogRecord.DateTime = System.DateTime.Now;
                userLogRecord.Description = "退出登录";
                _userService.AddUserLogRecord(userLogRecord);
                HttpContext.Session.Clear();
            }
            catch
            {
            }
            return View("Index", null);
        }
        public ActionResult LossSession()
        {
            ViewBag.CompanyName = _Configuration["CompanyName"].ToString();
            try
            {
                HttpContext.Session.Clear();
            }
            catch
            {
            }
            return View("Index", null);
        }
    }
}

