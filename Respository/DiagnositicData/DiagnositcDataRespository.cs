using Microsoft.Data.SqlClient.Server;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Text;

namespace Respository
{
    public class DiagnositcDataRespository : IDiagnosticDataRespository
    {
        private readonly SQLServerDBContext _context;
        public DiagnositcDataRespository(SQLServerDBContext context)
        {
            _context = context;
        }
        public IEnumerable<LoopDiagnosticData> GetLoopDiagnosticDataByStation(string stationID)
        {
            string sql = "Exec [dbo].[pr_GetRealtimeDiagnosticData] 'Loop',{0}";
            sql = string.Format(sql, stationID);
            //IEnumerable<LoopDiagnosticData> a = _context.LoopDiagnositcDatas.FromSqlRaw(Sql);
            return _context.LoopDiagnosticDatas.FromSqlRaw(sql);
        }
        public IEnumerable<EquipmentDiagnosticData> GetEquipmentDiagnosticDataByStation(string stationID)
        {
            string sql = "Exec [dbo].[pr_GetRealtimeDiagnosticData] 'Equipment',{0}";
            sql = string.Format(sql, stationID);
            return _context.EquipmentDiagnosticDatas.FromSqlRaw(sql);
        }
        public IEnumerable<DiagnosticDataDetail> GetFlowMeterDiagnosticDataDetail(string loopID, string brandName)
        {
            string sql = "";
            switch (brandName)
            {
                case "Daniel":
                    {
                        sql = "select vals.Name,results.Result, vals.Value " +
                            "from " +
                            "( " +
                            "	select Name = attribute, Value = value " +
                            "	from " +
                            "	( " +
                            "		SELECT  convert(nvarchar,[v0]) AS[通讯状态], " +
                            "				convert(nvarchar,case when[P1] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v1], 2)) end) AS[报警(= 0)],  " +
                            "				convert(nvarchar,case when[P2] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v2], 3)) end) AS[温度(-20~100Deg.C)],  " +
                            "				convert(nvarchar,case when[P3] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v3]*1000, 3)) end) AS [压力(>1000KPa)],  " +
                            "				convert(nvarchar,case when[P4] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v4]) end) AS[声道 A1 信号接受率(> 85)],  " +
                            "				convert(nvarchar,case when[P5] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v5]) end) AS[声道 A2 信号接受率(> 85)],  " +
                             "				convert(nvarchar,case when[P6] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v6]) end) AS[声道 B1 信号接受率(> 85)],  " +
                            "				convert(nvarchar,case when[P7] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v7]) end) AS[声道 B2 信号接受率(> 85)],  " +
                            "				convert(nvarchar,case when[P8] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v8]) end) AS[声道 C1 信号接受率(> 85)], " +
                            "				convert(nvarchar,case when[P9] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v9]) end) AS[声道 C2 信号接受率(> 85)], " +
                            "				convert(nvarchar,case when[P10] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v10]) end) AS[声道 D1 信号接受率(> 85)],  " +
                            "				convert(nvarchar,case when[P11] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v11]) end) AS[声道 D2 信号接受率(> 85)],  " +
                            "				convert(nvarchar,case when[P12] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v12], 2)) end) AS[声道 A1 信号增益(< 95)], 	 " +
                            "				convert(nvarchar,case when[P13] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v13], 2)) end) AS[声道 A2 信号增益(< 95)],  " +
                            "				convert(nvarchar,case when[P14] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v14], 2)) end) AS[声道 B1 信号增益(< 95)], 	 " +
                            "				convert(nvarchar,case when[P15] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v15], 2)) end) AS[声道 B2 信号增益(< 95)],  " +
                            "				convert(nvarchar,case when[P16] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v16], 2)) end) AS[声道 C1 信号增益(< 95)], 	 " +
                            "				convert(nvarchar,case when[P17] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v17], 2)) end) AS[声道 C2 信号增益(< 95)],  " +
                            "				convert(nvarchar,case when[P18] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v18], 2)) end) AS[声道 D1 信号增益(< 95)], 	 " +
                            "				convert(nvarchar,case when[P19] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v19], 2)) end) AS[声道 D2 信号增益(< 95)],  " +
                            "				convert(nvarchar,case when[P20] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v20], 2)) end) AS[声道 A1 信噪比(> 27)],  " +
                            "				convert(nvarchar,case when[P21] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v21], 2)) end) AS[声道 A2 信噪比(> 27)],  " +
                            "				convert(nvarchar,case when[P22] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v22], 2)) end) AS[声道 B1 信噪比(> 27)],  " +
                            "				convert(nvarchar,case when[P23] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v23], 2)) end) AS[声道 B2 信噪比(> 27)],  " +
                            "				convert(nvarchar,case when[P24] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v24], 2)) end) AS[声道 C1 信噪比(> 27)],  " +
                            "				convert(nvarchar,case when[P25] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v25], 2)) end) AS[声道 C2 信噪比(> 27)],  " +
                            "				convert(nvarchar,case when[P26] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v26], 2)) end) AS[声道 D1 信噪比(> 27)],  " +
                            "				convert(nvarchar,case when[P27] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v27], 2)) end) AS[声道 D2 信噪比(> 27)],  " +
                            "				convert(nvarchar,case when[P28] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v28], 2)) end) AS[声道 A 声速偏差率(< 0.20 %)],  " +
                            "				convert(nvarchar,case when[P29] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v29], 2)) end) AS[声道 B 声速偏差率(< 0.20 %)],  " +
                            "				convert(nvarchar,case when[P30] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v30], 2)) end) AS[声道 C 声速偏差率(< 0.20 %)],  " +
                            "				convert(nvarchar,case when[P31] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v31], 2)) end) AS[声道 D 声速偏差率(< 0.20 %)],  " +
                            "				convert(nvarchar,case when[P32] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v32], 3)) end) AS[流量计算机计算声速偏差率(< 0.20 %)], " +
                            "				convert(nvarchar,case when[P33] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v33], 2)) end) AS[剖面系数],  " +
                            "				convert(nvarchar,case when[P34] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v34], 2)) end) AS[流速对称性(0.95 - 1.05)],  " +
                            "				convert(nvarchar,case when[P35] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v35], 2)) end) AS[流速交叉流(0.95 - 1.05)], " +
                            "				convert(nvarchar,case when[P36] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v36], 2)) end) AS[声道 A 脉动流(< 5.5 %)],  " +
                            "				convert(nvarchar,case when[P37] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v37], 2)) end) AS[声道 B 脉动流(< 2.5 %)],  " +
                            "				convert(nvarchar,case when[P38] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v38], 2)) end) AS[声道 C 脉动流(< 2.5 %)],  " +
                            "				convert(nvarchar,case when[P39] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v39], 2)) end) AS[声道 D 脉动流(< 5.5 %)],  " +
                            "				convert(nvarchar,case when[P40] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v40], 3)) end) AS[气体漩涡角(+/ -4°)] " +
                            "		FROM dbo.tRealtimeDiagnosticDataDanielFM " +
                            "		where   dbo.tRealtimeDiagnosticDataDanielFM.ID = {0} " +
                            "	) as tblValues " +
                            "	unpivot " +
                            "	( " +
                            "		value for attribute in([通讯状态], " +
                            "								[报警(= 0)], " +
                            "								[温度(-20~100Deg.C)], " +
                            "								[压力(>1000KPa)], " +
                            "								[声道 A1 信号接受率(> 85)], " +
                            "								[声道 A2 信号接受率(> 85)], " +
                            "								[声道 B1 信号接受率(> 85)], " +
                            "								[声道 B2 信号接受率(> 85)], " +
                            "								[声道 C1 信号接受率(> 85)], " +
                            "								[声道 C2 信号接受率(> 85)], " +
                            "								[声道 D1 信号接受率(> 85)], " +
                            "								[声道 D2 信号接受率(> 85)], " +
                            "								[声道 A1 信号增益(< 95)], " +
                            "								[声道 A2 信号增益(< 95)], " +
                            "								[声道 B1 信号增益(< 95)], " +
                            "								[声道 B2 信号增益(< 95)], " +
                            "								[声道 C1 信号增益(< 95)], " +
                            "								[声道 C2 信号增益(< 95)], " +
                            "								[声道 D1 信号增益(< 95)], " +
                            "								[声道 D2 信号增益(< 95)], " +
                            "								[声道 A1 信噪比(> 27)], " +
                            "								[声道 A2 信噪比(> 27)], " +
                            "								[声道 B1 信噪比(> 27)], " +
                            "								[声道 B2 信噪比(> 27)], " +
                            "								[声道 C1 信噪比(> 27)], " +
                            "								[声道 C2 信噪比(> 27)], " +
                            "								[声道 D1 信噪比(> 27)], " +
                            "								[声道 D2 信噪比(> 27)], " +
                            "								[声道 A 声速偏差率(< 0.20 %)], " +
                            "								[声道 B 声速偏差率(< 0.20 %)], " +
                            "								[声道 C 声速偏差率(< 0.20 %)], " +
                            "								[声道 D 声速偏差率(< 0.20 %)], " +
                            "								[流量计算机计算声速偏差率(< 0.20 %)], " +
                            "								[剖面系数], " +
                            "								[流速对称性(0.95 - 1.05)], " +
                            "								[流速交叉流(0.95 - 1.05)], " +
                            "								[声道 A 脉动流(< 5.5 %)], " +
                            "								[声道 B 脉动流(< 2.5 %)], " +
                            "								[声道 C 脉动流(< 2.5 %)], " +
                            "								[声道 D 脉动流(< 5.5 %)], " +
                            "								[气体漩涡角(+/ -4°)] " +
                            "								) " +
                            "	) UPV " +
                            ") as vals " +
                            "inner join " +
                            "( " +
                            "	select Name = attribute, Result= value " +
                            "	from " +
                            "	( " +
                            "		SELECT FMDesc_0.DescriptionCN AS [通讯状态], " +
                            "				FMDesc_1.DescriptionCN AS [报警(= 0)], " +
                            "				FMDesc_2.DescriptionCN AS [温度(-20~100Deg.C)], " +
                            "				FMDesc_3.DescriptionCN AS [压力(>1000KPa)], " +
                            "				FMDesc_4.DescriptionCN AS [声道 A1 信号接受率(> 85)], " +
                            "				FMDesc_5.DescriptionCN AS [声道 A2 信号接受率(> 85)], " +
                            "				FMDesc_6.DescriptionCN AS [声道 B1 信号接受率(> 85)], " +
                            "				FMDesc_7.DescriptionCN AS [声道 B2 信号接受率(> 85)], " +
                            "				FMDesc_8.DescriptionCN AS [声道 C1 信号接受率(> 85)], " +
                            "				FMDesc_9.DescriptionCN AS [声道 C2 信号接受率(> 85)], " +
                            "				FMDesc_10.DescriptionCN AS [声道 D1 信号接受率(> 85)], " +
                            "				FMDesc_11.DescriptionCN AS [声道 D2 信号接受率(> 85)], " +
                            "				FMDesc_12.DescriptionCN AS [声道 A1 信号增益(< 95)], " +
                            "				FMDesc_13.DescriptionCN AS [声道 A2 信号增益(< 95)], " +
                            "				FMDesc_14.DescriptionCN AS [声道 B1 信号增益(< 95)], " +
                            "				FMDesc_15.DescriptionCN AS [声道 B2 信号增益(< 95)], " +
                            "				FMDesc_16.DescriptionCN AS [声道 C1 信号增益(< 95)], " +
                            "				FMDesc_17.DescriptionCN AS [声道 C2 信号增益(< 95)], " +
                            "				FMDesc_18.DescriptionCN AS [声道 D1 信号增益(< 95)], " +
                            "				FMDesc_19.DescriptionCN AS [声道 D2 信号增益(< 95)], " +
                            "				FMDesc_20.DescriptionCN AS [声道 A1 信噪比(> 27)], " +
                            "				FMDesc_21.DescriptionCN AS [声道 A2 信噪比(> 27)], " +
                            "				FMDesc_22.DescriptionCN AS [声道 B1 信噪比(> 27)], " +
                            "				FMDesc_23.DescriptionCN AS [声道 B2 信噪比(> 27)], " +
                            "				FMDesc_24.DescriptionCN AS [声道 C1 信噪比(> 27)], " +
                            "				FMDesc_25.DescriptionCN AS [声道 C2 信噪比(> 27)], " +
                            "				FMDesc_26.DescriptionCN AS [声道 D1 信噪比(> 27)], " +
                            "				FMDesc_27.DescriptionCN AS [声道 D2 信噪比(> 27)], " +
                            "				FMDesc_28.DescriptionCN AS [声道 A 声速偏差率(< 0.20 %)], " +
                            "				FMDesc_29.DescriptionCN AS [声道 B 声速偏差率(< 0.20 %)], " +
                            "				FMDesc_30.DescriptionCN AS [声道 C 声速偏差率(< 0.20 %)], " +
                            "				FMDesc_31.DescriptionCN AS [声道 D 声速偏差率(< 0.20 %)], " +
                            "				FMDesc_32.DescriptionCN AS [流量计算机计算声速偏差率(< 0.20 %)], " +
                            "				FMDesc_33.DescriptionCN AS [剖面系数], " +
                            "				FMDesc_34.DescriptionCN AS [流速对称性(0.95 - 1.05)], " +
                            "				FMDesc_35.DescriptionCN AS [流速交叉流(0.95 - 1.05)], " +
                            "				FMDesc_36.DescriptionCN AS [声道 A 脉动流(< 5.5 %)], " +
                            "				FMDesc_37.DescriptionCN AS [声道 B 脉动流(< 2.5 %)], " +
                            "				FMDesc_38.DescriptionCN AS [声道 C 脉动流(< 2.5 %)], " +
                            "				FMDesc_39.DescriptionCN AS [声道 D 脉动流(< 5.5 %)], " +
                            "				FMDesc_40.DescriptionCN AS [气体漩涡角(+/ -4°)] " +
                            "		        FROM    dbo.tRealtimeDiagnosticDataDanielFM INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_0 ON dbo.tRealtimeDiagnosticDataDanielFM.P0 = FMDesc_0.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_1 ON dbo.tRealtimeDiagnosticDataDanielFM.P1 = FMDesc_1.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_2 ON dbo.tRealtimeDiagnosticDataDanielFM.P2 = FMDesc_2.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_3 ON dbo.tRealtimeDiagnosticDataDanielFM.P3 = FMDesc_3.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_4 ON dbo.tRealtimeDiagnosticDataDanielFM.P4 = FMDesc_4.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_5 ON dbo.tRealtimeDiagnosticDataDanielFM.P5 = FMDesc_5.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_6 ON dbo.tRealtimeDiagnosticDataDanielFM.P6 = FMDesc_6.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_7 ON dbo.tRealtimeDiagnosticDataDanielFM.P7 = FMDesc_7.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_8 ON dbo.tRealtimeDiagnosticDataDanielFM.P8 = FMDesc_8.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_9 ON dbo.tRealtimeDiagnosticDataDanielFM.P9 = FMDesc_9.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_10 ON dbo.tRealtimeDiagnosticDataDanielFM.P10 = FMDesc_10.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_11 ON dbo.tRealtimeDiagnosticDataDanielFM.P11 = FMDesc_11.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_12 ON dbo.tRealtimeDiagnosticDataDanielFM.P12 = FMDesc_12.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_13 ON dbo.tRealtimeDiagnosticDataDanielFM.P13 = FMDesc_13.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_14 ON dbo.tRealtimeDiagnosticDataDanielFM.P14 = FMDesc_14.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_15 ON dbo.tRealtimeDiagnosticDataDanielFM.P15 = FMDesc_15.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_16 ON dbo.tRealtimeDiagnosticDataDanielFM.P16 = FMDesc_16.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_17 ON dbo.tRealtimeDiagnosticDataDanielFM.P17 = FMDesc_17.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_18 ON dbo.tRealtimeDiagnosticDataDanielFM.P18 = FMDesc_18.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_19 ON dbo.tRealtimeDiagnosticDataDanielFM.P19 = FMDesc_19.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_20 ON dbo.tRealtimeDiagnosticDataDanielFM.P20 = FMDesc_20.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_21 ON dbo.tRealtimeDiagnosticDataDanielFM.P21 = FMDesc_21.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_22 ON dbo.tRealtimeDiagnosticDataDanielFM.P22 = FMDesc_22.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_23 ON dbo.tRealtimeDiagnosticDataDanielFM.P23 = FMDesc_23.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_24 ON dbo.tRealtimeDiagnosticDataDanielFM.P24 = FMDesc_24.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_25 ON dbo.tRealtimeDiagnosticDataDanielFM.P25 = FMDesc_25.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_26 ON dbo.tRealtimeDiagnosticDataDanielFM.P26 = FMDesc_26.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_27 ON dbo.tRealtimeDiagnosticDataDanielFM.P27 = FMDesc_27.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_28 ON dbo.tRealtimeDiagnosticDataDanielFM.P28 = FMDesc_28.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_29 ON dbo.tRealtimeDiagnosticDataDanielFM.P29 = FMDesc_29.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_30 ON dbo.tRealtimeDiagnosticDataDanielFM.P30 = FMDesc_30.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_31 ON dbo.tRealtimeDiagnosticDataDanielFM.P31 = FMDesc_31.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_32 ON dbo.tRealtimeDiagnosticDataDanielFM.P32 = FMDesc_32.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_33 ON dbo.tRealtimeDiagnosticDataDanielFM.P33 = FMDesc_33.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_34 ON dbo.tRealtimeDiagnosticDataDanielFM.P34 = FMDesc_34.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_35 ON dbo.tRealtimeDiagnosticDataDanielFM.P35 = FMDesc_35.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_36 ON dbo.tRealtimeDiagnosticDataDanielFM.P36 = FMDesc_36.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_37 ON dbo.tRealtimeDiagnosticDataDanielFM.P37 = FMDesc_37.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_38 ON dbo.tRealtimeDiagnosticDataDanielFM.P38 = FMDesc_38.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_39 ON dbo.tRealtimeDiagnosticDataDanielFM.P39 = FMDesc_39.ID INNER JOIN " +
                            "				dbo.tDiagnosticDescriptionFM AS FMDesc_40 ON dbo.tRealtimeDiagnosticDataDanielFM.P40 = FMDesc_40.ID " +
                            "		where dbo.tRealtimeDiagnosticDataDanielFM.ID = {0} " +
                            "	) as tblResults " +
                            "	unpivot " +
                            "	( " +
                            "		value for attribute in([通讯状态], " +
                            "								[报警(= 0)], " +
                            "								[温度(-20~100Deg.C)], " +
                            "								[压力(>1000KPa)], " +
                            "								[声道 A1 信号接受率(> 85)], " +
                            "								[声道 A2 信号接受率(> 85)], " +
                            "								[声道 B1 信号接受率(> 85)], " +
                            "								[声道 B2 信号接受率(> 85)], " +
                            "								[声道 C1 信号接受率(> 85)], " +
                            "								[声道 C2 信号接受率(> 85)], " +
                            "								[声道 D1 信号接受率(> 85)], " +
                            "								[声道 D2 信号接受率(> 85)], " +
                            "								[声道 A1 信号增益(< 95)], " +
                            "								[声道 A2 信号增益(< 95)], " +
                            "								[声道 B1 信号增益(< 95)], " +
                            "								[声道 B2 信号增益(< 95)], " +
                            "								[声道 C1 信号增益(< 95)], " +
                            "								[声道 C2 信号增益(< 95)], " +
                            "								[声道 D1 信号增益(< 95)], " +
                            "								[声道 D2 信号增益(< 95)], " +
                            "								[声道 A1 信噪比(> 27)], " +
                            "								[声道 A2 信噪比(> 27)], " +
                            "								[声道 B1 信噪比(> 27)], " +
                            "								[声道 B2 信噪比(> 27)], " +
                            "								[声道 C1 信噪比(> 27)], " +
                            "								[声道 C2 信噪比(> 27)], " +
                            "								[声道 D1 信噪比(> 27)], " +
                            "								[声道 D2 信噪比(> 27)], " +
                            "								[声道 A 声速偏差率(< 0.20 %)], " +
                            "								[声道 B 声速偏差率(< 0.20 %)], " +
                            "								[声道 C 声速偏差率(< 0.20 %)], " +
                            "								[声道 D 声速偏差率(< 0.20 %)], " +
                            "								[流量计算机计算声速偏差率(< 0.20 %)], " +
                            "								[剖面系数], " +
                            "								[流速对称性(0.95 - 1.05)], " +
                            "								[流速交叉流(0.95 - 1.05)], " +
                            "								[声道 A 脉动流(< 5.5 %)], " +
                            "								[声道 B 脉动流(< 2.5 %)], " +
                            "								[声道 C 脉动流(< 2.5 %)], " +
                            "								[声道 D 脉动流(< 5.5 %)], " +
                            "								[气体漩涡角(+/ -4°)] " +
                            "								) " +
                            "	) UPV " +
                            ") as results " +
                            "on " +
                            "results.[Name] = vals.[Name] ";
                        break;
                    }
                case "Weise":
                    {
                        sql = @" select vals.Name,results.Result, vals.Value 
                                from 
                                 (
                                 select Name = attribute, Value = value 
                                 from 
                                      ( 
                                       SELECT  convert(nvarchar,[v0]) AS[通讯状态], 
                                               convert(nvarchar,case when[p1] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v1]) end) AS[报警(= 0)],
                                               convert(nvarchar,case when[p2] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v2]) end) AS[正常声道数量报警(>= 3)], 
                                               convert(nvarchar,case when[p3] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v3]) end) AS[标况体积流量超限],
                                               convert(nvarchar,case when[p4] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v4]) end) AS[质量流量超限], 
                                               convert(nvarchar,case when[p5] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v5]) end) AS[能量流量超限], 
                                               convert(nvarchar,case when[p6] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v6]) end) AS[工况体积流量超限], 
                                               convert(nvarchar,case when[p7] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(varchar,convert(decimal(18,0),[v7]))  end) AS[声道报警], 
                                               convert(nvarchar,case when[p8] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v8], 0)) end) AS[声道1信号接收率(> 70)],   
                                               convert(nvarchar,case when[p9] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v9], 0)) end) AS[声道2信号接收率(> 70)],   
                                               convert(nvarchar,case when[p10] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v10], 0)) end) AS[声道3信号接收率(> 70)],   
                                               convert(nvarchar,case when[p11] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v11], 0)) end) AS[声道4信号接收率(> 70)],   
                                               convert(nvarchar,case when[p16] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v16], 2)) end) AS[声道1A信号增益(0.5- 4095)],   
                                               convert(nvarchar,case when[p17] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v17], 2)) end) AS[声道1B信号增益(0.5- 4095)],   
                                               convert(nvarchar,case when[p18] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v18], 2)) end) AS[声道2A信号增益(0.5- 4095)],   
                                               convert(nvarchar,case when[p19] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v19], 2)) end) AS[声道2B信号增益(0.5- 4095)],   
                                               convert(nvarchar,case when[p20] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v20], 2)) end) AS[声道3A信号增益(0.5- 4095)],   
                                               convert(nvarchar,case when[p21] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v21], 2)) end) AS[声道3B信号增益(0.5- 4095)],   
                                               convert(nvarchar,case when[p22] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v22], 2)) end) AS[声道4A信号增益(0.5- 4095)],   
                                               convert(nvarchar,case when[p23] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v23], 2)) end) AS[声道4B信号增益(0.5- 4095)],    
                                               convert(nvarchar,case when[p32] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v32], 0)) end) AS[声道1A信噪比(> 10)],   
                                               convert(nvarchar,case when[p33] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v33], 0)) end) AS[声道1B信噪比(> 10)],   
                                               convert(nvarchar,case when[p34] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v34], 0)) end) AS[声道2A信噪比(> 10)],   
                                               convert(nvarchar,case when[p35] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v35], 0)) end) AS[声道2B信噪比(> 10)],   
                              	                convert(nvarchar,case when[p36] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v36], 0)) end) AS[声道3A信噪比(> 10)],   
                              	                convert(nvarchar,case when[p37] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v37], 0)) end) AS[声道3B信噪比(> 10)],   
                              	                convert(nvarchar,case when[p38] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v38], 0)) end) AS[声道4A信噪比(> 10)],   
                              	                convert(nvarchar,case when[p39] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v39], 0)) end) AS[声道4B信噪比(> 10)],   
                                               convert(nvarchar,case when[p48] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v48], 2)) end) AS[声道1声速偏差率(< 0.2 %)],   
                                               convert(nvarchar,case when[p49] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v49], 2)) end) AS[声道2声速偏差率(< 0.2 %)],   
                                               convert(nvarchar,case when[p50] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v50], 2)) end) AS[声道3声速偏差率(< 0.2 %)],   
                                               convert(nvarchar,case when[p51] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v51], 2)) end) AS[声道4声速偏差率(< 0.2 %)], 
												convert(nvarchar,case when[P56] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v56], 3)) end) AS[流量计算机计算声速偏差率(< 0.20 %)], 
                              	                convert(nvarchar,case when[p57] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v57], 4)) end) AS[剖面系数(0.9 - 1.1)],   
                              	                convert(nvarchar,case when[p58] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v58], 4)) end) AS[对称性(0.9 - 1.1)],   
                              	                convert(nvarchar,case when[p59] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v59], 4)) end) AS[横向流(0.9 - 1.1)],   
                                               convert(nvarchar,case when[p60] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v60], 2)) end) AS[声道1脉动百分比(< 0.1 %)],   
                                               convert(nvarchar,case when[p61] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v61], 2)) end) AS[声道2脉动百分比(< 0.1 %)],   
                                               convert(nvarchar,case when[p62] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v62], 2)) end) AS[声道3脉动百分比(< 0.1 %)],   
                                               convert(nvarchar,case when[p63] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v63], 2)) end) AS[声道4脉动百分比(< 0.1 %)],   
                              	                convert(nvarchar,case when[p68] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v68], 1)) end) AS[气体漩涡角(+/ -10度)] 
                                     FROM dbo.tRealtimeDiagnosticDataWeiseFM
                                     where   dbo.tRealtimeDiagnosticDataWeiseFM.ID = {0}
                              	     ) as tblValues 
                                   unpivot 
                                   ( 
                                    value for attribute in([通讯状态], 
                                              [报警(= 0)],
                                              [正常声道数量报警(>= 3)],
                                              [标况体积流量超限],
                                              [质量流量超限],
                                              [能量流量超限],
                                              [工况体积流量超限],
                                              [声道报警],
                                              [声道1信号接收率(> 70)],
                                              [声道2信号接收率(> 70)],
                                              [声道3信号接收率(> 70)],
                                              [声道4信号接收率(> 70)],
                                              [声道1A信号增益(0.5- 4095)],
                                              [声道1B信号增益(0.5- 4095)],
                                              [声道2A信号增益(0.5- 4095)],
                                              [声道2B信号增益(0.5- 4095)],
                                              [声道3A信号增益(0.5- 4095)],
                                              [声道3B信号增益(0.5- 4095)],
                                              [声道4A信号增益(0.5- 4095)],
                                              [声道4B信号增益(0.5- 4095)],
                                              [声道1A信噪比(> 10)],
                                              [声道1B信噪比(> 10)],
                                              [声道2A信噪比(> 10)],
                                              [声道2B信噪比(> 10)],
                                              [声道3A信噪比(> 10)],
                                              [声道3B信噪比(> 10)], 
                                              [声道4A信噪比(> 10)],
                                              [声道4B信噪比(> 10)],
                                              [声道1声速偏差率(< 0.2 %)],
                                              [声道2声速偏差率(< 0.2 %)],
                                              [声道3声速偏差率(< 0.2 %)], 
                                              [声道4声速偏差率(< 0.2 %)],
											  [流量计算机计算声速偏差率(< 0.20 %)],
                                              [剖面系数(0.9 - 1.1)],
                                              [对称性(0.9 - 1.1)],
                                              [横向流(0.9 - 1.1)],
                                              [声道1脉动百分比(< 0.1 %)],
                                              [声道2脉动百分比(< 0.1 %)],
                                              [声道3脉动百分比(< 0.1 %)],
                                              [声道4脉动百分比(< 0.1 %)],
                                              [气体漩涡角(+/ -10度)] 
                                              )
                                ) UPV
                               ) as vals 
                               inner join 
                               ( 
                                   select Name = attribute, Result= value 
                                   from 
                                   ( 
                                     SELECT 
                                        FMDesc_0.DescriptionCN AS [通讯状态], 
                                        FMDesc_1.DescriptionCN AS [报警(= 0)] , 
                                        FMDesc_2.DescriptionCN AS [正常声道数量报警(>= 3)], 
                                        FMDesc_3.DescriptionCN AS [标况体积流量超限], 
                                        FMDesc_4.DescriptionCN AS [质量流量超限], 
                                        FMDesc_5.DescriptionCN AS [能量流量超限], 
                                        FMDesc_6.DescriptionCN AS [工况体积流量超限], 
                                        FMDesc_7.DescriptionCN AS [声道报警], 
                                        FMDesc_8.DescriptionCN AS [声道1信号接收率(> 70)], 
                                        FMDesc_9.DescriptionCN AS [声道2信号接收率(> 70)], 
                                        FMDesc_10.DescriptionCN AS [声道3信号接收率(> 70)], 
                                        FMDesc_11.DescriptionCN AS [声道4信号接收率(> 70)], 
                                        FMDesc_16.DescriptionCN AS [声道1A信号增益(0.5- 4095)], 
                                        FMDesc_17.DescriptionCN AS [声道1B信号增益(0.5- 4095)], 
                                        FMDesc_18.DescriptionCN AS [声道2A信号增益(0.5- 4095)], 
                                        FMDesc_19.DescriptionCN AS [声道2B信号增益(0.5- 4095)], 
                                        FMDesc_20.DescriptionCN AS [声道3A信号增益(0.5- 4095)], 
                                        FMDesc_21.DescriptionCN AS [声道3B信号增益(0.5- 4095)], 
                                        FMDesc_22.DescriptionCN AS [声道4A信号增益(0.5- 4095)], 
                                        FMDesc_23.DescriptionCN AS [声道4B信号增益(0.5- 4095)],  
                                        FMDesc_32.DescriptionCN AS [声道1A信噪比(> 10)],   
                                        FMDesc_33.DescriptionCN AS [声道1B信噪比(> 10)],   
                                        FMDesc_34.DescriptionCN AS [声道2A信噪比(> 10)],   
                                        FMDesc_35.DescriptionCN AS [声道2B信噪比(> 10)],   
                                        FMDesc_36.DescriptionCN AS [声道3A信噪比(> 10)],   
                                        FMDesc_37.DescriptionCN AS [声道3B信噪比(> 10)],   
                                        FMDesc_38.DescriptionCN AS [声道4A信噪比(> 10)],   
                                        FMDesc_39.DescriptionCN AS [声道4B信噪比(> 10)],   
                                        FMDesc_48.DescriptionCN AS [声道1声速偏差率(< 0.2 %)],   
                                        FMDesc_49.DescriptionCN AS [声道2声速偏差率(< 0.2 %)],   
                                        FMDesc_50.DescriptionCN AS [声道3声速偏差率(< 0.2 %)],   
                                        FMDesc_51.DescriptionCN AS [声道4声速偏差率(< 0.2 %)],   
										 FMDesc_56.DescriptionCN AS [流量计算机计算声速偏差率(< 0.20 %)],
                                        FMDesc_57.DescriptionCN AS [剖面系数(0.9 - 1.1)],   
                                        FMDesc_58.DescriptionCN AS [对称性(0.9 - 1.1)],   
                                        FMDesc_59.DescriptionCN AS [横向流(0.9 - 1.1)],   
                                        FMDesc_60.DescriptionCN AS [声道1脉动百分比(< 0.1 %)],   
                                        FMDesc_61.DescriptionCN AS [声道2脉动百分比(< 0.1 %)],   
                                        FMDesc_62.DescriptionCN AS [声道3脉动百分比(< 0.1 %)],   
                                        FMDesc_63.DescriptionCN AS [声道4脉动百分比(< 0.1 %)],   
                                        FMDesc_68.DescriptionCN AS [气体漩涡角(+/ -10度)] 
                                    FROM   dbo.tRealtimeDiagnosticDataWeiseFM INNER JOIN 
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_0 ON dbo.tRealtimeDiagnosticDataWeiseFM.P0 = FMDesc_0.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_1 ON dbo.tRealtimeDiagnosticDataWeiseFM.P1 = FMDesc_1.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_2 ON dbo.tRealtimeDiagnosticDataWeiseFM.P2 = FMDesc_2.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_3 ON dbo.tRealtimeDiagnosticDataWeiseFM.P3 = FMDesc_3.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_4 ON dbo.tRealtimeDiagnosticDataWeiseFM.P4 = FMDesc_4.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_5 ON dbo.tRealtimeDiagnosticDataWeiseFM.P5 = FMDesc_5.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_6 ON dbo.tRealtimeDiagnosticDataWeiseFM.P6 = FMDesc_6.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_7 ON dbo.tRealtimeDiagnosticDataWeiseFM.P7 = FMDesc_7.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_8 ON dbo.tRealtimeDiagnosticDataWeiseFM.P8 = FMDesc_8.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_9 ON dbo.tRealtimeDiagnosticDataWeiseFM.P9 = FMDesc_9.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_10 ON dbo.tRealtimeDiagnosticDataWeiseFM.P10 = FMDesc_10.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_11 ON dbo.tRealtimeDiagnosticDataWeiseFM.P11 = FMDesc_11.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_12 ON dbo.tRealtimeDiagnosticDataWeiseFM.P12 = FMDesc_12.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_13 ON dbo.tRealtimeDiagnosticDataWeiseFM.P13 = FMDesc_13.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_14 ON dbo.tRealtimeDiagnosticDataWeiseFM.P14 = FMDesc_14.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_15 ON dbo.tRealtimeDiagnosticDataWeiseFM.P15 = FMDesc_15.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_16 ON dbo.tRealtimeDiagnosticDataWeiseFM.P16 = FMDesc_16.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_17 ON dbo.tRealtimeDiagnosticDataWeiseFM.P17 = FMDesc_17.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_18 ON dbo.tRealtimeDiagnosticDataWeiseFM.P18 = FMDesc_18.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_19 ON dbo.tRealtimeDiagnosticDataWeiseFM.P19 = FMDesc_19.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_20 ON dbo.tRealtimeDiagnosticDataWeiseFM.P20 = FMDesc_20.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_21 ON dbo.tRealtimeDiagnosticDataWeiseFM.P21 = FMDesc_21.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_22 ON dbo.tRealtimeDiagnosticDataWeiseFM.P22 = FMDesc_22.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_23 ON dbo.tRealtimeDiagnosticDataWeiseFM.P23 = FMDesc_23.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_24 ON dbo.tRealtimeDiagnosticDataWeiseFM.P24 = FMDesc_24.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_25 ON dbo.tRealtimeDiagnosticDataWeiseFM.P25 = FMDesc_25.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_26 ON dbo.tRealtimeDiagnosticDataWeiseFM.P26 = FMDesc_26.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_27 ON dbo.tRealtimeDiagnosticDataWeiseFM.P27 = FMDesc_27.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_28 ON dbo.tRealtimeDiagnosticDataWeiseFM.P28 = FMDesc_28.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_29 ON dbo.tRealtimeDiagnosticDataWeiseFM.P29 = FMDesc_29.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_30 ON dbo.tRealtimeDiagnosticDataWeiseFM.P30 = FMDesc_30.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_31 ON dbo.tRealtimeDiagnosticDataWeiseFM.P31 = FMDesc_31.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_32 ON dbo.tRealtimeDiagnosticDataWeiseFM.P32 = FMDesc_32.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_33 ON dbo.tRealtimeDiagnosticDataWeiseFM.P33 = FMDesc_33.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_34 ON dbo.tRealtimeDiagnosticDataWeiseFM.P34 = FMDesc_34.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_35 ON dbo.tRealtimeDiagnosticDataWeiseFM.P35 = FMDesc_35.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_36 ON dbo.tRealtimeDiagnosticDataWeiseFM.P36 = FMDesc_36.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_37 ON dbo.tRealtimeDiagnosticDataWeiseFM.P37 = FMDesc_37.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_38 ON dbo.tRealtimeDiagnosticDataWeiseFM.P38 = FMDesc_38.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_39 ON dbo.tRealtimeDiagnosticDataWeiseFM.P39 = FMDesc_39.ID INNER JOIN 
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_40 ON dbo.tRealtimeDiagnosticDataWeiseFM.P39 = FMDesc_40.ID INNER JOIN    
											dbo.tDiagnosticDescriptionFM AS FMDesc_41 ON dbo.tRealtimeDiagnosticDataWeiseFM.P41 = FMDesc_41.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_42 ON dbo.tRealtimeDiagnosticDataWeiseFM.P42 = FMDesc_42.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_43 ON dbo.tRealtimeDiagnosticDataWeiseFM.P43 = FMDesc_43.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_44 ON dbo.tRealtimeDiagnosticDataWeiseFM.P44 = FMDesc_44.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_45 ON dbo.tRealtimeDiagnosticDataWeiseFM.P45 = FMDesc_45.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_46 ON dbo.tRealtimeDiagnosticDataWeiseFM.P46 = FMDesc_46.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_47 ON dbo.tRealtimeDiagnosticDataWeiseFM.P47 = FMDesc_47.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_48 ON dbo.tRealtimeDiagnosticDataWeiseFM.P48 = FMDesc_48.ID INNER JOIN 
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_49 ON dbo.tRealtimeDiagnosticDataWeiseFM.P49 = FMDesc_49.ID INNER JOIN
											dbo.tDiagnosticDescriptionFM AS FMDesc_50 ON dbo.tRealtimeDiagnosticDataWeiseFM.P50 = FMDesc_50.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_51 ON dbo.tRealtimeDiagnosticDataWeiseFM.P51 = FMDesc_51.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_52 ON dbo.tRealtimeDiagnosticDataWeiseFM.P52 = FMDesc_52.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_53 ON dbo.tRealtimeDiagnosticDataWeiseFM.P53 = FMDesc_53.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_54 ON dbo.tRealtimeDiagnosticDataWeiseFM.P54 = FMDesc_54.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_55 ON dbo.tRealtimeDiagnosticDataWeiseFM.P55 = FMDesc_55.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_56 ON dbo.tRealtimeDiagnosticDataWeiseFM.P56 = FMDesc_56.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_57 ON dbo.tRealtimeDiagnosticDataWeiseFM.P57 = FMDesc_57.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_58 ON dbo.tRealtimeDiagnosticDataWeiseFM.P58 = FMDesc_58.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_59 ON dbo.tRealtimeDiagnosticDataWeiseFM.P59 = FMDesc_59.ID INNER JOIN 
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_60 ON dbo.tRealtimeDiagnosticDataWeiseFM.P60 = FMDesc_60.ID INNER JOIN    
											dbo.tDiagnosticDescriptionFM AS FMDesc_61 ON dbo.tRealtimeDiagnosticDataWeiseFM.P61 = FMDesc_61.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_62 ON dbo.tRealtimeDiagnosticDataWeiseFM.P62 = FMDesc_62.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_63 ON dbo.tRealtimeDiagnosticDataWeiseFM.P63 = FMDesc_63.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_64 ON dbo.tRealtimeDiagnosticDataWeiseFM.P64 = FMDesc_64.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_65 ON dbo.tRealtimeDiagnosticDataWeiseFM.P65 = FMDesc_65.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_66 ON dbo.tRealtimeDiagnosticDataWeiseFM.P66 = FMDesc_66.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_67 ON dbo.tRealtimeDiagnosticDataWeiseFM.P67 = FMDesc_67.ID INNER JOIN    
                                            dbo.tDiagnosticDescriptionFM AS FMDesc_68 ON dbo.tRealtimeDiagnosticDataWeiseFM.P68 = FMDesc_68.ID
                                  where dbo.tRealtimeDiagnosticDataWeiseFM.ID = {0}
                                  ) as tblResults
                                  unpivot 
                                        ( 
                                          value for attribute in( 
                                                          [通讯状态],    
                                                          [报警(= 0)],    
                                                          [正常声道数量报警(>= 3)],    
                                                          [标况体积流量超限],    
                                                          [质量流量超限],    
                                                          [能量流量超限],    
                                                          [工况体积流量超限],    
                                                          [声道报警],    
                                                          [声道1信号接收率(> 70)],    
                                                          [声道2信号接收率(> 70)],    
                                                          [声道3信号接收率(> 70)],    
                                                          [声道4信号接收率(> 70)],    
                                                          [声道1A信号增益(0.5- 4095)],    
                                                          [声道1B信号增益(0.5- 4095)],    
                                                          [声道2A信号增益(0.5- 4095)],    
                                                          [声道2B信号增益(0.5- 4095)],    
                                                          [声道3A信号增益(0.5- 4095)],    
                                                          [声道3B信号增益(0.5- 4095)],    
                                                          [声道4A信号增益(0.5- 4095)],    
                                                          [声道4B信号增益(0.5- 4095)],    
                                                          [声道1A信噪比(> 10)],    
                                                          [声道1B信噪比(> 10)],    
                                                          [声道2A信噪比(> 10)],    
                                                          [声道2B信噪比(> 10)],    
                                                          [声道3A信噪比(> 10)],    
                                                          [声道3B信噪比(> 10)],    
                                                          [声道4A信噪比(> 10)],    
                                                          [声道4B信噪比(> 10)],    
                                                          [声道1声速偏差率(< 0.2 %)],    
                                                          [声道2声速偏差率(< 0.2 %)],    
                                                          [声道3声速偏差率(< 0.2 %)],    
                                                          [声道4声速偏差率(< 0.2 %)],    
														  [流量计算机计算声速偏差率(< 0.20 %)],
                                                          [剖面系数(0.9 - 1.1)],    
                                                          [对称性(0.9 - 1.1)],    
                                                          [横向流(0.9 - 1.1)],    
                                                          [声道1脉动百分比(< 0.1 %)],    
                                                          [声道2脉动百分比(< 0.1 %)],    
                                                          [声道3脉动百分比(< 0.1 %)],    
                                                          [声道4脉动百分比(< 0.1 %)],    
                                                          [气体漩涡角(+/ -10度)]	 
                                                            ) 
                                ) UPV 
                                ) as results 
                                on 
                                 results.[Name] = vals.[Name]";
                        break;
                    }
                case "Sick":
                    {
                        sql = " select vals.Name,results.Result, vals.Value  " +
                              " from" +
                              "		(" +
                              "			select Name=attribute, Value=value " +
                              "			from " +
                              "			(" +
                              "				 SELECT	convert(nvarchar,[v0]) AS [通讯状态], " +
                              "                     convert(nvarchar,case when [p1] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v1]) end) AS [系统状态], " +
                              "                     convert(nvarchar,case when [p2] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v2]) end) AS [声道1报警(=0)], " +
                              "                     convert(nvarchar,case when [p3] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v3]) end) AS [声道2报警(=0)], " +
                              "	                    convert(nvarchar,case when [p4] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v4]) end) AS [声道3报警(=0)], " +
                              "                 	convert(nvarchar,case when [p5] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v5]) end) AS [声道4报警(=0)], " +
                              "             		convert(nvarchar,case when [p6] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v6]) end) AS [声道1信号接收率(>75)], " +
                              "             		convert(nvarchar,case when [p7] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v7]) end) AS [声道2信号接收率(>75)], " +
                              "             		convert(nvarchar,case when [p8] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v8]) end) AS [声道3信号接收率(>75)], " +
                              "             		convert(nvarchar,case when [p9] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v9]) end) AS [声道4信号接收率(>75)], " +
                              "             		convert(nvarchar,case when [p10] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v10],2)) end) AS [声道1AB信号增益(<93)], " +
                              "             		convert(nvarchar,case when [p11] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v11],2)) end) AS [声道1BA信号增益(<93)], " +
                              "                     convert(nvarchar,case when [p12] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v12],2)) end) AS [声道2AB信号增益(<93)], " +
                              "		                convert(nvarchar,case when [p13] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v13],2)) end) AS [声道2BA信号增益(<93)], " +
                              "                     convert(nvarchar,case when [p14] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v14],2)) end) AS [声道3AB信号增益(<93)], " +
                              "	                   	convert(nvarchar,case when [p15] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v15],2)) end) AS [声道3BA信号增益(<93)], " +
                              "             		convert(nvarchar,case when [p16] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v16],2)) end) AS [声道4AB信号增益(<93)], " +
                              "             		convert(nvarchar,case when [p17] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v17],2)) end) AS [声道4BA信号增益(<93)], " +
                              "             		convert(nvarchar,case when [p18] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v18],0)) end) AS [声道1AB信噪比(>15)], " +
                              "             		convert(nvarchar,case when [p19] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v19],0)) end) AS [声道1BA信噪比(>15)], " +
                              "             		convert(nvarchar,case when [p20] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v20],0)) end) AS [声道2AB信噪比(>15)], " +
                              "             		convert(nvarchar,case when [p21] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v21],0)) end) AS [声道2BA信噪比(>15)], " +
                              "             		convert(nvarchar,case when [p22] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v22],0)) end) AS [声道3AB信噪比(>15)], " +
                              "             		convert(nvarchar,case when [p23] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v23],0)) end) AS [声道3BA信噪比(>15)], " +
                              "             		convert(nvarchar,case when [p24] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v24],0)) end) AS [声道4AB信噪比(>15)], " +
                              "             		convert(nvarchar,case when [p25] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v25],0)) end) AS [声道4BA信噪比(>15)], " +
                              "                     convert(nvarchar,case when [p26] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v26],2)) end) AS [声道1声速偏差率(<0.20%)], " +
                              "                     convert(nvarchar,case when [p27] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v27],2)) end) AS [声道2声速偏差率(<0.20%)], " +
                              "                     convert(nvarchar,case when [p28] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v28],2)) end) AS [声道3声速偏差率(<0.20%)], " +
                              "                     convert(nvarchar,case when [p29] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v29],2)) end) AS [声道4声速偏差率(<0.20%)], " +
                              "             		convert(nvarchar,case when [p30] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v30],2)) end) AS [流量计算机计算声速偏差率(<0.2%)], " +
                              "             		convert(nvarchar,case when [p31] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v31],2)) end) AS [剖面系数(1.12-1.22)], " +
                              "             		convert(nvarchar,case when [p32] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v32],2)) end) AS [对称性(0.95-1.05)], " +
                              "             		convert(nvarchar,case when [p33] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v33],2)) end) AS [横向流(0.95-1.05)], " +
                              "             		convert(nvarchar,case when [p34] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v34],3)) end) AS [气体漩涡角(+/-4度)] 	 " +
                              "	 FROM	dbo.tRealtimeDiagnosticDataSickFM " +
                              "	 where	dbo.tRealtimeDiagnosticDataSickFM.ID = {0} " +
                              "	 ) as tblValues " +
                              "	 unpivot " +
                              "	 ( " +
                              "	 value for attribute in( [通讯状态],  " +
                              "                          [系统状态], " +
                              "                          [声道1报警(=0)], " +
                              "                          [声道2报警(=0)], " +
                              "                          [声道3报警(=0)], " +
                              "                          [声道4报警(=0)], " +
                              "                          [声道1信号接收率(>75)], " +
                              "                          [声道2信号接收率(>75)], " +
                              "                          [声道3信号接收率(>75)], " +
                              "                          [声道4信号接收率(>75)], " +
                              "                          [声道1AB信号增益(<93)], " +
                              "                          [声道1BA信号增益(<93)], " +
                              "                          [声道2AB信号增益(<93)], " +
                              "                          [声道2BA信号增益(<93)], " +
                              "                          [声道3AB信号增益(<93)], " +
                              "                          [声道3BA信号增益(<93)], " +
                              "                          [声道4AB信号增益(<93)], " +
                              "                          [声道4BA信号增益(<93)], " +
                              "                          [声道1AB信噪比(>15)], " +
                              "                          [声道1BA信噪比(>15)], " +
                              "                          [声道2AB信噪比(>15)], " +
                              "                          [声道2BA信噪比(>15)], " +
                              "                          [声道3AB信噪比(>15)], " +
                              "                          [声道3BA信噪比(>15)], " +
                              "                          [声道4AB信噪比(>15)], " +
                              "                          [声道4BA信噪比(>15)], " +
                              "                          [声道1声速偏差率(<0.20%)], " +
                              "                          [声道2声速偏差率(<0.20%)], " +
                              "                          [声道3声速偏差率(<0.20%)], " +
                              "                          [声道4声速偏差率(<0.20%)], " +
                              "                          [流量计算机计算声速偏差率(<0.2%)], " +
                              "                          [剖面系数(1.12-1.22)], " +
                              "                          [对称性(0.95-1.05)], " +
                              "                          [横向流(0.95-1.05)], " +
                              "                          [气体漩涡角(+/-4度)] " +
                              "                        ) " +
                              "	)UPV " +
                              "	) as vals " +
                              "	inner join " +
                              "	( " +
                              "  	select Name=attribute, Result=value  " +
                              "	    from  " +
                              "	       ( " +
                              "	         SELECT	 " +
                              "            FMDesc_0.DescriptionCN AS [通讯状态],  " +
                              "            FMDesc_1.DescriptionCN AS [系统状态], " +
                              "            FMDesc_2.DescriptionCN AS [声道1报警(=0)], " +
                              "            FMDesc_3.DescriptionCN AS [声道2报警(=0)], " +
                              "            FMDesc_4.DescriptionCN AS [声道3报警(=0)], " +
                              "            FMDesc_5.DescriptionCN AS [声道4报警(=0)], " +
                              "            FMDesc_6.DescriptionCN AS [声道1信号接收率(>75)], " +
                              "            FMDesc_7.DescriptionCN AS [声道2信号接收率(>75)], " +
                              "            FMDesc_8.DescriptionCN AS [声道3信号接收率(>75)], " +
                              "            FMDesc_9.DescriptionCN AS [声道4信号接收率(>75)], " +
                              "            FMDesc_10.DescriptionCN AS [声道1AB信号增益(<93)], " +
                              "            FMDesc_11.DescriptionCN AS [声道1BA信号增益(<93)], " +
                              "            FMDesc_12.DescriptionCN AS [声道2AB信号增益(<93)], " +
                              "            FMDesc_13.DescriptionCN AS [声道2BA信号增益(<93)], " +
                              "            FMDesc_14.DescriptionCN AS [声道3AB信号增益(<93)], " +
                              "            FMDesc_15.DescriptionCN AS [声道3BA信号增益(<93)], " +
                              "            FMDesc_16.DescriptionCN AS [声道4AB信号增益(<93)], " +
                              "            FMDesc_17.DescriptionCN AS [声道4BA信号增益(<93)], " +
                              "            FMDesc_18.DescriptionCN AS [声道1AB信噪比(>15)], " +
                              "            FMDesc_19.DescriptionCN AS [声道1BA信噪比(>15)], " +
                              "            FMDesc_20.DescriptionCN AS [声道2AB信噪比(>15)], " +
                              "            FMDesc_21.DescriptionCN AS [声道2BA信噪比(>15)], " +
                              "            FMDesc_22.DescriptionCN AS [声道3AB信噪比(>15)], " +
                              "            FMDesc_23.DescriptionCN AS [声道3BA信噪比(>15)], " +
                              "            FMDesc_24.DescriptionCN AS [声道4AB信噪比(>15)], " +
                              "            FMDesc_25.DescriptionCN AS [声道4BA信噪比(>15)], " +
                              "            FMDesc_26.DescriptionCN AS [声道1声速偏差率(<0.20%)], " +
                              "            FMDesc_27.DescriptionCN AS [声道2声速偏差率(<0.20%)], " +
                              "            FMDesc_28.DescriptionCN AS [声道3声速偏差率(<0.20%)], " +
                              "            FMDesc_29.DescriptionCN AS [声道4声速偏差率(<0.20%)], " +
                              "            FMDesc_30.DescriptionCN AS [流量计算机计算声速偏差率(<0.2%)], " +
                              "            FMDesc_31.DescriptionCN AS [剖面系数(1.12-1.22)], " +
                              "            FMDesc_32.DescriptionCN AS [对称性(0.95-1.05)], " +
                              "            FMDesc_33.DescriptionCN AS [横向流(0.95-1.05)], " +
                              "            FMDesc_34.DescriptionCN AS [气体漩涡角(+/-4度)] " +
                              "   FROM	dbo.tRealtimeDiagnosticDataSickFM INNER JOIN       " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_0 ON dbo.tRealtimeDiagnosticDataSickFM.P0 = FMDesc_0.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_1 ON dbo.tRealtimeDiagnosticDataSickFM.P1 = FMDesc_1.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_2 ON dbo.tRealtimeDiagnosticDataSickFM.P2 = FMDesc_2.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_3 ON dbo.tRealtimeDiagnosticDataSickFM.P3 = FMDesc_3.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_4 ON dbo.tRealtimeDiagnosticDataSickFM.P4 = FMDesc_4.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_5 ON dbo.tRealtimeDiagnosticDataSickFM.P5 = FMDesc_5.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_6 ON dbo.tRealtimeDiagnosticDataSickFM.P6 = FMDesc_6.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_7 ON dbo.tRealtimeDiagnosticDataSickFM.P7 = FMDesc_7.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_8 ON dbo.tRealtimeDiagnosticDataSickFM.P8 = FMDesc_8.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_9 ON dbo.tRealtimeDiagnosticDataSickFM.P9 = FMDesc_9.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_10 ON dbo.tRealtimeDiagnosticDataSickFM.P10 = FMDesc_10.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_11 ON dbo.tRealtimeDiagnosticDataSickFM.P11 = FMDesc_11.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_12 ON dbo.tRealtimeDiagnosticDataSickFM.P12 = FMDesc_12.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_13 ON dbo.tRealtimeDiagnosticDataSickFM.P13 = FMDesc_13.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_14 ON dbo.tRealtimeDiagnosticDataSickFM.P14 = FMDesc_14.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_15 ON dbo.tRealtimeDiagnosticDataSickFM.P15 = FMDesc_15.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_16 ON dbo.tRealtimeDiagnosticDataSickFM.P16 = FMDesc_16.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_17 ON dbo.tRealtimeDiagnosticDataSickFM.P17 = FMDesc_17.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_18 ON dbo.tRealtimeDiagnosticDataSickFM.P18 = FMDesc_18.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_19 ON dbo.tRealtimeDiagnosticDataSickFM.P19 = FMDesc_19.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_20 ON dbo.tRealtimeDiagnosticDataSickFM.P20 = FMDesc_20.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_21 ON dbo.tRealtimeDiagnosticDataSickFM.P21 = FMDesc_21.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_22 ON dbo.tRealtimeDiagnosticDataSickFM.P22 = FMDesc_22.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_23 ON dbo.tRealtimeDiagnosticDataSickFM.P23 = FMDesc_23.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_24 ON dbo.tRealtimeDiagnosticDataSickFM.P24 = FMDesc_24.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_25 ON dbo.tRealtimeDiagnosticDataSickFM.P25 = FMDesc_25.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_26 ON dbo.tRealtimeDiagnosticDataSickFM.P26 = FMDesc_26.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_27 ON dbo.tRealtimeDiagnosticDataSickFM.P27 = FMDesc_27.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_28 ON dbo.tRealtimeDiagnosticDataSickFM.P28 = FMDesc_28.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_29 ON dbo.tRealtimeDiagnosticDataSickFM.P29 = FMDesc_29.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_30 ON dbo.tRealtimeDiagnosticDataSickFM.P30 = FMDesc_30.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_31 ON dbo.tRealtimeDiagnosticDataSickFM.P31 = FMDesc_31.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_32 ON dbo.tRealtimeDiagnosticDataSickFM.P32 = FMDesc_32.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_33 ON dbo.tRealtimeDiagnosticDataSickFM.P33 = FMDesc_33.ID INNER JOIN " +
                              "        	dbo.tDiagnosticDescriptionFM AS FMDesc_34 ON dbo.tRealtimeDiagnosticDataSickFM.P34 = FMDesc_34.ID   " +
                              "   where  dbo.tRealtimeDiagnosticDataSickFM.ID = {0}  " +
                              "	) as tblResults  " +
                              "	unpivot  " +
                              "	(  " +
                              "		value for attribute in(  " +
                              "                        [通讯状态]," +
                              "                        [系统状态], " +
                              "                        [声道1报警(=0)], 	  " +
                              "                        [声道2报警(=0)],  " +
                              "                        [声道3报警(=0)], " +
                              "                        [声道4报警(=0)], " +
                              "                        [声道1信号接收率(>75)],  " +
                              "                        [声道2信号接收率(>75)]," +
                              "                        [声道3信号接收率(>75)]," +
                              "                        [声道4信号接收率(>75)], " +
                              "                        [声道1AB信号增益(<93)], " +
                              "                        [声道1BA信号增益(<93)], " +
                              "                        [声道2AB信号增益(<93)], " +
                              "                        [声道2BA信号增益(<93)], " +
                              "                        [声道3AB信号增益(<93)], " +
                              "                        [声道3BA信号增益(<93)], " +
                              "                        [声道4AB信号增益(<93)], " +
                              "                        [声道4BA信号增益(<93)], " +
                              "                        [声道1AB信噪比(>15)], " +
                              "                        [声道1BA信噪比(>15)], " +
                              "                        [声道2AB信噪比(>15)], " +
                              "                        [声道2BA信噪比(>15)], " +
                              "                        [声道3AB信噪比(>15)], " +
                              "                        [声道3BA信噪比(>15)], " +
                              "                        [声道4AB信噪比(>15)], " +
                              "                        [声道4BA信噪比(>15)], " +
                              "                        [声道1声速偏差率(<0.20%)], " +
                              "                        [声道2声速偏差率(<0.20%)], " +
                              "                        [声道3声速偏差率(<0.20%)], " +
                              "                        [声道4声速偏差率(<0.20%)], " +
                              "                        [流量计算机计算声速偏差率(<0.2%)], " +
                              "                        [剖面系数(1.12-1.22)], " +
                              "                        [对称性(0.95-1.05)], " +
                              "                        [横向流(0.95-1.05)], " +
                              "                        [气体漩涡角(+/-4度)] " +
                              "                      	) " +
                              "	)UPV " +
                              " ) as results " +
                              "	on " +
                              "	results.[Name]=vals.[Name] ";
                        break;
                    }
                case "RMG":
                    {
                        sql = @" select vals.Name,results.Result, vals.Value 
                            from 
                            ( 
                            	select Name = attribute, Value = value 
                            	from 
                            	( 
                            		SELECT  convert(nvarchar,[v0]) AS [通讯状态], 
								        	convert(nvarchar,case when[P1] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v1], 2)) end) AS[声道 1 状态(= 0)],  
									        convert(nvarchar,case when[P2] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v2], 2)) end) AS[声道 2 状态(= 0)],  
									        convert(nvarchar,case when[P3] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v3], 2)) end) AS[声道 3 状态(= 0)],  
                            				convert(nvarchar,case when[P4] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v4], 2)) end) AS[声道 4 状态(= 0)],
										    convert(nvarchar,case when[P5] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v5], 2)) end) AS[声道 5 状态(= 0)],  
                            				convert(nvarchar,case when[P6] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v6], 2)) end) AS[声道 6 状态(= 0)], 
                            				convert(nvarchar,case when[P7] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v7]) end) AS[声道 1 性能(> 85)],  
                            				convert(nvarchar,case when[P8] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v8]) end) AS[声道 2 性能(> 85)],  
                             				convert(nvarchar,case when[P9] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v9]) end) AS[声道 3 性能(> 85)],  
                            				convert(nvarchar,case when[P10] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v10]) end) AS[声道 4 性能(> 85)],  
                            				convert(nvarchar,case when[P11] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v11]) end) AS[声道 5 性能(> 85)], 
                            				convert(nvarchar,case when[P12] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v12]) end) AS[声道 6 性能(> 85)], 
										    convert(nvarchar,case when[P13] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v13]) end) AS[声道平均性能(> 85)], 
                            				convert(nvarchar,case when[P14] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v14], 2)) end) AS[声道 1A 增益偏差(< 10)], 	 
                            				convert(nvarchar,case when[P15] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v15], 2)) end) AS[声道 1B 增益偏差(< 10)],  
                            				convert(nvarchar,case when[P16] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v16], 2)) end) AS[声道 2A 增益偏差(< 10)], 	 
                            				convert(nvarchar,case when[P17] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v17], 2)) end) AS[声道 2B 增益偏差(< 10)],  
                            				convert(nvarchar,case when[P18] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v18], 2)) end) AS[声道 3A 增益偏差(< 10)], 	 
                            				convert(nvarchar,case when[P19] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v19], 2)) end) AS[声道 3B 增益偏差(< 10)],  
                            				convert(nvarchar,case when[P20] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v20], 2)) end) AS[声道 4A 增益偏差(< 10)], 	 
                            				convert(nvarchar,case when[P21] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v21], 2)) end) AS[声道 4B 增益偏差(< 10)],  
											convert(nvarchar,case when[P22] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v22], 2)) end) AS[声道 5A 增益偏差(< 10)], 	 
                            				convert(nvarchar,case when[P23] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v23], 2)) end) AS[声道 5B 增益偏差(< 10)],  
                            				convert(nvarchar,case when[P24] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v24], 2)) end) AS[声道 6A 增益偏差(< 10)], 	 
                            				convert(nvarchar,case when[P25] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v25], 2)) end) AS[声道 6B 增益偏差(< 10)], 
                            				convert(nvarchar,case when[P26] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v26], 2)) end) AS[声道 1A 信噪比(> 20)],  
                            				convert(nvarchar,case when[P27] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v27], 2)) end) AS[声道 1B 信噪比(> 20)],  
                            				convert(nvarchar,case when[P28] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v28], 2)) end) AS[声道 2A 信噪比(> 20)],  
                            				convert(nvarchar,case when[P29] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v29], 2)) end) AS[声道 2B 信噪比(> 20)],  
                            				convert(nvarchar,case when[P30] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v30], 2)) end) AS[声道 3A 信噪比(> 20)],  
                            				convert(nvarchar,case when[P31] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v31], 2)) end) AS[声道 3B 信噪比(> 20)],  
                            				convert(nvarchar,case when[P32] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v32], 2)) end) AS[声道 4A 信噪比(> 20)],  
                            				convert(nvarchar,case when[P33] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v33], 2)) end) AS[声道 4B 信噪比(> 20)], 
											convert(nvarchar,case when[P34] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v34], 2)) end) AS[声道 5A 信噪比(> 20)],  
                            				convert(nvarchar,case when[P35] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v35], 2)) end) AS[声道 5B 信噪比(> 20)],  
                            				convert(nvarchar,case when[P36] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v36], 2)) end) AS[声道 6A 信噪比(> 20)],  
                            				convert(nvarchar,case when[P37] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v37], 2)) end) AS[声道 6B 信噪比(> 20)], 
                            				convert(nvarchar,case when[P38] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v38], 2)) end) AS[声道 1 声速偏差率(< 2.00 %)],  
                            				convert(nvarchar,case when[P39] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v39], 2)) end) AS[声道 2 声速偏差率(< 2.00 %)],  
                            				convert(nvarchar,case when[P40] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v40], 2)) end) AS[声道 3 声速偏差率(< 2.00 %)],  
                            				convert(nvarchar,case when[P41] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v41], 2)) end) AS[声道 4 声速偏差率(< 2.00 %)],
											convert(nvarchar,case when[P42] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v42], 2)) end) AS[声道 5 声速偏差率(< 2.00 %)],  
                            				convert(nvarchar,case when[P43] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, round([v43], 2)) end) AS[声道 6 声速偏差率(< 2.00 %)],  
                            				convert(nvarchar,case when[P44] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, convert(decimal(18,2),[v44])) end) AS[流量计算机计算声速偏差率(< 5.00 %)], 
                            				convert(nvarchar,case when[P45] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, convert(decimal(18,3),[v45])) end) AS[剖面系数(1.110 ± 0.200)],  
                            				convert(nvarchar,case when[P46] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, convert(decimal(18,3),[v46])) end) AS[流速对称性(1.000 ± 0.200)],  
                            				convert(nvarchar,case when[P47] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, convert(decimal(18,3),[v47])) end) AS[气体漩涡角1(± 10.000°)], 
											convert(nvarchar,case when[P48] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, convert(decimal(18,3),[v48])) end) AS[气体漩涡角2(± 10.000°)],
											convert(nvarchar,case when[P49] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar, convert(decimal(18,3),[v49])) end) AS[气体漩涡角3(± 10.000°)] 
                            		FROM dbo.tRealtimeDiagnosticDataRMGFM 
                            		where   dbo.tRealtimeDiagnosticDataRMGFM.ID = {0} 
                            	) as tblValues 
                            	unpivot 
                            	( 
                            		value for attribute in( [通讯状态], 
                            								[声道 1 状态(= 0)], 
															[声道 2 状态(= 0)],
															[声道 3 状态(= 0)],
															[声道 4 状态(= 0)],
															[声道 5 状态(= 0)],
															[声道 6 状态(= 0)],
                            								[声道 1 性能(> 85)], 
                            								[声道 2 性能(> 85)], 
                            								[声道 3 性能(> 85)], 
                            								[声道 4 性能(> 85)], 
                            								[声道 5 性能(> 85)], 
                            								[声道 6 性能(> 85)], 
															[声道平均性能(> 85)],
                            								[声道 1A 增益偏差(< 10)], 
                            								[声道 1B 增益偏差(< 10)], 
                            								[声道 2A 增益偏差(< 10)], 
                            								[声道 2B 增益偏差(< 10)], 
                            								[声道 3A 增益偏差(< 10)], 
                            								[声道 3B 增益偏差(< 10)], 
                            								[声道 4A 增益偏差(< 10)], 
                            								[声道 4B 增益偏差(< 10)], 
															[声道 5A 增益偏差(< 10)], 
                            								[声道 5B 增益偏差(< 10)], 
                            								[声道 6A 增益偏差(< 10)], 
                            								[声道 6B 增益偏差(< 10)], 
                            								[声道 1A 信噪比(> 20)], 
                            								[声道 1B 信噪比(> 20)], 
                            								[声道 2A 信噪比(> 20)], 
                            								[声道 2B 信噪比(> 20)], 
                            								[声道 3A 信噪比(> 20)], 
                            								[声道 3B 信噪比(> 20)], 
                            						    	[声道 4A 信噪比(> 20)], 
															[声道 4B 信噪比(> 20)],
															[声道 5A 信噪比(> 20)],
                            								[声道 5B 信噪比(> 20)],
														    [声道 6A 信噪比(> 20)], 
                            								[声道 6B 信噪比(> 20)],
                            								[声道 1 声速偏差率(< 2.00 %)], 
                            								[声道 2 声速偏差率(< 2.00 %)], 
                            								[声道 3 声速偏差率(< 2.00 %)], 
                            								[声道 4 声速偏差率(< 2.00 %)], 
															[声道 5 声速偏差率(< 2.00 %)],
															[声道 6 声速偏差率(< 2.00 %)],
                            								[流量计算机计算声速偏差率(< 5.00 %)], 
                            								[剖面系数(1.110 ± 0.200)], 
                            								[流速对称性(1.000 ± 0.200)], 
                            								[气体漩涡角1(± 10.000°)], 
															[气体漩涡角2(± 10.000°)],
															[气体漩涡角3(± 10.000°)]
                            								) 
                            	) UPV 
                            ) as vals 
                            inner join 
                            ( 
                            	select Name = attribute, Result= value 
                            	from 
                            	( 
                            		SELECT FMDesc_0.DescriptionCN AS [通讯状态], 
                            				FMDesc_1.DescriptionCN AS [声道 1 状态(= 0)], 
										    FMDesc_2.DescriptionCN AS [声道 2 状态(= 0)], 
										    FMDesc_3.DescriptionCN AS [声道 3 状态(= 0)], 
											FMDesc_4.DescriptionCN AS [声道 4 状态(= 0)], 
											FMDesc_5.DescriptionCN AS [声道 5 状态(= 0)], 
											FMDesc_6.DescriptionCN AS [声道 6 状态(= 0)], 
                            				FMDesc_7.DescriptionCN AS [声道 1 性能(> 85)], 
                            				FMDesc_8.DescriptionCN AS [声道 2 性能(> 85)], 
                            				FMDesc_9.DescriptionCN AS [声道 3 性能(> 85)], 
                            				FMDesc_10.DescriptionCN AS [声道 4 性能(> 85)], 
                            				FMDesc_11.DescriptionCN AS [声道 5 性能(> 85)], 
                            				FMDesc_12.DescriptionCN AS [声道 6 性能(> 85)], 
											FMDesc_13.DescriptionCN AS [声道平均性能(> 85)],
                            				FMDesc_14.DescriptionCN AS [声道 1A 增益偏差(< 10)], 
                            				FMDesc_15.DescriptionCN AS [声道 1B 增益偏差(< 10)], 
                            				FMDesc_16.DescriptionCN AS [声道 2A 增益偏差(< 10)], 
                            				FMDesc_17.DescriptionCN AS [声道 2B 增益偏差(< 10)], 
                            				FMDesc_18.DescriptionCN AS [声道 3A 增益偏差(< 10)], 
                            				FMDesc_19.DescriptionCN AS [声道 3B 增益偏差(< 10)], 
                            				FMDesc_20.DescriptionCN AS [声道 4A 增益偏差(< 10)], 
                            				FMDesc_21.DescriptionCN AS [声道 4B 增益偏差(< 10)], 
											FMDesc_22.DescriptionCN AS [声道 5A 增益偏差(< 10)], 
                            				FMDesc_23.DescriptionCN AS [声道 5B 增益偏差(< 10)], 
                            				FMDesc_24.DescriptionCN AS [声道 6A 增益偏差(< 10)], 
                            				FMDesc_25.DescriptionCN AS [声道 6B 增益偏差(< 10)], 
                            				FMDesc_26.DescriptionCN AS [声道 1A 信噪比(> 20)], 
                            				FMDesc_27.DescriptionCN AS [声道 1B 信噪比(> 20)], 
                            				FMDesc_28.DescriptionCN AS [声道 2A 信噪比(> 20)], 
                            				FMDesc_29.DescriptionCN AS [声道 2B 信噪比(> 20)], 
                            				FMDesc_30.DescriptionCN AS [声道 3A 信噪比(> 20)], 
                            				FMDesc_31.DescriptionCN AS [声道 3B 信噪比(> 20)], 
                            				FMDesc_32.DescriptionCN AS [声道 4A 信噪比(> 20)], 
                            				FMDesc_33.DescriptionCN AS [声道 4B 信噪比(> 20)], 
										    FMDesc_34.DescriptionCN AS [声道 5A 信噪比(> 20)], 
                            				FMDesc_35.DescriptionCN AS [声道 5B 信噪比(> 20)],
										    FMDesc_36.DescriptionCN AS [声道 6A 信噪比(> 20)], 
                            				FMDesc_37.DescriptionCN AS [声道 6B 信噪比(> 20)],
                            				FMDesc_38.DescriptionCN AS [声道 1 声速偏差率(< 2.00 %)], 
                            				FMDesc_39.DescriptionCN AS [声道 2 声速偏差率(< 2.00 %)], 
                            				FMDesc_40.DescriptionCN AS [声道 3 声速偏差率(< 2.00 %)], 
                            				FMDesc_41.DescriptionCN AS [声道 4 声速偏差率(< 2.00 %)], 
											FMDesc_42.DescriptionCN AS [声道 5 声速偏差率(< 2.00 %)],
										    FMDesc_43.DescriptionCN AS [声道 6 声速偏差率(< 2.00 %)],
                            				FMDesc_44.DescriptionCN AS [流量计算机计算声速偏差率(< 5.00 %)], 
                            				FMDesc_45.DescriptionCN AS [剖面系数(1.110 ± 0.200)], 
                            				FMDesc_46.DescriptionCN AS [流速对称性(1.000 ± 0.200)], 
                            				FMDesc_47.DescriptionCN AS [气体漩涡角1(± 10.000°)],
											FMDesc_48.DescriptionCN AS [气体漩涡角2(± 10.000°)] ,	
											FMDesc_49.DescriptionCN AS [气体漩涡角3(± 10.000°)] 
                            		        FROM    dbo.tRealtimeDiagnosticDataRMGFM INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_0 ON dbo.tRealtimeDiagnosticDataRMGFM.P0 = FMDesc_0.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_1 ON dbo.tRealtimeDiagnosticDataRMGFM.P1 = FMDesc_1.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_2 ON dbo.tRealtimeDiagnosticDataRMGFM.P2 = FMDesc_2.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_3 ON dbo.tRealtimeDiagnosticDataRMGFM.P3 = FMDesc_3.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_4 ON dbo.tRealtimeDiagnosticDataRMGFM.P4 = FMDesc_4.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_5 ON dbo.tRealtimeDiagnosticDataRMGFM.P5 = FMDesc_5.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_6 ON dbo.tRealtimeDiagnosticDataRMGFM.P6 = FMDesc_6.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_7 ON dbo.tRealtimeDiagnosticDataRMGFM.P7 = FMDesc_7.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_8 ON dbo.tRealtimeDiagnosticDataRMGFM.P8 = FMDesc_8.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_9 ON dbo.tRealtimeDiagnosticDataRMGFM.P9 = FMDesc_9.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_10 ON dbo.tRealtimeDiagnosticDataRMGFM.P10 = FMDesc_10.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_11 ON dbo.tRealtimeDiagnosticDataRMGFM.P11 = FMDesc_11.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_12 ON dbo.tRealtimeDiagnosticDataRMGFM.P12 = FMDesc_12.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_13 ON dbo.tRealtimeDiagnosticDataRMGFM.P13 = FMDesc_13.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_14 ON dbo.tRealtimeDiagnosticDataRMGFM.P14 = FMDesc_14.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_15 ON dbo.tRealtimeDiagnosticDataRMGFM.P15 = FMDesc_15.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_16 ON dbo.tRealtimeDiagnosticDataRMGFM.P16 = FMDesc_16.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_17 ON dbo.tRealtimeDiagnosticDataRMGFM.P17 = FMDesc_17.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_18 ON dbo.tRealtimeDiagnosticDataRMGFM.P18 = FMDesc_18.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_19 ON dbo.tRealtimeDiagnosticDataRMGFM.P19 = FMDesc_19.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_20 ON dbo.tRealtimeDiagnosticDataRMGFM.P20 = FMDesc_20.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_21 ON dbo.tRealtimeDiagnosticDataRMGFM.P21 = FMDesc_21.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_22 ON dbo.tRealtimeDiagnosticDataRMGFM.P22 = FMDesc_22.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_23 ON dbo.tRealtimeDiagnosticDataRMGFM.P23 = FMDesc_23.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_24 ON dbo.tRealtimeDiagnosticDataRMGFM.P24 = FMDesc_24.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_25 ON dbo.tRealtimeDiagnosticDataRMGFM.P25 = FMDesc_25.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_26 ON dbo.tRealtimeDiagnosticDataRMGFM.P26 = FMDesc_26.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_27 ON dbo.tRealtimeDiagnosticDataRMGFM.P27 = FMDesc_27.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_28 ON dbo.tRealtimeDiagnosticDataRMGFM.P28 = FMDesc_28.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_29 ON dbo.tRealtimeDiagnosticDataRMGFM.P29 = FMDesc_29.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_30 ON dbo.tRealtimeDiagnosticDataRMGFM.P30 = FMDesc_30.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_31 ON dbo.tRealtimeDiagnosticDataRMGFM.P31 = FMDesc_31.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_32 ON dbo.tRealtimeDiagnosticDataRMGFM.P32 = FMDesc_32.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_33 ON dbo.tRealtimeDiagnosticDataRMGFM.P33 = FMDesc_33.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_34 ON dbo.tRealtimeDiagnosticDataRMGFM.P34 = FMDesc_34.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_35 ON dbo.tRealtimeDiagnosticDataRMGFM.P35 = FMDesc_35.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_36 ON dbo.tRealtimeDiagnosticDataRMGFM.P36 = FMDesc_36.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_37 ON dbo.tRealtimeDiagnosticDataRMGFM.P37 = FMDesc_37.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_38 ON dbo.tRealtimeDiagnosticDataRMGFM.P38 = FMDesc_38.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_39 ON dbo.tRealtimeDiagnosticDataRMGFM.P39 = FMDesc_39.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_40 ON dbo.tRealtimeDiagnosticDataRMGFM.P40 = FMDesc_40.ID INNER JOIN
											dbo.tDiagnosticDescriptionFM AS FMDesc_41 ON dbo.tRealtimeDiagnosticDataRMGFM.P41 = FMDesc_41.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_42 ON dbo.tRealtimeDiagnosticDataRMGFM.P42 = FMDesc_42.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_43 ON dbo.tRealtimeDiagnosticDataRMGFM.P43 = FMDesc_43.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_44 ON dbo.tRealtimeDiagnosticDataRMGFM.P44 = FMDesc_44.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_45 ON dbo.tRealtimeDiagnosticDataRMGFM.P45 = FMDesc_45.ID INNER JOIN
											dbo.tDiagnosticDescriptionFM AS FMDesc_46 ON dbo.tRealtimeDiagnosticDataRMGFM.P46 = FMDesc_46.ID INNER JOIN
											dbo.tDiagnosticDescriptionFM AS FMDesc_47 ON dbo.tRealtimeDiagnosticDataRMGFM.P47 = FMDesc_47.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_48 ON dbo.tRealtimeDiagnosticDataRMGFM.P48 = FMDesc_48.ID INNER JOIN 
                            				dbo.tDiagnosticDescriptionFM AS FMDesc_49 ON dbo.tRealtimeDiagnosticDataRMGFM.P49 = FMDesc_49.ID 
                            		where dbo.tRealtimeDiagnosticDataRMGFM.ID = {0} 
                            	) as tblResults 
                            	unpivot 
                            	( 
                            		value for attribute in( [通讯状态], 
                            								[声道 1 状态(= 0)], 
															[声道 2 状态(= 0)],
															[声道 3 状态(= 0)],
															[声道 4 状态(= 0)],
															[声道 5 状态(= 0)],
															[声道 6 状态(= 0)],
                            								[声道 1 性能(> 85)], 
                            								[声道 2 性能(> 85)], 
                            								[声道 3 性能(> 85)], 
                            								[声道 4 性能(> 85)], 
                            								[声道 5 性能(> 85)], 
                            								[声道 6 性能(> 85)], 
															[声道平均性能(> 85)],
                            								[声道 1A 增益偏差(< 10)], 
                            								[声道 1B 增益偏差(< 10)], 
                            								[声道 2A 增益偏差(< 10)], 
                            								[声道 2B 增益偏差(< 10)], 
                            								[声道 3A 增益偏差(< 10)], 
                            								[声道 3B 增益偏差(< 10)], 
                            								[声道 4A 增益偏差(< 10)], 
                            								[声道 4B 增益偏差(< 10)], 
															[声道 5A 增益偏差(< 10)], 
                            								[声道 5B 增益偏差(< 10)], 
                            								[声道 6A 增益偏差(< 10)], 
                            								[声道 6B 增益偏差(< 10)], 
                            								[声道 1A 信噪比(> 20)], 
                            								[声道 1B 信噪比(> 20)], 
                            								[声道 2A 信噪比(> 20)], 
                            								[声道 2B 信噪比(> 20)], 
                            								[声道 3A 信噪比(> 20)], 
                            								[声道 3B 信噪比(> 20)], 
                            						    	[声道 4A 信噪比(> 20)], 
															[声道 4B 信噪比(> 20)],
															[声道 5A 信噪比(> 20)],
                            								[声道 5B 信噪比(> 20)],
														    [声道 6A 信噪比(> 20)], 
                            								[声道 6B 信噪比(> 20)],
                            								[声道 1 声速偏差率(< 2.00 %)], 
                            								[声道 2 声速偏差率(< 2.00 %)], 
                            								[声道 3 声速偏差率(< 2.00 %)], 
                            								[声道 4 声速偏差率(< 2.00 %)], 
															[声道 5 声速偏差率(< 2.00 %)],
															[声道 6 声速偏差率(< 2.00 %)],
                            								[流量计算机计算声速偏差率(< 5.00 %)], 
                            								[剖面系数(1.110 ± 0.200)], 
                            								[流速对称性(1.000 ± 0.200)], 
                            								[气体漩涡角1(± 10.000°)], 
															[气体漩涡角2(± 10.000°)],
															[气体漩涡角3(± 10.000°)]
                            								) 
                            	) UPV 
                            ) as results 
                            on 
                            results.[Name] = vals.[Name]";
                        break;
                    }
                case "Elster":
                    {
                        sql = " DECLARE @PathsNumber INT	" +
                              " SELECT @PathsNumber=[v0] FROM  [dbo].[tRealtimeDiagnosticDataElsterFM] where ID = {0} " +
                              " if(@PathsNumber=4)" +
                              "	   begin " +
                              "	select vals.Name,results.Result, vals.Value " +
                              "	from " +
                              "	( " +
                              "		   select Name=attribute, Value=value  " +
                              "		from  " +
                              "		( 			 " +
                              "			SELECT	convert(nvarchar,[v1]) AS [通讯状态],  " +
                              "				    convert(nvarchar,case when [P1] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v2],2)) end) AS [声道1报警],  " +
                              "					convert(nvarchar,case when [P2] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v3],2)) end) AS [声道2报警],  " +
                              "					convert(nvarchar,case when [P3] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v4],2)) end) AS [声道3报警],  " +
                              "					convert(nvarchar,case when [P4] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v5],2)) end) AS [声道4报警],  " +
                              "				    convert(nvarchar,case when [P7] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v8]) end) AS [声道1接受率(=100)],  " +
                              "                 convert(nvarchar,case when [P8] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v9]) end) AS [声道2接受率(=100)],  " +
                              "					convert(nvarchar,case when [P9] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v10]) end) AS [声道3接受率(=100)],  " +
                              "					convert(nvarchar,case when [P10] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v11]) end) AS [声道4接受率(=100)],  " +
                              "					convert(nvarchar,case when [P13] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v14]) end) AS [声道 A1 信号增益(<50000)],  " +
                              "                 convert(nvarchar,case when [P14] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v15]) end) AS [声道 B1 信号增益(<50000)],  " +
                              "					convert(nvarchar,case when [P15] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v16]) end) AS [声道 A2 信号增益(<50000)],  " +
                              "					convert(nvarchar,case when [P16] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v17]) end) AS [声道 B2 信号增益(<50000)],  " +
                              "					convert(nvarchar,case when [P17] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v18]) end) AS [声道 A3 信号增益(<50000)],  " +
                              "					convert(nvarchar,case when [P18] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v19]) end) AS [声道 B3 信号增益(<50000)],  " +
                              "					convert(nvarchar,case when [P19] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v20]) end) AS [声道 A4 信号增益(<50000)],  " +
                              "					convert(nvarchar,case when [P20] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v21]) end) AS [声道 B4 信号增益(<50000)],  " +
                              "                 convert(nvarchar,case when [p37] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v38],2)) end) AS [通道1声速偏差率(<0.2%)],  " +
                              "                 convert(nvarchar,case when [p38] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v39],2)) end) AS [通道2声速偏差率(<0.2%)],  " +
                              "                 convert(nvarchar,case when [p39] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v40],2)) end) AS [通道3声速偏差率(<0.2%)], 	 " +
                              "                 convert(nvarchar,case when [p40] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v41],2)) end) AS [通道4声速偏差率(<0.2%)], 	 " +
                              "				    convert(nvarchar,case when [p43] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v44],2)) end) AS [流量计算机计算声速偏差率(<0.2%)],   " +
                              "                 convert(nvarchar,case when [p44] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v45],4)) end) AS [剖面系数(1.0467 ~ 1.0695)], " +
                              "					convert(nvarchar,case when [p45] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v46],4)) end) AS [气体漩涡角(-0.72° ~ 1.28°)]	 " +
                              "				FROM	dbo.[tRealtimeDiagnosticDataElsterFM] " +
                              "				where	dbo.[tRealtimeDiagnosticDataElsterFM].ID = {0} " +
                              "		) as tblValues " +
                              "			unpivot " +
                              "			( " +
                              "				value for attribute in([通讯状态],  " +
                              "										[声道1报警],  " +
                              "										[声道2报警],  " +
                              "										[声道3报警],  " +
                              "										[声道4报警],  " +
                              "										[声道1接受率(=100)], " +
                              "										[声道2接受率(=100)],  " +
                              "										[声道3接受率(=100)],  " +
                              "										[声道4接受率(=100)], 	 " +
                              "										[声道 A1 信号增益(<50000)],	" +
                              "                                     [声道 B1 信号增益(<50000)],	" +
                              "                                     [声道 A2 信号增益(<50000)],	" +
                              "                                     [声道 B2 信号增益(<50000)],	" +
                              "                                     [声道 A3 信号增益(<50000)],	" +
                              "                                     [声道 B3 信号增益(<50000)],	" +
                              "                                     [声道 A4 信号增益(<50000)],	" +
                              "                                     [声道 B4 信号增益(<50000)],	" +
                              "										[通道1声速偏差率(<0.2%)], " +
                              "									    [通道2声速偏差率(<0.2%)], " +
                              "                                     [通道3声速偏差率(<0.2%)],	" +
                              "                                     [通道4声速偏差率(<0.2%)], " +
                              "										[流量计算机计算声速偏差率(<0.2%)], " +
                              "                                     [剖面系数(1.0467 ~ 1.0695)], " +
                              "										[气体漩涡角(-0.72° ~ 1.28°)]	 " +
                              "									) " +
                              "			)UPV  " +
                              "		) as vals  " +
                              "		inner join  " +
                              "		(  " +
                              "			select Name=attribute, Result=value   " +
                              "		    	from   " +
                              "		          	(  " +
                              "				SELECT	  " +
                              "				  FMDesc_0.DescriptionCN AS 通讯状态,   " +
                              "			      FMDesc_1.DescriptionCN AS 声道1报警,   " +
                              "               FMDesc_2.DescriptionCN AS 声道2报警,   " +
                              "               FMDesc_3.DescriptionCN AS 声道3报警,   " +
                              "				  FMDesc_4.DescriptionCN AS 声道4报警,   " +
                              "               FMDesc_7.DescriptionCN AS [声道1接受率(=100)],   " +
                              "               FMDesc_8.DescriptionCN AS [声道2接受率(=100)],   " +
                              "               FMDesc_9.DescriptionCN AS [声道3接受率(=100)],   " +
                              "               FMDesc_10.DescriptionCN AS [声道4接受率(=100)],   " +
                              "				  FMDesc_13.DescriptionCN AS [声道 A1 信号增益(<50000)], " +
                              "				  FMDesc_14.DescriptionCN AS [声道 B1 信号增益(<50000)], " +
                              "               FMDesc_15.DescriptionCN AS [声道 A2 信号增益(<50000)], " +
                              "				  FMDesc_16.DescriptionCN AS [声道 B2 信号增益(<50000)], " +
                              "				  FMDesc_17.DescriptionCN AS [声道 A3 信号增益(<50000)], " +
                              "				  FMDesc_18.DescriptionCN AS [声道 B3 信号增益(<50000)], " +
                              "				  FMDesc_19.DescriptionCN AS [声道 A4 信号增益(<50000)], " +
                              "				  FMDesc_20.DescriptionCN AS [声道 B4 信号增益(<50000)], " +
                              "               FMDesc_37.DescriptionCN AS [通道1声速偏差率(<0.2%)], " +
                              "               FMDesc_38.DescriptionCN AS [通道2声速偏差率(<0.2%)], " +
                              "               FMDesc_39.DescriptionCN AS [通道3声速偏差率(<0.2%)], " +
                              "               FMDesc_40.DescriptionCN AS [通道4声速偏差率(<0.2%)], " +
                              "				  FMDesc_43.DescriptionCN AS [流量计算机计算声速偏差率(<0.2%)], " +
                             "                FMDesc_44.DescriptionCN AS [剖面系数(1.0467 ~ 1.0695)],	" +
                              "				  FMDesc_45.DescriptionCN AS [气体漩涡角(-0.72° ~ 1.28°)]		" +
                              "				FROM	dbo.[tRealtimeDiagnosticDataElsterFM] INNER JOIN    	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_0 ON dbo.[tRealtimeDiagnosticDataElsterFM].P0 = FMDesc_0.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_1 ON dbo.[tRealtimeDiagnosticDataElsterFM].P1 = FMDesc_1.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_2 ON dbo.[tRealtimeDiagnosticDataElsterFM].P2 = FMDesc_2.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_3 ON dbo.[tRealtimeDiagnosticDataElsterFM].P3 = FMDesc_3.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_4 ON dbo.[tRealtimeDiagnosticDataElsterFM].P4 = FMDesc_4.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_5 ON dbo.[tRealtimeDiagnosticDataElsterFM].P5 = FMDesc_5.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_6 ON dbo.[tRealtimeDiagnosticDataElsterFM].P6 = FMDesc_6.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_7 ON dbo.[tRealtimeDiagnosticDataElsterFM].P7 = FMDesc_7.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_8 ON dbo.[tRealtimeDiagnosticDataElsterFM].P8 = FMDesc_8.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_9 ON dbo.[tRealtimeDiagnosticDataElsterFM].P9 = FMDesc_9.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_10 ON dbo.[tRealtimeDiagnosticDataElsterFM].P10 = FMDesc_10.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_11 ON dbo.[tRealtimeDiagnosticDataElsterFM].P11 = FMDesc_11.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_12 ON dbo.[tRealtimeDiagnosticDataElsterFM].P12 = FMDesc_12.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_13 ON dbo.[tRealtimeDiagnosticDataElsterFM].P13 = FMDesc_13.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_14 ON dbo.[tRealtimeDiagnosticDataElsterFM].P14 = FMDesc_14.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_15 ON dbo.[tRealtimeDiagnosticDataElsterFM].P15 = FMDesc_15.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_16 ON dbo.[tRealtimeDiagnosticDataElsterFM].P16 = FMDesc_16.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_17 ON dbo.[tRealtimeDiagnosticDataElsterFM].P17 = FMDesc_17.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_18 ON dbo.[tRealtimeDiagnosticDataElsterFM].P18 = FMDesc_18.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_19 ON dbo.[tRealtimeDiagnosticDataElsterFM].P19 = FMDesc_19.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_20 ON dbo.[tRealtimeDiagnosticDataElsterFM].P20 = FMDesc_20.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_21 ON dbo.[tRealtimeDiagnosticDataElsterFM].P21 = FMDesc_21.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_22 ON dbo.[tRealtimeDiagnosticDataElsterFM].P22 = FMDesc_22.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_23 ON dbo.[tRealtimeDiagnosticDataElsterFM].P23 = FMDesc_23.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_24 ON dbo.[tRealtimeDiagnosticDataElsterFM].P24 = FMDesc_24.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_25 ON dbo.[tRealtimeDiagnosticDataElsterFM].P25 = FMDesc_25.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_26 ON dbo.[tRealtimeDiagnosticDataElsterFM].P26 = FMDesc_26.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_27 ON dbo.[tRealtimeDiagnosticDataElsterFM].P27 = FMDesc_27.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_28 ON dbo.[tRealtimeDiagnosticDataElsterFM].P28 = FMDesc_28.ID INNER JOIN	" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_29 ON dbo.[tRealtimeDiagnosticDataElsterFM].P29 = FMDesc_29.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_30 ON dbo.[tRealtimeDiagnosticDataElsterFM].P30 = FMDesc_30.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_31 ON dbo.[tRealtimeDiagnosticDataElsterFM].P31 = FMDesc_31.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_32 ON dbo.[tRealtimeDiagnosticDataElsterFM].P32 = FMDesc_32.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_33 ON dbo.[tRealtimeDiagnosticDataElsterFM].P33 = FMDesc_33.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_34 ON dbo.[tRealtimeDiagnosticDataElsterFM].P34 = FMDesc_34.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_35 ON dbo.[tRealtimeDiagnosticDataElsterFM].P35 = FMDesc_35.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_36 ON dbo.[tRealtimeDiagnosticDataElsterFM].P36 = FMDesc_36.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_37 ON dbo.[tRealtimeDiagnosticDataElsterFM].P37 = FMDesc_37.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_38 ON dbo.[tRealtimeDiagnosticDataElsterFM].P38 = FMDesc_38.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_39 ON dbo.[tRealtimeDiagnosticDataElsterFM].P39 = FMDesc_39.ID INNER JOIN " +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_40 ON dbo.[tRealtimeDiagnosticDataElsterFM].P40 = FMDesc_40.ID INNER JOIN " +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_41 ON dbo.[tRealtimeDiagnosticDataElsterFM].P41 = FMDesc_41.ID INNER JOIN " +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_42 ON dbo.[tRealtimeDiagnosticDataElsterFM].P42 = FMDesc_42.ID INNER JOIN " +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_43 ON dbo.[tRealtimeDiagnosticDataElsterFM].P43 = FMDesc_43.ID INNER JOIN " +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_44 ON dbo.[tRealtimeDiagnosticDataElsterFM].P44 = FMDesc_44.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_45 ON dbo.[tRealtimeDiagnosticDataElsterFM].P45 = FMDesc_45.ID " +
                              "				  where	dbo.[tRealtimeDiagnosticDataElsterFM].ID = {0} " +
                              "			) as tblResults " +
                              "			unpivot " +
                              "			(" +
                              "				value for attribute in([通讯状态]," +
                              "								       [声道1报警]," +
                              "										[声道2报警]," +
                              "										[声道3报警]," +
                              "										[声道4报警]," +
                              "										[声道1接受率(=100)]," +
                              "										[声道2接受率(=100)]," +
                              "										[声道3接受率(=100)]," +
                              "										[声道4接受率(=100)]," +
                              "										[声道 A1 信号增益(<50000)]," +
                              "                                     [声道 B1 信号增益(<50000)]," +
                              "                                     [声道 A2 信号增益(<50000)]," +
                              "                                     [声道 B2 信号增益(<50000)]," +
                              "                                     [声道 A3 信号增益(<50000)]," +
                              "                                     [声道 B3 信号增益(<50000)]," +
                              "                                     [声道 A4 信号增益(<50000)]," +
                              "                                     [声道 B4 信号增益(<50000)]," +
                              "										[通道1声速偏差率(<0.2%)]," +
                              "										[通道2声速偏差率(<0.2%)]," +
                              "                                   	[通道3声速偏差率(<0.2%)]," +
                              "                                     [通道4声速偏差率(<0.2%)]," +
                              "										[流量计算机计算声速偏差率(<0.2%)]," +
                              "										[剖面系数(1.0467 ~ 1.0695)]," +
                              "										[气体漩涡角(-0.72° ~ 1.28°)]	" +
                              "										)" +
                              "			)UPV" +
                              "		) as results" +
                              "		on" +
                              "		results.[Name]=vals.[Name] " +
                              "    end		" +
                              "	else  " +
                              " 	  begin " +
                              "	    	select vals.Name,results.Result, vals.Value " +
                              "	      	from " +
                              "		       ( " +
                              "			select Name=attribute, Value=value  " +
                              "			from  " +
                              "			( 		 " +
                              "				SELECT	convert(nvarchar,[v1]) AS [通讯状态]," +
                              "					    convert(nvarchar,case when [P1] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v2], 2)) end) AS[声道1报警], " +
                              "						convert(nvarchar,case when [P2] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v3],2)) end) AS [声道2报警], " +
                              "						convert(nvarchar,case when [P3] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v4],2)) end) AS [声道3报警], " +
                              "						convert(nvarchar,case when [P4] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v5],2)) end) AS [声道4报警], " +
                              "						convert(nvarchar,case when [P5] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v6],2)) end) AS [声道5报警], " +
                              "						convert(nvarchar,case when [P6] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v7],2)) end) AS [声道6报警], " +
                              "					    convert(nvarchar,case when [P7] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v8]) end) AS [声道1接受率(=100)], " +
                              "                     convert(nvarchar,case when [P8] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v9]) end) AS [声道2接受率(=100)], " +
                              "						convert(nvarchar,case when [P9] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v10]) end) AS [声道3接受率(=100)], " +
                              "						convert(nvarchar,case when [P10] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v11]) end) AS [声道4接受率(=100)], " +
                              "						convert(nvarchar,case when [P11] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v12]) end) AS [声道5接受率(=100)], " +
                              "						convert(nvarchar,case when [P12] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v13]) end) AS [声道6接受率(=100)], " +
                              "						convert(nvarchar,case when [P13] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v14]) end) AS [声道 A1 信号增益(<50000)], " +
                              "                     convert(nvarchar,case when [P14] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v15]) end) AS [声道 B1 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P15] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v16]) end) AS [声道 A2 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P16] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v17]) end) AS [声道 B2 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P17] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v18]) end) AS [声道 A3 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P18] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v19]) end) AS [声道 B3 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P19] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v20]) end) AS [声道 A4 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P20] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v21]) end) AS [声道 B4 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P21] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v22]) end) AS [声道 A5 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P22] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v23]) end) AS [声道 B5 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P23] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v24]) end) AS [声道 A6 信号增益(<50000)], " +
                              "						convert(nvarchar,case when [P24] in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,[v25]) end) AS [声道 B6 信号增益(<50000)], " +
                              "                     convert(nvarchar,case when [p37]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v38],2)) end) AS [通道1声速偏差率(<0.2%)], " +
                              "                     convert(nvarchar,case when [p38]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v39],2)) end) AS [通道2声速偏差率(<0.2%)], " +
                              "                     convert(nvarchar,case when [p39]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v40],2)) end) AS [通道3声速偏差率(<0.2%)], " +
                              "                     convert(nvarchar,case when [p40]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v41],2)) end) AS [通道4声速偏差率(<0.2%)], " +
                              "						convert(nvarchar,case when [p41]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v42],2)) end) AS [通道5声速偏差率(<0.2%)], " +
                              "                     convert(nvarchar,case when [p42]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v43],2)) end) AS [通道6声速偏差率(<0.2%)], " +
                              "						convert(nvarchar,case when [p43]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v44],2)) end) AS [流量计算机计算声速偏差率(<0.2%)], " +
                              "                     convert(nvarchar,case when [p44]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v45],4)) end) AS [剖面系数(1.0467 ~ 1.0695)]," +
                              "					    convert(nvarchar,case when [p45]in (1, 17, 20, 21, 22, 33, 36, 255) then N'N/A' else convert(nvarchar,round([v46],4)) end) AS [气体漩涡角(-0.72° ~ 1.28°)]	" +
                              "				FROM	dbo.[tRealtimeDiagnosticDataElsterFM]" +
                              "				where	dbo.[tRealtimeDiagnosticDataElsterFM].ID = {0}" +
                              "			) as tblValues" +
                              "			unpivot" +
                              "			(" +
                              "				value for attribute in([通讯状态], " +
                              "										[声道1报警]," +
                              "										[声道2报警]," +
                              "										[声道3报警]," +
                              "										[声道4报警]," +
                              "										[声道5报警]," +
                              "										[声道6报警]," +
                              "										[声道1接受率(=100)]," +
                              "										[声道2接受率(=100)]," +
                              "										[声道3接受率(=100)]," +
                              "										[声道4接受率(=100)]," +
                              "										[声道5接受率(=100)]," +
                              "										[声道6接受率(=100)]," +
                              "										[声道 A1 信号增益(<50000)]," +
                              "                                     [声道 B1 信号增益(<50000)]," +
                              "                                     [声道 A2 信号增益(<50000)]," +
                              "                                     [声道 B2 信号增益(<50000)]," +
                              "                                     [声道 A3 信号增益(<50000)]," +
                              "                                     [声道 B3 信号增益(<50000)]," +
                              "                                     [声道 A4 信号增益(<50000)]," +
                              "                                     [声道 B4 信号增益(<50000)]," +
                              "										[声道 A5 信号增益(<50000)]," +
                              "                                     [声道 B5 信号增益(<50000)]," +
                              "										[声道 A6 信号增益(<50000)]," +
                              "                                     [声道 B6 信号增益(<50000)]," +
                              "										[通道1声速偏差率(<0.2%)]," +
                              "										[通道2声速偏差率(<0.2%)]," +
                              "                                   	[通道3声速偏差率(<0.2%)]," +
                              "                                     [通道4声速偏差率(<0.2%)]," +
                              "										[通道5声速偏差率(<0.2%)]," +
                              "                                     [通道6声速偏差率(<0.2%)]," +
                              "										[流量计算机计算声速偏差率(<0.2%)]," +
                              "										[剖面系数(1.0467 ~ 1.0695)]," +
                              "										[气体漩涡角(-0.72° ~ 1.28°)]	" +
                              "										)" +
                              "			)UPV" +
                              "		) as vals" +
                              "		inner join" +
                              "		(" +
                              "			select Name=attribute, Result=value " +
                              "			from " +
                              "			(" +
                              "				SELECT	" +
                              "				      FMDesc_0.DescriptionCN AS 通讯状态, " +
                              "			          FMDesc_1.DescriptionCN AS 声道1报警, " +
                              "                   FMDesc_2.DescriptionCN AS 声道2报警, " +
                              "                   FMDesc_3.DescriptionCN AS 声道3报警, " +
                              "				      FMDesc_3.DescriptionCN AS 声道4报警, " +
                              "                   FMDesc_5.DescriptionCN AS 声道5报警, " +
                              "                   FMDesc_6.DescriptionCN AS 声道6报警, " +
                              "                   FMDesc_7.DescriptionCN AS [声道1接受率(=100)]," +
                              "                   FMDesc_8.DescriptionCN AS [声道2接受率(=100)], " +
                              "                   FMDesc_9.DescriptionCN AS [声道3接受率(=100)], " +
                              "                   FMDesc_10.DescriptionCN AS [声道4接受率(=100)], " +
                              "				      FMDesc_11.DescriptionCN AS [声道5接受率(=100)], " +
                              "                   FMDesc_12.DescriptionCN AS [声道6接受率(=100)], " +
                              "				      FMDesc_13.DescriptionCN AS [声道 A1 信号增益(<50000)], " +
                              "				      FMDesc_14.DescriptionCN AS [声道 B1 信号增益(<50000)], " +
                              "                   FMDesc_15.DescriptionCN AS [声道 A2 信号增益(<50000)], " +
                              "				      FMDesc_16.DescriptionCN AS [声道 B2 信号增益(<50000)], " +
                              "				      FMDesc_17.DescriptionCN AS [声道 A3 信号增益(<50000)], " +
                              "				      FMDesc_18.DescriptionCN AS [声道 B3 信号增益(<50000)], " +
                              "				      FMDesc_19.DescriptionCN AS [声道 A4 信号增益(<50000)], " +
                              "				      FMDesc_20.DescriptionCN AS [声道 B4 信号增益(<50000)], " +
                              "				      FMDesc_21.DescriptionCN AS [声道 A5 信号增益(<50000)], " +
                              "				      FMDesc_22.DescriptionCN AS [声道 B5 信号增益(<50000)], " +
                              "				      FMDesc_23.DescriptionCN AS [声道 A6 信号增益(<50000)], " +
                              "				      FMDesc_24.DescriptionCN AS [声道 B6 信号增益(<50000)], " +
                              "                   FMDesc_37.DescriptionCN AS [通道1声速偏差率(<0.2%)], " +
                               "                  FMDesc_38.DescriptionCN AS [通道2声速偏差率(<0.2%)], " +
                               "                  FMDesc_39.DescriptionCN AS [通道3声速偏差率(<0.2%)], " +
                               "                  FMDesc_40.DescriptionCN AS [通道4声速偏差率(<0.2%)], " +
                              "				      FMDesc_41.DescriptionCN AS [通道5声速偏差率(<0.2%)], " +
                              "                   FMDesc_42.DescriptionCN AS [通道6声速偏差率(<0.2%)], " +
                              "				      FMDesc_43.DescriptionCN AS [流量计算机计算声速偏差率(<0.2%)], " +
                              "				      FMDesc_44.DescriptionCN AS [剖面系数(1.0467 ~ 1.0695)], " +
                              "				      FMDesc_45.DescriptionCN AS [气体漩涡角(-0.72° ~ 1.28°)]	" +
                              "				FROM	dbo.[tRealtimeDiagnosticDataElsterFM] INNER JOIN    " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_0 ON dbo.[tRealtimeDiagnosticDataElsterFM].P0 = FMDesc_0.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_1 ON dbo.[tRealtimeDiagnosticDataElsterFM].P1 = FMDesc_1.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_2 ON dbo.[tRealtimeDiagnosticDataElsterFM].P2 = FMDesc_2.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_3 ON dbo.[tRealtimeDiagnosticDataElsterFM].P3 = FMDesc_3.ID INNER JOIN " +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_4 ON dbo.[tRealtimeDiagnosticDataElsterFM].P4 = FMDesc_4.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_5 ON dbo.[tRealtimeDiagnosticDataElsterFM].P5 = FMDesc_5.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_6 ON dbo.[tRealtimeDiagnosticDataElsterFM].P6 = FMDesc_6.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_7 ON dbo.[tRealtimeDiagnosticDataElsterFM].P7 = FMDesc_7.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_8 ON dbo.[tRealtimeDiagnosticDataElsterFM].P8 = FMDesc_8.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_9 ON dbo.[tRealtimeDiagnosticDataElsterFM].P9 = FMDesc_9.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_10 ON dbo.[tRealtimeDiagnosticDataElsterFM].P10 = FMDesc_10.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_11 ON dbo.[tRealtimeDiagnosticDataElsterFM].P11 = FMDesc_11.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_12 ON dbo.[tRealtimeDiagnosticDataElsterFM].P12 = FMDesc_12.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_13 ON dbo.[tRealtimeDiagnosticDataElsterFM].P13 = FMDesc_13.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_14 ON dbo.[tRealtimeDiagnosticDataElsterFM].P14 = FMDesc_14.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_15 ON dbo.[tRealtimeDiagnosticDataElsterFM].P15 = FMDesc_15.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_16 ON dbo.[tRealtimeDiagnosticDataElsterFM].P16 = FMDesc_16.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_17 ON dbo.[tRealtimeDiagnosticDataElsterFM].P17 = FMDesc_17.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_18 ON dbo.[tRealtimeDiagnosticDataElsterFM].P18 = FMDesc_18.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_19 ON dbo.[tRealtimeDiagnosticDataElsterFM].P19 = FMDesc_19.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_20 ON dbo.[tRealtimeDiagnosticDataElsterFM].P20 = FMDesc_20.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_21 ON dbo.[tRealtimeDiagnosticDataElsterFM].P21 = FMDesc_21.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_22 ON dbo.[tRealtimeDiagnosticDataElsterFM].P22 = FMDesc_22.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_23 ON dbo.[tRealtimeDiagnosticDataElsterFM].P23 = FMDesc_23.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_24 ON dbo.[tRealtimeDiagnosticDataElsterFM].P24 = FMDesc_24.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_25 ON dbo.[tRealtimeDiagnosticDataElsterFM].P25 = FMDesc_25.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_26 ON dbo.[tRealtimeDiagnosticDataElsterFM].P26 = FMDesc_26.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_27 ON dbo.[tRealtimeDiagnosticDataElsterFM].P27 = FMDesc_27.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_28 ON dbo.[tRealtimeDiagnosticDataElsterFM].P28 = FMDesc_28.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_29 ON dbo.[tRealtimeDiagnosticDataElsterFM].P29 = FMDesc_29.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_30 ON dbo.[tRealtimeDiagnosticDataElsterFM].P30 = FMDesc_30.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_31 ON dbo.[tRealtimeDiagnosticDataElsterFM].P31 = FMDesc_31.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_32 ON dbo.[tRealtimeDiagnosticDataElsterFM].P32 = FMDesc_32.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_33 ON dbo.[tRealtimeDiagnosticDataElsterFM].P33 = FMDesc_33.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_34 ON dbo.[tRealtimeDiagnosticDataElsterFM].P34 = FMDesc_34.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_35 ON dbo.[tRealtimeDiagnosticDataElsterFM].P35 = FMDesc_35.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_36 ON dbo.[tRealtimeDiagnosticDataElsterFM].P36 = FMDesc_36.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_37 ON dbo.[tRealtimeDiagnosticDataElsterFM].P37 = FMDesc_37.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_38 ON dbo.[tRealtimeDiagnosticDataElsterFM].P38 = FMDesc_38.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_39 ON dbo.[tRealtimeDiagnosticDataElsterFM].P39 = FMDesc_39.ID INNER JOIN" +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_40 ON dbo.[tRealtimeDiagnosticDataElsterFM].P40 = FMDesc_40.ID INNER JOIN" +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_41 ON dbo.[tRealtimeDiagnosticDataElsterFM].P41 = FMDesc_41.ID INNER JOIN" +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_42 ON dbo.[tRealtimeDiagnosticDataElsterFM].P42 = FMDesc_42.ID INNER JOIN" +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_43 ON dbo.[tRealtimeDiagnosticDataElsterFM].P43 = FMDesc_43.ID INNER JOIN" +
                              "					    dbo.tDiagnosticDescriptionFM AS FMDesc_44 ON dbo.[tRealtimeDiagnosticDataElsterFM].P44 = FMDesc_44.ID INNER JOIN" +
                              "						dbo.tDiagnosticDescriptionFM AS FMDesc_45 ON dbo.[tRealtimeDiagnosticDataElsterFM].P45 = FMDesc_45.ID 	" +
                              "				 where	dbo.[tRealtimeDiagnosticDataElsterFM].ID = {0} " +
                              "			) as tblResults " +
                              "			unpivot " +
                              "			( " +
                              "				value for attribute in([通讯状态], " +
                              "										[声道1报警], " +
                              "										[声道2报警]," +
                              "										[声道3报警]," +
                              "										[声道4报警]," +
                              "										[声道5报警]," +
                              "										[声道6报警]," +
                              "										[声道1接受率(=100)]," +
                              "										[声道2接受率(=100)]," +
                              "										[声道3接受率(=100)]," +
                              "										[声道4接受率(=100)]," +
                              "										[声道5接受率(=100)]," +
                              "										[声道6接受率(=100)]," +
                              "										[声道 A1 信号增益(<50000)]," +
                              "                                     [声道 B1 信号增益(<50000)]," +
                              "                                     [声道 A2 信号增益(<50000)]," +
                              "                                     [声道 B2 信号增益(<50000)]," +
                              "                                     [声道 A3 信号增益(<50000)]," +
                              "                                     [声道 B3 信号增益(<50000)]," +
                              "                                     [声道 A4 信号增益(<50000)]," +
                              "                                     [声道 B4 信号增益(<50000)]," +
                              "										[声道 A5 信号增益(<50000)]," +
                              "                                     [声道 B5 信号增益(<50000)]," +
                              "										[声道 A6 信号增益(<50000)]," +
                              "                                     [声道 B6 信号增益(<50000)]," +
                              "										[通道1声速偏差率(<0.2%)]," +
                              "										[通道2声速偏差率(<0.2%)]," +
                              "                                   	[通道3声速偏差率(<0.2%)]," +
                              "                                     [通道4声速偏差率(<0.2%)]," +
                              "										[通道5声速偏差率(<0.2%)]," +
                              "                                     [通道6声速偏差率(<0.2%)]," +
                              "										[流量计算机计算声速偏差率(<0.2%)]," +
                              "										[剖面系数(1.0467 ~ 1.0695)]," +
                              "										[气体漩涡角(-0.72° ~ 1.28°)]" +
                              "										)" +
                              "			)UPV " +
                              "		) as results " +
                              "		on " +
                              "		results.[Name]=vals.[Name] " +
                              "	  end	";
                        break;
                    }
            }
            sql = string.Format(sql, loopID);
            return _context.DiagnosticDataDetails.FromSqlRaw(sql);
        }
        public IEnumerable<DiagnosticDataDetail> GetFlowComputerDiagnosticDataDetail(string loopID, string brandName)
        {
            string sql = "";
            switch (brandName)
            {
                case "Daniel":
                    {
                        sql = "select Name = attribute, Result = value , Value='/' " +
                              "from " +
                              "( " +
                              "		SELECT  FCDesc_0.DescriptionCN AS[流量计算机], " +
                              "				FCDesc_1.DescriptionCN AS[流量计算机过程], " +
                              "				FCDesc_2.DescriptionCN AS[流量计算机系统] " +
                              "		FROM    dbo.tRealtimeDiagnosticDataDanielFC INNER JOIN " +
                              "				dbo.tDiagnosticDescriptionFC AS FCDesc_0 ON dbo.tRealtimeDiagnosticDataDanielFC.P0 = FCDesc_0.ID INNER JOIN " +
                              "				dbo.tDiagnosticDescriptionFC AS FCDesc_1 ON dbo.tRealtimeDiagnosticDataDanielFC.p1 = FCDesc_1.ID INNER JOIN " +
                              "				dbo.tDiagnosticDescriptionFC AS FCDesc_2 ON dbo.tRealtimeDiagnosticDataDanielFC.p2 = FCDesc_2.ID " +
                              "		WHERE " +
                              "		dbo.tRealtimeDiagnosticDataDanielFC.ID = {0} " +
                              ") as tblResults  " +
                              "unpivot " +
                              "( " +
                              "	value for attribute in([流量计算机],[流量计算机过程],[流量计算机系统]) " +
                              ") UPV ";
                        break;
                    }
                case "Weise":
                    {
                        sql = "select Name=attribute, Result=value ,Value='/' " +
                              "from " +
                              "( " +
                              "    SELECT  FCDesc_0.DescriptionCN AS[流量计算机] " +
                              "    FROM    dbo.tRealtimeDiagnosticDataWeiseFC INNER JOIN " +
                              "            dbo.tDiagnosticDescriptionFC AS FCDesc_0 ON dbo.tRealtimeDiagnosticDataWeiseFC.P0 = FCDesc_0.ID " +
                              "    WHERE dbo.tRealtimeDiagnosticDataWeiseFC.ID = {0}  " +
                              ") as tblResults " +
                              "unpivot " +
                              "( " +
                              "value for attribute in([流量计算机]) " +
                              ") UPV";
                        break;
                    }
                case "Sick":
                    {
                        sql = "select Name=attribute, Result=value ,Value='/' " +
                              "  from " +
                              "   ( " +
                              "    SELECT  FCDesc_0.DescriptionCN AS[流量计算机] " +
                              "    FROM    dbo.tRealtimeDiagnosticDataSickFC INNER JOIN  " +
                              "            dbo.tDiagnosticDescriptionFC AS FCDesc_0 ON dbo.tRealtimeDiagnosticDataSickFC.P0 = FCDesc_0.ID  " +
                              "    WHERE dbo.tRealtimeDiagnosticDataSickFC.ID = {0}  " +
                              " ) as tblResults " +
                              " unpivot " +
                              "( " +
                              "value for attribute in([流量计算机]) " +
                              ") UPV";
                        break;
                    }
                case "RMG":
                    {
                        sql = "select Name=attribute, Result=value ,Value='/' " +
                              " from " +
                              " (  " +
                              "   SELECT  FCDesc_0.DescriptionCN AS[流量计算机] " +
                              "   FROM    dbo.tRealtimeDiagnosticDataRMGFC INNER JOIN " +
                              "           dbo.tDiagnosticDescriptionFC AS FCDesc_0 ON dbo.tRealtimeDiagnosticDataRMGFC.P0 = FCDesc_0.ID " +
                              "   WHERE dbo.tRealtimeDiagnosticDataRMGFC.ID = {0} " +
                              " ) as tblResults " +
                              " unpivot " +
                              " ( " +
                              "   value for attribute in([流量计算机]) " +
                              " ) UPV";
                        break;
                    }
                case "Elster":
                    {
                        sql = "	select Name=attribute, Result=value ,Value='/' " +
                              "  from " +
                              "  ( " +
                              "     SELECT  FCDesc_0.DescriptionCN AS[与FT通讯状态], " +
                              "             FCDesc_1.DescriptionCN AS[与GC通讯状态] " +
                              "     FROM    dbo.tRealtimeDiagnosticDataElsterFC INNER JOIN " +
                              "             dbo.tDiagnosticDescriptionFC AS FCDesc_0 ON dbo.tRealtimeDiagnosticDataElsterFC.P0 = FCDesc_0.ID INNER JOIN " +
                              "             dbo.tDiagnosticDescriptionFC AS FCDesc_1 ON dbo.tRealtimeDiagnosticDataElsterFC.p1 = FCDesc_1.ID " +
                              "     WHERE  dbo.tRealtimeDiagnosticDataElsterFC.ID = {0} " +
                              "    ) as tblResults " +
                              "  unpivot " +
                              "  ( " +
                              "   value for attribute in([与FT通讯状态],[与GC通讯状态]) " +
                              "  ) UPV";
                        break;
                    }
            }
            sql = string.Format(sql, loopID);
            return _context.DiagnosticDataDetails.FromSqlRaw(sql);
        }
        public IEnumerable<DiagnosticDataDetail> GetTemperatureTransmitterDiagnosticDataDetail(string loopID, string brandName)
        {
            string sql = "";
            switch (brandName)
            {
                case "Daniel":
                    {
                        sql = "select Name=attribute, Result=value, Value='/' " +
                              "from " +
                              "( " +
                              "SELECT  TTDesc_0.DescriptionCN AS[温度值(+/ -2DegC)], " +
                              "		   TTDesc_1.DescriptionCN AS[温度报警], " +
                              "			TTDesc_2.DescriptionCN AS[温度状态] " +
                              "	FROM  dbo.tRealtimeDiagnosticDataDanielTT INNER JOIN " +
                              "  	  dbo.tDiagnosticDescriptionTT AS TTDesc_0 ON dbo.tRealtimeDiagnosticDataDanielTT.P0 = TTDesc_0.ID INNER JOIN  " +
                              "		  dbo.tDiagnosticDescriptionTT AS TTDesc_1 ON dbo.tRealtimeDiagnosticDataDanielTT.p1 = TTDesc_1.ID INNER JOIN " +
                              "       dbo.tDiagnosticDescriptionTT AS TTDesc_2 ON dbo.tRealtimeDiagnosticDataDanielTT.p2 = TTDesc_2.ID  " +
                              "WHERE  " +
                              "dbo.tRealtimeDiagnosticDataDanielTT.ID = {0}  " +
                              ") as tblResults " +
                              "unpivot " +
                              "( " +
                              "	value for attribute in( [温度值(+/ -2DegC)],[温度报警],[温度状态]) " +
                              ") UPV ";
                        break;
                    }
                case "Weise":
                    {
                        sql = "   select Name=attribute, Result=value ,Value='/'  " +
                               "   from  " +
                               "   (      " +
                               "   SELECT  TTDesc_0.DescriptionCN AS[温度变送器通讯], " +
                               "           TTDesc_1.DescriptionCN AS[温度超限报警] " +
                               "   FROM  dbo.tRealtimeDiagnosticDataWeiseTT INNER JOIN " +
                               "         dbo.tDiagnosticDescriptionTT AS TTDesc_0 ON dbo.tRealtimeDiagnosticDataWeiseTT.P0 = TTDesc_0.ID INNER JOIN " +
                               "         dbo.tDiagnosticDescriptionTT AS TTDesc_1 ON dbo.tRealtimeDiagnosticDataWeiseTT.p1 = TTDesc_1.ID " +
                               "   WHERE  dbo.tRealtimeDiagnosticDataWeiseTT.ID = {0} " +
                               "   ) as tblResults " +
                               "   unpivot " +
                               "   ( " +
                               "     value for attribute in( [温度变送器通讯],[温度超限报警]) " +
                               "   ) UPV";
                        break;
                    }
                case "Sick":
                    {
                        sql = "  select Name=attribute, Result=value ,Value='/' " +
                              "  from  " +
                              "  (  " +
                              "  SELECT  TTDesc_0.DescriptionCN AS[温度变送器通讯],  " +
                              "          TTDesc_1.DescriptionCN AS[温度超限报警]  " +
                              "  FROM  dbo.tRealtimeDiagnosticDataSickTT INNER JOIN  " +
                              "        dbo.tDiagnosticDescriptionTT AS TTDesc_0 ON dbo.tRealtimeDiagnosticDataSickTT.P0 = TTDesc_0.ID INNER JOIN  " +
                              "        dbo.tDiagnosticDescriptionTT AS TTDesc_1 ON dbo.tRealtimeDiagnosticDataSickTT.p1 = TTDesc_1.ID  " +
                              "  WHERE   dbo.tRealtimeDiagnosticDataSickTT.ID = {0}  " +
                              "  ) as tblResults  " +
                              "  unpivot " +
                              "  (  " +
                              "      value for attribute in( [温度变送器通讯],[温度超限报警])  " +
                              "  ) UPV";
                        break;
                    }
                case "RMG":
                    {
                        sql = " select Name=attribute, Result=value ,Value='/' " +
                              "  from " +
                              " ( " +
                              "   SELECT  TTDesc_0.DescriptionCN AS[通讯状态], " +
                              "           TTDesc_1.DescriptionCN AS[温度报警] " +
                              "   FROM  dbo.tRealtimeDiagnosticDataRMGTT INNER JOIN  " +
                              "         dbo.tDiagnosticDescriptionTT AS TTDesc_0 ON dbo.tRealtimeDiagnosticDataRMGTT.P0 = TTDesc_0.ID INNER JOIN  " +
                              "         dbo.tDiagnosticDescriptionTT AS TTDesc_1 ON dbo.tRealtimeDiagnosticDataRMGTT.p1 = TTDesc_1.ID  " +
                              " WHERE   dbo.tRealtimeDiagnosticDataRMGTT.ID =  {0} " +
                              "  ) as tblResults  " +
                              " unpivot " +
                              " ( " +
                              "   value for attribute in([通讯状态], [温度报警])  " +
                              " ) UPV";
                        break;
                    }
                case "Elster":
                    {
                        sql = "   select Name=attribute, Result=value ,Value='/'  " +
                              "   from " +
                              "   ( " +
                              "   SELECT  TTDesc_0.DescriptionCN AS[通讯状态],   " +
                              "           TTDesc_1.DescriptionCN AS[温度状态]  " +
                              "   FROM  dbo.tRealtimeDiagnosticDataElsterTT INNER JOIN  " +
                              "         dbo.tDiagnosticDescriptionTT AS TTDesc_0 ON dbo.tRealtimeDiagnosticDataElsterTT.P0 = TTDesc_0.ID INNER JOIN " +
                              "         dbo.tDiagnosticDescriptionTT AS TTDesc_1 ON dbo.tRealtimeDiagnosticDataElsterTT.p1 = TTDesc_1.ID " +
                              "   WHERE   dbo.tRealtimeDiagnosticDataElsterTT.ID = {0} " +
                              "   ) as tblResults " +
                              "   unpivot " +
                              "   ( " +
                              "    value for attribute in( [通讯状态],[温度状态]) " +
                              "   ) UPV";
                        break;
                    }
            }
            sql = string.Format(sql, loopID);
            return _context.DiagnosticDataDetails.FromSqlRaw(sql);
        }
        public IEnumerable<DiagnosticDataDetail> GetPressureTransmitterDiagnosticDataDetail(string loopID, string brandName)
        {
            string sql = "";
            switch (brandName)
            {

                case "Daniel":
                    {
                        sql = " select Name = attribute, Result = value, Value='/'  " +
                              " from " +
                              " ( " +
                              "	 SELECT  PTDesc_0.DescriptionCN AS[压力值(+/ -100kPa)], " +
                              "			 PTDesc_1.DescriptionCN AS[压力报警], " +
                              "		     PTDesc_2.DescriptionCN AS[压力状态] " +
                              "  FROM    dbo.tRealtimeDiagnosticDataDanielPT INNER JOIN " +
                              "		     dbo.tDiagnosticDescriptionPT AS PTDesc_0 ON dbo.tRealtimeDiagnosticDataDanielPT.P0 = PTDesc_0.ID INNER JOIN " +
                              "          dbo.tDiagnosticDescriptionPT AS PTDesc_1 ON dbo.tRealtimeDiagnosticDataDanielPT.p1 = PTDesc_1.ID INNER JOIN " +
                              "          dbo.tDiagnosticDescriptionPT AS PTDesc_2 ON dbo.tRealtimeDiagnosticDataDanielPT.p2 = PTDesc_2.ID " +
                              "  WHERE " +
                              "	         dbo.tRealtimeDiagnosticDataDanielPT.ID = {0} " +
                              " ) as tblResults " +
                              " unpivot " +
                              " ( " +
                              "	 value for attribute in([压力值(+/ -100kPa)], [压力报警], [压力状态]) " +
                              ") UPV ";
                        break;
                    }
                case "Weise":
                    {
                        sql = "  select Name=attribute, Result=value , Value='/'   " +
                              "  from " +
                              "  ( " +
                              "  SELECT  PTDesc_0.DescriptionCN AS[压力变送器通讯], " +
                              "          PTDesc_1.DescriptionCN AS[压力超限报警], " +
                              "          PTDesc_2.DescriptionCN AS[压力状态] " +
                              "  FROM    dbo.tRealtimeDiagnosticDataWeisePT INNER JOIN " +
                              "          dbo.tDiagnosticDescriptionPT AS PTDesc_0 ON dbo.tRealtimeDiagnosticDataWeisePT.P0 = PTDesc_0.ID INNER JOIN " +
                              "          dbo.tDiagnosticDescriptionPT AS PTDesc_1 ON dbo.tRealtimeDiagnosticDataWeisePT.p1 = PTDesc_1.ID INNER JOIN " +
                              "          dbo.tDiagnosticDescriptionPT AS PTDesc_2 ON dbo.tRealtimeDiagnosticDataWeisePT.p2 = PTDesc_2.ID " +
                              "  WHERE   dbo.tRealtimeDiagnosticDataWeisePT.ID = {0} " +
                              "  ) as tblResults " +
                              "  unpivot " +
                              "  ( " +
                              "          value for attribute in([压力变送器通讯], [压力超限报警],[压力状态]) " +
                              "  ) UPV";
                        break;
                    }
                case "Sick":
                    {
                        sql = "	select Name=attribute, Result=value , Value='/' " +
                              "	   from " +
                              "	   ( " +
                              "	   SELECT  PTDesc_0.DescriptionCN AS[压力变送器通讯], " +
                              "	           PTDesc_1.DescriptionCN AS[压力超限报警] " +
                              "	     FROM  dbo.tRealtimeDiagnosticDataSickPT INNER JOIN " +
                              "	           dbo.tDiagnosticDescriptionPT AS PTDesc_0 ON dbo.tRealtimeDiagnosticDataSickPT.P0 = PTDesc_0.ID INNER JOIN " +
                              "	           dbo.tDiagnosticDescriptionPT AS PTDesc_1 ON dbo.tRealtimeDiagnosticDataSickPT.p1 = PTDesc_1.ID " +
                              "	   WHERE   dbo.tRealtimeDiagnosticDataSickPT.ID = {0} " +
                              "	   ) as tblResults " +
                              "	   unpivot " +
                              "	   ( " +
                              "	            value for attribute in([压力变送器通讯], [压力超限报警]) " +
                              "	   ) UPV ";
                        break;
                    }
                case "RMG":
                    {
                        sql = "select Name=attribute, Result=value ,Value='/' " +
                              " from " +
                              " ( " +
                              "   SELECT PTDesc_0.DescriptionCN AS[通讯状态], " +
                              "          PTDesc_1.DescriptionCN AS[压力报警] " +
                              "   FROM   dbo.tRealtimeDiagnosticDataRMGPT INNER JOIN " +
                              "          dbo.tDiagnosticDescriptionPT AS PTDesc_0 ON dbo.tRealtimeDiagnosticDataRMGPT.P0 = PTDesc_0.ID INNER JOIN " +
                              "          dbo.tDiagnosticDescriptionPT AS PTDesc_1 ON dbo.tRealtimeDiagnosticDataRMGPT.p1 = PTDesc_1.ID " +
                              "  WHERE   dbo.tRealtimeDiagnosticDataRMGPT.ID ={0}" +
                              "   ) as tblResults " +
                              "   unpivot " +
                              " ( " +
                              "  value for attribute in([通讯状态],[压力报警]) " +
                              "  ) UPV";
                        break;
                    }
                case "Elster":
                    {
                        sql = "select Name=attribute, Result=value  ,Value='/' " +
                             "   from " +
                             "   ( " +
                             "     SELECT  PTDesc_0.DescriptionCN AS[通讯状态], " +
                             "             PTDesc_1.DescriptionCN AS[压力状态] " +
                             "       FROM  dbo.tRealtimeDiagnosticDataElsterPT INNER JOIN " +
                             "             dbo.tDiagnosticDescriptionPT AS PTDesc_0 ON dbo.tRealtimeDiagnosticDataElsterPT.P0 = PTDesc_0.ID INNER JOIN " +
                             "             dbo.tDiagnosticDescriptionPT AS PTDesc_1 ON dbo.tRealtimeDiagnosticDataElsterPT.p1 = PTDesc_1.ID " +
                             "       WHERE dbo.tRealtimeDiagnosticDataElsterPT.ID = {0} " +
                             "   ) as tblResults " +
                             "   unpivot " +
                             "   ( " +
                             "      value for attribute in([通讯状态], [压力状态]) " +
                             "   ) UPV";
                        break;
                    }
            }
            sql = string.Format(sql, loopID);
            return _context.DiagnosticDataDetails.FromSqlRaw(sql);
        }
        public IEnumerable<DiagnosticDataDetail> GetVOSDiagnosticDataDetail(string loopID, string brandName)
        {
            string sql = "";
            switch (brandName)
            {

                case "Daniel":
                    {
                        sql = "select vals.Name,results.Result, vals.Value " +
                              "from " +
                              "( " +
                              "	    select Name = attribute, Value = value " +
                              "  	from " +
                              "		( " +
                              "			SELECT  case when [P0] not in (0, 1) then N'N/A' else CONVERT(nvarchar, round(v0, 2)) + '%'  end as [FC声速偏差(< 0.20 %)], " +
                              "					case when [P1] not in (0, 1) then N'N/A' else CONVERT(nvarchar, round(v1, 2)) + '%'  end as [FM声速偏差(< 0.20 %)] " +
                              "			FROM   dbo.tRealtimeDiagnosticDataDanielVOS " +
                              "			where  dbo.tRealtimeDiagnosticDataDanielVOS.ID = {0} " +
                              "		) as tblValues " +
                              "		unpivot " +
                              "		( " +
                              "			value for attribute in([FC声速偏差(< 0.20 %)],[FM声速偏差(< 0.20 %)]) " +
                              "		) UPV " +
                              "	) as vals " +
                              "	inner join " +
                              "	( " +
                              "		select Name = attribute, Result= value " +
                              "		from " +
                              "		( " +
                              "			Select  SOSDesc_0.DescriptionCN AS [FC声速偏差(< 0.20 %)], " +
                              "					SOSDesc_1.DescriptionCN AS [FM声速偏差(< 0.20 %)] " +
                              "			FROM    dbo.tRealtimeDiagnosticDataDanielVOS INNER JOIN " +
                              "					dbo.tDiagnosticDescriptionVOS AS SOSDesc_0 ON dbo.tRealtimeDiagnosticDataDanielVOS.P0 = SOSDesc_0.ID INNER JOIN " +
                              "					dbo.tDiagnosticDescriptionVOS AS SOSDesc_1 ON dbo.tRealtimeDiagnosticDataDanielVOS.p1 = SOSDesc_1.ID " +
                              "			WHERE " +
                              "			       dbo.tRealtimeDiagnosticDataDanielVOS.ID = {0} " +
                              "		) as tblResults " +
                              "		unpivot " +
                              "		( " +
                              "			value for attribute in([FC声速偏差(< 0.20 %)],[FM声速偏差(< 0.20 %)]) " +
                              "		) UPV " +
                              "	) as results " +
                              "	on " +
                              "	results.[Name] = vals.[Name] ";
                        break;
                    }
                case "Weise":
                    {
                        sql = "select vals.Name,results.Result, vals.Value  " +
                              "	from  " +
                              "	(  " +
                              "	   select Name = attribute, Value = value  " +
                              "    from  " +
                              "     (  " +
                              "     	SELECT  case when[p0] not in (0, 1) then N'N/A'   else CONVERT(nvarchar, round(v0, 2)) + '%'  end as [FC声速偏差(<0.20%)],  " +
                              "                 case when[P1] not in (0, 1) then N'N/A' else CONVERT(nvarchar, round(v1, 2)) + '%'  end as [FM声速偏差(<0.20%)] " +
                              "         FROM dbo.tRealtimeDiagnosticDataWeiseVOS  " +
                              "      	where   dbo.tRealtimeDiagnosticDataWeiseVOS.ID = {0} " +
                              "	) as tblValues  " +
                              "	unpivot   " +
                              "	(  " +
                              "	    value for attribute in([FC声速偏差(<0.20%)],[FM声速偏差(<0.20%)])" +
                              "	) UPV  " +
                              " ) as vals  " +
                              " inner join  " +
                              "	(  " +
                              "	     select Name = attribute, Result= value  " +
                              "	       from  " +
                              "       	(  " +
                              "	           Select VOSCheckDesc_0.DescriptionCN AS [FC声速偏差(<0.20%)],  " +
                              "                   VOSCheckDesc_1.DescriptionCN AS [FM声速偏差(<0.20%)] " +
                              "            FROM   dbo.tRealtimeDiagnosticDataWeiseVOS INNER JOIN " +
                              "	                CBMDB.dbo.tStationLoop ON dbo.tRealtimeDiagnosticDataWeiseVOS.ID = CBMDB.dbo.tStationLoop.ID INNER JOIN " +
                              "	                dbo.tDiagnosticDescriptionVOS AS VOSCheckDesc_0 ON dbo.tRealtimeDiagnosticDataWeiseVOS.P0 = VOSCheckDesc_0.ID INNER JOIN " +
                              "                 dbo.tDiagnosticDescriptionVOS AS VOSCheckDesc_1 ON dbo.tRealtimeDiagnosticDataWeiseVOS.p1 = VOSCheckDesc_1.ID " +
                              "	           WHERE  (dbo.tRealtimeDiagnosticDataWeiseVOS.ID = {0}) " +
                              "	) as tblResults " +
                              "	unpivot " +
                              "	( " +
                              "  	value for attribute in([FC声速偏差(<0.20%)],[FM声速偏差(<0.20%)] ) " +
                              "	) UPV " +
                              " ) as results " +
                              "	on " +
                              " results.[Name] = vals.[Name]";
                        break;
                    }
                case "Sick":
                    {
                        sql = "	select vals.Name,results.Result, vals.Value " +
                              "	from " +
                              "	   ( " +
                              "   	select Name = attribute, Value = value " +
                              "	    from " +
                              "	   ( " +
                              "	         SELECT  case when [p0] not in(0, 1) then N'N/A' else CONVERT(nvarchar, round(v0, 2)) + '%'  end as [FC声速偏差(<0.20%)], " +
                              "                  case when[P1] not in (0, 1) then N'N/A' else CONVERT(nvarchar, round(v1, 2)) + '%'  end as [FM声速偏差(<0.20%)] " +
                              "          FROM    dbo.tRealtimeDiagnosticDataSickVOS " +
                              "        	 where   dbo.tRealtimeDiagnosticDataSickVOS.ID = {0} " +
                              "	) as tblValues " +
                              "	unpivot " +
                              "	    ( " +
                              "	      value for attribute in([FC声速偏差(<0.20%)],[FM声速偏差(<0.20%)]) " +
                              "	    ) UPV " +
                              "	) as vals " +
                              "	inner join " +
                              "	 ( " +
                              "	  select Name = attribute, Result= value " +
                              "   from " +
                              "       ( " +
                              "	       Select VOSCheckDesc_0.DescriptionCN AS [FC声速偏差(<0.20%)], " +
                                              " VOSCheckDesc_1.DescriptionCN AS [FM声速偏差(<0.20%)] " +
                              "     	FROM   dbo.tRealtimeDiagnosticDataSickVOS INNER JOIN " +
                              "                CBMDB.dbo.tStationLoop ON dbo.tRealtimeDiagnosticDataSickVOS.ID = CBMDB.dbo.tStationLoop.ID INNER JOIN " +
                              "                dbo.tDiagnosticDescriptionVOS AS VOSCheckDesc_0 ON dbo.tRealtimeDiagnosticDataSickVOS.P0 = VOSCheckDesc_0.ID   INNER JOIN" +
                              "                dbo.tDiagnosticDescriptionVOS AS VOSCheckDesc_1 ON dbo.tRealtimeDiagnosticDataSickVOS.p1 = VOSCheckDesc_1.ID " +
                              "	WHERE   (dbo.tRealtimeDiagnosticDataSickVOS.ID = {0}) " +
                              "	) as tblResults " +
                              "	unpivot " +
                              "	( " +
                              "       value for attribute in([FC声速偏差(<0.20%)],[FM声速偏差(<0.20%)] ) " +
                              "	) UPV " +
                              "	) as results " +
                              "	on " +
                              "	results.[Name] = vals.[Name]";
                        break;
                    }
                case "RMG":
                    {
                        sql = @" select vals.Name,results.Result, vals.Value 
                                from 
                               ( 
                                select Name = attribute, Value = value 
                                from 
                                ( 
                                 SELECT  case when[p0] not in(0, 1) then N'N/A' else CONVERT(nvarchar, convert(decimal(18,2),v0)) + '%'  end as [FC声速偏差(< 5.00 %)],
							             case when[p1] not in(0, 1) then N'N/A' else CONVERT(nvarchar, convert(decimal(18,2),v1)) + '%'  end as [FM声速偏差(< 5.00 %)] 
                                  FROM dbo.tRealtimeDiagnosticDataRMGVOS 
                                 where   dbo.tRealtimeDiagnosticDataRMGVOS.ID = {0}	 
                              	  ) as tblValues 
                                unpivot 
                                ( 
                                value for attribute in([FC声速偏差(< 5.00 %)],[FM声速偏差(< 5.00 %)]) 
                                ) UPV 
                                ) as vals 
                                inner join 
                                ( 
                                select Name = attribute, Result= value 
                                from 
                                ( 
                                Select VOSCheckDesc_0.DescriptionCN AS [FC声速偏差(< 5.00 %)] ,
								       VOSCheckDesc_1.DescriptionCN AS [FM声速偏差(< 5.00 %)] 
                                FROM   dbo.tRealtimeDiagnosticDataRMGVOS INNER JOIN 
                                CBMDB.dbo.tStationLoop ON dbo.tRealtimeDiagnosticDataRMGVOS.ID = CBMDB.dbo.tStationLoop.ID INNER JOIN 
                                dbo.tDiagnosticDescriptionVOS AS VOSCheckDesc_0 ON dbo.tRealtimeDiagnosticDataRMGVOS.P0 = VOSCheckDesc_0.ID INNER JOIN 
							    dbo.tDiagnosticDescriptionVOS AS VOSCheckDesc_1 ON dbo.tRealtimeDiagnosticDataRMGVOS.P1 = VOSCheckDesc_1.ID
                                WHERE   (dbo.tRealtimeDiagnosticDataRMGVOS.ID = {0}	) 
                              	 ) as tblResults 
                                unpivot 
                                ( 
                                value for attribute in([FC声速偏差(< 5.00 %)],[FM声速偏差(< 5.00 %)]) 
                               ) UPV 
                               ) as results 
                               on 
                               results.[Name] = vals.[Name];";
                        break;
                    }
                case "Elster":
                    {
                        sql = "  select vals.Name,results.Result, vals.Value " +
                              "  from " +
                              "     ( " +
                              "     select Name = attribute, Value = value " +
                              "     from " +
                              "       ( " +
                              "        SELECT  case when[p0] not in(0, 1) then N'N/A' else CONVERT(nvarchar, round(v0, 2)) + '%'  end as [FC声速偏差(<0.20%)], " +
                              "                case when[p1] not in(0, 1) then N'N/A'else CONVERT(nvarchar, round(v1, 2)) + '%'  end as [FM声速偏差(<0.20%)] " +
                              "        FROM dbo.tRealtimeDiagnosticDataElsterVOS " +
                              "        where   dbo.tRealtimeDiagnosticDataElsterVOS.ID = {0} " +
                              "        ) as tblValues " +
                              "     unpivot " +
                              "       ( " +
                              "           value for attribute in([FC声速偏差(<0.20%)],[FM声速偏差(<0.20%)]) " +
                              "       ) UPV " +
                              "   ) as vals " +
                              "    inner join " +
                              "    ( " +
                              "       select Name = attribute, Result= value " +
                              "       from " +
                              "         ( " +
                              "          Select VOSCheckDesc_0.DescriptionCN AS [FC声速偏差(<0.20%)], " +
                              "                 VOSCheckDesc_1.DescriptionCN AS [FM声速偏差(<0.20%)] " +
                              "          FROM   dbo.tRealtimeDiagnosticDataElsterVOS INNER JOIN " +
                              "                 CBMDB.dbo.tStationLoop ON dbo.tRealtimeDiagnosticDataElsterVOS.ID = CBMDB.dbo.tStationLoop.ID INNER JOIN " +
                              "                 dbo.tDiagnosticDescriptionVOS AS VOSCheckDesc_0 ON dbo.tRealtimeDiagnosticDataElsterVOS.P0 = VOSCheckDesc_0.ID INNER JOIN " +
                              "                 dbo.tDiagnosticDescriptionVOS AS VOSCheckDesc_1 ON dbo.tRealtimeDiagnosticDataElsterVOS.p1 = VOSCheckDesc_1.ID " +
                              "          WHERE dbo.tRealtimeDiagnosticDataElsterVOS.ID = {0} " +
                              "          ) as tblResults " +
                              "   unpivot " +
                              "        ( " +
                              "           value for attribute in([FC声速偏差(<0.20%)],[FM声速偏差(<0.20%)]) " +
                              "       ) UPV " +
                              "   ) as results " +
                              "    on " +
                              "      results.[Name] = vals.[Name]";
                        break;
                    }
            }
            sql = string.Format(sql, loopID);
            return _context.DiagnosticDataDetails.FromSqlRaw(sql);
        }
        public IEnumerable<DiagnosticDataDetail> GetEquipmentDiagnosticDataDetail(string equipmentID, string equipmentType, string brandName)
        {
            string sql = "";
            switch (equipmentType)
            {
                case "GCAnalyzer":
                    {
                        switch (brandName)
                        {
                            case "ABB":
                                {
                                    sql = "select Name=attribute, Result=value, Value='/' " +
                                          "from " +
                                          "( " +
                                          "	  SELECT  GCDesc_1.DescriptionCN AS C1, " +
                                          "    		  GCDesc_2.DescriptionCN AS C2, " +
                                          "			  GCDesc_3.DescriptionCN AS C3, " +
                                          "			  GCDesc_4.DescriptionCN AS NC4, " +
                                          "			  GCDesc_5.DescriptionCN AS IC4, " +
                                          "			  GCDesc_6.DescriptionCN AS NC5, " +
                                          "           GCDesc_7.DescriptionCN AS IC5, " +
                                          "  	      GCDesc_8.DescriptionCN AS[C6 +], " +
                                          "           GCDesc_9.DescriptionCN AS C7, " +
                                          "           GCDesc_10.DescriptionCN AS C8, " +
                                          "           GCDesc_11.DescriptionCN AS C9, " +
                                          "			  GCDesc_12.DescriptionCN AS C10, " +
                                          "			  GCDesc_13.DescriptionCN AS N2, " +
                                          "			  GCDesc_14.DescriptionCN AS CO2, " +
                                          "			  GCDesc_15.DescriptionCN AS NEOC5, " +
                                          "			  GCDesc_16.DescriptionCN As[色谱状态] " +
                                          "FROM    dbo.tRealtimeDiagnosticDataABBGC INNER JOIN " +
                                          "		   dbo.tDiagnosticDescriptionGC AS GCDesc_0 ON dbo.tRealtimeDiagnosticDataABBGC.p0 = GCDesc_0.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_1 ON dbo.tRealtimeDiagnosticDataABBGC.p1 = GCDesc_1.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_2 ON dbo.tRealtimeDiagnosticDataABBGC.p2 = GCDesc_2.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_3 ON dbo.tRealtimeDiagnosticDataABBGC.p3 = GCDesc_3.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_4 ON dbo.tRealtimeDiagnosticDataABBGC.p4 = GCDesc_4.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_5 ON dbo.tRealtimeDiagnosticDataABBGC.p5 = GCDesc_5.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_6 ON dbo.tRealtimeDiagnosticDataABBGC.p6 = GCDesc_6.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_7 ON dbo.tRealtimeDiagnosticDataABBGC.p7 = GCDesc_7.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_8 ON dbo.tRealtimeDiagnosticDataABBGC.p8 = GCDesc_8.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_9 ON dbo.tRealtimeDiagnosticDataABBGC.p9 = GCDesc_9.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_10 ON dbo.tRealtimeDiagnosticDataABBGC.p10 = GCDesc_10.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_11 ON dbo.tRealtimeDiagnosticDataABBGC.p11 = GCDesc_11.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_12 ON dbo.tRealtimeDiagnosticDataABBGC.p12 = GCDesc_12.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_13 ON dbo.tRealtimeDiagnosticDataABBGC.p13 = GCDesc_13.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_14 ON dbo.tRealtimeDiagnosticDataABBGC.p14 = GCDesc_14.ID INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_15 ON dbo.tRealtimeDiagnosticDataABBGC.p15 = GCDesc_15.ID  INNER JOIN " +
                                          "        dbo.tDiagnosticDescriptionGC AS GCDesc_16 ON dbo.tRealtimeDiagnosticDataABBGC.p16 = GCDesc_16.ID " +
                                          "where   dbo.tRealtimeDiagnosticDataABBGC.ID = {0} " +
                                        ") as tblResults " +
                                        "unpivot " +
                                        "( " +
                                        "    value for attribute in(C1, " +
                                        "							C2, " +
                                        "							C3, " +
                                        "							NC4, " +
                                        "							IC4, " +
                                        "							NC5, " +
                                        "							IC5, " +
                                        "							[C6 +], " +
                                        "							C7, " +
                                        "							C8, " +
                                        "							C9, " +
                                        "							C10, " +
                                        "							N2, " +
                                        "							CO2, " +
                                        "							NEOC5, " +
                                        "							[色谱状态]) " +
                                        ") UPV;";
                                    break;
                                }
                            case "Daniel":
                                {
                                    sql = "   select Name = attribute, Result = value, Value = '/'  " +
                                          "   from " +
                                          "   ( " +
                                          "      SELECT  GCDesc_1.DescriptionCN AS C1, " +
                                          "              GCDesc_2.DescriptionCN AS C2, " +
                                          "              GCDesc_3.DescriptionCN AS C3, " +
                                          "              GCDesc_4.DescriptionCN AS NC4, " +
                                          "              GCDesc_5.DescriptionCN AS IC4, " +
                                          "              GCDesc_6.DescriptionCN AS NC5, " +
                                          "              GCDesc_7.DescriptionCN AS IC5, " +
                                          "              GCDesc_8.DescriptionCN AS[C6 +], " +
                                          "              GCDesc_9.DescriptionCN AS C7, " +
                                          "              GCDesc_10.DescriptionCN AS C8, " +
                                          "              GCDesc_11.DescriptionCN AS C9, " +
                                          "              GCDesc_12.DescriptionCN AS C10, " +
                                          "              GCDesc_13.DescriptionCN AS N2, " +
                                          "              GCDesc_14.DescriptionCN AS CO2, " +
                                          "              GCDesc_15.DescriptionCN AS NEOC5 " +
                                          "   FROM    dbo.tRealtimeDiagnosticDataDanielGC INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_0 ON dbo.tRealtimeDiagnosticDataDanielGC.p0 = GCDesc_0.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_1 ON dbo.tRealtimeDiagnosticDataDanielGC.p1 = GCDesc_1.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_2 ON dbo.tRealtimeDiagnosticDataDanielGC.p2 = GCDesc_2.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_3 ON dbo.tRealtimeDiagnosticDataDanielGC.p3 = GCDesc_3.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_4 ON dbo.tRealtimeDiagnosticDataDanielGC.p4 = GCDesc_4.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_5 ON dbo.tRealtimeDiagnosticDataDanielGC.p5 = GCDesc_5.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_6 ON dbo.tRealtimeDiagnosticDataDanielGC.p6 = GCDesc_6.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_7 ON dbo.tRealtimeDiagnosticDataDanielGC.p7 = GCDesc_7.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_8 ON dbo.tRealtimeDiagnosticDataDanielGC.p8 = GCDesc_8.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_9 ON dbo.tRealtimeDiagnosticDataDanielGC.p9 = GCDesc_9.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_10 ON dbo.tRealtimeDiagnosticDataDanielGC.p10 = GCDesc_10.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_11 ON dbo.tRealtimeDiagnosticDataDanielGC.p11 = GCDesc_11.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_12 ON dbo.tRealtimeDiagnosticDataDanielGC.p12 = GCDesc_12.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_13 ON dbo.tRealtimeDiagnosticDataDanielGC.p13 = GCDesc_13.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_14 ON dbo.tRealtimeDiagnosticDataDanielGC.p14 = GCDesc_14.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_15 ON dbo.tRealtimeDiagnosticDataDanielGC.p15 = GCDesc_15.ID " +
                                          "   where   dbo.tRealtimeDiagnosticDataDanielGC.ID = {0} " +
                                          "    ) as tblResults " +
                                          "   unpivot " +
                                          "    ( " +
                                          "   value for attribute in(C1, " +
                                          "                          C2, " +
                                          "                          C3, " +
                                          "                          NC4, " +
                                          "                          IC4, " +
                                          "                          NC5, " +
                                          "                          IC5, " +
                                          "                          [C6 +], " +
                                          "                          C7, " +
                                          "                          C8, " +
                                          "                          C9, " +
                                          "                          C10, " +
                                          "                          N2, " +
                                          "                          CO2, " +
                                          "                          NEOC5) " +
                                          "  ) UPV ";
                                    break;
                                }
                            case "Elster":
                                {
                                    sql = "   select Name = attribute, Result = value, Value = '/'  " +
                                          "   from " +
                                          "   ( " +
                                          "      SELECT  GCDesc_1.DescriptionCN AS C1, " +
                                          "              GCDesc_2.DescriptionCN AS C2, " +
                                          "              GCDesc_3.DescriptionCN AS C3, " +
                                          "              GCDesc_4.DescriptionCN AS NC4, " +
                                          "              GCDesc_5.DescriptionCN AS IC4, " +
                                          "              GCDesc_6.DescriptionCN AS NC5, " +
                                          "              GCDesc_7.DescriptionCN AS IC5, " +
                                          "              GCDesc_8.DescriptionCN AS[C6 +], " +
                                          "              GCDesc_9.DescriptionCN AS C7, " +
                                          "              GCDesc_10.DescriptionCN AS C8, " +
                                          "              GCDesc_11.DescriptionCN AS C9, " +
                                          "              GCDesc_12.DescriptionCN AS C10, " +
                                          "              GCDesc_13.DescriptionCN AS N2, " +
                                          "              GCDesc_14.DescriptionCN AS CO2, " +
                                          "              GCDesc_15.DescriptionCN AS NEOC5 " +
                                          "   FROM    dbo.tRealtimeDiagnosticDataElsterGC INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_0 ON dbo.tRealtimeDiagnosticDataElsterGC.p0 = GCDesc_0.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_1 ON dbo.tRealtimeDiagnosticDataElsterGC.p1 = GCDesc_1.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_2 ON dbo.tRealtimeDiagnosticDataElsterGC.p2 = GCDesc_2.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_3 ON dbo.tRealtimeDiagnosticDataElsterGC.p3 = GCDesc_3.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_4 ON dbo.tRealtimeDiagnosticDataElsterGC.p4 = GCDesc_4.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_5 ON dbo.tRealtimeDiagnosticDataElsterGC.p5 = GCDesc_5.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_6 ON dbo.tRealtimeDiagnosticDataElsterGC.p6 = GCDesc_6.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_7 ON dbo.tRealtimeDiagnosticDataElsterGC.p7 = GCDesc_7.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_8 ON dbo.tRealtimeDiagnosticDataElsterGC.p8 = GCDesc_8.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_9 ON dbo.tRealtimeDiagnosticDataElsterGC.p9 = GCDesc_9.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_10 ON dbo.tRealtimeDiagnosticDataElsterGC.p10 = GCDesc_10.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_11 ON dbo.tRealtimeDiagnosticDataElsterGC.p11 = GCDesc_11.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_12 ON dbo.tRealtimeDiagnosticDataElsterGC.p12 = GCDesc_12.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_13 ON dbo.tRealtimeDiagnosticDataElsterGC.p13 = GCDesc_13.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_14 ON dbo.tRealtimeDiagnosticDataElsterGC.p14 = GCDesc_14.ID INNER JOIN " +
                                          "           dbo.tDiagnosticDescriptionGC AS GCDesc_15 ON dbo.tRealtimeDiagnosticDataElsterGC.p15 = GCDesc_15.ID " +
                                          "   where   dbo.tRealtimeDiagnosticDataElsterGC.ID = {0} " +
                                          "    ) as tblResults " +
                                          "   unpivot " +
                                          "    ( " +
                                          "   value for attribute in(C1, " +
                                          "                          C2, " +
                                          "                          C3, " +
                                          "                          NC4, " +
                                          "                          IC4, " +
                                          "                          NC5, " +
                                          "                          IC5, " +
                                          "                          [C6 +], " +
                                          "                          C7, " +
                                          "                          C8, " +
                                          "                          C9, " +
                                          "                          C10, " +
                                          "                          N2, " +
                                          "                          CO2, " +
                                          "                          NEOC5) " +
                                          "  ) UPV ";
                                    break;
                                }
                        }
                        break;
                    }
                case "H2SAnalyzer":
                    {
                        break;
                    }

            }
            sql = string.Format(sql, equipmentID);
            return _context.DiagnosticDataDetails.FromSqlRaw(sql);
        }
    }

}
