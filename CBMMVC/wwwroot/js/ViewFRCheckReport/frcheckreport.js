
var FRCheckReportvm = new Vue({
    el: '#FRCheckReport',
    data: {
        companyName: '', // 公司的文本框内容
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
        PriorityIds: '',
        timeSlot: "",
        tableData: [],
        Allstations: '',   // 默认全部的设备
        starttime: '',
        Endtime: '',
        ipPort: '',
        ipAddress: '',
        LoopsBrandName: '',
        loading: false,
        dialogVisible: false,
        dialogloading: false,
        currentPage: 1,
        pagesize: 25,
        hisID: '',
        brandName: '',
        reportIPAddress: '',
        reportServerIpAndPort: '',
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
    },
    created() {
        var myDate = new Date();  // 当前时间

        var preDate = new Date(new Date(myDate.getTime() - (24 * 60 * 60 * 1000) * 13).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate]
        this.reportServerIpAndPort = reportServerIpAndPort;
        if (isArea == 'false') {
            this.companyName = company.Name
            this.datas = [{ Name: company.Name, ID: company.ID }]

            company.Areas.map((res) => {
                this.StationName = res.Stations[0].Name
                this.StationsAbbrName = res.Stations[0].AbbrName
                this.ipAddress = res.Stations[0].IPAddress;
                this.ipPort = res.Stations[0].IPPort;
                var station = res.Stations.map((res) => {
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.AbbrName }]
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
                this.StationName = res.Stations[0].Name
                this.StationsAbbrName = res.Stations[0].AbbrName
                this.ipAddress = res.Stations[0].IPAddress;
                this.ipPort = res.Stations[0].IPPort;
                var station = res.Stations.map((res) => {
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.AbbrName }]
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Stations = fall(station)
                this.StationsData = res.Stations.map((res) => {
                    return res
                })
            })
        }
        

        this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
            var LoopsData = res.Loops.filter((el) => el.FlowmeterType != 'Turbo').map((res) => {
                this.LoopData.push(res)
                return { Name: res.Name + '(回路)', ID: res.ID, BrandName: res.BrandName }
            })

            this.Loops.unshift(LoopsData)
            function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
            this.Loops = fall(this.Loops)
            this.LoopName = this.Loops[0].ID
            this.BrandName = this.Loops[0].BrandName
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
            } else if (this.LoopName == '') {
                this.$message({
                    showClose: true,
                    message: '回路未选择',
                    type: 'error'
                });
            }else {
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
                this.loading = true;
                var data = {
                    LoopID: this.LoopName,
                    BrandName: this.BrandName,
                    StartDateTime: this.Endtime,
                    EndDateTime: this.starttime
                }
                console.log(data)
                var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/CheckData/GetHistoricalFlowrateCheckReport";
                //'http://192.168.1.103:8081/api/Alarm/GetRealtimeAlarm'
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
        TimeSelection(id) {
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
            let obj = {};
            obj = this.Stations.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.StationID = obj.ID
            this.StationName = obj.Name
            this.StationsData.filter(el => el.Name == obj.Name).map((res) => {
                this.ipAddress = res.IPAddress;
                this.ipPort = res.IPPort;
                if (res.Loops.length == 0) {
                    this.LoopName = ''
                    this.Loops = []
                    this.tableData = []
                } else if (res.Loops.length != 0) {
                    var LoopsData = res.Loops.filter((el) => el.FlowmeterType != 'Turbo')
                    if (LoopsData.length == 0) {
                        this.LoopName = ''
                        this.Loops = []
                    } else {
                        var LoopsDatas = LoopsData.map((res) => {
                            console.log(res)
                            return { Name: res.Name + '(回路)', ID: res.ID, BrandName: res.BrandName }
                        })
                        this.Loops = []
                        this.Loops.unshift(LoopsDatas)
                        function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                        this.Loops = fall(this.Loops)
                        this.LoopName = this.Loops[0].ID
                        this.BrandName = this.Loops[0].BrandName
                    }
                }
            })

            if (this.Loops.length == 0) {
                this.LoopName = ''
                this.timeSlot = ''
                this.Endtime = '',
                    this.starttime = ''
                this.tableData = []
            } else if (this.Loops.length > 0) {
                this.LoopName = this.Loops[0].ID
                var myDate = new Date();  // 当前时间
                var preDate = new Date(new Date(myDate.getTime() - (24 * 60 * 60 * 1000) * 13).toLocaleDateString()); // 前一天时间00:00:00
                this.timeSlot = [preDate, myDate]
            }

        },
        onLoops(id) { // 回路
            let obj = {};
            obj = this.Loops.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.LoopName = obj.ID
            this.BrandName = obj.BrandName

        },
        handleClick(res) {
      
            this.hisID = res.hisID
            this.brandName = res.brandName
            this.StationsData.filter(el => el.Name == res.stationName).map((res) => {
                this.reportIPAddress = res.IPAddress
            });
            this.dialogVisible = true;

            setTimeout(() => {
                this.dialogloading = true;
                $("#Loading").css("display", "block");
                $("#div_iframe").css("display", "none");
                $("#report").attr('src', 'http://' + this.reportServerIpAndPort+'/FRReportForm.aspx?ID=' + this.hisID + '&ManufacturerName=' + this.brandName + '&Address=' + this.reportIPAddress);
            }, 0);
        }
    }
})
