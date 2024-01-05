var vm = new Vue({
    el: '#station',
    data: {
        StationLoops: [],
        Equipments: [],
        FlowmeterData: [],
        FlowmeterDatas: [],
        Daniel1dialogVisible: false,
        Weise1dialogVisible: false,
        Sick1dialogVisible: false,
        ManydialogVisible: false,
        LessdialogVisible: false,
        Elster1dialogVisible: false,
        Elster2dialogVisible: false,
        Elster4dialogVisible: false,
        RMG1dialogVisible: false,
        isElster4Click: false,
        isElster2Click: false,
        isRMG1Click: false,
        isElster1Click: false,
        Daniel1clicked: false,
        Weise1clicked: false,
        Sick1clicked: false,
        Manyclicked: false,
        Lessclicked: false,
        status: false,
        Turbo1dialogVisible: false,
        Turbo2dialogVisible: false,
        Turbo3dialogVisible: false,
        Turbo4dialogVisible: false,
        isTurbo1Click: false,
        isTurbo2Click: false,
        isTurbo3Click: false,
        isTurbo4Click: false,
        EquipmentsABB1dialogVisible: false,
        isEquipmentsABB1Click: false,
        EquipmentsDaniel1dialogVisible: false,
        isEquipmentsDaniel1Click: false,
        EquipmentsElster1dialogVisible: false,
        isEquipmentsElster1Click: false,
        Turbo1Title: "",
        Turbo2Title: "",
        Turbo3Title: "",
        Turbo4Title: "",
        EquipmentsDaniel1rName: '',
        LoopsName: '',
        withinVal: 0,
        minVal: '',
        loopData: '',
        EquipmentDatas: [],
        EquipmentsName: '',
        loopDatas: '',
        AbbrName: '',
        StaAbbrName: '',
        LoopAbbrName: '',
        listData: '',
        homeAbbrName: '',
        homeAbbrNames: '',
        StaAbbrName: '',
        DialogAverageValue: '',  //弹窗平均值
        titleDia: '',
        LesstitleDia: '',
        intervalId: null,
        station: station,
        AbbrNames: '',
        LoopAbbrNames: '',
        homeAbbrNames: '',
        EquipmentsAbbrNames: '',
        chart: ''
    },
    created() {
        this.status = true
        this.stationName = station.Name
        this.StationLoops = station.Loops
        this.Equipments = station.Equipments
        this.homeAbbrNames = station.AbbrName
        this.homeAbbrName = station.AbbrName + '_'
        var ipaddress = "/api/Station/GetStationData";
        axios.post(
            ipaddress,
            JSON.stringify(JSON.stringify(this.station)),
            { headers: { 'Content-Type': 'application/json' } },
            { timeout: 1000 * 60 * 2 })
            .then((res) => {
                this.listData = res.data.Data
                this.loopData = res.data.Data.LoopDatas;
                this.EquipmentDatas = res.data.Data.EquipmentDatas;
                this.status = true
            }, (err) => {
                    this.listData = [];
                    this.loopData = [];
                    this.EquipmentDatas = [];
                    this.status = true
            }
            );

        if (this.intervalId != null) {
            return;
        }
        //计时器为空，操作
        this.intervalId = setInterval(() => {

            this.StationLoops = station.Loops
            this.Equipments = station.Equipments
            this.homeAbbrName = station.AbbrName + '_'

            var ipaddress = "/api/Station/GetStationData";
            axios.post(
                ipaddress,
                JSON.stringify(JSON.stringify(this.station)),
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.listData = res.data.Data
                    this.loopData = res.data.Data.LoopDatas;
                    this.EquipmentDatas = res.data.Data.EquipmentDatas;
                    this.status = true
                }, (err) => {
                        this.listData = [];
                        this.loopData = [];
                        this.EquipmentDatas = [];
                        this.status = true
                }
            );
        }, 10000);

    },
    mounted() {

    },
    methods: {
        close() {
            this.Daniel1dialogVisible = false
            this.Daniel1clicked = false
            this.Sick1dialogVisible = false
            this.Sick1clicked = false
            this.Weise1dialogVisible = false
            this.Weise1clicked = false
            this.ManydialogVisible = false
            this.Manyclicked = false
            this.LessdialogVisible = false
            this.Lessclicked = false
            this.Elster1dialogVisible = false
            this.isElster1Click = false
            this.Elster2dialogVisible = false
            this.RMG1dialogVisible = false
            this.isElster2Click = false
            this.isRMG1Click = false
            this.Elster4dialogVisible = false
            this.isElster4Click = false
            this.Turbo1dialogVisible = false
            this.Turbo2dialogVisible = false
            this.Turbo3dialogVisible = false
            this.Turbo4dialogVisible = false
            this.isTurbo1Click = false
            this.isTurbo2Click = false
            this.isTurbo3Click = false
            this.isTurbo4Click = false
            this.EquipmentsABB1dialogVisible = false
            this.isEquipmentsABB1Click = false
            this.EquipmentsDaniel1dialogVisible = false
            this.isEquipmentsDaniel1Click = false
            this.EquipmentsElster1dialogVisible = false
            this.isEquipmentsElster1Click = false
        },
        Daniel1Details(data) {
            this.Daniel1dialogVisible = true
            this.Daniel1clicked = true
            var StaAbbrName = data.AbbrName
            this.StaAbbrName = StaAbbrName
            this.AbbrName = station.AbbrName + '_'
            this.LoopAbbrName = data.AbbrName + '_'
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = data.AbbrName
            this.LoopsName = data.Name + "详情"

        },
        Weise1Details(data) {
            this.Weise1dialogVisible = true
            this.Weise1clicked = true
            var StaAbbrName = data.AbbrName
            this.StaAbbrName = StaAbbrName
            this.AbbrName = station.AbbrName + '_'
            this.AbbrNames = station.AbbrName
            this.LoopAbbrNames = data.AbbrName
            this.LoopAbbrName = data.AbbrName + '_'

            this.LoopsName = data.Name + "详情"
        },
        Sick1Details(data) {
            this.Sick1dialogVisible = true
            this.Sick1clicked = true
            var StaAbbrName = data.AbbrName
            this.StaAbbrName = StaAbbrName
            this.AbbrNames = station.AbbrName
            this.LoopAbbrNames = data.AbbrName
            this.AbbrName = station.AbbrName + '_'
            this.LoopAbbrName = data.AbbrName + '_'

            this.LoopsName = data.Name + "详情"
        },
        handleElster1Details(initData) {
            this.LoopsName = initData.Name + "详情";
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + "_";
            this.LoopAbbrName = initData.AbbrName + '_';
            this.Elster1dialogVisible = true;
            this.isElster1Click = true;
        },
        handleElster2Details(initData) {
            this.LoopsName = initData.Name + "详情";
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + "_";
            this.LoopAbbrName = initData.AbbrName + '_';
            this.Elster2dialogVisible = true;
            this.isElster2Click = true;
        },
        handleElster4Details(initData) {
            this.LoopsName = initData.Name + "详情";
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + "_";
            this.LoopAbbrName = initData.AbbrName + '_';
            this.Elster4dialogVisible = true;
            this.isElster4Click = true;
        },
        handleRMG1Details(initData) {
            this.LoopsName = initData.Name + "详情";
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + "_";
            this.LoopAbbrName = initData.AbbrName + '_';
            this.RMG1dialogVisible = true;
            this.isRMG1Click = true;
        },
        // 打开Turbo1详情页面
        handleTurbo1Details(initData) {
            this.Turbo1Title = initData.Name + '详情';
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + '_'
            this.LoopAbbrName = initData.AbbrName + '_'
            this.Turbo1dialogVisible = true;
            this.isTurbo1Click = true;
        },
        // 打开Turbo2详情页面
        handleTurbo2Details(initData) {
            this.Turbo2Title = initData.Name + '详情';
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + '_'
            this.LoopAbbrName = initData.AbbrName + '_'
            this.Turbo2dialogVisible = true;
            this.isTurbo2Click = true;
        },
        // // 打开Turbo3详情页面
        handleTurbo3Details(initData) {
            this.Turbo3Title = initData.Name + '详情';
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + '_'
            this.LoopAbbrName = initData.AbbrName + '_'
            this.Turbo3dialogVisible = true;
            this.isTurbo3Click = true;
        },
        // // 打开Turbo4详情页面
        handleTurbo4Details(initData) {
            this.Turbo4Title = initData.Name + '详情';
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + '_'
            this.LoopAbbrName = initData.AbbrName + '_'
            this.Turbo4dialogVisible = true;
            this.isTurbo4Click = true;
        },
        onEquipmentsABB1(data) {
            this.EquipmentsName = data.Name + "详情"
            this.StaAbbrName = data.AbbrName;
            this.homeAbbrName = station.AbbrName + '_'
            this.EquipmentsAbbrName = data.AbbrName + '_'
            this.homeAbbrNames = station.AbbrName
            this.EquipmentsAbbrNames = data.AbbrName
            this.EquipmentsABB1dialogVisible = true
            this.isEquipmentsABB1Click = true
        },
        onEquipmentsDaniel1(data) {
            this.EquipmentsName = data.Name + "详情"
            this.StaAbbrName = data.AbbrName;
            this.homeAbbrName = station.AbbrName + '_'
            this.EquipmentsAbbrName = data.AbbrName + '_'
            this.homeAbbrNames = station.AbbrName
            this.EquipmentsAbbrNames = data.AbbrName
            this.EquipmentsDaniel1dialogVisible = true
            this.isEquipmentsDaniel1Click = true
        },
        onEquipmentsElster1(data) {
            this.EquipmentsName = data.Name + "详情"
            this.StaAbbrName = data.AbbrName;
            this.homeAbbrName = station.AbbrName + '_'
            this.EquipmentsAbbrName = data.AbbrName + '_'
            this.homeAbbrNames = station.AbbrName
            this.EquipmentsAbbrNames = data.AbbrName
            this.EquipmentsElster1dialogVisible = true
            this.isEquipmentsElster1Click = true
        },
        OpenEarlyWarning() {
            this.EarlyWarningdialogVisible = true

        },
        diagnosisMany(data, nam, e) {
            this.FlowmeterData = []
           
                this.ManydialogVisible = true
                this.Manyclicked = true
                var ipaddress = "";
                let url
                if (nam == 'fmDiagnosticResult') {
                    url = ipaddress + '/api/DiagnosticData/GetFlowMeterDiagnosticDataDetail'
                    this.titleDia = data.AbbrName + '流量计诊断详情'
                } else if (nam == 'vosDiagnosticResult') {
                    url = ipaddress + '/api/DiagnosticData/GetVOSDiagnosticDataDetail'
                    this.titleDia = data.AbbrName + '声速核查诊断详情'
                }
                var date = {
                    LoopID: data.ID,
                    BrandName: data.BrandName
                }
                axios.post(
                    url,
                    JSON.stringify(JSON.stringify(date)),
                    { headers: { 'Content-Type': 'application/json' } },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        this.FlowmeterData = res.data
                    }, (err) => {
                        console.log(err)
                    }
                    );
            
        },
        diagnosisLess(data, nam, e) {
            this.FlowmeterDatas = []
            
                this.LessdialogVisible = true
                this.Lessclicked = true
                var ipaddress = "";
                let url
                if (nam == 'ptDiagnosticResult') {
                    url = ipaddress + '/api/DiagnosticData/GetPressureTransmitterDiagnosticDataDetail'
                    this.LesstitleDia = data.AbbrName + '压变诊断详情'
                } else if (nam == 'ttDiagnosticResult') {
                    url = ipaddress + '/api/DiagnosticData/GetTemperatureTransmitterDiagnosticDataDetail'
                    this.LesstitleDia = data.AbbrName + '温变诊断详情'
                } else if (nam == 'fcDiagnosticResult') {
                    url = ipaddress + '/api/DiagnosticData/GetFlowComputerDiagnosticDataDetail'
                    this.LesstitleDia = data.AbbrName + '流量计算机诊断详情'
                } else if (nam == 'diagnosticResult') {
                    url = ipaddress + '/api/DiagnosticData/GetEquipmentDiagnosticDataDetail'
                    this.LesstitleDia = data.AbbrName + '诊断详情'
                }
                if (nam == 'diagnosticResult') {
                    var date = {
                        EquipmentID: data.ID,
                        EquipmentType: data.EquipmentType,
                        BrandName: data.BrandName
                    }
                } else {
                    var date = {
                        LoopID: data.ID,
                        BrandName: data.BrandName
                    }
                }
                axios.post(
                    url,
                    JSON.stringify(JSON.stringify(date)),
                    { headers: { 'Content-Type': 'application/json' } },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        this.FlowmeterDatas = res.data
                    }, (err) => {
                        console.log(err)
                    }
                    );
            
        },
        open() {
            this.$nextTick(() => {
                var temperatureChart = echarts.init(document.getElementById('TemperatureInUseID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                temperatureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: -20,
                        max: 100,
                        radius: '40%',
                        splitNumber: 12,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '90%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + '°C',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2)
                        }]
                    }],
                })

                var pressureChart = echarts.init(document.getElementById('PressureTransmitterID'))
                pressureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 12000,
                        radius: '40%',
                        splitNumber: 5,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '130%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4,2) + 'kPa',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4,2)
                        }]
                    }],
                })

                var UltrasonicChart = echarts.init(document.getElementById('UltrasonicFlowmeterID'))
                UltrasonicChart.setOption({
                    series: [{
                        type: 'gauge',
                        radius: '90%',
                        progress: {
                            show: true,
                            width: 18
                        },
                        axisLine: {
                            lineStyle: {
                                width: 18
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            distance: 3,
                            length: 3,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 20,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: true,
                            showAbove: true,
                            size: 10,
                            itemStyle: {
                                borderWidth: 7
                            }
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            fontSize: 15,
                            color: '#fff',
                            offsetCenter: [0, '85%'],
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4,2) + 'm/s',
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4,2),
                        }]
                    }]
                })
                var soundVelocityChart = echarts.init(document.getElementById('soundVelocityID'))
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        "ChordD": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        "ChordC": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        "ChordB": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        "ChordA": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    }
                };
                var mall = []
                for (var i in builderJson.charts) {
                    mall.push(builderJson.charts[i])
                }
                var mins = Math.min.apply(null, mall)
                var maxs = Math.max.apply(null, mall)
                console.log(mins,maxs)
                soundVelocityChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min-1

                        },
                        max: function (value) {
                            return value.max+1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var performanceChart = echarts.init(document.getElementById('performanceID'))
                var builderJson = {
                    "charts": {
                        "ChordD2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4BPerformance", 3),
                        "ChordD1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4APerformance", 3),
                        "ChordC2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3BPerformance", 3),
                        "ChordC1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3APerformance", 3),
                        "ChordB2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2BPerformance", 3),
                        "ChordB1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2APerformance", 3),
                        "ChordA2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1BPerformance", 3),
                        "ChordA1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1APerformance", 3),
                    }
                };
                performanceChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 60,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} %',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var CurrentSpeedChart = echarts.init(document.getElementById('CurrentSpeedID'))
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2) , 
                        "ChordD": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        "ChordC": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        "ChordB": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        "ChordA": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    }
                };
                CurrentSpeedChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]


                })




            })
        },
        Weise1open() {
            this.$nextTick(() => {
                var Weise1soundVelocityChart = echarts.init(document.getElementById('Weise1soundVelocityID'))
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    }
                };
                Weise1soundVelocityChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var Weise1performanceChart = echarts.init(document.getElementById('Weise1performanceID'))
                var builderJson = {
                    "charts": {
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    }
                };
                Weise1performanceChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 60,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} %',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var Weise1CurrentSpeedChart = echarts.init(document.getElementById('Weise1CurrentSpeedID'))
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        "Chord3":this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        "Chord2":this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    }
                };
                Weise1CurrentSpeedChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]


                })

                var Weise1temperatureChart = echarts.init(document.getElementById('Weise1TemperatureInUseID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                Weise1temperatureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: -20,
                        max: 100,
                        radius: '40%',
                        splitNumber: 12,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '90%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + '°C',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2)
                        }]
                    }],
                })
                var Weise1pressureChart = echarts.init(document.getElementById('Weise1PressureTransmitterID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                Weise1pressureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 12000,
                        radius: '40%',
                        splitNumber: 5,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '130%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4,2) + 'kPa',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4,2)
                        }]
                    }],
                })
                var Weise1UltrasonicChart = echarts.init(document.getElementById('Weise1UltrasonicFlowmeterID'))
                Weise1UltrasonicChart.setOption({
                    series: [{
                        type: 'gauge',
                        radius: '90%',
                        progress: {
                            show: true,
                            width: 18
                        },
                        axisLine: {
                            lineStyle: {
                                width: 18
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            distance: 3,
                            length: 3,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 20,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: true,
                            showAbove: true,
                            size: 10,
                            itemStyle: {
                                borderWidth: 7
                            }
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            fontSize: 15,
                            color: '#fff',
                            offsetCenter: [0, '85%'],
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4,2) + 'm/s',

                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                        }]
                    }]
                })
            })
        },
        Sick1open() {
            this.$nextTick(() => {
                var Sick1soundVelocityChart = echarts.init(document.getElementById('Sick1soundVelocityID'))   // 声速
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    }
                };
                Sick1soundVelocityChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var Sick1performanceChart = echarts.init(document.getElementById('Sick1performanceID'))   // 性能
                var builderJson = {
                    "charts": {
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    }
                };
                Sick1performanceChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 60,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} %',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var Sick1CurrentSpeedChart = echarts.init(document.getElementById('Sick1CurrentSpeedID'))  // 流速
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    }
                };
                Sick1CurrentSpeedChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]


                })
                var Sick1temperatureChart = echarts.init(document.getElementById('Sick1TemperatureInUseID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                Sick1temperatureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: -20,
                        max: 100,
                        radius: '40%',
                        splitNumber: 12,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '90%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + '°C',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2)
                        }]
                    }],
                })
                var Sick1pressureChart = echarts.init(document.getElementById('Sick1PressureTransmitterID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                Sick1pressureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 12000,
                        radius: '40%',
                        splitNumber: 5,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '130%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4,2) + 'kPa',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4,2)
                        }]
                    }],
                })
                var Sick1UltrasonicChart = echarts.init(document.getElementById('Sick1UltrasonicFlowmeterID'))
                Sick1UltrasonicChart.setOption({
                    series: [{
                        type: 'gauge',
                        radius: '90%',
                        progress: {
                            show: true,
                            width: 18
                        },
                        axisLine: {
                            lineStyle: {
                                width: 18
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            distance: 3,
                            length: 3,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 20,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: true,
                            showAbove: true,
                            size: 10,
                            itemStyle: {
                                borderWidth: 7
                            }
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            fontSize: 15,
                            color: '#fff',
                            offsetCenter: [0, '85%'],
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4,2) + 'm/s',
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                        }]
                    }]
                })

            })
        },
        renderElster4Charts() {
            this.$nextTick(() => {
                // 声速
                // 基于准备好的dom，初始化echarts实例
                var velocityChart = echarts.init(document.getElementById('velocityChart'));
                // 需要渲染的数据
                var velocityChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    },
                };
                // 进行图表的配置
                velocityChart.setOption({
                    grid: [
                        {
                            top: 5,
                            width: "85%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(velocityChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(velocityChartJson.charts).map(function (key) {
                                return velocityChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 流速
                var flowChart = echarts.init(document.getElementById('flowChart'));
                var flowChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    },
                };
                flowChart.setOption({
                    grid: [
                        {
                            top: 5,
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(flowChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(flowChartJson.charts).map(function (key) {
                                return flowChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 性能
                var propertyChart = echarts.init(document.getElementById('propertyChart'));
                var propertyChartJson = {
                    charts: {
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    },
                };
                propertyChart.setOption({
                    grid: [
                        {
                            top: 5,
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(propertyChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} %",
                                color: '#fff'
                            },
                            data: Object.keys(propertyChartJson.charts).map(function (key) {
                                return propertyChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('tempInfoChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "55%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",

                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('pressureInfoChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "55%",
                            splitNumber: 5,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 超声流量计图表
                var flowMeterChart = echarts.init(document.getElementById('flowMeterChart'));
                flowMeterChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            radius: "100%",
                            progress: {
                                show: true,
                                width: 18,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                distance: 3,
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 7,
                                },
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                fontSize: 15,
                                color: "#fff",
                                offsetCenter: [0, "85%"],
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + "m/s",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                                },
                            ],
                        },
                    ],
                });
            })

        },
        renderElster2Charts() {
            this.$nextTick(() => {
                // 声速
                // 基于准备好的dom，初始化echarts实例
                var velocityChart = echarts.init(document.getElementById('velocityChart'));
                // 需要渲染的数据
                var velocityChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6VOS", 3, 2),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5VOS", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    },
                };
                // 进行图表的配置
                velocityChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(velocityChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(velocityChartJson.charts).map(function (key) {
                                return velocityChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 流速
                var flowChart = echarts.init(document.getElementById('flowChart'));
                var flowChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6VOG", 3, 2),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5VOG", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    },
                };
                flowChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(flowChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(flowChartJson.charts).map(function (key) {
                                return flowChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 性能
                var propertyChart = echarts.init(document.getElementById('propertyChart'));
                var propertyChartJson = {
                    charts: {
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6Performance", 3),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5Performance", 3),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    },
                };
                propertyChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(propertyChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} %",
                                color: '#fff'
                            },
                            data: Object.keys(propertyChartJson.charts).map(function (key) {
                                return propertyChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('tempInfoChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "55%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('pressureInfoChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "55%",
                            splitNumber: 5,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 超声流量计图表
                var flowMeterChart = echarts.init(document.getElementById('flowMeterChart'));
                flowMeterChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            radius: "100%",
                            progress: {
                                show: true,
                                width: 18,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                distance: 3,
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 7,
                                },
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                fontSize: 15,
                                color: "#fff",
                                offsetCenter: [0, "85%"],
                                formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + "m/s",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                                },
                            ],
                        },
                    ],
                });
            })

        },
        renderElster1Charts() {
            this.$nextTick(() => {
                // 声速
                // 基于准备好的dom，初始化echarts实例
                var velocityChart = echarts.init(document.getElementById('velocityChart'));
                // 需要渲染的数据
                var velocityChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    },
                };
                // 进行图表的配置
                velocityChart.setOption({
                    grid: [
                        {
                            top: 10,
                            width: "85%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(velocityChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(velocityChartJson.charts).map(function (key) {
                                return velocityChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 流速
                var flowChart = echarts.init(document.getElementById('flowChart'));
                var flowChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    },
                };
                flowChart.setOption({
                    grid: [
                        {
                            top: 10,
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(flowChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(flowChartJson.charts).map(function (key) {
                                return flowChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 性能
                var propertyChart = echarts.init(document.getElementById('propertyChart'));
                var propertyChartJson = {
                    charts: {
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    },
                };
                propertyChart.setOption({
                    grid: [
                        {
                            top: 10,
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(propertyChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} %",
                                color: '#fff'
                            },
                            data: Object.keys(propertyChartJson.charts).map(function (key) {
                                return propertyChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('tempInfoChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "55%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",

                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('pressureInfoChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "55%",
                            splitNumber: 5,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 超声流量计图表
                var flowMeterChart = echarts.init(document.getElementById('flowMeterChart'));
                flowMeterChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            radius: "100%",
                            progress: {
                                show: true,
                                width: 18,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                distance: 3,
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 7,
                                },
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                fontSize: 15,
                                color: "#fff",
                                offsetCenter: [0, "85%"],
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + "m/s",},
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                                },
                            ],
                        },
                    ],
                });
            })

        },
        renderRMG1Charts() {
            this.$nextTick(() => {
                // 声速
                // 基于准备好的dom，初始化echarts实例
                var velocityChart = echarts.init(document.getElementById('velocityChart'));
                // 需要渲染的数据
                var velocityChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6VOS", 3, 2),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5VOS", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    },
                };
                // 进行图表的配置
                velocityChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "82%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(velocityChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(velocityChartJson.charts).map(function (key) {
                                return velocityChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 流速
                var flowChart = echarts.init(document.getElementById('flowChart'));
                var flowChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6VOG", 3, 2),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5VOG", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    },
                };
                flowChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(flowChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(flowChartJson.charts).map(function (key) {
                                return flowChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 性能
                var propertyChart = echarts.init(document.getElementById('propertyChart'));
                var propertyChartJson = {
                    charts: {
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6Performance", 3),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5Performance", 3),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    },
                };
                propertyChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(propertyChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} %",
                                color: '#fff'
                            },
                            data: Object.keys(propertyChartJson.charts).map(function (key) {
                                return propertyChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('tempInfoChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "55%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('pressureInfoChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "55%",
                            splitNumber: 5,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 超声流量计图表
                var flowMeterChart = echarts.init(document.getElementById('flowMeterChart'));
                flowMeterChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            radius: "100%",
                            progress: {
                                show: true,
                                width: 18,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                distance: 3,
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 7,
                                },
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                fontSize: 15,
                                color: "#fff",
                                offsetCenter: [0, "85%"],
                                formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + "m/s",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                                },
                            ],
                        },
                    ],
                });
            })

        },
        renderTurbo1Charts() {
            this.$nextTick(() => {
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('TempChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "30%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('PressChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "30%",
                            splitNumber: 6,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
            })
        },
        renderTurbo2Charts() {
            this.$nextTick(() => {
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('TempChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "30%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('PressChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "30%",
                            splitNumber: 6,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
            })
        },
        renderTurbo3Charts() {
            this.$nextTick(() => {
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('TempChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 60,
                            radius: "27%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('PressChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "27%",
                            splitNumber: 6,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
            })
        },
        renderTurbo4Charts() {
            this.$nextTick(() => {
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('TempChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "30%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",

                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('PressChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "30%",
                            splitNumber: 6,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
            })
        },
        clear() {
            clearInterval(this.intervalId); //清除计时器
            this.intervalId = null; //设置为null
        },
        rendEarlyWarningChart() {
            this.$nextTick(() => {
                this.getChartsO();
            })
        },
        getChartsO() {
            if (
                this.chart != null &&
                this.chart != "" &&
                this.chart != undefined
            ) {
                this.chart.dispose(); //销毁
            }
            this.chart = this.$echarts.init(this.$refs.ch);
            window.onresize = () => {
                //  根据窗口大小调整曲线大小
                this.chart.resize();
            };
            const option = {
                // title: {
                // 	text: '标题'
                // },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        color: '#FFF'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#75878a'
                        }
                    },
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#FFF'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#75878a'
                        }
                    }
                    // axisLabel: {
                    // 	formatter: '{value} °C'
                    // }
                },
                series: [{
                    name: 'Highest',
                    type: 'line',
                    lineStyle: {
                        color: '#3eede7'
                    },
                    data: [10, 11, 13, 11, 12, 12, 9],

                    markLine: {
                        data: [{
                            name: '上报警线',
                            yAxis: '15',
                            label: {
                                formatter: '报警线',
                                position: 'end',
                                color: '#F00'
                            },
                            lineStyle: {
                                color: '#F00'
                            }
                        }, {
                            name: '上预警线',
                            yAxis: '10',
                            label: {
                                formatter: '预警线',
                                position: 'end',
                                color: '#FF9500'
                            },
                            lineStyle: {
                                color: '#FF9500'
                            }
                        }, {
                            name: '下报警线',
                            yAxis: '2',
                            label: {
                                formatter: '报警线',
                                position: 'end',
                                color: '#F00'
                            },
                            lineStyle: {
                                color: '#F00'
                            }
                        }, {
                            name: '下预警线',
                            yAxis: '4',
                            label: {
                                formatter: '预警线',
                                position: 'end',
                                color: '#FF9500'
                            },
                            lineStyle: {
                                color: '#FF9500'
                            }
                        }],
                    }
                }]
            }
            this.chart.setOption(option);
        },
        tabCli(tab, event) {
            let data = {
                series: [{
                    name: 'Highest',
                    type: 'line',
                    data: [1, 22, 13, 2, 7, 12, 3],

                    markLine: {
                        data: [{
                            name: '上报警线',
                            yAxis: '30',
                            label: {
                                formatter: '报警线',
                                position: 'end',
                                color: '#F00'
                            },
                            lineStyle: {
                                color: '#F00'
                            }
                        }, {
                            name: '上预警线',
                            yAxis: '20',
                            label: {
                                formatter: '预警线',
                                position: 'end',
                                color: '#FF9500'
                            },
                            lineStyle: {
                                color: '#FF9500'
                            }
                        }, {
                            name: '下报警线',
                            yAxis: '2',
                            label: {
                                formatter: '报警线',
                                position: 'end',
                                color: '#F00'
                            },
                            lineStyle: {
                                color: '#F00'
                            }
                        }, {
                            name: '下预警线',
                            yAxis: '4',
                            label: {
                                formatter: '预警线',
                                position: 'end',
                                color: '#FF9500'
                            },
                            lineStyle: {
                                color: '#FF9500'
                            }
                        }],
                    }
                }]
            }
            this.chart.setOption(data);
        },
        numberDigits(value, lead = 3, decimal = 0) {
            if (String(value).indexOf('?') != -1) {

                return '-----'
            } else {
                var num = new Number(value);
                return num.toFixed(decimal)
            }
        },  
        SetValDigits(loopData, staAbbrName, loopAbbrName, tagName, lead = 3, decimal = 0) {
            console.log()
            if (loopData == 'LoopDatas') {
                var data = this.loopData[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.loopData[loopAbbrName].Loop[staAbbrName + '_' + loopAbbrName + '_' + tagName]
                    if (tag == undefined) { 
                        return '-----'
                    } else {
                        var tagVal = this.loopData[loopAbbrName].Loop[staAbbrName + '_' + loopAbbrName + '_' + tagName].value;
                        if (tagVal.indexOf('?') != -1) {

                            return '-----'
                        } else {
                            var num = new Number(tagVal);
                            return num.toFixed(decimal)
                        }
                    }
                }

            } else if (loopData == 'EquipmentDatas') {
                var data = this.EquipmentDatas[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.EquipmentDatas[loopAbbrName].Equipment[staAbbrName + '_' + loopAbbrName + '_' + tagName]
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.EquipmentDatas[loopAbbrName].Equipment[staAbbrName + '_' + loopAbbrName + '_' + tagName].value;

                        if (tagVal.indexOf('?') != -1) {

                            return '-----'
                        } else {
                            var num = new Number(tagVal);
                            return num.toFixed(decimal)
                        }
                    }
                }
            }
        },
        SetDiagnosticDetail(loopData, loopAbbrName, tagName, lead = 3, decimal = 0) {
            if (loopData == 'LoopDatas') {
                var data = this.loopData[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.loopData[loopAbbrName].Diagnostic
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.loopData[loopAbbrName].Diagnostic[tagName];


                        return tagVal

                    }
                }
            } else if (loopData == 'EquipmentDatas') {
                var data = this.EquipmentDatas[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.EquipmentDatas[loopAbbrName].Diagnostic
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.EquipmentDatas[loopAbbrName].Diagnostic[tagName];


                        return tagVal

                    }
                }
            }

        },
        SetAlarmCountDetail(loopData, loopAbbrName, tagName, lead = 3, decimal = 0) {
            if (loopData == 'LoopDatas') {
                var data = this.loopData[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.loopData[loopAbbrName].AlarmCount
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.loopData[loopAbbrName].AlarmCount[tagName].value;

                        if (tagVal.indexOf('?') != -1) {

                            return '-----'
                        } else {
                            var num = new Number(tagVal);
                            return num.toFixed(decimal)
                        }
                    }
                }
            } else if (loopData == 'EquipmentDatas') {
                var data = this.EquipmentDatas[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.EquipmentDatas[loopAbbrName].AlarmCount
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.EquipmentDatas[loopAbbrName].AlarmCount[tagName].value;

                        if (tagVal.indexOf('?') != -1) {

                            return '-----'
                        } else {
                            var num = new Number(tagVal);
                            return num.toFixed(decimal)
                        }
                    }
                }
            }

        }
    },
    destroyed() {
        this.clear()
    }
})
