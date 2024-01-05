using Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Text;
using Respository;
using System.Linq;
using System.Timers;
using System.ComponentModel;

namespace Services
{
    public class PDBService : IPDBService
    {
        public List<Tag> _tags = new List<Tag>();

        private readonly IPDBRespository _PDBRespository;
        private readonly IOPCClientService _OPCClientService;
        private Timer _tmrUpdate;
        public PDBService(IConfiguration configuration, IOPCClientService OPCClientService)
        {
            _PDBRespository = new PDBResposiory();
            _OPCClientService = OPCClientService;
            _tags = _PDBRespository.GetTags(configuration["IFIXNodeName"]).ToList<Tag>();
        }

        public PDBService(IPDBRespository PDBRespository)
        {
            _PDBRespository = PDBRespository;
        }

        private void Update_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            int i;
            List<OpcItem> OPCItems = _OPCClientService.GetAllOPCItems();
            for (i = 0; i < OPCItems.Count; i++)
            {
                _tags[i].Value = OPCItems[i].Value;
                _tags[i].Quality = OPCItems[i].Quality;
            }
        }

        public List<Tag> GetAllPDBTags()
        {
            return _tags;
        }

        //public Task<Dictionary<string, Dictionary<string, Dictionary<string, Tag>>>> GetPDBTagsByStation(Station station)
        //{

        //    return Task.Run(() =>
        //    {
        //        Dictionary<string, Dictionary<string, Dictionary<string, Tag>>> tags = new Dictionary<string, Dictionary<string, Dictionary<string, Tag>>>();
        //        List<Tag> stationTags = _tags.FindAll(tag => tag.Name.Split('_')[0] == station.AbbrName);
        //        Dictionary<string, Dictionary<string, Tag>> loopTags = new Dictionary<string, Dictionary<string, Tag>>();
        //        foreach (Loop loop in station.Loops)
        //        {
        //            loopTags[loop.AbbrName] = stationTags.FindAll(tag => tag.Name.Split('_')[1] == loop.AbbrName).ToDictionary(key => key.Name, value => value);
        //        }
        //        tags["Loop"] = loopTags;
        //        Dictionary<string, Dictionary<string, Tag>> EquipmentTags = new Dictionary<string, Dictionary<string, Tag>>();
        //        foreach (Equipment equipment in station.Equipments)
        //        {
        //            EquipmentTags[equipment.AbbrName] = stationTags.FindAll(tag => tag.Name.Split('_')[1] == equipment.AbbrName).ToDictionary(key => key.Name, value => value);
        //        }
        //        tags["Equipment"] = EquipmentTags;
        //        return tags;
        //    });
        //}

        public Task<List<Tag>> GetPDBTagsByStation(Station station)
        {
            return Task.Run(() =>
            {
                List<Tag> stationTags = _tags.FindAll(tag => tag.Name.Split('_')[0] == station.AbbrName);
                return stationTags;
            });
        }

        public Task<IEnumerable<Tag>> GetTagsByStationOffice(Station station)
        {
            return Task.Run(() => _PDBRespository.GetTagsByStation(station.AbbrName));
        }

        public Task<Dictionary<string, Tag>> GetPDBTags(List<string> TagNames)
        {
            return Task.Run(() =>
            {
                Dictionary<string, Tag> tags = new Dictionary<string, Tag>();
                Dictionary<string, Tag> allTags = _tags.ToDictionary(key => key.Name, value => value);
                foreach (string key in TagNames)
                {
                    tags[key] = allTags[key];
                }
                return tags;
            });
        }
        public void Run()
        {
            _tmrUpdate = new System.Timers.Timer(30000);
            //Globe.writeLog("Watch Dog Start");
            _tmrUpdate.Elapsed += new ElapsedEventHandler(Update_Elapsed);
            _tmrUpdate.Enabled = true;
            _tmrUpdate.AutoReset = true;
            Update_Elapsed(null, null);
        }

    }
}
