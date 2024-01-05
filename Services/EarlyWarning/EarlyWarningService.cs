using Microsoft.EntityFrameworkCore.ChangeTracking;
using Models;
using Respository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using GeFanuc.iFixToolkit.Adapter;
using Microsoft.Extensions.Configuration;
using System.Collections;
using OfficeOpenXml;
using System.IO;
using System.Data;
using System.Reflection;
using OfficeOpenXml.Style;
using System.Drawing;
using OfficeOpenXml.Drawing;

namespace Services
{
    public class EarlyWarningService : IEarlyWarningService
    {
        private IEarlyWarningRespository _earlyWarningRespository;
        private readonly IConfiguration _configuration;
        public EarlyWarningService(IEarlyWarningRespository earlyWarningRespository, IConfiguration configuration)
        {
            _earlyWarningRespository = earlyWarningRespository;
            _configuration = configuration;
        }

        public Task<IEnumerable<EarlyWarning>> GetEarlyWarning(List<int> loopIDs, List<string> status)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarning(loopIDs, status));
        }

        public Task<IEnumerable<EarlyWarningDetail>> GetEarlyWarningDetail(int loopID)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarningDetail(loopID));
        }
        public Task<IEnumerable<EarlyWarningStatistics>> GetEarlyWarningStatistics(List<int> loopIDs, List<string> status)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarningStatistics(loopIDs, status));
        }

        public Task<IEnumerable<EarlyWarningDetailRecord>> GetEarlyWarningDetailRecords(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarningDetailRecords(loopIDs, beginDateTime, endDateTime));
        }

        public Task<IEnumerable<EarlyWarningDetailRecordStatistics>> GetEarlyWarningDetailRecordStatistics(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarningDetailRecordStatistics(loopIDs, beginDateTime, endDateTime));
        }
        public Task<Dictionary<string, object>> GetEarlyWarningDetailRecordByBrandStatistics(List<int> collectDataTypeIDs, DateTime beginDateTime, DateTime endDateTime, List<int> companyIDs)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarningDetailRecordByBrandStatistics(collectDataTypeIDs, beginDateTime, endDateTime, companyIDs));
        }

        public Task<Dictionary<string, object>> GetEarlyWarningNotificationRate(List<int> collectDataTypeIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarningNotificationRate(collectDataTypeIDs, beginDateTime, endDateTime));
        }

        public Task<Dictionary<string, object>> BigDataAnalysisOverview(DateTime beginDateTime, DateTime endDateTime)
        {
            return Task.Run(() => _earlyWarningRespository.BigDataAnalysisOverview(beginDateTime, endDateTime));
        }

        public Task<byte[]> ExportEarlyWarningNotificationRate(List<EarlyWarningNotificationRate> notificationRate, List<NotificationRateBrandStatistics> statisticsList, string[] columnNames, string templatePath, string imagePath, int startRowFrom = 2, bool isShowSlNo = false)
        {
            return Task.Run(() =>
            {
                DataTable dataTable = ListToDataTable<EarlyWarningNotificationRate>(notificationRate, columnNames);
                string[] StatisticsListcolumnNames = { "BrandName", "NotificationRate" };
                DataTable StatisticsdataTable = ListToDataTable<NotificationRateBrandStatistics>(statisticsList, StatisticsListcolumnNames);
                byte[] result = null;
                ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
                FileInfo existingFile = new FileInfo(templatePath);
                using (ExcelPackage package = new ExcelPackage(existingFile))
                {
                    ExcelWorksheet workSheet = package.Workbook.Worksheets[0];




                    #region 统计

                    //统计是否显示行编号
                    if (isShowSlNo)
                    {
                        DataColumn dataColumn = StatisticsdataTable.Columns.Add("#", typeof(int));
                        dataColumn.SetOrdinal(0);
                        int index = 1;
                        foreach (DataRow item in StatisticsdataTable.Rows)
                        {
                            item[0] = index;
                            index++;
                        }
                    }

                    workSheet.Cells["A" + 2].LoadFromDataTable(StatisticsdataTable, false);
                    // autofit width of cells with small content  
                    int columnIndex = 1;
                    foreach (DataColumn item in StatisticsdataTable.Columns)
                    {
                        ExcelRange columnCells = workSheet.Cells[workSheet.Dimension.Start.Row, columnIndex, workSheet.Dimension.End.Row, columnIndex];
                        //int maxLength = columnCells.Max(cell => cell.Value.ToString().Count());
                        //if (maxLength < 150)
                        //{
                        workSheet.Column(columnIndex).AutoFit();
                        //}
                        columnIndex++;
                    }

                    if (StatisticsdataTable.Rows.Count > 0)
                    {
                        using (ExcelRange r = workSheet.Cells[2, 1, 2 + StatisticsdataTable.Rows.Count - 1, StatisticsdataTable.Columns.Count])
                        {
                            r.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                            r.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            r.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            r.Style.Border.Right.Style = ExcelBorderStyle.Thin;

                            r.Style.Border.Top.Color.SetColor(System.Drawing.Color.Black);
                            r.Style.Border.Bottom.Color.SetColor(System.Drawing.Color.Black);
                            r.Style.Border.Left.Color.SetColor(System.Drawing.Color.Black);
                            r.Style.Border.Right.Color.SetColor(System.Drawing.Color.Black);
                        }
                    }
                    #endregion

                    #region 详细

                    //是否显示行编号
                    if (isShowSlNo)
                    {
                        DataColumn dataColumn = dataTable.Columns.Add("#", typeof(int));
                        dataColumn.SetOrdinal(0);
                        int index = 1;
                        foreach (DataRow item in dataTable.Rows)
                        {
                            item[0] = index;
                            index++;
                        }
                    }

                    //Add Content Into the Excel File
                    workSheet.Cells["A" + startRowFrom].LoadFromDataTable(dataTable, false);
                    // autofit width of cells with small content  
                    columnIndex = 1;
                    foreach (DataColumn item in dataTable.Columns)
                    {
                        ExcelRange columnCells = workSheet.Cells[workSheet.Dimension.Start.Row, columnIndex, workSheet.Dimension.End.Row, columnIndex];
                        //int maxLength = columnCells.Max(cell => cell.Value.ToString().Count());
                        //if (maxLength < 150)
                        //{
                        workSheet.Column(columnIndex).AutoFit();
                        //}
                        columnIndex++;
                    }

                    if (dataTable.Rows.Count > 0)
                    {
                        using (ExcelRange r = workSheet.Cells[startRowFrom, 1, startRowFrom + dataTable.Rows.Count - 1, dataTable.Columns.Count])
                        {
                            r.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                            r.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            r.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            r.Style.Border.Right.Style = ExcelBorderStyle.Thin;

                            r.Style.Border.Top.Color.SetColor(System.Drawing.Color.Black);
                            r.Style.Border.Bottom.Color.SetColor(System.Drawing.Color.Black);
                            r.Style.Border.Left.Color.SetColor(System.Drawing.Color.Black);
                            r.Style.Border.Right.Color.SetColor(System.Drawing.Color.Black);
                        }
                    }
                    #endregion


                    Bitmap picture1 = new Bitmap(imagePath);
                    ExcelPicture picture = workSheet.Drawings.AddPicture("Image", picture1);//插入图片
                    picture.SetPosition(10, 1000);//设置图片的位置
                    picture.SetSize(500, 500);//设置图片的大小
                    picture1.Dispose();
                    picture.Dispose();
                    result = package.GetAsByteArray();
                }
                return result;
            });
        }

        public Task<List<HistoricalEarlyWarning>> GetEarlyWarningAccuracys(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarningAccuracys(loopIDs, beginDateTime, endDateTime));
        }
        public Task<string> UpdateEarlyWarningAccuracy(int id, string sceneSolution)
        {
            return Task.Run(() => _earlyWarningRespository.UpdateEarlyWarningAccuracy(id, sceneSolution));
        }
        public Task<List<EarlyWarningAccuracyStatistics>> GetEarlyWarningAccuracyStatistics(List<int> loopIDs, DateTime beginDateTime, DateTime endDateTime)
        {
            return Task.Run(() => _earlyWarningRespository.GetEarlyWarningAccuracyStatistics(loopIDs, beginDateTime, endDateTime));
        }

        /// <summary>
        /// List转DataTable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public DataTable ListToDataTable<T>(List<T> data, string[] columnNames)
        {

            List<PropertyInfo> properties = new List<PropertyInfo>();
            DataTable dataTable = new DataTable();
            foreach (string colName in columnNames)
            {
                PropertyInfo property = typeof(T).GetProperty(colName);
                properties.Add(property);
                dataTable.Columns.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
            }

            object[] values = new object[properties.Count];
            foreach (T item in data)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    values[i] = properties[i].GetValue(item);
                }

                dataTable.Rows.Add(values);
            }
            return dataTable;
        }
    }
}
