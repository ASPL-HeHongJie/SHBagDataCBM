var HistoricalTreadVm = new Vue({
    el: '#HistoricalTread',
    data:
    {
        interval: '30', // 间隔文本框
        timeSlot: [], // 时间段选择文本框
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
        chromatographic: [],
        sort: [],
        CategoryVal: '',
        CategoryID: '',
        yieldRate: [],
        yieldIndex: [],
        echartData: { HighLimit: '', LowLimit: '' },
        timer: null,
        brokenVal: [],
        TrendTime: [],
        TrendName: [],
        ipAddress: '',
        ipPort: '',
        myChart: null,
        reductionDis:'none',
        tableData: [],
        tableColor: ['#FF7F50', '#DC143C', '#7FFF00', '#9400D3', '#FF1493', '#3ba272', '#FFD700', '#FF69B4', '#FFFF00'],
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
        loading: false,
        sampling: [
            {
                Name: '5分钟',
                ID: '5'
            }, {
                Name: '10分钟',
                ID: '10'
            }, {
                Name: '15分钟',
                ID: '15'
            }, {
                Name: '20分钟',
                ID: '20'
            }, {
                Name: '30分钟',
                ID: '30'
            }, {
                Name: '1小时',
                ID: '60'
            }, {
                Name: '2小时',
                ID: '120'
            }
        ]
    },
    mounted() {
        this.initialChart();
    },
    created() {
        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate]

        this.interval = '30'
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

            this.Loops.push(LoopsData)
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
    methods: {
        getRowClass({ row, column, rowIndex, columnIndex }) {
            return "background-color: rgba(0,0,0,0);";
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        GetInto() {
            this.reductionDis = 'block'
        },
        Leave() {
            this.reductionDis = 'none'
        },
        Refresh() {
            if (this.timeSlot === null) {
                this.$message({
                    showClose: true,
                    message: "请填写正确的时间跨度或区间",
                    type: 'error'
                });
            } else if (this.interval === null) {
                this.$message({
                    showClose: true,
                    message: "请填写正确的区间间隔",
                    type: 'error'
                });
            }else if (this.timeSlot == '' || this.interval == '') {
                this.$message({
                    showClose: true,
                    message: "请填写正确的时间跨度或区间",
                    type: 'error'
                });
            } else {
                this.loading = true;
                var times = this.timeSlot.map((res) => {
                    var Y = res.getFullYear() + '-';
                    var M = (res.getMonth() + 1 < 10 ? '0' + (res.getMonth() + 1) : res.getMonth() + 1) + '-';
                    var D = res.getDate() + ' ';
                    var h = res.getHours() + ':';
                    var m = res.getMinutes() + ':';
                    var s = res.getSeconds();
                    return Y + M + D + h + m + s
                })
                var data = {
                    LoopID: this.LoopName,
                    TrendGroupID: this.GroupingType,
                    StartDateTime: times[0],
                    EndDateTime: times[1],
                    Interval: this.interval*60
                }

                console.log(data)
                var ipaddress = "/api/Trend/GetHistoricalTrends";
                data = JSON.stringify(JSON.stringify(data));
                var that = this;
                axios.post(
                    ipaddress,
                    data,
                    { headers: { 'Content-Type': 'application/json' } },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        this.loading = false;
                        this.yieldRate = []
                        this.TrendTime = []
                        this.TrendTime = res.data.Times;
                        this.yieldRate = res.data.Trends.map((res, ind) => {
                            console.log(res);
                            this.echartData.HighLimit = res.HighLimit
                            this.echartData.LowLimit = res.LowLimit
                            this.TrendName.push(res.Description)
                            return {
                                name: res.Description,
                                data: res.TrendDatas,
                                type: 'line',
                                color: this.tableColor[ind]
                            }
                        })
                        console.log(this.yieldRate)

                        this.draw()
                        document.querySelector('.formview>div').style.height = '64vh'

                        var TimeLength = this.TrendTime[Math.floor((this.TrendTime.length - 1) / 2)];
                        var Leight = this.TrendTime.findIndex((el) => el == TimeLength)
                        this.tableData = this.yieldRate.map((res) => {
                            return {
                                name: TimeLength,
                                seriesName: res.name,
                                value: res.data[Leight],
                                color: res.color
                            }
                        })
                    }, (err) => {
                        this.loading = false;
                        this.yieldRate = []
                        this.TrendTime = []
                        this.tableData = []
                        this.draw();
                    }
                    );
            }
                
            
            
            //if ((usedTime / sampleNum) >= 5000) {
            //    this.$message({
            //        showClose: true,
            //        message: "趋势区间不正确\n" +
            //            "建议:\n" +
            //            "时间跨度少于1天，建议间隔应超过1分钟!\n" +
            //            "时间跨度超过1天且少于1周，建议间隔应超过10分钟!\n" +
            //            "时间跨度超过1周且少于1个月，建议间隔应超过30分钟!\n" +
            //            "时间跨度大于1个月且小于3个月，建议间隔应大于1小时!",
            //        type: 'error'
            //    });
            //    this.timeSlot = ''
            //    this.interval = ''
            //}
            
            
        },
        TimeInterval(id) {
            console.log(id)
            //let usedTime = this.timeSlot[1] - this.timeSlot[0];
            //var arr = id.split(':')
            //var sampleNum = arr[0] * 3600 + arr[1] * 60 + arr[2]
            //console.log(sampleNum)
            //console.log(usedTime)
            //if (usedTime / 3600000 < 24 && sampleNum < 6000 || usedTime / 3600000 > 24 && sampleNum < 60000) {
            //    this.timeSlot = ''
            //    this.interval = '00:30:00'
            //    this.yieldRate = []
            //    this.TrendTime = []
            //    this.tableData = []
            //    this.$alert('时间跨度少于1天，建议间隔应超过1分钟!与时间跨度超过1天且少于1周，建议间隔应超过10分钟!', '趋势区间不正确', {
            //        confirmButtonText: '确定',
                    
            //    });

            //}
        },
        onSelectedDrug(id) {
            let obj = {};
            obj = this.Stations.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.StationID = obj.ID
            console.log(obj.Name)
            this.StationName = obj.Name
            this.StationsData.filter(el => el.Name == obj.Name).map((res) => {
                this.ipAddress = res.IPAddress;
                this.ipPort = res.IPPort;
                if (res.Loops.length == 0) {
                    this.LoopName = ''
                    this.Loops = []
                    this.GroupingType = ''
                    this.groupingdata = []
                    this.TrendTime = []
                } else if (res.Loops.length != 0) {
                    var LoopsData = res.Loops.map((res) => {
                        this.LoopData.push(res)
                        return { Name: res.Name + '(回路)', ID: res.ID }
                    })
                    this.Loops = []
                    this.Loops.push(LoopsData)
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
            console.log(this.StationsData)
            console.log(this.StationName)

            this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
                console.log(res)
                res.Loops.filter(el => el.ID == obj.ID).map((res) => {
                    this.groupingdata = []
                    this.groupingdata.push(res.TrendGroups)
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.groupingdata = fall(this.groupingdata)
                console.log(this.groupingdata)
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
        TimeSelection(id) {
            console.log(this.timeSlot)
            let usedTime = this.timeSlot[1] - this.timeSlot[0]; // 相差的毫秒数
            let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数

            let nowdate = new Date()
            let timeStart = this.timeSlot[0]
            if (this.timeSlot[1].getFullYear() - this.timeSlot[0].getFullYear() == 0) {
                if (nowdate.getMonth() < this.timeSlot[0].getMonth() || nowdate.getMonth() <= this.timeSlot[0].getMonth() && nowdate.getDate() < this.timeSlot[0].getDate()) {
                    this.timeSlot = []
                    this.$message({
                        showClose: true,
                        message: '开始时间不能超过当前时间',
                        type: 'error'
                    });
                } else if (nowdate.getMonth() < this.timeSlot[1].getMonth() || nowdate.getMonth() <= this.timeSlot[1].getMonth() && nowdate.getDate() < this.timeSlot[1].getDate()) {
                    this.timeSlot = [timeStart, nowdate]
                    this.$message({
                        showClose: true,
                        message: '结束时间不能超过当前时间',
                        type: 'error'
                    });
                } else if (nowdate < this.timeSlot[1]) {
                    this.timeSlot = [timeStart, nowdate]
                }
            } else if (this.timeSlot[1].getFullYear() - this.timeSlot[0].getFullYear() != 0) {
                console.log('跨年')
                if (this.timeSlot[1].getFullYear() > nowdate.getFullYear()) {
                    this.timeSlot = [timeStart, nowdate]
                    this.$message({
                        showClose: true,
                        message: '结束时间不能超过当前时间',
                        type: 'error'
                    });
                }
            }
            
        },
        draw() {
            this.myChart.clear();
            this.myChart = echarts.init(document.getElementById("chartLineBox"), 'light');
            var option;
            option = {
                color: ["#FF0000", "#00FF00", "#0000FF", "#EF7E32", "#A2A6A3", "#FED966", "#9E480D", "#987300"],
                grid: [{
                    height: '64vh',
                }],
                tooltip: {
                    trigger: 'axis',
                    formatter: (params) => {
                        this.tableData = params.map((res) => {
                            return {
                                name: res.name,
                                seriesName: res.seriesName,
                                value: res.value,
                                color: res.color,
                            }
                        })

                        let str = params[0].name + "<br />";
                        params.forEach((item) => {
                            str +=
                                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + item.seriesName + " : " + item.value + "<br />";
                        });
                        return str;

                    }
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
                            borderColor: '#64D399',
                        },
                    },
                },
                legend: {
                    data: this.TrendName,
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
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.TrendTime,
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
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 10
                }],
                series: this.yieldRate
            };
            option && this.myChart.setOption(option);
            window.οnresize = this.myChart.resize
           
            this.myChart.on('legendselectchanged', (params) => {
                console.log(this.yieldRate)
                this.tableData = []
                 this.yieldRate.map((res) => {
                    var names = res.name
                     
                    if (params.selected[names])
                    {               
                        var end = res.data[res.data.length - 1]
                        var timeend = this.TrendTime[this.TrendTime.length - 1]
                        var alldata ={
                            name:  timeend,
                            seriesName: res.name,
                            value: end,
                            color: res.color
                        }
                        this.tableData.push(alldata)
                        
                    }
                })
                
                console.log(this.tableData)
            })
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
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
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
        },
        
    }
})