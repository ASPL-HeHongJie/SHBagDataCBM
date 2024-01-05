
var EarlyWarningvm = new Vue({
    el: '#EarlyWarningDetailRecord',
    data: {
        companyName: '', // 公司的文本框内容
        datas: '',  // 公司遍历的内容
        StationName: [], // 场站文本框内容
        Stations: '', // 场站遍历的内容
        LoopName: [], //回路文本框内容
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
        brandName: '',
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
        ealywarningTableData: [{
            status: '流量计运行正常',
            number: 10,
        }, {
            status: '流量计存在预警',
            number: 1,
        }, {
            status: '通讯异常',
            number: 1,
        }],
        ealywarningDetailTableData: [{
            description: '增益(1A)',
            isWarn: 0
        }, {
            description: '增益(1A)',
            isWarn: 0
        }, {
            description: '增益(1A)',
            isWarn: 1
        }, {
            description: '增益(1A)',
            isWarn: 0
        }, {
            description: '增益(1A)',
            isWarn: 0
        }, {
            description: '增益(1A)',
            isWarn: 0
        }, {
            description: '增益(1A)',
            isWarn: 0
        }, {
            description: '增益(1A)',
            isWarn: 0
        }, {
            description: '增益(1A)',
            isWarn: 0
        }
        ],
        timeSlot: "",
        Starttime: '',
        Endtime: '',
        ealywarningRecordTableData: [],
    },
    created() {
        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate]

        if (isArea == 'false') {
            this.companyName = company.Name
            this.datas = [{ Name: company.Name, ID: company.ID }]
            company.Areas.map((res) => {
                var station = res.Stations.map((res) => {
                    this.StationName.push(res.ID)
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.ID, Loops: res.Loops }]
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
                var station = res.Stations.map((res) => {
                    this.StationName.push(res.ID)
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.ID, Loops: res.loops }]
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Stations = fall(station)
                this.StationsData = res.Stations.map((res) => {
                    return res
                })
            })
        }


        this.StationsData.filter(el => this.StationName.includes(el.ID)).map((res) => {
            res.Loops.filter((el) => el.FlowmeterType != 'Turbo').map((res) => {
                this.LoopName.push(res.ID);
            })
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
        Statistics() { 
            if (this.LoopName.length == 0 || this.LoopName == null) {
                this.$message({ showClose: true, message: '回路未选择', type: 'error' });
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
            this.dialogVisible = true;
            var data = {
                loopIDs: this.LoopName,
                BeginDateTime: times[0],
                EndDateTime: times[1]
            }
            var ipaddress = "/api/EarlyWarning/GetEarlyWarningDetailRecordStatistics";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    that.ealywarningRecordTableData = res.data;  
                    that.ealywarningRecordTableData.forEach((item, index) => {
                        item.index = index + 1;
                    });
                    var ealywarningRecord = that.ealywarningRecordTableData.map((rec) => {
                        return { value: rec.number, name: rec.description }
                    })
                    let myChart = echarts.init(document.getElementById("ealywarningRecordStatistics"))
                    // 绘制图表
                    myChart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}"
                        },
                        series: [
                            {
                                name: '报警记录统计',
                                type: 'pie',
                                radius: '50%',
                                data: ealywarningRecord,
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
                }, (err) => {
                    that.ealywarningRecordTableData = []
                    this.dialogVisible = true;
                }
                );
           
          
        },
        Refresh() {
            this.currentPage = 1
            if (this.LoopName.length == 0 || this.LoopName == null) {
                this.$message({ showClose: true, message: '回路未选择', type: 'error' });
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
                loopIDs: this.LoopName,
                BeginDateTime: times[0],
                EndDateTime: times[1]
            }

            var ipaddress = "/api/EarlyWarning/GetEarlyWarningDetailRecords";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.loading = false;
                    that.tableData = res.data;
                }, (err) => {
                    this.loading = false;
                    that.tableData = []
                }
                );
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
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        onSelectedDrug(id) {
            this.LoopName = [];
            this.Loops = [];

            this.StationsData = this.Stations.filter(el => id.includes(el.ID));
            this.StationsData.map((res) => {

                var LoopsData = res.Loops.filter((el) => el.FlowmeterType != 'Turbo').map((res) => {
                    /* console.log(res);*/
                    /* this.LoopData.push(res)*/
                    this.LoopName.push(res.ID);
                    return { Name: res.Name + '(回路)', ID: res.ID, BrandName: res.BrandName }
                })
                //this.Loops.unshift(LoopsData)
                //function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                //this.Loops = fall(this.Loops)
            });
        },
        dateFormat: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return this.formatDate(date);
        },
        formatDate(dateStandard) {

            var date = new Date(dateStandard);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
        }
    }
})
