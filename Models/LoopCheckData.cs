using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    /// <summary>
    /// 用于区分诊断数据是Loop还是Equipment，不是诊断的具体内容
    /// </summary>
    [Keyless]
    public class LoopCheckData
    {
        public int HisID { get; set; }
        public string DateTime { get; set; }
        public int LoopID { get; set; }
        public string LoopName { get; set; }
        public string StationName { get; set; }
        public string BrandName { get; set; }
        public string CheckDataStatus { get; set; }
        public string ReportMode { get; set; }
        public string LineName { get; set; }
        public string Customer { get; set; }
        public string FlowmeterModel { get; set; }
    }
}
