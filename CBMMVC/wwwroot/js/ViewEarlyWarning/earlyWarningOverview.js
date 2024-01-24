var BigDataAnalysisOverviewvm = new Vue({
    el: '#EarlyWarningOverview',
    data: {
        datas: [],  // 公司遍历的内容
        loading: false,
        EarlyWarnings: [],
        AllEarlyWarnings: [],
        IsEarlyWarningNumber: 0,
        IsCommunicationBadNumber: 0,
        IsNormalNumber: 0,
        chartsEarly: null,
        chartsStatistics: null,
        chartsPieStatistics: null,
        echBarBranch: null,
        echBarBranchByCaliber: null,
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

            //var data = {
            //    CompanyIDs: this.form.companyIDs,
            //    BeginDateTime: this.form.staTime,
            //    EndDateTime: this.form.endTime,
            //}
            var ipaddress = "/api/EarlyWarning/GetEarlyWarningByOverview";
            //data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                null,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.loading = false;
                    console.log(res.data);
                    that.IsEarlyWarningNumber = res.data.EarlyWarningStatistics.EarlyWarningNumber;
                    that.IsCommunicationBadNumber = res.data.EarlyWarningStatistics.CommunicationBadNumber;
                    that.IsNormalNumber = res.data.EarlyWarningStatistics.NormalNumber;
                    that.AllEarlyWarnings = res.data.EarlyWarnings;
                    that.EquipmentAvalability = res.data.EquipmentAvalability;
                    that.getIsEarlyWarn();
                }, (err) => {
                    this.loading = false;
                }
                );
        },
        getChartBarBranch(chartdata, typeName) {
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
                chartsCompanies.push(item.companyName.replace("输气分公司", ""));
                chartNumbers.push(item.number.length);
            })

            this.echBarBranch = echarts.init(document.getElementById("EarlyByCompany"));
            const option = {
                title: {
                    text: '按分公司统计',
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
                    show: false,
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#2AFFFF'
                    }
                }],
                yAxis: [{
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#2AFFFF'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
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
                        barBorderRadius: [0, 5, 5, 0],
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
        getChartBarBranchByCaliber(chartdata, typeName) {
            var chartsCalibers = [];
            var chartNumbers = [];
            let dataarr = [];
            chartdata.forEach(item => {
                const parent = dataarr.find(c => c.caliber === item.caliber)
                if (parent) {
                    parent.number.push(1);
                } else {
                    const obj = {
                        caliber: item.caliber,
                        number: [1]
                    }
                    dataarr.push(obj)
                }
            })
            dataarr.forEach(item => {
                chartsCalibers.push(item.caliber);
                chartNumbers.push(item.number.length);
            })

            this.echBarBranchByCaliber = echarts.init(document.getElementById("EarlyByCaliber"));
            const option = {
                title: {
                    text: '按分口径统计',
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
                    show: false,
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#2AFFFF'
                    }
                }],
                yAxis: [{
                    type: 'category',
                    axisLabel: {
                        color: '#2AFFFF'
                    },
                    data: chartsCalibers
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
                        barBorderRadius: [0, 5, 5, 0],
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
            this.echBarBranchByCaliber.setOption(option);
        },
        getIsEarlyWarn() {

            var chartEarlyWarning = [];
            chartEarlyWarning = this.AllEarlyWarnings.filter(item => item.status == '存在预警');
            this.EarlyWarnings = chartEarlyWarning;
            this.getChartBarBranch(chartEarlyWarning, '预警数量');
            this.getChartBarBranchByCaliber(chartEarlyWarning, '预警数量');
            
        },
        getIsCommunicationBad() {

            var chartEarlyWarning = [];
            chartEarlyWarning = this.AllEarlyWarnings.filter(item => item.status == '通讯失败');
            this.EarlyWarnings = chartEarlyWarning;
            this.getChartBarBranch(chartEarlyWarning, '故障数量');
            this.getChartBarBranchByCaliber(chartEarlyWarning, '故障数量');
        },
        getIsNormal() {
            var chartEarlyWarning = [];
            chartEarlyWarning = this.AllEarlyWarnings.filter(item => item.status == '运行正常');
            this.EarlyWarnings = chartEarlyWarning;
            this.getChartBarBranch(chartEarlyWarning, '正常数量');
            this.getChartBarBranchByCaliber(chartEarlyWarning, '正常数量');
        }
    }
})
