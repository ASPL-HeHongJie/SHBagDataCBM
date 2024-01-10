var BigDataAnalysisOverviewvm = new Vue({
    el: '#BigDataAnalysisOverview',
    data: {
        datas: [],  // 公司遍历的内容
        loading: false,
        EarlyWarnings: [],
        IsEarlyWarningNumber: 0,
        IsCommunicationBadNumber: 0,
        IsNormalNumber: 0,
        chartsEarly: null,
        chartsStatistics: null,
        chartsPieStatistics: null,
        chartsEquAva: null,
        drawer: false,
        direction: 'rtl',
        form: {
            staTime: '',
            endTime: '',
            companyIDs: []
        }
    },
    created() {
        function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
        this.datas = fall(companies.map((res) => { return [{ Name: res.Name, ID: res.ID }] }))
        this.datas.map((res) => {
            this.form.companyIDs.push(res.ID);
        })
        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000 * 7).toLocaleDateString()); // 前一天时间00:00:00
        this.form.staTime = preDate;
        this.form.endTime = myDate;

        this.loading = true;
        this.Refresh();
        if (this.intervalId != null) {
            return;
        }
        ////计时器为空，操作
        this.intervalId = setInterval(() => {
            var myDate = new Date();  // 当前时间
            var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000 * 7).toLocaleDateString()); // 前一天时间00:00:00
            this.form.staTime = preDate;
            this.form.endTime = myDate;
            this.datas.map((res) => {
                this.form.companyIDs.push(res.ID);
            })
            this.Refresh();

        }, 5 * 60 * 1000);
    },
    methods: {
        Refresh() {

            var data = {
                CompanyIDs: this.form.companyIDs,
                BeginDateTime: this.form.staTime,
                EndDateTime: this.form.endTime,
            }
            var ipaddress = "/api/EarlyWarning/BigDataAnalysisOverview";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.loading = false;
                    console.log(res.data);
                    that.IsEarlyWarningNumber = res.data.EarlyWarningStatistics.EarlyWarningNumber;
                    that.IsCommunicationBadNumber = res.data.EarlyWarningStatistics.CommunicationBadNumber;
                    that.IsNormalNumber = res.data.EarlyWarningStatistics.NormalNumber;
                    that.EarlyWarnings = res.data.EarlyWarnings;
                    that.getChartEarly(res.data.EarlyWarningNotificationRateBrandStatistics)
                    that.getChartStatistics(res.data.SolutionNotificationRateBrandStatistics);
                    that.getChartPieSta(res.data.RealTimeAlarmStatistics);
                    that.getChartEquAva(res.data.EquipmentAvalability);
                }, (err) => {
                    this.loading = false;
                }
                );
        },
        getChartEarly(chartdata) {
            console.log(chartdata);
            var chartsBrands = [];
            var chartsRates = [];
            chartdata.map((res) => {
                chartsBrands.push(res.brandName);
                chartsRates.push(res.notificationRate);
            })

            this.chartsEarly = echarts.init(document.getElementById("echEarly"));
            const option = {
                title: {
                    text: '预警告知率',
                    textStyle: {
                        color: '#2AFFFF',
                        fontSize: 15
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '12%',
                    left: '3%',
                    right: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        color: '#2AFFFF'
                    },
                    data: chartsBrands
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#2AFFFF'
                    }
                }],
                series: [{
                    name: '',
                    type: 'bar',
                    stack: 'Ad',
                    barWidth: '30%',
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#707070',
                        backgroundColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(131, 164, 212, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(182, 251, 255, 1)',
                                },
                            ],
                        },
                        padding: 5,
                        borderRadius: 6
                    },
                    itemStyle: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(131, 164, 212, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(182, 251, 255, 1)',
                                },
                            ],
                        },
                    },
                    data: chartsRates
                },]
            };
            this.chartsEarly.setOption(option);
        },
        getChartStatistics(chartdata) {
            var chartsBrands = [];
            var chartsRates = [];
            chartdata.map((res) => {
                chartsBrands.push(res.description);
                chartsRates.push(res.accuracy);
            })

            this.chartsStatistics = echarts.init(document.getElementById("echStat"));
            const option = {
                title: {
                    text: '建议告知率',
                    textStyle: {
                        color: '#2AFFFF',
                        fontSize: 15
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '12%',
                    left: '3%',
                    right: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        color: '#2AFFFF'
                    },
                    data: chartsBrands
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#2AFFFF'
                    }
                }],
                series: [{
                    name: '',
                    type: 'bar',
                    stack: 'Ad',
                    barWidth: '30%',
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#FFF',
                        backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(102, 125, 182, 1)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(5, 117, 230, 1)',
                        },
                        ]),
                        padding: 5,
                        borderRadius: 6
                    },
                    itemStyle: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(102, 125, 182, 1)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(5, 117, 230, 1)',
                        },
                        ]),
                    },
                    data: chartsRates
                },]
            };
            this.chartsStatistics.setOption(option);
        },
        getChartPieSta(chartdata) {
            var data = chartdata.map((rec) => {
                return { value: rec.count, name: rec.alarmArea }
            })
            this.chartsPieStatistics = echarts.init(document.getElementById("echPieStat"));
            const option = {
                title: {
                    text: '实时报警统计',
                    textStyle: {
                        color: '#2AFFFF',
                        fontSize: 15
                    }
                }, 
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: 'bottom',
                    textStyle: {
                        color: '#2AFFFF'
                    }
                },
                series: [{
                    name: '报警数量',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }
            this.chartsPieStatistics.setOption(option);
        },
        getChartEquAva(chartdata) {
            var chartsCompanies = [];
            var chartsRates = [];
            chartdata.map((res) => {
                chartsCompanies.push(res.company);
                chartsRates.push(res.rate);
            })
            this.chartsEquAva = echarts.init(document.getElementById("echPieEquAva"));
            const option = {
                title: {
                    text: '完好率',
                    textStyle: {
                        color: '#2AFFFF',
                        fontSize: 15
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '12%',
                    left: '3%',
                    right: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        color: '#2AFFFF'
                    },
                    data: chartsCompanies
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#2AFFFF'
                    }
                }],
                series: [{
                    name: '',
                    type: 'bar',
                    stack: 'Ad',
                    barWidth: '30%',
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#707070',
                        backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(179, 255, 171, 1)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(18, 255, 247, 1)',
                        },
                        ]),
                        padding: 5,
                        borderRadius: 6
                    },
                    itemStyle: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(179, 255, 171, 1)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(18, 255, 247, 1)',
                        },
                        ]),
                    },
                    data: chartsRates
                },]
            };
            this.chartsEquAva.setOption(option);
        }
    }
})
