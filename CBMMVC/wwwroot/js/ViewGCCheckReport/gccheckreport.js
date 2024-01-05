
var loopCheckReportvm = new Vue({
    el: '#GCCheckReport',
    data: {
        companyName: '', // 公司的文本框内容
        datas: '',  // 公司遍历的内容
        StationName: '', // 场站文本框内容
        Stations: '', // 场站遍历的内容
        AnalyzerName: '', //回路文本框内容
        Analyzers: [], // 回路遍历的内容
        StationData: [],
        EquipmentData: [],
        StationVal: '',
        AnalyzerBrandName: '',
        PriorityIds: '',
        timeSlot: "",
        tableData: [],
        Allstations: '',   // 默认全部的设备
        chromatographic: [],
        starttime: '',
        Endtime: '',
        ipPort: '',
        ipAddress: '',
        NotAll: '',
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
                var StationGC = res.Stations.filter((el) => el.Equipments.length != 0)
               
                this.StationData = StationGC.map((res) => {
                    return res
                })
                this.StationName = this.StationData[0].Name
                this.ipAddress = this.StationData[0].IPAddress;
                this.ipPort = this.StationData[0].IPPort;
                this.StationsAbbrName = this.StationData[0].AbbrName
            })
        } else if (isArea == 'true') {
            this.areaName = area.Name
            this.OperationAreas = [{ Name: area.Name, ID: area.ID }]
            var areas = []
            areas.push(area)
            areas.map((res) => {
                var StationGC = res.Stations.filter((el) => el.Equipments.length != 0)

                this.StationData = StationGC.map((res) => {
                    return res
                })
                this.StationName = this.StationData[0].Name
                this.ipAddress = this.StationData[0].IPAddress;
                this.ipPort = this.StationData[0].IPPort;
                this.StationsAbbrName = this.StationData[0].AbbrName
            })
        }
        

        this.StationData.filter(el => el.Name == this.StationName).map((res) => {
            if (res.Equipments.length == 0) {
                this.Analyzers = []
                this.AnalyzerName = ''
                this.AnalyzerBrandName = ''
            } else if (res.Equipments.length != 0) {
                var EquipmentsData = res.Equipments.map((res) => {
                    return { Name: res.Name + '(分析仪)', ID: res.ID, BrandName: res.BrandName }
                })

                this.Analyzers.unshift(EquipmentsData)
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Analyzers = fall(this.Analyzers)
                this.AnalyzerName = this.Analyzers[0].ID
                this.AnalyzerBrandName = this.Analyzers[0].BrandName
            }
            
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
            if (this.AnalyzerName == '') {
                this.$message({
                    showClose: true,
                    message: '色谱分析仪未选择',
                    type: 'error'
                });
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
                    EquipmentID: this.AnalyzerName,
                    BrandName: this.AnalyzerBrandName,
                    StartDateTime: this.Endtime,
                    EndDateTime: this.starttime
                }
                console.log(data)
                if (data.EquipmentID == '' && data.BrandName == '') {
                    this.loading = false;
                } else {
                    this.loading = true;
                    var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/CheckData/GetHistoricalGCCheckReport";
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
            obj = this.StationData.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            console.log(obj)
            this.StationID = obj.ID
            this.StationName = obj.Name
            this.StationData.filter(el => el.Name == obj.Name).map((res) => {
                this.ipAddress = res.IPAddress;
                this.ipPort = res.IPPort;
                console.log(res.Equipments);
                if (res.Equipments.length == 0) {
                    console.log('没有')
                    this.AnalyzerName = ''
                    this.Analyzers = []
                    this.$message({
                        showClose: true,
                        message: '该场站没有色谱分析仪!',
                        type: 'error'
                    });
                } else if (res.Equipments.length != 0) {
                    var EquipmentsData = res.Equipments.map((res) => {
                        return { Name: res.Name + '(分析仪)', ID: res.ID, BrandName: res.BrandName }
                    })
                    this.Analyzers = []
                    this.Analyzers.unshift(EquipmentsData)
                    function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                    this.Analyzers = fall(this.Analyzers)
                    this.AnalyzerName = this.Analyzers[0].ID
                    this.AnalyzerBrandName = this.Analyzers[0].BrandName
                }

            })

           
        },
        onAnalyzers(id) { //色谱分析仪
            let obj = {};
            obj = this.Equipments.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.AnalyzerName = obj.ID
            this.AnalyzerBrandName = obj.BrandName
        },
        handleClick(res) {
            this.hisID = res.hisID
            this.brandName = res.brandName
            this.StationData.filter(el => el.Name == res.stationName).map((res) => {
                this.reportIPAddress = res.IPAddress
            })

            this.dialogVisible = true;

            setTimeout(() => {
                this.dialogloading = true;
                $("#Loading").css("display", "block");
                $("#div_iframe").css("display", "none");
                $("#report").attr('src', 'http://' + this.reportServerIpAndPort +'/GCReportForm.aspx?ID=' + this.hisID + '&ManufacturerName=' + this.brandName + '&Address=' + this.reportIPAddress);
            }, 0);
        }
    }
})
