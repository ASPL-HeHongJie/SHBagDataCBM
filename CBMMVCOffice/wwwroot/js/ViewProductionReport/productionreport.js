
var ProductionReportvm = new Vue({
    el: '#ProductionReport',
    data: {
        datas: [], // 所有数据
        bbrName: '', //站场名字（需要用到的拼接）
        StationName: '', // 站场value内名字
        companyName: '',
        Areas: [],
        StationData: [],
        Loops: [],
        Analyzer: [],
        StationVal: '',  // 场站文本框内容
        StationId: '',   // 场站文本框ID
        LoopEventsVal: '',  // 回路文本内容
        LoopEventsID: '',   // 回路文本ID
        Equipment: [],
        AbbrName: '',    // 回路的缩写
        Alllu: [],
        LoopAnalyzerName: [],
        timeSlot: "",
        tableData: [],
        Allstations: '',   // 默认全部的设备
        starttime: '',
        Endtime: '',
        ipPort: '',
        ipAddress: '',
        LoopsBrandName: '',
        loading: false,
        currentPage: 1,
        pagesize: 25,
        hisID: '',
        brandName: '',
        reportIPAddress: '',
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],

    },
    created() {
        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate]
        if (isArea == 'false') {
            this.datas = companys;
            this.companyName = this.datas[0].Name
            this.Areas = this.datas[0].Areas;

            this.bbrName = this.Areas[0].Stations[0].AbbrName
            this.StationName = this.Areas[0].Stations[0].Name

            this.ipAddress = this.Areas[0].Stations[0].IPAddress;
            this.ipPort = this.Areas[0].Stations[0].IPPort;
            //场站数据
            var das = this.Areas.map((res, ind) => {
                return res.Stations
            })
            this.Allstations = das[0][0].AbbrName
            function flatten(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x)) }
            var dsd = flatten(das)
            this.StationData = dsd.map((ras, inde) => {
                return ras
            })

            this.StationData.filter(el => el.Name == this.StationName).map((ser) => {

                var loop = ser.Loops.map((rec) => {  //

                    const Name = rec.Name + '(回路)'
                    const ID = rec.ID
                    const BrandName = rec.BrandName

                    return { Name, ID, BrandName }
                })


                this.Loops.unshift(loop)
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                var sall = fall(this.Loops)
                this.Loops = sall
                this.LoopAnalyzerName = [];
                this.LoopAnalyzerName.push(this.Loops[0].ID);
                this.LoopEventsID = this.Loops[0].ID;
                this.LoopsBrandName = this.Loops[0].BrandName
                this.AnalyzerID = this.Loops[0].ID
            })
        } else if (isArea == 'true') {
            this.areaName = area.Name
            this.OperationAreas = [{ Name: area.Name, ID: area.ID }]
            var areas = []
            areas.push(area)

            this.bbrName = area.Stations[0].AbbrName
            this.StationName = area.Stations[0].Name

            this.ipAddress = area.Stations[0].IPAddress;
            this.ipPort = area.Stations[0].IPPort;
            //场站数据
            var das = areas.map((res, ind) => {
                return res.Stations
            })
            this.Allstations = das[0][0].AbbrName
            function flatten(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x)) }
            var dsd = flatten(das)
            this.StationData = dsd.map((ras, inde) => {
                return ras
            })

            this.StationData.filter(el => el.Name == this.StationName).map((ser) => {

                var loop = ser.Loops.map((rec) => {  //

                    const Name = rec.Name + '(回路)'
                    const ID = rec.ID
                    const BrandName = rec.BrandName

                    return { Name, ID, BrandName }
                })


                this.Loops.unshift(loop)
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                var sall = fall(this.Loops)
                this.Loops = sall
                this.LoopAnalyzerName = [];
                this.LoopAnalyzerName.push(this.Loops[0].ID);
                this.LoopEventsID = this.Loops[0].ID;
                this.LoopsBrandName = this.Loops[0].BrandName
                this.AnalyzerID = this.Loops[0].ID
            })
        }
        
        console.log(this.Loops)
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
            if (this.timeSlot == null) {
                this.$message({
                    showClose: true,
                    message: '日期间隔未选择',
                    type: 'error'
                });
                this.tableData = ''
            } else { 
                if (this.LoopEventsID == '') {
                    this.$message({
                        showClose: true,
                        message: '回路未选择',
                        type: 'error'
                    });
                } else {
                    var data = {
                        LoopIDs: this.LoopEventsID,
                        StartDateTime: this.DateFormat("YYYY-mm-dd HH:MM:SS", this.timeSlot[0]),
                        EndDateTime: this.DateFormat("YYYY-mm-dd HH:MM:SS", this.timeSlot[1])
                    }
                    this.loading = true;
                    console.log(data)
                    var ipaddress = "/api/CheckData/CheckDateProductionReport";

                    data = JSON.stringify(JSON.stringify(data));
                    console.log(data);
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
            //this.loading = true;
            
        },
        Export() {
            if (this.timeSlot == null) {
                this.$message({
                    showClose: true,
                    message: '日期间隔未选择',
                    type: 'error'
                });
                this.tableData = ''
            } else {
                if (this.LoopEventsID == '') {
                    this.$message({
                        showClose: true,
                        message: '回路未选择',
                        type: 'error'
                    });
                } else {
                    this.loading = true;
                    var data = {
                        LoopIDs: this.LoopEventsID,
                        StartDateTime: this.DateFormat("YYYY-mm-dd HH:MM:SS", this.timeSlot[0]),
                        EndDateTime: this.DateFormat("YYYY-mm-dd HH:MM:SS", this.timeSlot[1])
                    }
                    var ipaddress = "/api/CheckData/ExportExcelCheckDateProductionReport";
                    data = JSON.stringify(JSON.stringify(data));
                    console.log(data)

                    axios.post(
                        ipaddress,
                        data,
                        { headers: { "Content-Type": "application/json" }, responseType: "blob" },
                        { timeout: 1000 * 60 * 2 })
                        .then((res) => {
                            console.log(res);
                            let fileName = "能量报告.xlsx";
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
            this.StationVal = obj.Name;//获取的 name
            this.StationId = id;//获取的 id
            this.Equipment = []
            this.IPAddress = obj.IPAddress
            this.ipPort = obj.IPPort;

            var vId = this.StationData.map((red, inds) => {
                return red.ID
            })
            var vDs = this.StationData.map((red, inds) => {
                return red
            })
            this.Loops = []
            //筛选出与文本框相匹配的内容
            var sju = vDs.filter(el => el.ID == this.StationId)
            this.Alllu = sju

            sju.map((ser) => {

                var loop = ser.Loops.map((rec) => {  //

                    const Name = rec.Name + '(回路)'
                    const ID = rec.ID
                    const BrandName = rec.BrandName

                    return { Name, ID, BrandName }
                })


                this.Loops.unshift(loop)
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                var sall = fall(this.Loops)
                this.Loops = sall
                console.log(this.Loops)
                if (this.Loops.length == 0) {
                    this.LoopAnalyzerName = []
                    this.LoopsBrandName = []
                    this.timeSlot = ''
                    this.Endtime = '',
                        this.starttime = ''
                    this.tableData = []
                } else if (this.Loops.length > 0) {
                    this.LoopAnalyzerName = [];
                    this.LoopAnalyzerName.push(this.Loops[0].ID);
                    this.LoopsBrandName = this.Loops[0].BrandName;
                    this.LoopEventsID = this.Loops[0].ID
                    var myDate = new Date();  // 当前时间
                    var preDate = new Date(new Date(myDate.getTime() - (24 * 60 * 60 * 1000) * 3).toLocaleDateString()); // 前一天时间00:00:00
                    this.timeSlot = [preDate, myDate]
                }

            })
        },
        OnLoopEvents(ids) { // 回路
            var loopids ="";
            ids.forEach((id, index) => {
                loopids += id + ",";
            });
            loopids = loopids.substr(0, loopids.length - 1);
            this.LoopEventsID = loopids;
            console.log(loopids);
        }
       ,DateFormat(fmt, date) {
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        }
       ,ExportExcel(url, data) {
            var request = new XMLHttpRequest();
            request.open("POST", url, true);
            request.responseType = "blob";
            request.overrideMimeType('text/plain; charset=x-user-defined');
            request.onreadystatechange = function (e) {
                if (this.readyState == 4 && this.status == 200) {
                    var blob = this.response;
                    //if (blob.size > 0) {
                        var downloadUrl = window.URL.createObjectURL(blob);
                        var anchor = document.createElement("a");
                        anchor.href = downloadUrl;
                        anchor.download = "能量报告.xlsx";
                        anchor.click();
                    //}
                    //else {
                    //}

                }
            }
           request.setRequestHeader("Content-Type",
               "application/json");
            request.send(data);
        }
    }
})
