
var realtimealarmvm = new Vue({
    el: '#RealtimeTread',
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
        tableData: [],
        Allstations: '',   // 默认全部的设备
        chromatographic: [],
        sort: [],
        CategoryID: '',
        CategoryVal: '',
        ipAddress: '',
        ipPort: '',
        array: [],
        arrgt: [],
        timer: null,
        ipAddress: '',
        ipPort: '',
        myChart: null,
        tableData: [],
        tableColor: ['#FF7F50', '#DC143C', '#7FFF00', '#9400D3', '#FF1493', '#3ba272', '#FFD700', '#FF69B4', '#FFFF00'],
        lastdataall: [],
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
    },
    created() {
        if (isArea == 'false') {
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
            var LoopsData = res.Loops.map((res) => {
                this.LoopData.push(res)
                return { Name: res.Name + '(回路)', ID: res.ID }
            })

            this.Loops.unshift(LoopsData)
            function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
            this.Loops = fall(this.Loops)
            this.LoopName = this.Loops[0].ID
            res.Loops.filter(el => el.ID == this.LoopName).map((res) => {
                this.groupingdata.push(res.TrendGroups)
            })
            function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
            this.groupingdata = fall(this.groupingdata)
            this.GroupingType = this.groupingdata[0].TrendGroupID
        })
    },
    mounted() {   
        this.initialChart();
    },
    methods: {
        Refresh() {
            this.array = new Array();
            this.arrgt = new Array();
            this.AddDataAndRefresh();
            this.IntervalRestart();
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
                    this.GroupingType = ''
                    this.groupingdata = []
                } else if (res.Loops.length != 0) {
                    var LoopsData = res.Loops.map((res) => {
                        this.LoopData.push(res)
                        return { Name: res.Name + '(回路)', ID: res.ID }
                    })
                    this.Loops = []
                    this.Loops.unshift(LoopsData)
                    function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                    this.Loops = fall(this.Loops)
                    this.LoopName = this.Loops[0].ID
                    res.Loops.filter(el => el.ID == this.LoopName).map((res) => {
                        this.groupingdata = []
                        this.groupingdata.push(res.TrendGroups)
                    })
                    function falls(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                    this.groupingdata = falls(this.groupingdata)
                    this.GroupingType = this.groupingdata[0].TrendGroupID
                }
                
            })

        },
        onLoops(id) { // 回路

            let obj = {};
            obj = this.Loops.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.LoopsID = obj.ID
            console.log(this.StationName)
            this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
                res.Loops.filter(el => el.ID == obj.ID).map((res) => {
                    this.groupingdata = []
                    this.groupingdata.push(res.TrendGroups)
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.groupingdata = fall(this.groupingdata)
                this.GroupingType = this.groupingdata[0].TrendGroupID
            })
        },
        ongrouping(id) {
            let obj = {};
            obj = this.groupingdata.find((item) => {//这里的userList就是上面遍历的数据源
                return item.TrendGroupID === id;//筛选出匹配数据
            });
            console.log(obj)
            this.GroupingType = obj.TrendGroupID
        },
        initialChart() {
            this.myChart = echarts.init(document.getElementById("chartLineBox"), 'light');
            this.myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: [],
                    textStyle: {
                        color: '#ffffff'
                    },
                },
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '8%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    },
                    textStyle: {
                        color: '#fff'
                    },
                    iconStyle: {
                       
                        emphasis: {
                            borderColor: '#64D399',
                        },
                    },
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 10
                }],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: "#FFFFFF"
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    max: 1,
                    min: 0,
                    axisLine: {
                        lineStyle: {
                            color: "#FFFFFF"
                        },
                    },
                },
                series: [
                ]
            });
            this.myChart.on('legendselectchanged', (params) => {
                this.tableData = []
                this.lastdataall.map((res) => {
                    if (params.selected[res.seriesName])
                    {
                       console.log(res)
                        
                        var alldata = {
                            name: res.name,
                            seriesName: res.seriesName,
                            value: res.value,
                            color: res.color
                        }
                        this.tableData.push(alldata)
                    }
                })
                
            })
        },
        AddDataAndRefresh() {
            var data = {
                LoopID: this.LoopName,
                TrendGroupID: this.GroupingType
            }
            console.log(data);
            var arrnew = new Array();
            var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/Trend/GetRealtimeTrends";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                   
                    if (this.array.length < 120) {
                        this.array.push(res.data);
                        this.arrgt.push(this.DateFormat("YYYY-mm-dd HH:MM", new Date()));
                    }
                    else {
                        this.array.splice(0, 1);
                        this.array.push(res.data);
                        this.arrgt.push(new Date());
                        this.arrgt.splice(0, 1);
                    }

                    var HighLimit = new Array();
                    var LowLimit = new Array();
                    for (var i = 0; i < res.data.length; i++) {
                        var arrgv = new Array();
                        for (var j = 0; j < this.array.length; j++) {
                            if (res.data[i].Name == this.array[j][i].Name) {
                                arrgv.push(this.array[j][i].Value);
                            }
                        }
                        HighLimit.push(res.data[i].HighLimit);
                        LowLimit.push(res.data[i].LowLimit);
                        arrnew.push([this.GroupingType, res.data[i].Description, arrgv]);
                       
                    }
                    this.SetChartOption(Math.max.apply(null, HighLimit), Math.min.apply(null, LowLimit), arrnew);

                }, (err) => {
                    this.array = new Array();
                    this.arrgt = new Array();
                    var option = {
                        series: []
                    };
                    this.myChart.setOption(option);
                        alert('没有加载到数据');
                        this.IntervalRestart();
                }
                );
        },
        IntervalRestart() {
            if (this.timer != null) {
                clearInterval(this.timer);
                this.timer = null;
            }
            this.timer = setInterval(this.AddDataAndRefresh, 30000);
        },
        SetChartOption(NumHighLimit, NumLowLimit, arrnew) {
            var series = new Array();
            var legendData = new Array(); 
            for (var i = arrnew.length - 1; i >= 0; i--) {
                var serie = {
                    name: arrnew[i][1],
                    type: 'line',
                    smooth: true,
                    data: arrnew[i][2],
                    color: this.tableColor[i]
                }
                series.push(serie);
                legendData.push(arrnew[i][1]);  
            }
           console.log(series)
            this.lastdataall = series.map((res) => {
                return {
                    name: this.arrgt.slice(-1),
                    seriesName: res.name,
                    value: res.data.slice(-1),
                    color: res.color,
                }
            })
            this.tableData = this.lastdataall;
            var option = {
                color: ['#FF7F50', '#DC143C', '#7FFF00', '#9400D3', '#FF1493', '#3ba272', '#FFD700', '#FF69B4', '#FFFF00'],
                tooltip: {
                    trigger: 'axis',
                    
                },
                legend: {    
                    textStyle: {
                        color: '#ffffff'
                    },
                    data: legendData
                },
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '8%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    },
                    iconStyle: {
                        
                        emphasis: {
                            borderColor: '#64D399',
                        },
                    },
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 10
                }],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.arrgt,
                    axisLine: {
                        lineStyle: {
                            color: "#FFFFFF"
                        },
                    }, 
                },
                yAxis: {
                    name: '限值',
                    type: 'value',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: "#FFFFFF"
                        },
                    },
                },
                series: series
            };

            this.myChart.setOption(option, true);
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
