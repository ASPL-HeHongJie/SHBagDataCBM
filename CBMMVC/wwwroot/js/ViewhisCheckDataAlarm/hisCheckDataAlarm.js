
var hisCheckDataAlarmvm = new Vue({
    el: '#hisCheckDataAlarm',
    data() {
        return {
            datas: [], // 所有数据
            bbrName: '', //站场名字（需要用到的拼接）
            StationName: '', // 站场value内名字
            companyName: '',
            Areas: [],
            StationData: [],
            Loops: [],
            StationVal: '',  // 场站文本框内容
            StationId: '',   // 场站文本框ID
            LoopEventsID: '',   // 回路文本ID
            Equipment: [],
            AbbrName: '',    // 回路的缩写
            Alllu: [],
            LoopAnalyzerName: [],
            tableData: [],
            Allstations: '',   // 默认全部的设备
            loading: false,
            currentPage: 1,
            pagesize: 25,
            isAreaType: isArea,
            brandName: '',
            areaName: '',
            OperationAreas: [],
            stationOpts: [],
            loopOpts: [],
            ipAddress: '',
            ipPort: '',
            knowledgeBaseVisible: false,
            AlarmDesc: '',
            AlarmPriority: '',
            AlarmSolution: "",
            timeSlot: "",
            Starttime: '',
            Endtime: '',
        }
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
                return res.Stations;
            })
            this.Allstations = das[0][0].AbbrName;
            function flatten(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x)) }
            var dsd = flatten(das);
            this.StationData = dsd.map((ras, inde) => {
                return ras;
            })

            this.StationData.filter(el => el.Name == this.StationName).map((ser) => {

                var loop = ser.Loops.map((rec) => {  //

                    const Name = rec.Name
                    const ID = rec.ID
                    const BrandName = rec.BrandName

                    return { Name, ID, BrandName }
                })


                this.Loops.unshift(loop)
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                var sall = fall(this.Loops)
                this.Loops = sall
                this.LoopAnalyzerName = [];
                let loopids = "";
                this.Loops.map((res) => {
                    loopids += res.ID + ",";
                    this.LoopAnalyzerName.push(res.ID);
                });
                loopids = loopids.substr(0, loopids.length - 1);
                this.LoopEventsID = loopids;
                this.stationOpts = this.StationData;
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

                    const Name = rec.Name
                    const ID = rec.ID
                    const BrandName = rec.BrandName

                    return { Name, ID, BrandName }
                })


                this.Loops.unshift(loop)
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                var sall = fall(this.Loops)
                this.Loops = sall
                this.LoopAnalyzerName = [];
                let loopids = "";
                this.Loops.map((res) => {
                    loopids += res.ID + ",";
                    this.LoopAnalyzerName.push(res.ID);
                });
                loopids = loopids.substr(0, loopids.length - 1);
                this.LoopEventsID = loopids;
                this.stationOpts = this.StationData;
                this.loopOpts = this.Loops;
            })
        }


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
            if (this.timeSlot == '' || this.timeSlot == null) {
                this.$message({ showClose: true, message: '日期间隔未选择', type: 'error' });
                return;
            }
            if (this.LoopEventsID == '') {
                this.$message({
                    showClose: true,
                    message: '回路未选择',
                    type: 'error'
                });
            } else {
                var times = this.timeSlot.map((res) => {
                    var Y = res.getFullYear() + '-';
                    var M = (res.getMonth() + 1 < 10 ? '0' + (res.getMonth() + 1) : res.getMonth() + 1) + '-';
                    var D = res.getDate() + ' ';
                    var h = res.getHours() + ':';
                    var m = res.getMinutes() + ':';
                    var s = res.getSeconds();
                    return Y + M + D + h + m + s
                })
                var data = {
                    LoopIDs: this.LoopEventsID,
                    BeginDateTime: times[0],
                    EndDateTime:times[1]
                }
                console.log(data);
                this.loading = true;
                //var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/Alarm/GetHistoricalCheckDataAlarm";
                 var ipaddress = "/api/Alarm/GetHistoricalCheckDataAlarm";
                data = JSON.stringify(JSON.stringify(data));
                var that = this;
                axios.post(
                    ipaddress,
                    data,
                    { headers: { 'Content-Type': 'application/json' } },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        //console.log(res.data);
                        that.tableData = res.data;
                        that.loading = false;

                    }, (err) => {
                        that.tableData = [];
                        that.loading = false;

                    }
                    );
            }
            //this.loading = true;

        },
        tableRowClassName({ row, rowIndex }) {
            var classstr = "";
            if (rowIndex % 2 === 1) {
                classstr = "warning-row";
            } else if (rowIndex === 3) {
                classstr = "success-row";
            }
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
        onSelectedDrug(id) {
            let obj = {};
            obj = this.StationData.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });

            this.ipAddress = obj.IPAddress;
            this.ipPort = obj.IPPort;

            this.StationVal = obj.Name;//获取的 name
            this.StationId = id;//获取的 id
            this.Equipment = []

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

                    const Name = rec.Name
                    const ID = rec.ID
                    const BrandName = rec.BrandName

                    return { Name, ID, BrandName }
                })


                this.Loops.unshift(loop)
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                var sall = fall(this.Loops)
                this.Loops = sall
                if (this.Loops.length == 0) {
                    this.LoopAnalyzerName = []
                    this.tableData = []
                } else if (this.Loops.length > 0) {
                    this.LoopAnalyzerName = [];
                    let loopids = "";
                    this.Loops.map((res) => {
                        loopids += res.ID + ",";
                        this.LoopAnalyzerName.push(res.ID);
                    });
                    loopids = loopids.substr(0, loopids.length - 1);
                    this.LoopEventsID = loopids;
                }
            })
        },
        OnLoopEvents(ids) { // 回路
            var loopids = "";
            ids.forEach((id, index) => {
                loopids += id + ",";
            });
            loopids = loopids.substr(0, loopids.length - 1);
            this.LoopEventsID = loopids;
        },
        openKnowledgeBaseClick(res) {
            this.knowledgeBaseVisible = true;
            this.AlarmDesc = res.value;
            this.AlarmPriority = res.priority;
            var data = {
                AlarmDescription: res.value,
                AlarmTagName: res.tagName,
                StartDateTime: res.startTime,
            }
            console.log(data);
            var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/Alarm/GetAlarmKnowledgeBase";
            //var ipaddress = "http://192.168.1.107:8090/api/Alarm/GetAlarmKnowledgeBase";
            data = JSON.stringify(JSON.stringify(data));

            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    console.log(res.data);
                    that.AlarmSolution = res.data;

                }, (err) => {
                    that.AlarmSolution = "";
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
