
var realtimealarmvm = new Vue({
    el: '#RealtimeAlarm',
    data: {
        Prioritys: [{
                Name: '全部', ID: '%'
        }, {
                Name: 'INFO', ID:'INFO'
        }, {
                Name: 'LOW', ID: 'LOW'
        }, {
                Name: 'HIGH', ID: 'HIGH'
        }, {
                Name: 'CRITICAL', ID: 'CRITICAL'
        }],
        companyName: '', // 公司的文本框内容
        datas: '',  // 公司遍历的内容
        StationName: '', // 场站文本框内容
        Stations: '', // 场站遍历的内容
        LoopAnalyzerName: '', //回路/分析仪文本框内容
        Loops: [], // 回路/分析仪遍历的内容
        equipmentName: '', //设备文本框内容
        Equipment: [], // 设备遍历内容
        priority: '', // 优先级文本框内容
        fullscreenLoading: false,
        StationsData: [],
        LoopData: [],
        EquipmentData: [],
        LoopsID: '',
        PriorityIds: '',
        tableData: [],
        fullscreenLoading: false,
        currentPage: 1,
        pagesize: 25,
        ipAddress: '',
        ipPort:'',
        loading: false,
        AlarmType: [{
            Name: '设备报警',
            ID: 'EquipmentAlarm',
        }, {
            Name: '诊断报警',
            ID: 'DiagnosticAlarm'
        }],
        AlarmTypeName: '',
        HiddenType: '',
        TableHidden:'EquipmentAlarm',
        //fullscreenLoading: false
        isAreaType: isArea,
        areaName: '',
        OperationAreas:[],
    },
    created() {
        if (isArea == 'false') {
            this.companyName = company.Name
            this.datas = [{ Name: company.Name, ID: company.ID }]

            company.Areas.map((res) => {
                this.StationName = res.Stations[0].Name
                this.StationsAbbrName = res.Stations[0].AbbrName
                this.StaID = res.Stations[0].ID
                this.ipAddress = res.Stations[0].IPAddress;
                this.ipPort = res.Stations[0].IPPort;
                var station = res.Stations.map((res) => {
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.AbbrName, StaID: res.ID }]
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Stations = fall(station)
                this.StationsData = res.Stations.map((res) => {
                    return res
                })
            })
            this.AlarmTypeName = 'EquipmentAlarm'
            this.HiddenType = 'block'
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
            this.areaName = area.Name
            this.OperationAreas = [{ Name: area.Name, ID: area.ID }]
            var areas = []
            areas.push(area)
            areas.map((res) => {
                this.StationName = res.Stations[0].Name
                this.StationsAbbrName = res.Stations[0].AbbrName
                this.StaID = res.Stations[0].ID
                this.ipAddress = res.Stations[0].IPAddress;
                this.ipPort = res.Stations[0].IPPort;
                var station = res.Stations.map((res) => {
                    this.StationsData = res
                    return [{ Name: res.Name, ID: res.AbbrName, StaID: res.ID }]
                })
                function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                this.Stations = fall(station)
                this.StationsData = res.Stations.map((res) => {
                    return res
                })
            })
            this.AlarmTypeName = 'EquipmentAlarm'
            this.HiddenType = 'block'
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
        handleChange(value) {
            console.log(value);
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return "warning-row";
            } else if (rowIndex === 3) {
                return "success-row";
            }
            return "";
        },

        // 获取场站文本框内容
        onSelectedDrug(id) {
            let obj = {};
            obj = this.Stations.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.StationsAbbrName = obj.ID
            this.StationName = obj.Name
            this.StaID = obj.StaID
            if (this.AlarmTypeName == 'EquipmentAlarm') {
                this.Loops = []
                this.Equipment = []
                this.LoopAnalyzerName = '%'
                this.StationsData.filter(el => el.Name == obj.Name).map((res) => {
                    console.log(res)
                    if (res.Loops.length == 0) {
                        this.LoopAnalyzerName = ''
                        this.equipmentName = ''
                        this.priority = ''
                        this.tableData = []
                        this.Loops = []
                        this.Equipment = []
                    } else if (res.Loops.length != 0) {
                        this.Loops = []
                        this.Equipment = []
                        this.LoopAnalyzerName = '%'
                        this.ipAddress = res.IPAddress;
                        this.ipPort = res.IPPort;
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
                        this.Equipment.push({ Name: '全部' + '(' + obj.Name + ')', ID: this.StationsAbbrName + 'Station' })
                        this.equipmentName = this.StationsAbbrName + 'Station'
                        this.priority = '%'
                    }


                })
            } else if (this.AlarmTypeName == 'DiagnosticAlarm') {
                this.Loops = []
                this.Equipment = []
                this.HiddenType = 'none'
                this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
                    this.Loops = []
                    this.Equipment = []
                    this.LoopAnalyzerName = -1
                    var LoopsData = []
                    LoopsData = res.Loops.map((res) => {
                        this.LoopData.push(res)
                        return { Name: res.Name + '(回路)', ID: res.ID }
                    })

                    this.Loops.unshift(LoopsData, { Name: '全部', ID: -1 })
                    function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                    this.Loops = fall(this.Loops)
                })
            }
            
        },
        onAlarmType(id) {
            let obj = {};
            obj = this.AlarmType.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.Loops = []
            this.Equipment = []
            this.AlarmTypeName = obj.ID
            console.log(this.AlarmTypeName)
            if (this.AlarmTypeName == 'EquipmentAlarm') {
                this.Loops = []
                this.Equipment = []
                this.HiddenType = 'block'

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

            } else if (this.AlarmTypeName == 'DiagnosticAlarm') {
                this.Loops = []
                this.Equipment = []
                this.HiddenType = 'none'
                this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
                    this.Loops = []
                    this.Equipment = []
                    this.LoopAnalyzerName = -1
                    var LoopsData = []
                    LoopsData = res.Loops.map((res) => {
                        this.LoopData.push(res)
                        return { Name: res.Name + '(回路)', ID: res.ID }
                    })

                    this.Loops.unshift(LoopsData, { Name: '全部', ID: -1 })
                    function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
                    this.Loops = fall(this.Loops)
                })
                console.log(this.Loops)
            }
        },
        Analyzers(id) { // 回路/色谱分析仪
            let obj = {};
            obj = this.Loops.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.LoopsID = obj.ID
            this.Equipment = []
            console.log(obj.ID)
            if (this.AlarmTypeName == 'EquipmentAlarm') {
                if (typeof obj.ID == 'number') {

                    this.Equipment = []
                    var ResName = this.LoopData.filter(el => el.ID == obj.ID).map((res) => {
                        return res.Name

                    })
                    var ResAbbrNAme = this.LoopData.filter(el => el.ID == obj.ID).map((res) => {
                        return res.AbbrName
                    })
                    this.Equipment.push({
                        Name: '全部' + '(' + ResName[0] + ')', ID: this.StationsAbbrName + '_' + ResAbbrNAme[0]
                    }, {
                        Name: ResName[0] + '流量计算机', ID: this.StationsAbbrName + '_' + ResAbbrNAme[0] + '_F'
                    }, {
                        Name: ResName[0] + '流量计', ID: this.StationsAbbrName + '_' + ResAbbrNAme[0] + '_M'
                    }, {
                        Name: ResName[0] + '温度变送器', ID: this.StationsAbbrName + '_' + ResAbbrNAme[0] + '_T'
                    }, {
                        Name: ResName[0] + '压力变送器', ID: this.StationsAbbrName + '_' + ResAbbrNAme[0] + '_P'
                    })
                    this.equipmentName = this.StationsAbbrName + '_' + ResAbbrNAme[0]
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
                    this.StationsData.filter(el => el.Name == this.StationName).map((res) => {
                        this.LoopAnalyzerName = '%'
                        var LoopsData = res.Loops.map((res) => {
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
            } else if (this.AlarmTypeName == 'DiagnosticAlarm') {
                this.Equipment = []
            }
            
        },
        onequipment(id) {
            let obj = {};
            obj = this.Equipment.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
        },
        Priority(id) {
            let obj = {};
            obj = this.Prioritys.find((item) => {//这里的userList就是上面遍历的数据源
                return item.ID === id;//筛选出匹配数据
            });
            this.PriorityVals = obj.Name;//获取的 name
            this.PriorityIds = id;//获取的 id
        },
        Refresh(){
            this.loading = true;
            this.currentPage = 1
            if (this.AlarmTypeName == 'EquipmentAlarm') {
                this.TableHidden = 'EquipmentAlarm'
                var data = {
                    AlarmArea: this.equipmentName,
                    Priority: this.priority,
                }
                var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/Alarm/GetRealtimeAlarm";
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
            } else if (this.AlarmTypeName == 'DiagnosticAlarm') {
                this.TableHidden = 'DiagnosticAlarm'
                var data = {
                    StationID: this.StaID,
                    LoopID: this.LoopAnalyzerName,
                }
                var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/Alarm/GetRealtimeDiagnosticAlarm";
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
            
            console.log(data);
           
        },
        Export() {
            this.loading = true;
            if (this.AlarmTypeName == 'EquipmentAlarm') {
                var data = {
                    AlarmArea: this.equipmentName,
                    Priority: this.priority,
                }
                console.log(data);
                var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/Alarm/ExportExcelRealtimeAlarm";
                data = JSON.stringify(JSON.stringify(data));
                console.log(data)

                axios.post(
                    ipaddress,
                    data,
                    { headers: { "Content-Type": "application/json" }, responseType: "blob" },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        console.log(res);
                        let fileName = "实时设备报警.xlsx";
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
            } else if (this.AlarmTypeName == 'DiagnosticAlarm') {
                var data = {
                    StationID: this.StaID,
                    LoopID: this.LoopAnalyzerName,
                }
                console.log(data);
                var ipaddress = "http://" + this.ipAddress + ":" + this.ipPort + "/api/Alarm/ExportExcelRealtimeDiagnosticAlarm";
                data = JSON.stringify(JSON.stringify(data));
                console.log(data)

                axios.post(
                    ipaddress,
                    data,
                    { headers: { "Content-Type": "application/json" }, responseType: "blob" },
                    { timeout: 1000 * 60 * 2 })
                    .then((res) => {
                        console.log(res);
                        let fileName = "实时诊断报警.xlsx";
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
    }
})
