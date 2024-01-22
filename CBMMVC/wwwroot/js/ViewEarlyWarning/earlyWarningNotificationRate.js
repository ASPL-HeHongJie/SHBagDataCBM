
var EarlyWarningNotificationRatevm = new Vue({
    el: '#EarlyWarningNotificationRate',
    data: {
        companyName: [], // 公司的文本框内容
        datas: '',  // 公司遍历的内容
        StationName: '', // 场站文本框内容
        Stations: '', // 场站遍历的内容
        LoopName: '', //回路文本框内容
        Loops: [], // 回路遍历的内容
        StationsData: [],
        LoopData: [],
        EquipmentData: [],
        StationVal: '',
        LoopsID: '',
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
        timeSlot: "",
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
        BrandName: [],
        notificationRateTableData: [],
        tableData: [],
        notificationRateStatisticsChart: ''
    },
    created() {
        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000 * 3).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate]

        this.Brands.map((res) => {
            this.BrandName.push(res.Name);
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
        Refresh() {

            if (this.BrandName.length == 0) {
                this.$message({ showClose: true, message: '请选择品牌', type: 'error' });
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
                Brands: this.BrandName,
                BeginDateTime: times[0],
                EndDateTime: times[1]
            }
            var ipaddress = "/api/EarlyWarning/GetEarlyWarningNotificationRate";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.loading = false;
                    that.tableData = res.data.NotificationRate;
                    that.notificationRateTableData = res.data.notificationRateBrandStatistics;
                    /*var brands =that.notificationRateTableData.fo;*/
                    var chartsBrands = [];
                    var chartsRates = [];
                    that.notificationRateTableData.map((res) => {
                        chartsBrands.push(res.brandName);
                        chartsRates.push(res.notificationRate);
                    })
                    this.notificationRateStatisticsChart = echarts.init(document.getElementById('notificationRateStatistics'))
                    this.notificationRateStatisticsChart.setOption({
                        grid: [{
                            top: 5,
                            width: '90%',
                            height: '100%',
                            left: '1%',
                            containLabel: true
                        }],
                        xAxis: [{
                            type: 'category',
                            data: chartsBrands,
                            axisLabel: {
                                fontSize: 12,
                                color: '#000',
                                interval: 0,
                                textStyle: {
                                    align: 'center',
                                    baseline: 'middle'
                                }
                            },
                            splitLine: {
                                show: false
                            },
                        }],
                        yAxis: [{
                            show: false,
                        }],
                        series: [{
                            type: 'bar',
                            stack: 'chart',
                            z: 3,
                            label: {
                                show: true,
                                color: '#fff'
                            },
                            data: chartsRates
                        }]

                    })
                }, (err) => {
                    this.loading = false;
                    that.tableData = []
                });
        },
        Export() {
            if (this.BrandName.length == 0) {
                this.$message({ showClose: true, message: '日期间隔未选择', type: 'error' });
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

            console.log()
            var data = {
                Brands: this.BrandName,
                BeginDateTime: times[0],
                EndDateTime: times[1],
                Image: this.notificationRateStatisticsChart.getDataURL({ type: "png" }).substring(22)
            }

            var ipaddress = "/api/EarlyWarning/ExportEarlyWarningNotificationRate";
            data = JSON.stringify(JSON.stringify(data));
            axios.post(
                ipaddress,
                data,
                { headers: { "Content-Type": "application/json" }, responseType: "blob" },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    console.log(res);
                    let fileName = "预警告知率.xlsx";
                    let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
                    let link = document.createElement("a");
                    link.download = fileName;
                    link.style.display = 'none';
                    link.href = URL.createObjectURL(blob);
                    document.body.appendChild(link);
                    link.click();
                    URL.revokeObjectURL(link.href);
                    document.body.removeChild(link);
                    this.loading = false;
                }, (err) => {
                    this.loading = false;
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
        Statistics() {

            this.currentPage = 1
            console.log(this.BrandName.length);
            if (this.BrandName.length == 0) {
                this.$message({ showClose: true, message: '日期间隔未选择', type: 'error' });
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
                Brands: this.BrandName,
                BeginDateTime: times[0],
                EndDateTime: times[1]
            }
            console.log(data)
            var ipaddress = "/api/EarlyWarning/GetEarlyWarningNotificationRate";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {

                    that.notificationRateTableData = res.data.notificationRateBrandStatistics;
                    /*var brands =that.notificationRateTableData.fo;*/
                    var chartsBrands = [];
                    var chartsRates = [];
                    that.notificationRateTableData.map((res) => {
                        chartsBrands.push(res.brandName);
                        chartsRates.push(res.notificationRate);
                    })
                    this.notificationRateStatisticsChart = echarts.init(document.getElementById('notificationRateStatistics'))
                    this.notificationRateStatisticsChart.setOption({
                        grid: [{
                            top: 5,
                            width: '90%',
                            height: '100%',
                            left: '1%',
                            containLabel: true
                        }],
                        xAxis: [{
                            type: 'category',
                            data: chartsBrands,
                            axisLabel: {
                                fontSize: 12,
                                color: '#000',
                                interval: 0,
                                textStyle: {
                                    align: 'center',
                                    baseline: 'middle'
                                }
                            },
                            splitLine: {
                                show: false
                            },
                        }],
                        yAxis: [{
                            show: false,
                        }],
                        series: [{
                            type: 'bar',
                            stack: 'chart',
                            z: 3,
                            label: {
                                show: true,
                                color: '#fff'
                            },
                            data: chartsRates
                        }]
                    })
                }, (err) => {
                    this.loading = false;
                    //that.tableData = []
                });

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
    }
})
