using System;
using System.Collections.Generic;
using OPCAutomation;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IOPCClientService
    {
        public void SetOPCItems(List<Tag> tags);
        public List<OpcItem> GetAllOPCItems();

        //public void ReadAllValues();
        public void Run();
    }
}
