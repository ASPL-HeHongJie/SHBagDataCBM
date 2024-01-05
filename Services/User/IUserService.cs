using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public  interface IUserService
    {
        public string Login(ref User user,string username, string password);

        public void AddUserLogRecord(UserLogRecord userLogRecord);

        public Task<IEnumerable<UserLogRecord>> GetUserLogRecords(int userID,string startDateTime,string endDateTime);
    }
}
