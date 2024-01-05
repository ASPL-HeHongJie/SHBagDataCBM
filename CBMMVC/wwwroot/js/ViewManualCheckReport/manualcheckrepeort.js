var vm = new Vue({
    el: '#ManualCheckReport',
    data: {
        companyName: '', // 公司的文本框内容
        datas: '',  // 公司遍历的内容
        StationName: '', // 场站文本框内容
        Stations: '', // 场站遍历的内容
        LoopName: '', //回路文本框内容
        Loops: [], // 回路遍历的内容
        GroupingType: '', // 分组类型文本内容
        groupingdata: [], // 分组类型遍历的内容
        StationsData: [],
        LoopData: [],
        EquipmentData: [],
        StationVal: '',
        LoopsID: '',
        PriorityIds: '',
        pName: "",
        Alllu: [],
        Sallu: [],
        Snam: [],
        PriorityVal: "",
        PriorityId: "",
        PriorityVals: "",
        PriorityIds: "",
        Prioritys: [],
        LoopAnalyzerName: "",
        tableData: [],
        Allstations: "", // 默认全部的设备
        chromatographic: [],
        sort: [],
        FRCheckDataDetail: [],
        FRCheckData: [],
        VOSCheckData: [],
        FRcheckDataStatus: "",
        VOScheckDataStatus: "",
        ReportDialog: false,
        dialogVisible: false,
        dialogloading:false,
        BtnDateTime: "",
        reportIPAddress: '',
        ipAddress: '',
        ipPort: '',

        PathsVOGAverage: '',
        C1: '',
        iC4: '',
        Temperature: '',
        C2: '',
        iC5: '',
        Pressure: '',
        C3: '',
        NeoC5: '',
        nC4: '',
        C6: '',
        N2: '',
        CO2: '',
        GrossFlowrate: '',
        CalculatedGrossFlowrate: '',
        GrossFlowrateDeviationRate: '',
        StandardFlowrate: '',
        CalculatedStandardFlowrate: '',
        StandardFlowrateDeviationRate: '',
        MassFlowrate: '',
        CalculatedMassFlowrate: '',
        MassFlowrateDeviationRate: '',
        EnergyFlowrate: '',
        CalculatedEnergyFlowrate: '',
        EnergyFlowrateDeviationRate: '',
        ReadyTimeOut: "",
        CommunicationTimeOut: "",
        VelocityFlowTimeOut: "",
        TemperatureTimeOut: "",
        PressureTimeOut: "",
        ComponentsTimeOut: "",
        StableTimeOut: "",
        WaitStableTimeOut: "",
        RreateReportTimeOut: "",
        VOSBtnTimeOut: "",
        reportServerIpAndPort: '',
        reportType: '',
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
    },
    created() {
        if (isArea == 'false') {
            this.reportServerIpAndPort = reportServerIpAndPort;
            this.companyName = company.Name
            this.datas = [{ Name: company.Name, ID: company.ID }]

            company.Areas.map((res) => {
                this.StationName = res.Stations[0].Name
                this.StationsAbbrName = res.Stations[0].AbbrName
                this.ipAddress = res.Stations[0].IPAddress;
                this.ipPort = res.Stations[0].IPPort;
                var station = res.Stations.map((res) => {
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.AbbrName }]
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Stations = fall(station)
                this.StationsData = res.Stations.map((res) => {
                    return res
                })
            })
            
        } else if (isArea == 'true') {
            this.reportServerIpAndPort = reportServerIpAndPort;
            this.areaName = area.Name
            this.OperationAreas = [{ Name: area.Name, ID: area.ID }]
            var areas = []
            areas.push(area)
            areas.map((res) => {
                this.StationName = res.Stations[0].Name
                this.StationsAbbrName = res.Stations[0].AbbrName
                this.ipAddress = res.Stations[0].IPAddress;
                this.ipPort = res.Stations[0].IPPort;
                var station = res.Stations.map((res) => {
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.AbbrName }]
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Stations = fall(station)
                this.StationsData = res.Stations.map((res) => {
                    return res
                })
            })
            
        }
        this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
            var LoopsData = res.Loops.filter((el) => el.FlowmeterType != 'Turbo').map((res) => {
                this.LoopData.push(res)
                return { Name: res.Name + '(回路)', ID: res.ID, BrandName: res.BrandName }
            })
            this.Loops.unshift(LoopsData)
            function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
            this.Loops = fall(this.Loops)
            this.LoopName = this.Loops[0].ID
            this.BrandName = this.Loops[0].BrandName
        })
        
    },
    methods: {
        search() {
            this.BtnDateTime = this.DateFormat("YYYY-mm-dd HH:MM:SS", new Date());
            var data = {
                LoopID: this.LoopName,
                BrandName: this.BrandName,
            };
            data = JSON.stringify(JSON.stringify(data));
            var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/CheckData/GetManualCheckData";
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 }
            )
                .then(
                    (res) => {
                        this.FRCheckDataDetail = res.data.FRCheckDataDetail;
                        this.PathsVOGAverage = this.FRCheckDataDetail.PathsVOGAverage.value.substring(0, this.FRCheckDataDetail.PathsVOGAverage.value.indexOf(".") + 3) //在用流速
                        this.C1 = this.FRCheckDataDetail.C1.value.substring(0, this.FRCheckDataDetail.C1.value.indexOf(".") + 5)
                        this.iC4 = this.FRCheckDataDetail.iC4.value.substring(0, this.FRCheckDataDetail.iC4.value.indexOf(".") + 5)
                        this.Temperature = this.FRCheckDataDetail.Temperature.value.substring(0, this.FRCheckDataDetail.Temperature.value.indexOf(".") + 3)
                        this.C2 = this.FRCheckDataDetail.C2.value.substring(0, this.FRCheckDataDetail.C2.value.indexOf(".") + 5)
                        this.iC5 = this.FRCheckDataDetail.iC5.value.substring(0, this.FRCheckDataDetail.iC5.value.indexOf(".") + 5)
                        this.Pressure = this.FRCheckDataDetail.Pressure.value.substring(0, this.FRCheckDataDetail.Pressure.value.indexOf(".") + 3)
                        this.C3 = this.FRCheckDataDetail.C3.value.substring(0, this.FRCheckDataDetail.C3.value.indexOf(".") + 5)
                        this.NeoC5 = this.FRCheckDataDetail.NeoC5.value.substring(0, this.FRCheckDataDetail.NeoC5.value.indexOf(".") + 5)
                        this.nC4 = this.FRCheckDataDetail.nC4.value.substring(0, this.FRCheckDataDetail.nC4.value.indexOf(".") + 5)
                        this.C6 = this.FRCheckDataDetail.C6.value.substring(0, this.FRCheckDataDetail.C6.value.indexOf(".") + 5)
                        this.N2 = this.FRCheckDataDetail.N2.value.substring(0, this.FRCheckDataDetail.N2.value.indexOf(".") + 5)
                        this.CO2 = this.FRCheckDataDetail.CO2.value.substring(0, this.FRCheckDataDetail.CO2.value.indexOf(".") + 5)

                        this.GrossFlowrate = this.FRCheckDataDetail.GrossFlowrate.value.substring(0, this.FRCheckDataDetail.GrossFlowrate.value.indexOf(".") + 3)
                        this.CalculatedGrossFlowrate = this.FRCheckDataDetail.CalculatedGrossFlowrate.value.substring(0, this.FRCheckDataDetail.CalculatedGrossFlowrate.value.indexOf(".") + 3)
                        this.GrossFlowrateDeviationRate = this.FRCheckDataDetail.GrossFlowrateDeviationRate.value.substring(0, this.FRCheckDataDetail.GrossFlowrateDeviationRate.value.indexOf(".") + 3)
                        this.StandardFlowrate = this.FRCheckDataDetail.StandardFlowrate.value.substring(0, this.FRCheckDataDetail.StandardFlowrate.value.indexOf(".") + 3)
                        this.CalculatedStandardFlowrate = this.FRCheckDataDetail.CalculatedStandardFlowrate.value.substring(0, this.FRCheckDataDetail.CalculatedStandardFlowrate.value.indexOf(".") + 3)
                        this.StandardFlowrateDeviationRate = this.FRCheckDataDetail.StandardFlowrateDeviationRate.value.substring(0, this.FRCheckDataDetail.StandardFlowrateDeviationRate.value.indexOf(".") + 3)
                        this.MassFlowrate = this.FRCheckDataDetail.MassFlowrate.value.substring(0, this.FRCheckDataDetail.MassFlowrate.value.indexOf(".") + 3)
                        this.CalculatedMassFlowrate = this.FRCheckDataDetail.CalculatedMassFlowrate.value.substring(0, this.FRCheckDataDetail.CalculatedMassFlowrate.value.indexOf(".") + 3)
                        this.MassFlowrateDeviationRate = this.FRCheckDataDetail.MassFlowrateDeviationRate.value.substring(0, this.FRCheckDataDetail.MassFlowrateDeviationRate.value.indexOf(".") + 3)
                        this.EnergyFlowrate = this.FRCheckDataDetail.EnergyFlowrate.value.substring(0, this.FRCheckDataDetail.EnergyFlowrate.value.indexOf(".") + 0)
                        this.CalculatedEnergyFlowrate = this.FRCheckDataDetail.CalculatedEnergyFlowrate.value.substring(0, this.FRCheckDataDetail.CalculatedEnergyFlowrate.value.indexOf(".") + 0)
                        this.EnergyFlowrateDeviationRate = this.FRCheckDataDetail.EnergyFlowrateDeviationRate.value.substring(0, this.FRCheckDataDetail.EnergyFlowrateDeviationRate.value.indexOf(".") + 3)


                        this.FRCheckData = res.data.FRCheckData;
                        this.VOSCheckData = res.data.VOSCheckData;

                        res.data.FRCheckData.map((res) => {
                            this.FRcheckDataStatus = res.checkDataStatus;
                        });
                        res.data.VOSCheckData.map((res) => {
                            this.VOScheckDataStatus = res.checkDataStatus;
                        });
                        this.InitialVOSCCheck();
                        this.CheckVOS(this.VOScheckDataStatus);
                    },
                    (err) => {
                        this.FRcheckDataStatus = ''
                        this.InitialVOSCCheck();
                        this.$message.error('参数错误或通信失败!');
                        this.CheckBtnState('NO')
                    }
                );
        },
        OpenReport(reporttype) {
            this.dialogVisible = true;
            if (reporttype == "FR")
            {
                this.reportType="流量报告"
            }
            else
            {
                this.reportType = "声速报告"
            }
            if (this.TimeDifference(this.BtnDateTime, new Date()) >= 5) {
                this.FRcheckDataStatus = ''
                this.InitialVOSCCheck();
                this.$message.error('时间超过5分钟,请重新生成报告。');
            } else {
                this.ReportDialog = true;
                if (reporttype == "FR") {
                    this.StationsData.filter(el => el.Name == this.VOSCheckData[0].stationName).map((res) => {
                        this.reportIPAddress = res.IPAddress
                    })
                    setTimeout(() => {
                        this.dialogloading = true;
                        $("#Loading").css("display", "block");
                        $("#div_iframe").css("display", "none");
                        $("#report").attr('src', 'http://' + this.reportServerIpAndPort +'/FRReportForm.aspx?ID=' + this.FRCheckData[0].hisID + '&ManufacturerName=' + this.FRCheckData[0].brandName + '&Address=' + this.reportIPAddress);
                    }, 0);
                } else {
                    this.StationsData.filter(el => el.Name == this.VOSCheckData[0].stationName).map((res) => {
                        this.reportIPAddress = res.IPAddress
                    })
                    setTimeout(() => {
                        this.dialogloading = true;
                        $("#Loading").css("display", "block");
                        $("#div_iframe").css("display", "none");
                        $("#report").attr('src', 'http://' + this.reportServerIpAndPort +'/VOSReportForm.aspx?ID=' + this.VOSCheckData[0].hisID + '&ManufacturerName=' + this.VOSCheckData[0].brandName + '&Address=' + this.reportIPAddress);
                    }, 0)
                }
            }
        },
        // 获取场站文本框内容
        onSelectedDrug(id) {
            let obj = {};
            obj = this.Stations.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.StationID = obj.ID
            this.StationName = obj.Name
            this.StationsData.filter(el => el.Name == obj.Name).map((res) => {
                this.ipAddress = res.IPAddress;
                this.ipPort = res.IPPort;
                if (res.Loops.length == 0) {
                    this.LoopName = ''
                    this.Loops = []
                } else if (res.Loops.length != 0) {
                    var LoopsData = res.Loops.filter((el) => el.FlowmeterType != 'Turbo').map((res) => {
                        this.LoopData.push(res)
                        return { Name: res.Name + '(回路)', ID: res.ID, BrandName: res.BrandName }
                    })
                    this.Loops = []
                    this.Loops.unshift(LoopsData)
                    function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                    this.Loops = fall(this.Loops)
                    this.LoopName = this.Loops[0].ID
                    this.BrandName = this.Loops[0].BrandName
                }
                
            })

        },
        onLoops(id) { // 回路
            let obj = {};
            obj = this.Loops.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.LoopName = obj.ID
            this.BrandName = obj.BrandName
        },
        CheckVOS(ReportStatus) {
            const that = this;
            switch (ReportStatus) {
                case '正常':
                    this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'OK', '已通过') }, 0);
                    this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'OK', '已通过') }, 500);
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'OK', '已通过') }, 1000);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'OK', '已通过') }, 1500);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'OK', '已通过') }, 2000);
                    this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'OK', '已通过') }, 2500);
                    this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'OK', '已通过') }, 3000);
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'OK', '已通过') }, 3500);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'OK', '已通过') }, 4000);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('OK') }, 4000);
                    break;
                case '不正常': case '未知': case 'IFix未启动': case '数据读取错误': case '诊断程序未启动':
                    switch (ReportStatus) {
                        case '不正常':
                            this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'Over', '不正常') }, 0);
                            break;
                        case '未知':
                            this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'Over', '未知') }, 0);
                            break;
                        case 'IFix未启动':
                            this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'Over', 'IFix未启动') }, 0);
                            break;
                        case '数据读取错误':
                            this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'Over', '数据读取错误') }, 0);
                            break;
                        case '诊断程序未启动':
                            this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'Over', '诊断程序未启动') }, 0);
                            break;
                    }
                    this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'Over', '未通过') }, 0);
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'Over', '未通过') }, 0);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'Over', '未通过') }, 0);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'Over', '未通过') }, 0);
                    this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'Over', '未通过') }, 0);
                    this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '未通过') }, 0);
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'Over', '未通过') }, 0);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'Over', '未通过') }, 0);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('Over') }, 0);
                    break;
                case '流量计算机通信失败': case '流量计通讯失败': case '流量计到流量计算机通讯失败':
                    this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'OK', '已通过') }, 0);
                    switch (ReportStatus) {
                        case '流量计算机通信失败':
                            this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'Over', '流量计算机通信失败') }, 500);
                            break;
                        case '流量计通讯失败':
                            this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'Over', '流量计通讯失败') }, 500);
                            break;
                        case '流量计到流量计算机通讯失败':
                            this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'Over', '流量计到流量计算机通讯失败') }, 500);
                            break;
                    }
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'Over', '未通过') }, 500);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'Over', '未通过') }, 500);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'Over', '未通过') }, 500);
                    this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'Over', '未通过') }, 500);
                    this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '未通过') }, 500);
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'Over', '未通过') }, 500);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'Over', '未通过') }, 500);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('Over') }, 500);
                    break;
                case '不满足诊断条件-流速过低':
                    this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'OK', '已通过') }, 0);
                    this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'OK', '已通过') }, 500);
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'Over', '流速过低') }, 1000);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'Over', '未通过') }, 1000);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'Over', '未通过') }, 1000);
                    this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'Over', '未通过') }, 1000);
                    this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '未通过') }, 1000);
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'Over', '未通过') }, 1000);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'Over', '未通过') }, 1000);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('Over') }, 1000);
                    break;
                case '不满足诊断条件-温度超范围':
                    this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'OK', '已通过') }, 0);
                    this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'OK', '已通过') }, 500);
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'OK', '已通过') }, 1000);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'Over', '温度超范围') }, 1500);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'Over', '未通过') }, 1500);
                    this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'Over', '未通过') }, 1500);
                    this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '未通过') }, 1500);
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'Over', '未通过') }, 1500);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'Over', '未通过') }, 1500);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('Over') }, 1500);
                    break;
                case '不满足诊断条件-压力超范围':
                    this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'OK', '已通过') }, 0);
                    this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'OK', '已通过') }, 500);
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'OK', '已通过') }, 1000);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'OK', '已通过') }, 1500);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'Over', '压力超范围') }, 2000);
                    this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'Over', '未通过') }, 2000);
                    this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '未通过') }, 2000);
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'Over', '未通过') }, 2000);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'Over', '未通过') }, 2000);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('Over') }, 2000);
                    break;
                case '不满足诊断条件-组分C1超范围': case '不满足诊断条件-组分归一化超范围':
                    this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'OK', '已通过') }, 0);
                    this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'OK', '已通过') }, 500);
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'OK', '已通过') }, 1000);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'OK', '已通过') }, 1500);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'OK', '已通过') }, 2000);
                    switch (ReportStatus) {
                        case '不满足诊断条件-组分C1超范围':
                            this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'Over', '组分C1超范围') }, 2500);
                            break
                        case '不满足诊断条件-组分归一化超范围':
                            this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'Over', '组分归一化超范围') }, 2500);
                            break
                    }
                    this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '未通过') }, 2500);
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'Over', '未通过') }, 2500);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'Over', '未通过') }, 2500);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('Over') }, 2500);
                    break;
                case '温度不稳定': case '压力不稳定': case '组分C1不稳定':
                    this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'OK', '已通过') }, 0);
                    this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'OK', '已通过') }, 500);
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'OK', '已通过') }, 1000);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'OK', '已通过') }, 1500);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'OK', '已通过') }, 2000);
                    this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'OK', '已通过') }, 2500);
                    switch (ReportStatus) {
                        case '温度不稳定':
                            this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '温度不稳定') }, 3000);
                            break;
                        case '压力不稳定':
                            this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '压力不稳定') }, 3000);
                            break;
                        case '组分C1不稳定':
                            this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'Over', '组分C1不稳定') }, 3000);
                            break;
                    }
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'Over', '未通过') }, 3000);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'Over', '未通过') }, 3000);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('Over') }, 3000);
                    break;
                case '等待数据稳定':
                    this.ReadyTimeOut = setTimeout(() => { that.CheckCell('Ready', 'OK', '已通过') }, 0);
                    this.CommunicationTimeOut = setTimeout(() => { that.CheckCell('Communication', 'OK', '已通过') }, 500);
                    this.VelocityFlowTimeOut = setTimeout(() => { that.CheckCell('VelocityFlow', 'OK', '已通过') }, 1000);
                    this.TemperatureTimeOut = setTimeout(() => { that.CheckCell('Temperature', 'OK', '已通过') }, 1500);
                    this.PressureTimeOut = setTimeout(() => { that.CheckCell('Pressure', 'OK', '已通过') }, 2000);
                    this.ComponentsTimeOut = setTimeout(() => { that.CheckCell('Components', 'OK', '已通过') }, 2500);
                    this.StableTimeOut = setTimeout(() => { that.CheckCell('Stable', 'OK', '已通过') }, 3000);
                    this.WaitStableTimeOut = setTimeout(() => { that.CheckCell('WaitStable', 'Over', '等待数据稳定') }, 3500);
                    this.RreateReportTimeOut = setTimeout(() => { that.CheckCell('RreateReport', 'Over', '未通过') }, 3500);
                    this.VOSBtnTimeOut = setTimeout(() => { that.CheckBtnState('Over') }, 3500);
                    break;


            }
        }
        , CheckCell(DidName, CheckState, CheckDetal) {
            if (CheckState == "OK") {
                $('#' + DidName).css("background-color", "green");
                $('#' + DidName + 'checkicon').attr("class", "el-icon-success");
                $('#' + DidName + 'detal').html(CheckDetal);
            } else if (CheckState == "Over") {
                $('#' + DidName).css("background-color", "red");
                $('#' + DidName + 'checkicon').attr("class", "el-icon-error");
                $('#' + DidName + 'detal').html(CheckDetal);
            } else {
                $('#' + DidName).css("background-color", "#0b5b7dff");
                $('#' + DidName + 'checkicon').attr("class", "el-icon-loading");
                $('#' + DidName + 'detal').html('等待中');
            }

        }
        , CheckBtnState(CheckState) {
            if (CheckState == "OK") {
                $("#VOSBtn").removeAttr("disabled")
                $("#VOSBtn").attr("class", "el-button el-button--info");
            } else {
                $("#VOSBtn").attr("disabled", "disabled")
                $("#VOSBtn").attr("class", "el-button el-button--info is-disabled");
            }


        }
        , InitialVOSCCheck() {
            clearTimeout(this.ReadyTimeOut);
            clearTimeout(this.CommunicationTimeOut);
            clearTimeout(this.VelocityFlowTimeOut);
            clearTimeout(this.TemperatureTimeOut);
            clearTimeout(this.PressureTimeOut);
            clearTimeout(this.ComponentsTimeOut);
            clearTimeout(this.StableTimeOut);
            clearTimeout(this.WaitStableTimeOut);
            clearTimeout(this.RreateReportTimeOut);
            clearTimeout(this.VOSBtnTimeOut);
            this.CheckCell('Ready', '-', '')
            this.CheckCell('Communication', '-', '')
            this.CheckCell('VelocityFlow', '-', '')
            this.CheckCell('Temperature', '-', '')
            this.CheckCell('Pressure', '-', '')
            this.CheckCell('Components', '-', '')
            this.CheckCell('Stable', '-', '')
            this.CheckCell('WaitStable', '-', '')
            this.CheckCell('RreateReport', '-', '')
        }
        , DateFormat(fmt, date) {
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        }
        , TimeDifference(Stime, Ttime) {
            if (Ttime && Stime) {
                var startDate = new Date(Stime);
                var stopDate = new Date(Ttime);
                var startTime = startDate.getTime();
                var stopTime = stopDate.getTime();
                var cTime = Number(stopTime) - Number(startTime);
                var secondTime = cTime / 1000 / 60;
                return parseInt(secondTime);
            } else {
                return 0;
            }
        }
    }
})