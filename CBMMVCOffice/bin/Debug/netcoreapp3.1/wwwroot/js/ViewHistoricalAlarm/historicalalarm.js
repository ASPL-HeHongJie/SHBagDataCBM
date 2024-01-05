var historicalAalarmvm = new Vue({
    el: '#HistoricalAlarm',
    data: {
        companyName: '', // 公司的文本框内容
        datas: '',  // 公司遍历的内容
        StationName: '', // 场站文本框内容
        Stations: '', // 场站遍历的内容
        LoopAnalyzerName: '', //回路/分析仪文本框内容
        Loops: [], // 回路/分析仪遍历的内容
        equipmentName: '', //设备文本框内容
        Equipment: [], // 设备遍历内容
        fullscreenLoading: false,
        StationsData: [],
        timeSlot: [],
        LoopData: [],
        EquipmentData: [],
        StationVal: '',
        LoopsID: '',
        PriorityIds: '',
        tableData: [],
        dialogVisible: false,
        NumberOfAlarms: '',
        AlarmTime: '',
        formInline: '',
        Numberalarm: [{
            name: '10',
            Id: '10'
        }, {
            name: '5',
            Id: '5'
        }],
        Alarmstime: [{
            name: '按报警持续时间',
            Id: 'DurationValue'
        }, {
            name: '按报警次数',
            Id: 'AlarmCount'
        }],
        AlarmsTNam: '',   // 报警数量的value
        AlarmsTId: '',    // 报警数量的id
        AlarmsDNam: '',   // 排序的value
        AlarmsDId: '',     // 排序的id
        ipAddress: '',
        ipPort: '',
        NotAll: '',
        loading: false,
        currentPage: 1,
        pagesize: 25,
        tableDataTab: [],
        continued: '持续时间',
        alert: 'duration',
        isAreaType: isArea,
        areaName: '',
        OperationAreas: [],
    },
    created() {
        if (isArea == 'false') {
            var myDate = new Date();  // 当前时间
            var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString()); // 前一天时间00:00:00
            this.timeSlot = [preDate, myDate]

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

            this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
                this.LoopAnalyzerName = '%'
                var LoopsData = res.Loops.map((res) => {
                    this.LoopData.push(res)
                    this.Equipment.push({
                        Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                    }, {
                        Name: res.Name + '流量计算机', ID: this.StationsAbbrName + '_' + res.AbbrName + '_F'
                    }, {
                        Name: res.Name + '流量计', ID: this.StationsAbbrName + '_' + res.AbbrName + '_M'
                    }, {
                        Name: res.Name + '温度变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_T'
                    }, {
                        Name: res.Name + '压力变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_P'
                    })
                    return { Name: res.Name + '(回路)', ID: res.ID }
                })
                var EquipmentsData = res.Equipments.map((res) => {
                    this.EquipmentData.push(res)
                    this.Equipment.push({
                        Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                    })
                    return { Name: res.Name + '(分析仪)', ID: res.AbbrName }
                })
                this.Loops.unshift(LoopsData, EquipmentsData, { Name: '全部', ID: '%' })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Loops = fall(this.Loops)
                this.Equipment.push({ Name: '全部' + '(' + this.StationName + ')', ID: this.StationsAbbrName + 'Station' })
                this.equipmentName = this.StationsAbbrName + 'Station'
                this.priority = '%'
            })
        } else if (isArea == 'true') {
            var myDate = new Date();  // 当前时间
            var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString()); // 前一天时间00:00:00
            this.timeSlot = [preDate, myDate]

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

            this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
                this.LoopAnalyzerName = '%'
                var LoopsData = res.Loops.map((res) => {
                    this.LoopData.push(res)
                    this.Equipment.push({
                        Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                    }, {
                        Name: res.Name + '流量计算机', ID: this.StationsAbbrName + '_' + res.AbbrName + '_F'
                    }, {
                        Name: res.Name + '流量计', ID: this.StationsAbbrName + '_' + res.AbbrName + '_M'
                    }, {
                        Name: res.Name + '温度变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_T'
                    }, {
                        Name: res.Name + '压力变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_P'
                    })
                    return { Name: res.Name + '(回路)', ID: res.ID }
                })
                var EquipmentsData = res.Equipments.map((res) => {
                    this.EquipmentData.push(res)
                    this.Equipment.push({
                        Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                    })
                    return { Name: res.Name + '(分析仪)', ID: res.AbbrName }
                })
                this.Loops.unshift(LoopsData, EquipmentsData, { Name: '全部', ID: '%' })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Loops = fall(this.Loops)
                this.Equipment.push({ Name: '全部' + '(' + this.StationName + ')', ID: this.StationsAbbrName + 'Station' })
                this.equipmentName = this.StationsAbbrName + 'Station'
                this.priority = '%'
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
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        // 获取场站文本框内容
        onSelectedDrug(id) {
            let obj = {};
            obj = this.Stations.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.StationsAbbrName = obj.ID
            this.StationVal = obj.Name
            this.Loops = []
            this.Equipment = []
            this.LoopAnalyzerName = '%'
            this.StationsData.filter(el => el.Name == obj.Name).map((res) => {
                this.ipAddress = res.IPAddress;
                this.ipPort = res.IPPort;
                if (res.Loops.length == 0) {
                    this.LoopAnalyzerName = ''
                    this.equipmentName = ''
                    this.tableData = []
                    this.Loops = []
                    this.Equipment = []
                } else if (res.Loops.length != 0) {
                    this.Loops = []
                    this.Equipment = []
                    var LoopsData = res.Loops.map((res) => {
                        this.LoopData.push(res)
                        this.Equipment.push({
                            Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                        }, {
                                Name: res.Name + '流量计算机', ID: this.StationsAbbrName + '_' + res.AbbrName + '_F'
                        }, {
                                Name: res.Name + '流量计', ID: this.StationsAbbrName+ '_' + res.AbbrName + '_M'
                        }, {
                                Name: res.Name + '温度变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_T'
                        }, {
                                Name: res.Name + '压力变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_P'
                        })
                        return { Name: res.Name + '(回路)', ID: res.ID }
                    })

                    var EquipmentsData = res.Equipments.map((res) => {
                        this.EquipmentData.push(res)
                        this.Equipment.push({
                            Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                        })
                        return { Name: res.Name + '(分析仪)', ID: res.AbbrName }
                    })
                    this.Loops.unshift(LoopsData, EquipmentsData, { Name: '全部', ID: '%' })
                    function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                    this.Loops = fall(this.Loops)
                    this.Equipment.push({ Name: '全部' + '(' + obj.Name + ')', ID: this.StationsAbbrName + 'Station' })
                    this.equipmentName = this.StationsAbbrName + 'Station'
                    this.priority = '%'
                }
                

            })

        },
        Analyzers(id) { // 回路/色谱分析仪

            let obj = {};
            obj = this.Loops.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.LoopsID = obj.ID
            this.Equipment = []
            console.log(obj.ID)
            if (typeof obj.ID == 'number') {
                this.Equipment = []
                this.LoopData.filter(el => el.ID == obj.ID).map((res) => {
                    this.Equipment = []
                    this.Equipment.push({
                        Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                    }, {
                            Name: res.Name + '流量计算机', ID: this.StationsAbbrName + '_' + res.AbbrName + '_F'
                    }, {
                            Name: res.Name + '流量计', ID: this.StationsAbbrName + '_' + res.AbbrName + '_M'
                    }, {
                            Name: res.Name + '温度变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_T'
                    }, {
                            Name: res.Name + '压力变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_P'
                    })
                    this.equipmentName = this.StationsAbbrName + '_' + res.AbbrName
                })
                this.priority = '%'

            } else if (typeof obj.ID != 'number' && obj.ID != '%') {
                this.EquipmentData.filter(el => el.AbbrName == obj.ID).map((res) => {
                    this.Equipment = []
                    this.Equipment.push({
                        Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                    })
                    this.equipmentName = this.StationsAbbrName + '_' + res.AbbrName
                })
                this.priority = '%'

            } else if (obj.ID == '%') {
                this.Equipment = []
                console.log(this.StationVal)
                this.StationsData.filter(el => el.Name == this.StationVal).map((res) => {
                    res.Loops.map((res) => {
                        this.Equipment.push({
                            Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                        }, {
                                Name: res.Name + '流量计算机', ID: this.StationsAbbrName + '_' + res.AbbrName + '_F'
                        }, {
                                Name: res.Name + '流量计', ID: this.StationsAbbrName + '_' + res.AbbrName + '_M'
                        }, {
                                Name: res.Name + '温度变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_T'
                        }, {
                                Name: res.Name + '压力变送器', ID: this.StationsAbbrName + '_' + res.AbbrName + '_P'
                        })
                    })
                    res.Equipments.map((res) => {
                        this.Equipment.push({
                            Name: '全部' + '(' + res.Name + ')', ID: this.StationsAbbrName + '_' + res.AbbrName
                        })
                    })
                    this.Equipment.unshift({ Name: '全部' + '(' + this.StationVal + ')', ID: this.StationsAbbrName + 'Station' })
                    this.equipmentName = this.StationsAbbrName + 'Station'
                    this.priority = '%'
                })
            }
        },
        equipment(id) {
            let obj = {};
            obj = this.Equipment.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.PriorityVal = obj.Name;//获取的 name
            this.PriorityId = id;//获取的 id  
        },
        TimeSelection(id) {

            let usedTime = this.timeSlot[1] - this.timeSlot[0]; // 相差的毫秒数
            let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
            let nowdate = new Date()
            let timeStart = this.timeSlot[0] 
        },
        Refresh() {
            if (this.timeSlot === null) {
                this.$message({
                    showClose: true,
                    message: "请填写正确的报警时间区间",
                    type: 'error'
                });
            } else {
                this.loading = true;
                this.currentPage = 1
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
                    AlarmArea: this.equipmentName,
                    StartDateTime: times[0],
                    EndDateTime: times[1],
                }
                console.log(data);
                var ipaddress = "/api/Alarm/GetHistoricalAlarm";
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
        Export() {
            if (this.timeSlot === null) {
                this.$message({
                    showClose: true,
                    message: "请填写正确的报警时间区间",
                    type: 'error'
                });
            } else {
                this.loading = true;
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
                    AlarmArea: this.equipmentName,
                    StartDateTime: times[0],
                    EndDateTime: times[1],
                }
                var ipaddress = "/api/Alarm/ExportExcelHistoricalAlarm";
                data = JSON.stringify(JSON.stringify(data));
                axios.post(
                    ipaddress,
                    data,
                    { headers: { "Content-Type": "application/json" }, responseType: "blob" },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        console.log(res);
                        let fileName = "历史报警.xlsx";
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
            
        },
        dialog_Visible() {

            this.dialogVisible = true;
            this.NumberOfAlarms = '10'
            this.AlarmTime = '按报警持续时间'
            this.onSubmit();

        },
        NumberAlarms(id) {
            let obj = {};
            obj = this.Numberalarm.find((item) => {//这里的userList就是上面遍历的数据源
                return item.Id === id;//筛选出匹配数据
            });
            this.AlarmsTNam = obj.name;//获取的 name
            this.AlarmsTId = id;//获取的 id
        },
        AlarmDat(id) {
            let obj = {};
            obj = this.Alarmstime.find((item) => {//这里的userList就是上面遍历的数据源
                return item.Id === id;//筛选出匹配数据
            });
            this.AlarmsDNam = obj.name;//获取的 name
            this.AlarmsDId = id;//获取的 id
        },
        onSubmit() {
            if (this.NumberOfAlarms == '10' && this.AlarmTime == '按报警持续时间') {
                this.AlarmsTId = '10'
                this.AlarmsDId = 'DurationValue'
            }
            this.AlarmsTId   // 弹窗内报警次数的ID
            this.AlarmsDId   // 弹窗内报警类型的ID

            var times = this.timeSlot.map((res) => {
                var Y = res.getFullYear() + '-';
                var M = (res.getMonth() + 1 < 10 ? '0' + (res.getMonth() + 1) : res.getMonth() + 1) + '-';
                var D = res.getDate() + ' ';
                var h = res.getHours() + ':';
                var m = res.getMinutes() + ':';
                var s = res.getSeconds();
                return Y + M + D + h + m + s
            })
            // this.ipAddress = obj.IPAddress;
            // this.ipPort = obj.IPPort;
            
                    
                   
                var data = {
                    TopNumber: this.AlarmsTId,
                    SortType: this.AlarmsDId,
                    AlarmArea: this.equipmentName,
                    //  AlarmArea:'%',
                    StartDateTime: times[0],
                    EndDateTime: times[1],
                }
            if (this.AlarmsDId == 'DurationValue') {
                this.continued = '持续时间'
                this.alert = 'duration'
            } else if (this.AlarmsDId == 'AlarmCount') {
                this.continued = '持续次数'
                this.alert = 'alarmCount'
            }

            var ipaddress = "/api/Alarm/GetHistoricalAlarmKPI";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    //this.loading = false;
                    this.tableDataTab = res.data
                    var KPIDuration = this.tableDataTab.map((rec) => {
                        return { value: rec.durationValue, name: rec.description + '(' + rec.duration + ')' }
                    })
                    var KPIAlarmCount = this.tableDataTab.map((rec) => {
                        return { value: rec.alarmCount, name: rec.description + '(' + rec.alarmCount + ')' + '(次)' }
                    })
                    
                    if (this.AlarmsDId == 'DurationValue') {
                        // 基于准备好的dom，初始化echarts实例
                        let myChart = echarts.init(document.getElementById("hisAlarmKPI"))
                        // 绘制图表
                        myChart.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}"
                            },
                            series: [
                                {
                                    name: '报警来源',
                                    type: 'pie',
                                    radius: '50%',
                                    data: KPIDuration,
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
                    } else if (this.AlarmsDId == 'AlarmCount') {
                        // 基于准备好的dom，初始化echarts实例
                        let myChart = echarts.init(document.getElementById("hisAlarmKPI"))
                        // 绘制图表
                        myChart.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}"
                            },
                            series: [
                                {
                                    name: '报警来源',
                                    type: 'pie',
                                    radius: '50%',
                                    data: KPIAlarmCount,
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

                    }
                }, (err) => {
                    //this.loading = false;
                        that.tableDataTab = []
                }
                );
        },
    }
})