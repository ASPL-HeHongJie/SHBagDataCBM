using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq;


namespace Respository
{
    public class PDBResposiory:IPDBRespository
    {
        private readonly SQLServerDBContext _context;

        public PDBResposiory()
        {
            var Options = new DbContextOptionsBuilder<SQLServerDBContext>();
            IConfiguration Configuration = new ConfigurationBuilder().Add(new Microsoft.Extensions.Configuration.Json.JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true }).Build();
            Options.UseSqlServer(Configuration.GetConnectionString("SQLConnection"));
            _context = new SQLServerDBContext(Options.Options);
        }
        public IEnumerable<Tag> GetTags(string IFIXNodeName)
        {
            string sql = "SELECT [tStation].[AbbrName]+'_'+[tStationLoop].[AbbrName]+'_'+[tTag].[Name] as [Name] " +
                         "      ,[tCollector].[IFixNodeName]+'.'+[tStation].[AbbrName]+'_'+[tStationLoop].[AbbrName]+'_'+[tTag].[Address] as [Address] " +
                          ", '????' AS Value  " +
                          ", 'Uncertain' AS Quality  " +
                         "FROM[tTag] " +
                         "inner join " +
                         "tStationLoop " +
                         "on " +
                         "tStationLoop.CollectDataTypeID=[tTag].[StationDeviceCollectID] " +
                         "inner join " +
                         "tStation " +
                         "on " +
                         "tStation.ID= tStationLoop.StationID " +
                         " inner join " +
                         "tCollector " +
                         "on " +
                         "tCollector.ID= tStation.CollectorID " +
                         "where " +
                         "tCollector.IFixNodeName= N'{0}'" +
                         "Union " +
                         "SELECT [tStation].[AbbrName]+'_'+[tStationEquipment].[AbbrName]+'_'+[tTag].[Name] as [Name] " +
                         "      ,[tCollector].[IFixNodeName]+'.'+[tStation].[AbbrName]+'_'+[tStationEquipment].[AbbrName]+'_'+[tTag].[Address] as [Address] " +
                         " , '????' AS Value  " +
                         " , 'Uncertain' AS Quality  " +
                         "FROM[tTag] " +
                         "inner join " +
                         "tStationEquipment " +
                         "on " +
                         "tStationEquipment.CollectDataTypeID=[tTag].[StationDeviceCollectID] " +
                         "inner join " +
                         "tStation " +
                         "on " +
                         "tStation.ID= tStationEquipment.StationID " +
                         " inner join " +
                         "tCollector " +
                         "on " +
                         "tCollector.ID= tStation.CollectorID " +
                         "where " +
                         "tCollector.IFixNodeName= N'{0}'";                         ;
            sql = string.Format(sql, IFIXNodeName);
            return _context.Tags.FromSqlRaw(sql);
        }

        public IEnumerable<Tag> GetTagsByStation(string StationAbbrName)
        {
            string Sql = "SELECT  [Name],[Address] ,[Quality],[Value] FROM [tRealtimeTagData]  WITH (NOLOCK)     where name like '%{0}%' order by [Name]";
            Sql = string.Format(Sql, StationAbbrName);
            return _context.Tags.FromSqlRaw(Sql);
        }

        public Tag GetTag(string TagName)
        {
            string Sql = "SELECT  [Name],[Address] ,[Quality],[Value] FROM [tRealtimeTagData] where name = '{0}'";
            Sql = string.Format(Sql, TagName);
            return _context.Tags.FromSqlRaw(Sql).First();
        }
    }
}
