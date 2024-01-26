var BigDataAnalysisOverviewvm = new Vue({
    el: '#NotificationRateOverview',
    data: {
        datas: [],  // 公司遍历的内容
        loading: false,
        chartsEarly: null,
        chartsStatistics: null,
        chartsEarlyByCompany: null,
        chartsStatisticsByCompany: null,
        chartsEarlyByCaliber: null,
        chartsStatisticsByCaliber: null,
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
            var ipaddress = "/api/EarlyWarning/NotificationRateOverview";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.loading = false;
                    that.getChartEarly(res.data.EarlyWarningNotificationRateBrandStatistics)
                    that.getChartStatistics(res.data.SolutionNotificationRateBrandStatistics);
                    that.getChartEarlyByCompany(res.data.EarlyWarningNotificationRateCompanyStatistics)
                    that.getChartStatisticsByCompany(res.data.SolutionNotificationRateCompanyStatistics);
                    that.getChartEarlyByCaliber(res.data.EarlyWarningNotificationRateCaliberStatistics)
                    that.getChartStatisticsByCaliber(res.data.SolutionNotificationRateCaliberStatistics);
                }, (err) => {
                    this.loading = false;
                });
        },
        getChartEarly(chartdata) {
            var chartsBrands = [];
            var chartsRates = [];
            chartdata.map((res) => {
                chartsBrands.push(res.brandName);
                chartsRates.push(res.notificationRate.toFixed(2));
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
                chartsRates.push(res.accuracy.toFixed(2));
            })

            this.chartsStatistics = echarts.init(document.getElementById("echStat"));
            const option = {
                title: {
                    text: '维护建议统计',
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
        getChartEarlyByCompany(chartdata) {
            let chartsCompanys = [];
            let chartsRates = [];
            chartdata.map((res) => {
                chartsCompanys.push(res.companyName.replace("输气分公司",""));
                chartsRates.push(res.notificationRate.toFixed(2));
            })

            this.chartsEarlyByCompany = echarts.init(document.getElementById("echEarlyByCompany"));
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
                    data: chartsCompanys
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
            this.chartsEarlyByCompany.setOption(option);
        },
        getChartStatisticsByCompany(chartdata) {
            let chartsCompanys = [];
            let chartsRates = [];
            chartdata.map((res) => {
                chartsCompanys.push(res.description.replace("输气分公司", ""));
                chartsRates.push(res.accuracy.toFixed(2));
            })

            this.chartsStatisticsByCompany = echarts.init(document.getElementById("echStatByCompany"));
            const option = {
                title: {
                    text: '维护建议统计',
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
                    data: chartsCompanys
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
            this.chartsStatisticsByCompany.setOption(option);
        },
        getChartEarlyByCaliber(chartdata) {
            var byCaliberEarly = chartdata.map((rec) => {
                return { value: rec.notificationRate.toFixed(2), name: rec.caliber }
            })

            this.chartsEarlyByCaliber = echarts.init(document.getElementById("echEarlyByCaliber"));
            const option = {
                title: {
                    text: '预警告知率',
                    textStyle: {
                        color: '#2AFFFF',
                        fontSize: 15
                    }
                },
                tooltip: {
                    trigger: 'item',
                    //formatter: "{a} <br/>{b}"
                },
                series: [
                    {
                        name: '预警告知率',
                        type: 'pie',
                        radius: '60%',
                        data: byCaliberEarly,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.chartsEarlyByCaliber.setOption(option);
        },
        getChartStatisticsByCaliber(chartdata) {
            var byCaliberStatistics = chartdata.map((rec) => {
                return { value: rec.accuracy.toFixed(2), name: rec.description }
            })

            this.chartsStatisticsByCaliber = echarts.init(document.getElementById("echStatByCaliber"));
            const option = {
                title: {
                    text: '维护建议统计',
                    textStyle: {
                        color: '#2AFFFF',
                        fontSize: 15
                    }
                },
                tooltip: {
                    trigger: 'item',
                    //formatter: "{a} <br/>{b}"
                },
                series: [
                    {
                        name: '维护建议统计',
                        type: 'pie',
                        radius: '60%',
                        data: byCaliberStatistics,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.chartsStatisticsByCaliber.setOption(option);
        }
    }
})
