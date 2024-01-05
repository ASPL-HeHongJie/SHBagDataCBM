using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Models;
using Respository;

namespace Services
{
    public class UserService : IUserService
    {
        public readonly IUserRespository _userRespository;
        public UserService(IUserRespository userRespository)
        {
            _userRespository = userRespository;

        }
        public string Login(ref User user, string username, string password)
        {
            user = new User();
            switch (_userRespository.GetUserbyLogin(ref user, username, password))
            {
                case "DatabaseError":
                    {
                        return "DatabaseError";
                    }
                case "LogFailed":
                    {
                        return "LogFailed";
                    }
                case "NoSuchUser":
                    {
                        return "LogFailed";
                    }
                default:
                    {
                        switch (_userRespository.GetDepartmentsByUser(ref user))
                        {
                            case "DatabaseError":
                                {
                                    return "DatabaseError";
                                }
                            default:
                                {
                                    return "OK";
                                }
                        }
                    }

            }
        }

        public void AddUserLogRecord(UserLogRecord userLogRecord)
        {
            Task.Run(() => _userRespository.AddUserLogRecord(userLogRecord));
        }

        public Task<IEnumerable<UserLogRecord>> GetUserLogRecords(int userID, string startDateTime, string endDateTime)
        {
            return Task.Run(() => _userRespository.GetUserLogRecords(userID, startDateTime,endDateTime));
        }
    }
}
