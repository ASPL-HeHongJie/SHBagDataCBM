using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public interface IStationService
    {
        public Task<Dictionary<string, object>> GetStationData(Station station);
    }
}
