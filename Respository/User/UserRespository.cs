using Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Data;

namespace Respository
{
    public class UserRespository : IUserRespository
    {
        private readonly SQLServerDBContext _context;
        public UserRespository(SQLServerDBContext context)
        {
            _context = context;
        }


        public string GetDepartmentsByUser(ref User user)
        {
            try
            {
                _context.Areas.ToList<Area>();
                string sql = "SELECT tStation.[ID] " +
                             " , tStation.[Name] " +
                             " ,tStation.[AbbrName] " +
                             " ,[AreaID] " +
                             " ,tCollector.Name as CollectorName " +
                             " , tCollector.IFixNodeName as IFixNodeName " +
                             " , tCollector.AbbrName as CollectorAbbrName " +
                             " ,IPAddress " +
                              " ,IPPort  " +
                             " FROM[CBMDB].[dbo].[tStation] " +
                              " left join " +
                              " tCollector" +
                              " on " +
                              " tCollector.ID =[tStation].[CollectorID]";
                _context.Stations.FromSqlRaw(sql).ToList<Station>();

                sql = " SELECT[tStationEquipment].[ID] " +
                       "  ,tStationEquipment.[Name] " +
                       "   ,[AbbrName] " +
                       "   ,tStationDeviceCollectDataType.BrandName " +
                       "   ,[StationID] " +
                      "      ,tStationDeviceCollectDataType.CollectType " +
                       " 	 ,tEquipmentType.Name as EquipmentType " +
                       "    FROM[dbo].[tStationEquipment] " +
                       "  inner join " +
                       "    tStationDeviceCollectDataType " +
                       "  on " +
                       "    tStationDeviceCollectDataType.ID =[CollectDataTypeID] " +
                       "   inner join " +
                       "   tEquipmentType " +
                       "   on " +
                       "   tStationEquipment.EquipmentTypeID = tEquipmentType.ID";
                _context.Equipments.FromSqlRaw(sql).ToList<Equipment>();

                sql = "SELECT [tStationLoop].[ID] " +
                         "      ,tStationLoop.[Name] " +
                         "      ,[AbbrName] " +
                         "      ,tStationDeviceCollectDataType.BrandName " +
                         "      ,[StationID] " +
                         "      ,[Caliber] " +
                         "      ,tStationDeviceCollectDataType.CollectType " +
                         "      ,CollectDataTypeID " +
                         "      ,tFlowmeterType.Name as FlowmeterType " +
                          "  	,FlowmeterManufacturer " +
                          " 	,FlowComputerManufacturer " +
                           "  	,FlowmeterModel " +
                          " 	,FlowComputerModel " +
                           " 	,Customer " +
                         "  FROM [tStationLoop] " +
                         "  inner join " +
                         "  tStationDeviceCollectDataType " +
                         "  on " +
                         "  tStationDeviceCollectDataType.ID=[CollectDataTypeID]" +
                         "  inner join " +
                         "  tFlowmeterType " +
                         "  on " +
                         "  tFlowmeterType.ID=[FlowmeterTypeID]";
                var loops = _context.Loops.FromSqlRaw(sql).ToList<Loop>();

                sql = "select CONVERT(int,a.ID) as ID,a.Name,a.TrendGroupID ,a.LoopID from (select tTrendGroup.ID as TrendGroupID, tTrendGroup.CollectDataTypeID,tTrendGroup.Name, tStationLoop.ID as LoopID,row_number() over(order by tTrendGroup.CollectDataTypeID)as ID from tTrendGroup   inner join  " +
                       "tStationLoop " +
                       "on " +
                        "tStationLoop.CollectDataTypeID = tTrendGroup.CollectDataTypeID) as a";
                _context.TrendGroups.FromSqlRaw(sql).ToList<TrendGroup>();
                sql = "SELECT [CompanyID] AS ID" +
                         "    ,[tCompany].Name " +
                         "    ,[tCompany].AbbrName " +
                         "    ,[tCompany].FullName " +
                         "    ,UserID " +
                         "FROM [tUserCompany] " +
                         "inner join " +
                         "tCompany " +
                         "on " +
                         "[tCompany].ID=[tUserCompany].[CompanyID] " +
                         "where " +
                         "tUserCompany.[UserID]= {0} ";
                sql = string.Format(sql, user.ID.ToString());
                user.companies = _context.companies.FromSqlRaw(sql).ToList<Company>();
                user.LoopNumber = loops.Count;

                return "OK";
            }
            catch (Exception ex)
            {
                return "DatabaseError";
            }
        }

        public string GetUserbyLogin(ref User user, string username, string password)
        {
            try
            {
                string sql = "SELECT  " +
                             " [tUser].[ID] " +
                             " ,[tUser].[Name] " +
                             " ,[Password] " +
                             " ,[PersonName] " +
                             " ,[ContactNumber] " +
                             " ,tRole.Name as RoleName " +
                             "  FROM[tUser] " +
                             "  inner join " +
                             "  tRole " +
                             "  on tRole.ID =[RoleID] " +
                             "  where [tUser].[Name] = '{0}'";
                sql = string.Format(sql, username);
                List<User> userList = _context.Users.FromSqlRaw(sql).ToList<User>();
                if (userList.Count > 0)
                {
                    user = userList.First();

                    if (EncryptString(user.Password) == password)
                    {
                        return "OK";
                    }
                    else
                    {
                        return "LogFailed";
                    }

                }
                else
                {
                    return "NoSuchUser";
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
                return "DatabaseError";
            }
        }

        public void AddUserLogRecord(UserLogRecord userLogRecord)
        {
            try
            {
                string Sql = @"INSERT INTO [dbo].[tUserLogRecord]([UserName],[DateTime],[Description]) VALUES('{0}','{1}','{2}')";
                Sql = string.Format(Sql, userLogRecord.UserName, userLogRecord.DateTime, userLogRecord.Description);
                _context.Database.ExecuteSqlRaw(Sql);
            }
            catch (Exception ex)
            {
            }

        }

        public IEnumerable<UserLogRecord> GetUserLogRecords(int userID, string startDateTime, string endDateTime)
        {
            List<UserLogRecord> userLogRecord = new List<UserLogRecord>();

            string Sql = @"SELECT  [ID],[UserName],[DateTime] ,[Description]
                              FROM [CBMDB].[dbo].[tUserLogRecord] 
                               where [DateTime]<='{1}' and [DateTime]>='{0}' order by DateTime desc";
            Sql = string.Format(Sql, startDateTime, endDateTime);
            return _context.UserLogRecords.FromSqlRaw(Sql);
        }
        public static string EncryptString(string str)
        {
            MD5 md5 = MD5.Create();
            // 将字符串转换成字节数组
            byte[] byteOld = Encoding.UTF8.GetBytes(str);
            // 调用加密方法
            byte[] byteNew = md5.ComputeHash(byteOld);
            // 将加密结果转换为字符串
            StringBuilder sb = new StringBuilder();
            foreach (byte b in byteNew)
            {
                // 将字节转换成16进制表示的字符串，
                sb.Append(b.ToString("x2"));
            }
            // 返回加密的字符串
            return sb.ToString();
        }
    }
}
