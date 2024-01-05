using Models;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Respository;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CheckDataService : ICheckDataService
    {
        public readonly ICheckDataRespository _checkDataRespository;

        public CheckDataService(ICheckDataRespository checkDataRespository)
        {
            _checkDataRespository = checkDataRespository;
        }

        public Task<IEnumerable<LoopCheckData>> GetHistoricalLoopCheckReport(string loopID, string brandName, string startDateTime, string endDateTime)
        {
            return Task.Run(() => _checkDataRespository.GetHistoricalLoopCheckReport(loopID, brandName, startDateTime, endDateTime));
        }

        public Task<IEnumerable<LoopCheckData>> GetHistoricalFlowrateCheckReport(string loopID, string brandName, string startDateTime, string endDateTime)
        {
            return Task.Run(() => _checkDataRespository.GetHistoricalFlowrateCheckReport(loopID, brandName, startDateTime, endDateTime));
        }

        public Task<IEnumerable<LoopCheckData>> GetHistoricalVOSCheckReport(string loopID, string brandName, string startDateTime, string endDateTime)
        {
            return Task.Run(() => _checkDataRespository.GetHistoricalVOSCheckReport(loopID, brandName, startDateTime, endDateTime));
        }

        public Task<IEnumerable<EquipmentCheckData>> GetHistoricalGCCheckReport(string equipmentID, string brandName, string startDateTime, string endDateTime)
        {
            return Task.Run(() => _checkDataRespository.GetHistoricalGCCheckReport(equipmentID, brandName, startDateTime, endDateTime));
        }

        public Task<IEnumerable<LoopCheckData>> GetRealtimeFlowrateCheckReport(string loopID, string brandName)
        {
            return Task.Run(() => _checkDataRespository.GetRealtimeFlowrateCheckReport(loopID, brandName));
        }

        public Task<IEnumerable<LoopCheckData>> GetRealtimeVOSCheckReport(string loopID, string brandName)
        {
            return Task.Run(() => _checkDataRespository.GetRealtimeVOSCheckReport(loopID, brandName));
        }

        public Task<IEnumerable<DataItem>> GetRealtimeFRCheckData(string loopID, string brandName)
        {
            return Task.Run(() => _checkDataRespository.GetRealtimeFRCheckData(loopID, brandName));
        }

        public Task<IEnumerable<VOSKeyCheckData>> GetVOSKeyCheckData(string loopIDs, string startDateTime, string endDateTime)
        {
            return Task.Run(() => _checkDataRespository.GetVOSKeyCheckData(loopIDs, startDateTime, endDateTime));
        }
        public Task<byte[]> ExportVOSKeyCheckData(List<VOSKeyCheckData> VOSKeyCheckDatas, string templatePath)
        {
            byte[] result = null;
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            FileInfo existingFile = new FileInfo(templatePath);
            using (ExcelPackage package = new ExcelPackage(existingFile))
            {
                ExcelWorksheet workSheet = package.Workbook.Worksheets[0];
                #region 导出内容
                for (int a = 0; a < VOSKeyCheckDatas.Count; a++)
                {
                    //序号
                    workSheet.Cells[a + 2, 1].Value = a + 1;
                    workSheet.Cells[a + 2, 1].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 1].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 1].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                    //场站                                                                             
                    workSheet.Cells[a + 2, 2].Value = VOSKeyCheckDatas[a].StationName;
                    workSheet.Cells[a + 2, 2].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 2].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 2].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                    //回路                                                                     
                    workSheet.Cells[a + 2, 3].Value = VOSKeyCheckDatas[a].LoopName;
                    workSheet.Cells[a + 2, 3].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 3].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 3].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //时间                                                                               
                    workSheet.Cells[a + 2, 4].Value = VOSKeyCheckDatas[a].Datetime;
                    workSheet.Cells[a + 2, 4].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 4].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 4].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 4].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //品牌                                                                              
                    workSheet.Cells[a + 2, 5].Value = VOSKeyCheckDatas[a].BrandName;
                    workSheet.Cells[a + 2, 5].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 5].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 5].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //诊断结果                                                                              
                    workSheet.Cells[a + 2, 6].Value = VOSKeyCheckDatas[a].Result;
                    workSheet.Cells[a + 2, 6].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 6].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 6].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //核查状态                                                                              
                    workSheet.Cells[a + 2, 7].Value = VOSKeyCheckDatas[a].CheckDataStatus;
                    workSheet.Cells[a + 2, 7].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 7].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 7].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //用户                                                                              
                    workSheet.Cells[a + 2, 8].Value = VOSKeyCheckDatas[a].Customer;
                    workSheet.Cells[a + 2, 8].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 8].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 8].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //口径                                                                              
                    workSheet.Cells[a + 2, 9].Value = VOSKeyCheckDatas[a].Caliber;
                    workSheet.Cells[a + 2, 9].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 9].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 9].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //工况流量                                                                              
                    workSheet.Cells[a + 2, 10].Value = VOSKeyCheckDatas[a].GrossFlowRate;
                    workSheet.Cells[a + 2, 10].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 10].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 10].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 10].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //温度                                                                              
                    workSheet.Cells[a + 2, 11].Value = VOSKeyCheckDatas[a].Temperature;
                    workSheet.Cells[a + 2, 11].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 11].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 11].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 11].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //压力                                                                              
                    workSheet.Cells[a + 2, 12].Value = VOSKeyCheckDatas[a].Pressure;
                    workSheet.Cells[a + 2, 12].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 12].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 12].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 12].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //A/1声道声速                                                                              
                    workSheet.Cells[a + 2, 13].Value = VOSKeyCheckDatas[a].Path1VOS;
                    workSheet.Cells[a + 2, 13].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 13].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 13].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //B/2声道声速                                                                              
                    workSheet.Cells[a + 2, 14].Value = VOSKeyCheckDatas[a].Path2VOS;
                    workSheet.Cells[a + 2, 14].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 14].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 14].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 14].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //C/3声道声速                                                                              
                    workSheet.Cells[a + 2, 15].Value = VOSKeyCheckDatas[a].Path3VOS;
                    workSheet.Cells[a + 2, 15].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 15].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 15].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 15].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //D/4声道声速                                                                              
                    workSheet.Cells[a + 2, 16].Value = VOSKeyCheckDatas[a].path4VOS;
                    workSheet.Cells[a + 2, 16].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 16].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 16].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 16].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //测量声速                                                                              
                    workSheet.Cells[a + 2, 17].Value = VOSKeyCheckDatas[a].VOSAverage;
                    workSheet.Cells[a + 2, 17].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 17].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 17].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 17].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //理论声速                                                                              
                    workSheet.Cells[a + 2, 18].Value = VOSKeyCheckDatas[a].FCCalculateVOS;
                    workSheet.Cells[a + 2, 18].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 18].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 18].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 18].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //声速偏差 scope.row.vosCheckRateStatus == 0 || scope.row.vosCheckRateStatus == 'N/A'                                                                             
                    workSheet.Cells[a + 2, 19].Value = VOSKeyCheckDatas[a].VOSCheckRate;
                    if (VOSKeyCheckDatas[a].VOSCheckRateStatus == 0 || VOSKeyCheckDatas[a].VOSCheckRateStatus == null)
                        workSheet.Cells[a + 2, 19].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    else
                        workSheet.Cells[a + 2, 19].Style.Font.Color.SetColor(Color.Red);//字体颜色
                    workSheet.Cells[a + 2, 19].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 19].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 19].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //声道声速偏差                                                                              
                    workSheet.Cells[a + 2, 20].Value = VOSKeyCheckDatas[a].PathsVOSMaxDeviationReferenceVOSAverage;
                    workSheet.Cells[a + 2, 20].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    workSheet.Cells[a + 2, 20].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 20].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 20].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //剖面系数                                                                              
                    workSheet.Cells[a + 2, 21].Value = VOSKeyCheckDatas[a].ProfileFactor;
                    if (VOSKeyCheckDatas[a].ProfileFactorStatus == 0 || VOSKeyCheckDatas[a].ProfileFactorStatus == null)
                        workSheet.Cells[a + 2, 21].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    else
                        workSheet.Cells[a + 2, 21].Style.Font.Color.SetColor(Color.Red);//字体颜色
                    workSheet.Cells[a + 2, 21].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 21].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 21].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //上行增益                                                                              
                    workSheet.Cells[a + 2, 22].Value = VOSKeyCheckDatas[a].GainUp;
                    if (VOSKeyCheckDatas[a].GainUpStatus == 0 || VOSKeyCheckDatas[a].GainUpStatus == null)
                        workSheet.Cells[a + 2, 22].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    else
                        workSheet.Cells[a + 2, 22].Style.Font.Color.SetColor(Color.Red);//字体颜色
                    workSheet.Cells[a + 2, 22].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 22].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 22].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //下行增益                                                                              
                    workSheet.Cells[a + 2, 23].Value = VOSKeyCheckDatas[a].GainDown;
                    if (VOSKeyCheckDatas[a].GainDownStatus == 0 || VOSKeyCheckDatas[a].GainDownStatus == null)
                        workSheet.Cells[a + 2, 23].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    else
                        workSheet.Cells[a + 2, 23].Style.Font.Color.SetColor(Color.Red);//字体颜色
                    workSheet.Cells[a + 2, 23].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 23].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 23].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //上行信噪比                                                                              
                    workSheet.Cells[a + 2, 24].Value = VOSKeyCheckDatas[a].SNRUp;
                    if (VOSKeyCheckDatas[a].SNRUpStatus == 0 || VOSKeyCheckDatas[a].SNRUpStatus == null)
                        workSheet.Cells[a + 2, 24].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    else
                        workSheet.Cells[a + 2, 24].Style.Font.Color.SetColor(Color.Red);//字体颜色
                    workSheet.Cells[a + 2, 24].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 24].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 24].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //下行信噪比                                                                              
                    workSheet.Cells[a + 2, 25].Value = VOSKeyCheckDatas[a].SNRDown;
                    if (VOSKeyCheckDatas[a].SNRUpStatus == 0 || VOSKeyCheckDatas[a].SNRUpStatus == null)
                        workSheet.Cells[a + 2, 25].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    else
                        workSheet.Cells[a + 2, 25].Style.Font.Color.SetColor(Color.Red);//字体颜色
                    workSheet.Cells[a + 2, 25].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 25].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 25].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //接受率                                                                              
                    workSheet.Cells[a + 2, 26].Value = VOSKeyCheckDatas[a].Performance;
                    if (VOSKeyCheckDatas[a].PerformanceStatus == 0 || VOSKeyCheckDatas[a].PerformanceStatus == null)
                        workSheet.Cells[a + 2, 26].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    else
                        workSheet.Cells[a + 2, 26].Style.Font.Color.SetColor(Color.Red);//字体颜色
                    workSheet.Cells[a + 2, 26].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 26].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 26].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//

                    //漩涡角                                                                              
                    workSheet.Cells[a + 2, 27].Value = VOSKeyCheckDatas[a].SwirlAngle1;
                    if (VOSKeyCheckDatas[a].SwirlAngle1Status == 0 || VOSKeyCheckDatas[a].SwirlAngle1Status == null)
                        workSheet.Cells[a + 2, 27].Style.Font.Color.SetColor(Color.Black);//字体颜色
                    else
                        workSheet.Cells[a + 2, 27].Style.Font.Color.SetColor(Color.Red);//字体颜色
                    workSheet.Cells[a + 2, 27].Style.Font.Name = "SimSun";//字体
                    workSheet.Cells[a + 2, 27].Style.Font.Size = 10;//字体大小
                    workSheet.Cells[a + 2, 27].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;//
                }
                #endregion

                result = package.GetAsByteArray();


                return Task.Run(() => result);
            }
        }

        public Task<IEnumerable<ProductionReport>> GetProductionReportData(string loopID, string startDateTime, string endDateTime)
        {
            return Task.Run(() => _checkDataRespository.GetProductionReportData(loopID, startDateTime, endDateTime));
        }

        public Task<LoopUncertain> GetLoopUncertain(string loopID)
        {
            return Task.Run(() => _checkDataRespository.GetLoopUncertain(loopID));
        }
    }
}
