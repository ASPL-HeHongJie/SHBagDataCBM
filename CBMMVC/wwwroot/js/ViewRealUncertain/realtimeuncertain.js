
var FRCheckReportvm = new Vue({
    el: '#RedltimeUncertain',
    data: {
        datas: [],//所有数据
        companyName: '',
        stationName: '',
        loopName: '',
        stationsList: [],
        Areas: [],
        loops: [],
        detailsData: {},
        isRefresh: false,
        ipPort: '',
        ipAddress: '',
        cordon: {},
        Echadata: [],
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
    },
    created() {
        if (isArea == 'false') {
            this.datas = companys;
            this.companyName = this.datas[0].ID;
            this.Areas = this.datas[0].Areas;
            this.stationsList = this.Areas.map(e => {
                return e.Stations;
            })

        } else if (isArea == 'true') {
            this.OperationAreas = areas;
            this.areaName = this.OperationAreas[0].ID;
            this.stationsList = this.OperationAreas.map(e => {
                return e.Stations;
            })

        }
        // 得到的是二维数组,需处理成一维数组
        function flatten(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x)) }
        var stas = flatten(this.stationsList);
        this.stationsList = stas;
        this.stationName = this.stationsList[0].ID;
        this.ipPort = this.stationsList[0].IPPort;
        this.ipAddress = this.stationsList[0].IPAddress;
        // 获取回路信息
        this.loops = this.stationsList[0].Loops.filter(e => e.FlowmeterType !== "Turbo");
        this.loopName = this.stationsList[0].Loops[0].ID;
    },
    mounted() {
        this.$nextTick(function () {
            this.getTableChart();
        });
    },
    methods: {
        getTableChart() {
            var TableChart = echarts.init(document.getElementById('chart'))
            TableChart.clear();
            TableChart.setOption({
                // 这是整个图表烦人配置内容
                grid: {
                    show: true, // 显示
                    left: '3%',
                    top: '10%',
                    width: '90%',
                    height: '80%'
                },
                // 这是x轴的配置内容
                xAxis: {
                    type: 'category',
                    data: ['质量流量', '标况流量', '压力', '温度', '在线密度/相对密度', '标况密度', '在用高热值'],
                    axisLine: {  //这是x轴文字颜色
                        lineStyle: {
                            color: "#fff",
                        }
                    },
                    axisTick: {
                        show: true,  //是否显示网状线 默认为true
                        alignWithLabel: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(0, 0, 0,.1)',
                        }
                    }
                },
                // 这是y轴的配置内容
                yAxis: {
                    //min: 0,
                    //max: 1.0,
                    //interval: 0.1,
                    type: 'value',
                    splitNumber: 6,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#fff",
                            width: 1,
                        }
                    },
                    axisTick: {
                        show: true,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(0, 0, 0,.1)',
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: [
                                "#6A9ABC", "#6E9EC2"
                            ]
                        }
                    }
                },
                // 数据渲染时的配置
                series: [{
                    data: this.Echadata,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    },
                    itemStyle: {
                        color: '#a90000'
                    },
                    markLine: this.cordon,
                }]
            })

        },
        handleStationChange(id) {
            var station = this.stationsList.find(e => e.ID === id);
            this.ipPort = station.IPPort;
            this.ipAddress = station.IPAddress;
            this.loops = this.stationsList.find(e => e.ID === id).Loops;
            this.loops = this.loops.filter(e => e.FlowmeterType !== "Turbo");
            if (this.loops.length != 0) {
                this.loopName = this.loops[0].ID;
            } else {
                this.loopName = ''
                this.$message({ showClose: true, message: '此场站全为涡轮流量计!', type: 'error' });
            }
        },
        Refresh() {
            this.cordon = {}

            if (this.loopName == '') {
                this.$message({ showClose: true, message: '回路不可为空!', type: 'error' });
            } else {
                var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/CheckData/GetLoopUncertain";
                var that = this;
                axios.post(
                    ipaddress,
                    JSON.stringify(JSON.stringify(this.loopName)),
                    { headers: { 'Content-Type': 'application/json' } },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {

                        console.log(res)
                        for (var val in res.data) {
                            if (res.data.checkDataStatus == '正常' && res.data[val] == null)
                                res.data[val] = "N/A"
                        }
                        this.detailsData = res.data
                        if (res.data.checkDataStatus == '正常') {


                            this.Echadata = [this.detailsData.massFlowrateUncertain, this.detailsData.standardFlowrateUncertain, this.detailsData.pressureUncertain, this.detailsData.temperatureUncertain, this.detailsData.densityUncertain, this.detailsData.standardDensityUncertain, this.detailsData.calorificValueUncertain]
                            this.isRefresh = true;

                            this.getTableChart()
                            if (this.detailsData.checkDataStatus == "正常") {
                                var arr = [this.detailsData.massFlowrateUncertain, this.detailsData.standardFlowrateUncertain, this.detailsData.pressureUncertain, this.detailsData.temperatureUncertain, this.detailsData.densityUncertain, this.detailsData.standardDensityUncertain, this.detailsData.calorificValueUncertain]

                                var ind = arr.indexOf('N/A')
                                console.log(ind)
                                if (ind == -1) {
                                    console.log(arr)
                                    if (Math.max(...arr) > 1 || Math.max(...arr) == 1) {
                                        this.cordon = {
                                            symbol: "none",
                                            data: [{
                                                silent: false,
                                                lineStyle: {
                                                    type: "solid",
                                                    color: "red",
                                                    width: 3,
                                                },
                                                label: {
                                                    //position:'end',
                                                    formatter: "警戒值(1)",
                                                    color: '#fff',
                                                    fontSize: 18
                                                },
                                                yAxis: 1
                                            },
                                            ]
                                        }
                                    } else if (Math.max(...arr) < 1) {
                                        this.cordon = {}
                                    }
                                } else {
                                    var arrSpl = arr.splice(ind, 1)
                                    console.log(arr)
                                    if (Math.max(...arr) > 1 || Math.max(...arr) == 1) {
                                        this.cordon = {
                                            symbol: "none",
                                            data: [{
                                                silent: false,
                                                lineStyle: {
                                                    type: "solid",
                                                    color: "red",
                                                    width: 3,
                                                },
                                                label: {
                                                    //position:'end',
                                                    formatter: "警戒值(1)",
                                                    color: '#fff',
                                                    fontSize: 18
                                                },
                                                yAxis: 1
                                            },
                                            ]
                                        }
                                    } else if (Math.max(...arr) < 1) {
                                        this.cordon = {}
                                    }
                                }



                            }
                            this.getTableChart()
                        } else {
                            this.Echadata = []
                            this.cordon = {}
                            this.getTableChart()
                        }


                    }, (err) => {
                        this.$message({ showClose: true, message: '请求数据失败', type: 'error' });
                        this.detailsData = {};
                    }
                    );
            }

        }
    }
})
