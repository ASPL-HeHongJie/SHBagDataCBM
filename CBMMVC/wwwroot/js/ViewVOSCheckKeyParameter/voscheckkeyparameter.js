
var VOSCheckKeyParametervm = new Vue({
    el: '#VOSCheckKeyParameter',
    data: {
        companyName: '', // 公司的文本框内容
        datas: '',  // 公司遍历的内容
        StationName: '', // 场站文本框内容
        Stations: '', // 场站遍历的内容
        LoopName: [], //回路文本框内容
        Loops: [], // 回路遍历的内容
        LoopEventsID: '',
        StationsData: [],
        LoopData: [],
        EquipmentData: [],
        StationVal: '',
        LoopsID: '',
        PriorityIds: '',
        Alllu: [],
        timeSlot: "",
        tableData: [],
        Allstations: '',   // 默认全部的设备
        starttime: '',
        Endtime: '',
        ipPort: '',
        ipAddress: '',
        LoopsBrandName: '',
        loading: false,
        currentPage: 1,
        pagesize: 25,
        hisID: '',
        brandName: '',
        reportIPAddress: '',
        Trenddialog: false,
        TrendGroups: [{ value: 'VOSCheckRate', label: '声速偏差' }, { value: 'Gain', label: '增益' }, { value: 'SNR', label: '信噪比' }, { value: 'ProfileFactor', label: '剖面系数' }, { value: 'Performance', label: '性能' }, { value: 'PathsVOSMaxDeviationReferenceVOSAverage', label: '声道声速偏差' }, { value: 'SwirlAngle', label: '漩涡角' }],
        trendGroupName: '',
        myChart: '',
        condition: null,
        times: [],
        loopsTrendGroup: '',
        selectedTrendGroups: [],
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
        reductionDis: 'none',
        CrossColor: '#5D6568',
        CheckName: '全部',
        Check: [
            {
                Name: '全部',
                ID: '全部'
            }, {
                Name: '正常',
                ID: '正常'
            }, {
                Name: '程序刚启动未计算',
                ID: '程序刚启动未计算'
            }, {
                Name: 'IFix未启动',
                ID: 'IFix未启动'
            }, {
                Name: '数据读取错误',
                ID: '数据读取错误'
            }, {
                Name: '流量计算机通信失败',
                ID: '流量计算机通信失败'
            }, {
                Name: '流量计通讯失败',
                ID: '流量计通讯失败'
            }, {
                Name: '流量计到流量计算机通讯失败',
                ID: '流量计到流量计算机通讯失败'
            }, {
                Name: '不满足诊断条件-流速不在测量模式',
                ID: '不满足诊断条件-流速不在测量模式'
            }, {
                Name: '不满足诊断条件-流速过低',
                ID: '不满足诊断条件-流速过低'
            }, {
                Name: '不满足诊断条件-温度超范围',
                ID: '不满足诊断条件-温度超范围'
            }, {
                Name: '不满足诊断条件-压力超范围',
                ID: '不满足诊断条件-压力超范围'
            }, {
                Name: '不满足诊断条件-组分C1超范围',
                ID: '不满足诊断条件-组分C1超范围'
            }, {
                Name: '不满足诊断条件-组分柜一化超范围',
                ID: '不满足诊断条件-组分柜一化超范围'
            }, {
                Name: '温度不稳定',
                ID: '温度不稳定'
            }, {
                Name: '压力不稳定',
                ID: '压力不稳定'
            }, {
                Name: '组分C1不稳定',
                ID: '组分C1不稳定'
            }, {
                Name: '等待数据稳定',
                ID: '等待数据稳定'
            }, {
                Name: '除数为零(剖面系数)',
                ID: '除数为零(剖面系数)'
            }, {
                Name: '除数为零(对称性)',
                ID: '除数为零(对称性)'
            }, {
                Name: '除数为零(交叉流)',
                ID: '除数为零(交叉流)'
            }, {
                Name: '除数为零(漩涡角)',
                ID: '除数为零(漩涡角)'
            }, {
                Name: '诊断程序未启动',
                ID: '诊断程序未启动'
            }, {
                Name: '数据采集次数不足',
                ID: '数据采集次数不足'
            },
        ],
        DiagnosisName: '全部',
        Diagnosis: [{
            Name: '全部',
            ID: '全部'
        }, {
            Name: '通过',
            ID: '通过'
        }, {
            Name: '未通过',
            ID: '未通过'
        }, {
            Name: '未核查',
            ID: '未核查'
        },]
    },
    created() {

        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - (24 * 60 * 60 * 1000) * 3).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate]
        if (isArea == 'false') {
            this.companyName = company.Name
            this.datas = [{ Name: company.Name, ID: company.ID }]

            company.Areas.map((res) => {
                this.StationName = res.Stations[0].Name
                this.StationsAbbrName = res.Stations[0].AbbrName
                this.StationID = res.Stations[0].ID
                this.ipAddress = res.Stations[0].IPAddress;
                this.ipPort = res.Stations[0].IPPort;
                var station = res.Stations.map((res) => {
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.ID }]
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Stations = fall(station)
                this.StationsData = res.Stations.map((res) => {
                    return res
                })
            })
        } else if (isArea == 'true') {
            this.areaName = area.Name
            this.OperationAreas = [{ Name: area.Name, ID: area.ID }]
            var areas = []
            areas.push(area)
            areas.map((res) => {
                this.StationName = res.Stations[0].Name
                this.StationsAbbrName = res.Stations[0].AbbrName
                this.StationID = res.Stations[0].ID
                this.ipAddress = res.Stations[0].IPAddress;
                this.ipPort = res.Stations[0].IPPort;
                var station = res.Stations.map((res) => {
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.ID }]
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
            this.LoopName = [];
            this.LoopName.push(this.Loops[0].ID);
            this.LoopEventsID = this.Loops[0].ID;
            this.BrandName = this.Loops[0].BrandName
        })

        this.Refresh();
    },
    methods: {
        handleSizeChange: function (val) {
            this.pagesize = val;
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
        },
        GetInto() {
            this.reductionDis = 'block'
            this.CrossColor = '#fff'
        },
        Leave() {
            this.reductionDis = 'none'
            this.CrossColor = '#5D6568'
        },
        Refresh() {
            this.currentPage = 1
            if (this.timeSlot == null) {
                this.$message({
                    showClose: true,
                    message: '日期间隔未选择',
                    type: 'error'
                });
                this.tableData = ''
            } else if (this.LoopEventsID == '') {
                this.$message({
                    showClose: true,
                    message: '回路未选择',
                    type: 'error'
                });
            } else {
                var data = {
                    LoopIDs: this.LoopEventsID,
                    StartDateTime: this.DateFormat("YYYY-mm-dd HH:MM:SS", this.timeSlot[0]),
                    EndDateTime: this.DateFormat("YYYY-mm-dd HH:MM:SS", this.timeSlot[1])
                }
                this.condition = data;
                this.loading = true;
                console.log(data)
                var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/CheckData/GetVOSKeyCheckData";

                data = JSON.stringify(JSON.stringify(data));
                console.log(data);
                var that = this;
                axios.post(
                    ipaddress,
                    data,
                    { headers: { 'Content-Type': 'application/json' } },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        this.loading = false;
                        this.AddNulltoValue(res.data)
                        if (that.CheckName == '全部' && that.DiagnosisName == '全部') {
                            that.tableData = res.data;
                            console.log(that.tableData)
                        } else if (that.CheckName != '全部' && that.DiagnosisName == '全部') {
                            that.tableData = res.data.filter((el) => el.checkDataStatus == that.CheckName)
                            console.log(that.tableData)
                        } else if (that.CheckName == '全部' && that.DiagnosisName != '全部') {
                            that.tableData = res.data.filter((el) => el.result == that.DiagnosisName)
                            console.log(that.tableData)
                        } else {
                            var Checkdata = res.data.filter((el) => el.checkDataStatus == that.CheckName)
                            that.tableData = Checkdata.filter((el) => el.result == that.DiagnosisName)
                            console.log(that.tableData)
                        }
                    }, (err) => {
                        this.loading = false;
                        that.tableData = []
                    }
                    );
            }
            //this.loading = true;

        },
        Export() {
            if (this.timeSlot == null) {
                this.$message({
                    showClose: true,
                    message: '日期间隔未选择',
                    type: 'error'
                });
                this.tableData = ''
            } else if (this.LoopEventsID == '') {
                this.$message({
                    showClose: true,
                    message: '回路未选择',
                    type: 'error'
                });
            } else {
                var data = {
                    LoopIDs: this.LoopEventsID,
                    StartDateTime: this.DateFormat("YYYY-mm-dd HH:MM:SS", this.timeSlot[0]),
                    EndDateTime: this.DateFormat("YYYY-mm-dd HH:MM:SS", this.timeSlot[1])
                }
                this.condition = data;
                this.loading = true;
                console.log(data)
                var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/CheckData/ExportExcelVOSKeyCheckData";
                data = JSON.stringify(JSON.stringify(data));
                axios.post(
                    ipaddress,
                    data,
                    { headers: { "Content-Type": "application/json" }, responseType: "blob" },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        console.log(res);
                        let fileName = "声速核查重要参数.xlsx";
                        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
                        let link = document.createElement("a");
                        link.download = fileName;
                        link.style.display = 'none';
                        link.href = URL.createObjectURL(blob);
                        document.body.appendChild(link);
                        link.click();
                        URL.revokeObjectURL(link.href);
                        document.body.removeChild(link);
                        this.loading = false;
                    }, (err) => {
                        this.loading = false;
                    }
                    );
            }
            //this.loading = true;

        },
        TimeSelection(id) {
            let nowdate = new Date()
            let timeStart = this.timeSlot[0]
            if (nowdate < this.timeSlot[1]) {
                this.timeSlot = [timeStart, nowdate]
            }
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
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
                    this.tableData = []
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
                    //this.LoopName.push(this.Loops[0].ID);
                    this.LoopEventsID = this.LoopName;
                    this.BrandName = this.Loops[0].BrandName
                }
            })

            if (this.Loops.length == 0) {
                this.LoopName = []
                this.timeSlot = ''
                this.Endtime = '',
                    this.starttime = ''
                this.tableData = []
            } else if (this.Loops.length > 0) {
                this.LoopName = [];
                this.LoopName.push(this.Loops[0].ID);
                var myDate = new Date();  // 当前时间
                var preDate = new Date(new Date(myDate.getTime() - (24 * 60 * 60 * 1000) * 3).toLocaleDateString()); // 前一天时间00:00:00
                this.timeSlot = [preDate, myDate]
            }
        },
        onLoops(ids) { // 回路
            var loopids = "";
            ids.forEach((id, index) => {
                loopids += id + ",";
            });
            loopids = loopids.substr(0, loopids.length - 1);
            this.LoopEventsID = loopids;
            console.log(loopids)

        },
        Trend() {
            this.Trenddialog = true;
        },
        openTrenddialog() {
            this.$nextTick(() => {
                this.trendGroupName = [];
                this.trendGroupName.push('VOSCheckRate', 'Gain');
                this.selectedTrendGroups = ['VOSCheckRate', 'Gain'];
                var datas = this.tableData;
                this.loopsTrendGroup = new Array();
                this.times = new Array();
                if (this.condition != null) {
                    if (this.tableData.length > 0) {
                        var station = this.StationsData.find(obj => obj.Name == this.StationName);

                        var loops = []
                        var loopID = this.condition.LoopIDs.split(',')
                        for (var i = 0; i < loopID.length; i++) {

                            loops.push(station.Loops.find(obj => obj.ID == loopID[i]));
                        }

                        var loop = loopID.map((item, index) => {
                            var station = this.StationsData.find(obj => obj.Name == this.StationName);

                            return station.Loops.filter(obj => obj.ID == item[index]);
                        })

                        loops.forEach((loop, index, arr) => {
                            if (loop.FlowmeterType != 'Turbo') {
                                var loopTrends = {};
                                loopTrends.Brand = loop.BrandName;
                                loopTrends.Name = station.Name + "-" + loop.Name;
                                var loopDatas = datas.filter(obj => obj.stationName == station.Name && obj.loopName == loop.Name)
                                if (loopDatas.length > 0) {
                                    loopTrends.GroupVOSCheckRate = new Array();
                                    loopTrends.GroupGain = new Array();
                                    loopTrends.GroupSNR = new Array();
                                    loopTrends.GroupProfileFactor = new Array();
                                    loopTrends.GroupPerformance = new Array();
                                    loopTrends.GroupPathsVOSMaxDeviationReferenceVOSAverage = new Array();
                                    loopTrends.GroupVOSCheckRate = new Array();
                                    loopTrends.GroupSwirlAngle = new Array();
                                    loopTrends.GroupVOSCheckRate.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "声速偏差", "vosCheckRate"));
                                    loopTrends.GroupGain.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "上行增益", "gainUp"));
                                    loopTrends.GroupGain.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "下行增益", "gainDown"));
                                    loopTrends.GroupSNR.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "上行信噪比", "snrUp"));
                                    loopTrends.GroupSNR.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "下行信噪比", "snrDown"));
                                    loopTrends.GroupPerformance.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "性能", "performance"));
                                    loopTrends.GroupPathsVOSMaxDeviationReferenceVOSAverage.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "声道声速偏差", "pathsVOSMaxDeviationReferenceVOSAverage"));
                                    loopTrends.GroupProfileFactor.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "剖面系数", "profileFactor"));
                                    loopTrends.GroupSwirlAngle.push(this.getTrend(loopDatas, loopTrends.Name + "-" + "漩涡角", "swirlAngle1"));
                                    this.loopsTrendGroup.push(loopTrends);
                                }
                                if (this.times.length == 0) {
                                    loopDatas.map((obj, index) => {
                                        this.times.push(obj.datetime);
                                    });
                                }
                            }
                        })

                    }
                }
                this.onSubmit();


            })

        },
        onSubmit() {
            var trendGroup = this.selectedTrendGroups;
            this.SetChartOption(trendGroup);

        },
        SetChartOption(trendGroups) {
            var legends = new Array();
            var series = new Array();
            this.loopsTrendGroup.forEach(function (loopTrendGroup, index, arr) {
                trendGroups.forEach(function (group, index, arr) {
                    var trends = loopTrendGroup["Group" + group];
                    trends.forEach(function (trend, index, arr) {
                        var serie = {
                            name: trend.Name,
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            data: trend.Datas,
                        }
                        series.push(serie);
                        legends.push(trend.Name);
                    });
                });
            });
            this.myChart = echarts.init(document.getElementById("Trendchert"));
            this.myChart.clear();
            var option = {
                backgroundColor: '#4f83a9',
                title: {
                    textStyle: {
                        color: '#ffffff'
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    icon: 'rectangle',
                    width: "1100px",
                    backgroundColor: '#FFFFFF',
                    textStyle: {
                        color: '#000000',
                        fontSize: '14'
                    },
                    data: legends
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '8%',
                    containLabel: true
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        saveAsImage: {}
                    },
                    iconStyle: {
                        emphasis: {
                            borderColor: '#fff',
                        },
                    },
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    },

                ],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.times,
                    axisLine: {
                        lineStyle: {
                            color: "#FFFFFF"
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#4f83a9'
                        }
                    },

                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: "#FFFFFF"
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#4f83a9'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['#5893be', '#5c99c5']
                        }
                    }
                },
                series: series
            };

            //this.myChart.clear();
            this.myChart.setOption(option);
        },
        onTrendGroup(id) {
            this.selectedTrendGroups = id;
        },
        getTrend(loopDatas, trendName, dataName) {
            var trend = {};
            trend.Name = trendName;
            trend.Datas = new Array();
            loopDatas.map((obj, index) => {
                trend.Datas.push(obj[dataName]);
            })
            return trend;
        },
        AddNulltoValue(data) {
            data.map((obj, index) => {
                for (var val in obj) {
                    if (obj[val] == null || obj[val] == "undefined")
                        obj[val] = "N/A"
                }
            })

        },
        DateFormat(fmt, date) {
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

    }
})
