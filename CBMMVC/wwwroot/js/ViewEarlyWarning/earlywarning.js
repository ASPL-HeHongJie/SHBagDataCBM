
var EarlyWarningvm = new Vue({
    el: '#EarlyWarning',
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
        ealywarningTableData: [],
        ealywarningDetailTableData: [],
        Status: [{
            Name: '存在预警',
            ID: '流量计存在预警'
        }, {
            Name: '运行正常',
            ID: '流量计运行正常'
        }, {
            Name: '通讯失败',
            ID: '获取数据失败，无法预警;'
        }],
        StatusName: [],

    },
    created() {
        this.Status.map((res) => {
            this.StatusName.push(res.ID);
        })
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
        console.log(this.Stations)
        console.log(this.StationsData)
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
            if (this.LoopName.length == 0 || this.LoopName.length == null) {
                this.$message({ showClose: true, message: '回路未选择', type: 'error' });
                return;
            }
            if (this.StatusName.length == 0 || this.StatusName.length == null) {
                this.$message({ showClose: true, message: '状态选择', type: 'error' });
                return;
            }

            this.dialogVisible = true;
            var data = {
                loopIDs: this.LoopName,
                status: this.StatusName,
            }
            var ipaddress = "/api/EarlyWarning/GetEarlyWarningStatistics";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    that.ealywarningTableData = res.data;
                    that.ealywarningTableData.forEach((item, index) => {
                        item.index = index + 1;
                    });
                    var earlywarming = that.ealywarningTableData.map((rec) => {
                        return { value: rec.number, name: rec.status.indexOf("失败") != -1 ? rec.status.substring(0, rec.status.indexOf("失败") + 2) : rec.status.replace("流量计", "") }
                    })
                    let myChart = echarts.init(document.getElementById("earlyStatistics"))
                    // 绘制图表
                    myChart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}"
                        },
                        series: [
                            {
                                name: '报警统计',
                                type: 'pie',
                                radius: '50%',
                                data: earlywarming,
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
                    that.ealywarningTableData = []
                    this.dialogVisible = true;
                }
                );

        },
        handleElarywarningDetailClick(row) {
            var data = {
                loopID: row.loopID,
            }
            var ipaddress = "/api/EarlyWarning/GetEarlyWarningDetail";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    that.ealywarningDetailTableData = res.data;
                }, (err) => {
                    that.ealywarningDetailTableData = []
                }
                );
            this.earlywarningdialogVisible = true;
        },
        Refresh() {
            this.currentPage = 1
            if (this.LoopName.length == 0 || this.LoopName.length == null) {
                this.$message({ showClose: true, message: '回路未选择', type: 'error' });
                return;
            }
            if (this.StatusName.length == 0 || this.StatusName.length == null) {
                this.$message({ showClose: true, message: '状态选择', type: 'error' });
                return;
            }

            this.loading = true;
            var data = {
                loopIDs: this.LoopName,
                status: this.StatusName,
            }
            var ipaddress = "/api/EarlyWarning/GetEarlyWarning";
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
