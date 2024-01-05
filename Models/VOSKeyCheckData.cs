using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Models
{
	[Keyless]
	public class VOSKeyCheckData
	{
		public string CompanyName { get; set; }
		public string AreaName { get; set; }
		public string StationName { get; set; }
		public string LoopName { get; set; }
		public string Caliber { get; set; }
		public string LineName { get; set; }
		public string FlowmeterModel { get; set; }
		public string Customer { get; set; }
		public string Datetime { get; set; }
		public string BrandName { get; set; }
		public string? GrossFlowRate { get; set; }
		public string? Temperature { get; set; }
		public string? Pressure { get; set; }
		public string? Path1VOS { get; set; }
		public string? Path2VOS { get; set; }
		public string? Path3VOS { get; set; }
		public string? path4VOS { get; set; }
		public string? VOSAverage { get; set; }
		public string? FCCalculateVOS { get; set; }
		public string? VOSCheckRate { get; set; }
		public int? VOSCheckRateStatus { get; set; }
		public string? PathsVOSMaxDeviationReferenceVOSAverage { get; set; }
		public string? ProfileFactor { get; set; }
		public int? ProfileFactorStatus { get; set; }
		public string? GainUp { get; set; }
		public int? GainUpStatus { get; set; }
		public string? GainDown { get; set; }
		public int? GainDownStatus { get; set; }
		public string? SNRUp { get; set; }
		public int? SNRUpStatus { get; set; }
		public string? SNRDown { get; set; }
		public int? SNRDownStatus { get; set; }
		public string? Performance { get; set; }
		public int? PerformanceStatus { get; set; }
		public string? SwirlAngle1 { get; set; }
		public int? SwirlAngle1Status { get; set; }
		public string? SwirlAngle2 { get; set; }
		public int? SwirlAngle2Status { get; set; }
		public string? SwirlAngle3 { get; set; }
		public int? SwirlAngle3Status { get; set; }
		public string? Result { get; set; }
		public string? CheckDataStatus { get; set; }
	}
}
