var BigDataAnalysisOverviewvm = new Vue({
    el: '#BigDataAnalysisOverview',
    data: {
        loading: false,
        EarlyWarnings:[],
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
            endTime: ''
        }
    },
    created() {
        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000 * 7).toLocaleDateString()); // 前一天时间00:00:00
        this.form.staTime = preDate;
        this.form.endTime = myDate;
        this.Refresh();
    },
    mounted() {
        //this.getChartEarly();
        this.getChartStatistics();
        this.getChartPieSta();
        this.getChartEquAva();
    },
    methods: {
        Refresh() {
            this.loading = true;
            var data = {
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
                    that.IsEarlyWarningNumber = res.data.EarlyWarningStatistics.EarlyWarningNumber;
                    that.IsCommunicationBadNumber = res.data.EarlyWarningStatistics.CommunicationBadNumber;
                    that.IsNormalNumber = res.data.EarlyWarningStatistics.NormalNumber;
                    that.EarlyWarnings = res.data.EarlyWarnings;
                    that.getChartEarly(res.data.EarlyWarningNotificationRateBrandStatistics)

                       
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
                        fontSize: 14
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
        getChartStatistics() {
            this.chartsStatistics = echarts.init(document.getElementById("echStat"));
            const option = {
                title: {
                    text: '统计',
                    textStyle: {
                        color: '#2AFFFF',
                        fontSize: 14
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
                    data: ['指定量', '完成量', '计划量', '单日指标']
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
                    data: [20, 30, 10, 30]
                },]
            };
            this.chartsStatistics.setOption(option);
        },
        getChartPieSta() {
            this.chartsPieStatistics = echarts.init(document.getElementById("echPieStat"));
            const option = {
                title: {
                    text: 'Referer of a Website',
                    subtext: 'Fake Data',
                    textStyle: {
                        color: '#2AFFFF'
                    },
                    subtextStyle: {
                        color: '#2AFEDE'
                    },
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
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [{
                        value: 1048,
                        name: 'Search Engine'
                    },
                    {
                        value: 735,
                        name: 'Direct'
                    },
                    {
                        value: 580,
                        name: 'Email'
                    },
                    {
                        value: 484,
                        name: 'Union Ads'
                    },
                    {
                        value: 300,
                        name: 'Video Ads'
                    }
                    ],
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
        getChartEquAva() {
            this.chartsEquAva = echarts.init(document.getElementById("echPieEquAva"));
            const option = {
                title: {
                    text: '设备完好率',
                    textStyle: {
                        color: '#2AFFFF',
                        fontSize: 14
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
                    data: ['指定量', '完成量', '计划量', '单日指标']
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
                    data: [20, 30, 10, 30]
                },]
            };
            this.chartsEquAva.setOption(option);
        }
    }
})
