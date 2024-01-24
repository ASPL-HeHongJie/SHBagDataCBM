
var EarlyWarningDetailRecordStatisticsvm = new Vue({
    el: '#EarlyWarningDetailRecordStatistics',
    data: {
        companyName: [], // 公司的文本框内容
        datas: [],  // 公司遍历的内容
        StationName: '', // 场站文本框内容
        Stations: '', // 场站遍历的内容
        LoopName: '', //回路文本框内容
        Loops: [], // 回路遍历的内容
        StationsData: [],
        LoopData: [],
        EquipmentData: [],
        StationVal: '',
        LoopsID: '',
        tableData: [],
        ipPort: '',
        ipAddress: '',
        loading: false,
        dialogVisible: false,
        earlywarningdialogVisible: false,
        currentPage: 1,
        pagesize: 25,
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
        timeSlot: [],
        Starttime: '',
        Endtime: '',
        Brands: [{
            Name: 'Daniel',
            ID: 'Daniel'
        }, {
            Name: 'Elster',
            ID: 'Elster'
        }, {
            Name: 'Weise',
            ID: 'Weise'
        }, {
            Name: 'Sick',
            ID: 'Sick'
        }],
        ealywarningRecordDurationStatisticsTableData: [{
            description: '对称性',
            number: 435,
        }, {
            description: '增益(2B)',
            number: 135,
        }, {
            description: '增益(1B)',
            number: 356,
        }, {
            description: '剖面系数',
            number: 224,
        }, {
            description: '漩涡角',
            number: 435,
        }, {
            description: '交叉流',
            number: 135,
        }, {
            description: '性能',
            number: 224,
        }, {
            description: '声速偏差率',
            number: 356,
        }],
        BrandName: '',
    },
    created() {
        function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
        this.datas = fall(companies.map((res) => { return [{ Name: res.Name, ID: res.ID }] }))

        this.companyName.push(company.ID);

        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate]

        this.BrandName = 'Daniel';

        this.Refresh();
    },
    methods: {
        handleSizeChange: function (val) {
            this.pagesize = val;
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
        },
        TimeSelection(id) {
            let usedTime = this.timeSlot[1] - this.timeSlot[0]; // 相差的毫秒数
            let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
            let nowdate = new Date()
            let timeStart = this.timeSlot[0]
            if (nowdate < this.timeSlot[1]) {
                this.timeSlot = [timeStart, nowdate]
            }
        },
        Refresh() {
            if (this.companyName.length == 0) {
                this.$message({ showClose: true, message: '请选择输气分公司', type: 'error' });
                return;
            }
            if (this.timeSlot == '' || this.timeSlot == null) {
                this.$message({ showClose: true, message: '日期间隔未选择', type: 'error' });
                return;
            }
            var times = this.timeSlot.map((res) => {
                var Y = res.getFullYear() + '-';
                var M = (res.getMonth() + 1 < 10 ? '0' + (res.getMonth() + 1) : res.getMonth() + 1) + '-';
                var D = res.getDate() + ' ';
                var h = res.getHours() + ':';
                var m = res.getMinutes() + ':';
                var s = res.getSeconds();
                return Y + M + D + h + m + s
            })
            this.loading = true;
            var data = {
                CompanyIDs: this.companyName,
                Brand: this.BrandName,
                BeginDateTime: times[0],
                EndDateTime: times[1]
            }

            var ipaddress = "/api/EarlyWarning/GetEarlyWarningDetailRecordByBrandStatistics";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.loading = false;
                    var colorData = ['#09c8f1', '#7dcfe0', '#6497a2', '#a57923', '#b07a0f', '#755923', '#a4ec89', '#7b7974', '#2b1bc2', '#06f230', '#5fb53e', '#292173', '#33a347', '#20da41', '#e4ece1', '#06f230', '#e41111', '#e74848']
                    that.tableData = res.data.TableData;
                    var durationStatistics = res.data.statisticsByDescription.map((rec, recIndex) => {
                        return {
                            value: rec.duration.totalHours, name: rec.description, itemStyle: { color: colorData[recIndex] }
                        }
                    })
                    let myChart = echarts.init(document.getElementById("ealywarningRecordDurationStatistics"))
                    // 绘制图表
                    myChart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}"
                        },
                        title: {
                            text: '按预警参数统计',
                            textStyle: {
                                color: '#fff',
                                fontSize: 15
                            },
                            left: 'center'
                        },
                        series: [
                            {
                                name: '参数预警时长统计',
                                type: 'pie',
                                radius: '50%',
                                data: durationStatistics,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    })

                    var byCompanydurationStatistics = res.data.statisticsByCompany.map((rec, recIndex) => {
                        return { value: rec.duration.totalHours, name: rec.companyName, itemStyle: { color: colorData[recIndex] } }
                    })

                    let ByCompanymyChart = echarts.init(document.getElementById("ealywarningRecordByCompanyDurationStatistics"))
                    // 绘制图表
                    ByCompanymyChart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}"
                        },
                        title: {
                            text: '按分公司统计',
                            textStyle: {
                                color: '#fff',
                                fontSize: 15
                            },
                            left: 'center'
                        },
                        series: [
                            {
                                name: '参数预警时长统计',
                                type: 'pie',
                                radius: '50%',
                                data: byCompanydurationStatistics,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    })

                    var numberStatisticsChart = echarts.init(document.getElementById('ealywarningRecordNumberStatistics'))
                    let xData = []
                    let staNumData = []
                    let seriesData = []
                    xData = res.data.descriotions
                    staNumData = res.data.statisticsByNumber

                    staNumData.map((item, index) => {
                        seriesData.push({
                            name: item.company,
                            type: 'bar',
                            label: {
                                show: true,
                                /* rotate: 90,*/
                                formatter: '{c}',
                            },
                            itemStyle: { color: colorData[index] },
                            barGap: 0,
                            emphasis: {
                                focus: 'series'
                            },
                            data: item.descriotionNumber
                        })
                    })
                    numberStatisticsChart.setOption({
                        legend: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: { show: false },
                                axisLine: {
                                    show: false
                                },
                                axisLabel: {
                                    color: '#fff'
                                },
                                data: xData
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: { show: false },
                                axisLabel: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                            }
                        ],
                        series: seriesData

                    })
                }, (err) => {
                    this.loading = false;
                    that.tableData = []
                });
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
    }
})


