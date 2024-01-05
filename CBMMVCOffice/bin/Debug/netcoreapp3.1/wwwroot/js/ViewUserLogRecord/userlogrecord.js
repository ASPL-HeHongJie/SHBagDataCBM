
var loopCheckReportvm = new Vue({
    el: '#UserLogRecord',
    data: {
        UserID: '',
        tableData: [],
        ipPort: '',
        ipAddress: '',
        loading: false,
        dialogVisible: false,
        dialogloading: false,
        timeSlot: "",
        starttime: '',
        Endtime: '',
        currentPage: 1,
        pagesize: 25,
    },
    created() {
        this.UserID = userID;
        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - (24 * 60 * 60 * 1000)).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate]
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
            this.currentPage = 1
            if (this.timeSlot == '') {
                this.$message({
                    showClose: true,
                    message: '日期间隔未选择',
                    type: 'error'
                });
                this.tableData = ''
            } else if (this.timeSlot == null) {
                this.$message({
                    showClose: true,
                    message: '日期间隔未选择',
                    type: 'error'
                });
                this.tableData = ''
            } else {
                this.timeSlot.map((res, index) => {
                    if (index == 1) {
                        var Y = res.getFullYear() + '-';
                        var M = (res.getMonth() + 1 < 10 ? '0' + (res.getMonth() + 1) : res.getMonth() + 1) + '-';
                        var D = res.getDate() + ' ';
                        this.starttime = Y + M + D + '23' + ':' + '59' + ':' + '59'

                    } else {
                        var Y = res.getFullYear() + '-';
                        var M = (res.getMonth() + 1 < 10 ? '0' + (res.getMonth() + 1) : res.getMonth() + 1) + '-';
                        var D = res.getDate() + ' ';
                        var h = res.getHours() + ':';
                        var m = res.getMinutes() + ':';
                        var s = res.getSeconds();
                        this.Endtime = Y + M + D + h + m + s

                    }

                })
                var data = {
                    UserID: this.UserID,
                    StartDateTime: this.Endtime,
                    EndDateTime: this.starttime
                }
                console.log(data)
                var ipaddress = "/api/UserLogRecord/GetUserLogRecord";
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
        TimeSelection(id) {
            let nowdate = new Date()
            let timeStart = this.timeSlot[0]
            if (nowdate < this.timeSlot[1]) {
                this.timeSlot = [timeStart, nowdate]
            }
        },
        formatDate(row, column) {
            // 获取单元格数据
            let data = row[column.property];
            if (data == null) {
                return null;
            }
            let dt = new Date(data)
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
        }
    }
})
