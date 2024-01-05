using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Respository
{
    public interface IInfluxDBHistoricalDataRespository
    {
        public  Task<List<List<InfluxDBData>>> GetHistoricalData(string bucket,
                                                                 DateTime startTime,
                                                                 DateTime endTime,
                                                                 string measurement,
                                                                 int interval,
                                                                 List<Trend> trends);
    }
}
