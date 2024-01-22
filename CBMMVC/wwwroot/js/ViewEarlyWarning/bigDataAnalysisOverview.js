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
        echBarBranch: null,
        drawer: false,
        direction: 'rtl',
        form: {
            staTime: '',
            endTime: '',
            companyIDs: []
        },
        echBarBranchHisIntactRate: null,
        EquipmentAvalability: []
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
                    that.EquipmentAvalability = res.data.EquipmentAvalability;
                    that.getChartEarly(res.data.EarlyWarningNotificationRateBrandStatistics)
                    that.getChartStatistics(res.data.SolutionNotificationRateBrandStatistics);
                    //that.getChartPieSta(res.data.RealTimeAlarmStatistics);
                    that.getChartBarBranchHisIntactRate(res.data.EquipmentAvalability);
                    that.getIsEarlyWarn();
                }, (err) => {
                    this.loading = false;
                }
            );
        },
        getChartBarBranch(chartdata,typeName) {
            var chartsCompanies = [];
            var chartNumbers = [];
            let dataarr = [];
             chartdata.forEach(item => {
                const parent = dataarr.find(c => c.companyName === item.companyName)
                if (parent) {
                    parent.number.push(1);
                } else {
                    const obj = {
                        companyName: item.companyName,
                        number: [1]
                    }
                    dataarr.push(obj)
                }
             })
            dataarr.forEach(item => {
                chartsCompanies.push(item.companyName);
                chartNumbers.push(item.number.length);
            })
            //let dataarr = [];
            //chartdata.forEach(item => {
            //    const parent = dataarr.find(c => c.companyName === item.companyName)
            //    if (parent) {
            //        parent.number.push(item.statusNumber)
            //    } else {
            //        const obj = {
            //            companyName: item.companyName,
            //            number: [item.statusNumber]
            //        }
            //        dataarr.push(obj)
            //    }
            //})
            //dataarr.forEach(item => {
            //    let total = 0;
            //    item.number.forEach(num => total += num);
            //    chartsCompanies.push(item.companyName);
            //    chartNumbers.push(total);
            //})

            this.echBarBranch = echarts.init(document.getElementById("echBarBranch"));
            const option = {
                title: {
                    text: '分公司',
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
                    right: '10%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#2AFFFF'
                    }
                }],
                yAxis: [{
                    type: 'category',
                    axisLabel: {
                        color: '#2AFFFF'
                    },
                    data: chartsCompanies
                }],
                series: [{
                    name: typeName,
                    type: 'bar',
                    label: {
                        show: true,
                        position: ['103%', '0%'],
                        color: '#707070',
                        backgroundColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
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
                            x2: 1,
                            y2: 0,
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
                    data: chartNumbers
                },]
            };
            this.echBarBranch.setOption(option);
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
        getChartBarBranchHisIntactRate(chartdata) {
            var chartsCompanies = [];
            var chartsRates = [];
            chartdata.map((res) => {
                chartsCompanies.push(res.company.replace('输气分公司', ''));
                chartsRates.push(res.rate);
            })
            this.echBarBranchHisIntactRate = echarts.init(document.getElementById("echBarBranchHisIntactRate"));
            const option = {
                title: {
                    text: '分公司',
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
                    right: '10%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#2AFFFF'
                    }
                }],
                yAxis: [{
                    type: 'category',
                    axisLabel: {
                        color: '#2AFFFF'
                    },
                    data: chartsCompanies
                }],
                series: [{
                    name: '数量',
                    type: 'bar',
                    label: {
                        show: true,
                        position: ['103%','0%'],
                        color: '#FFF',
                        backgroundColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(102, 125, 182, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(5, 117, 230, 1)',
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
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(102, 125, 182, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(5, 117, 230, 1)',
                                },
                            ],
                        },
                    },
                    data: chartsRates
                },]
            };
            this.echBarBranchHisIntactRate.setOption(option);
        },
        getIsEarlyWarn() {
            let that = this;
            var chartEarlyWarning = [];
            chartEarlyWarning = that.EarlyWarnings.filter(item => item.status == '存在预警');
            that.getChartBarBranch(chartEarlyWarning,'预警数量');
        },
        getIsCommunicationBad() {
            let that = this; 
            var chartEarlyWarning = [];
            chartEarlyWarning = that.EarlyWarnings.filter(item => item.status == '通讯失败');
            that.getChartBarBranch(chartEarlyWarning, '故障数量');
        },
        getIsNormal() {
            let that = this;
            var chartEarlyWarning = [];
            chartEarlyWarning = that.EarlyWarnings.filter(item => item.status == '运行正常');
            that.getChartBarBranch(chartEarlyWarning, '正常数量');
        }
    }
})
