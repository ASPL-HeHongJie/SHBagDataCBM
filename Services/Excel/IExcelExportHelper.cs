using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Threading.Tasks;

namespace Services
{
    public interface IExcelExportHelper
    {
        public string ExcelContentType { get; }
        public DataTable ListToDataTable<T>(List<T> data, string[] columnNames);
        public byte[] ExportExcel(DataTable dataTable, string templatePath, int startRowFrom, bool showSrNo = false);
        public Task<byte[]> ExportExcel<T>(List<T> data, string[] columnNames, string templatePath, int startRowFrom = 2, bool isShowSlNo = false);
    }
}
