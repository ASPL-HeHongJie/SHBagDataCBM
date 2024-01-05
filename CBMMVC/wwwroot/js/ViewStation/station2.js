var vm = new Vue({
    el: '#station',
    data: {
        StationLoops: [],
        Equipments: [],
        FlowmeterData: [],
        FlowmeterDatas: [],
        Daniel1dialogVisible: false,
        Weise1dialogVisible: false,
        Sick1dialogVisible: false,
        ManydialogVisible: false,
        LessdialogVisible: false,
        Elster1dialogVisible: false,
        Elster2dialogVisible: false,
        Elster4dialogVisible: false,
        RMG1dialogVisible: false,
        isElster4Click: false,
        isElster2Click: false,
        isRMG1Click: false,
        isElster1Click: false,
        Daniel1clicked: false,
        Weise1clicked: false,
        Sick1clicked: false,
        Manyclicked: false,
        Lessclicked: false,
        status: false,
        Turbo1dialogVisible: false,
        Turbo2dialogVisible: false,
        Turbo3dialogVisible: false,
        Turbo4dialogVisible: false,
        isTurbo1Click: false,
        isTurbo2Click: false,
        isTurbo3Click: false,
        isTurbo4Click: false,
        EquipmentsABB1dialogVisible: false,
        isEquipmentsABB1Click: false,
        EquipmentsDaniel1dialogVisible: false,
        isEquipmentsDaniel1Click: false,
        EquipmentsElster1dialogVisible: false,
        isEquipmentsElster1Click: false,
        Turbo1Title: "",
        Turbo2Title: "",
        Turbo3Title: "",
        Turbo4Title: "",
        EquipmentsDaniel1rName: '',
        LoopsName: '',
        withinVal: 0,
        minVal: '',
        loopData: '',
        EquipmentDatas: [],
        EquipmentsName: '',
        loopDatas: '',
        AbbrName: '',
        StaAbbrName: '',
        LoopAbbrName: '',
        listData: '',
        homeAbbrName: '',
        homeAbbrNames: '',
        StaAbbrName: '',
        DialogAverageValue: '',  //弹窗平均值
        titleDia: '',
        LesstitleDia: '',
        intervalId: null,
        station: station,
        AbbrNames: '',
        LoopAbbrNames: '',
        homeAbbrNames: '',
        EquipmentsAbbrNames: '',
        earlyWarningdialogVisible: false,
        chart: '',
        EarlyWarning: [],
        EarlyWarningDescription: '预警参数',
        EarlyWarningTrendTimesData: [],
        EarlyWarningTrendData: '',
        EarlyWarningStettingLoops: [],
        EarlyWarningSolution: ''
    },
    created() {
        this.EarlyWarningStettingLoops = earlyWarningStettingLoops;
        this.status = true
        this.stationName = station.Name
        this.StationLoops = station.Loops
        this.Equipments = station.Equipments
        this.homeAbbrNames = station.AbbrName
        this.homeAbbrName = station.AbbrName + '_'
        var ipaddress = "http://" + this.station.IPAddress + ":" + this.station.IPPort + "/api/Station/GetStationData";
        var aa = {
            "Data": {
                "LoopDatas": {
                    "5101": {
                        "Loop": {
                            "KSH_5101_C1": {
                                "name": "KSH_5101_C1",
                                "address": "SHCBM13.KSH_5101_LPD.F_C1",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_C2": {
                                "name": "KSH_5101_C2",
                                "address": "SHCBM13.KSH_5101_LPD.F_C2",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_C3": {
                                "name": "KSH_5101_C3",
                                "address": "SHCBM13.KSH_5101_LPD.F_C3",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_C6": {
                                "name": "KSH_5101_C6",
                                "address": "SHCBM13.KSH_5101_LPD.F_C6",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_CO2": {
                                "name": "KSH_5101_CO2",
                                "address": "SHCBM13.KSH_5101_LPD.F_CO2",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_EnergyFlowrate": {
                                "name": "KSH_5101_EnergyFlowrate",
                                "address": "SHCBM13.KSH_5101_F_ENGY-FLOWRATE.E_CV",
                                "value": "3019093.9694215367",
                                "quality": "Good"
                            },
                            "KSH_5101_FCCalculatedVOS": {
                                "name": "KSH_5101_FCCalculatedVOS",
                                "address": "SHCBM13.KSH_5101_LPD.F_FCCalcVOS",
                                "value": "408.59366",
                                "quality": "Good"
                            },
                            "KSH_5101_FCCalculationDevRate": {
                                "name": "KSH_5101_FCCalculationDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_FCCalcVOSDevRate",
                                "value": "0.26511452",
                                "quality": "Good"
                            },
                            "KSH_5101_FMToFCCommunicationAlarm": {
                                "name": "KSH_5101_FMToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5101_F_ALM-FMTOFC-COMM.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordCurDayEnergyCumulative": {
                                "name": "KSH_5101_ForwordCurDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-CD-ENGY-CUM.E_CV",
                                "value": "16676101.179466942",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordCurDayStandardCumulative": {
                                "name": "KSH_5101_ForwordCurDayStandardCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-CD-STD-CUM.E_CV",
                                "value": "440.69296875",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordCurHourEnergyCumulative": {
                                "name": "KSH_5101_ForwordCurHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-CHR-ENGY-CUM.E_CV",
                                "value": "1116537.4632760019",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordCurHourStandardCumulative": {
                                "name": "KSH_5101_ForwordCurHourStandardCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-CHR-STD-CUM.E_CV",
                                "value": "29.526865234375",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordEnergyCumulative": {
                                "name": "KSH_5101_ForwordEnergyCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-ENGY-CUM.E_CV",
                                "value": "29090283526.19421",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordGrossCumulative": {
                                "name": "KSH_5101_ForwordGrossCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-GROSS-CUM.E_CV",
                                "value": "11739414.670028",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordMassCumulative": {
                                "name": "KSH_5101_ForwordMassCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-MASS-CUM.E_CV",
                                "value": "629371.278429852",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordPreDayEnergyCumulative": {
                                "name": "KSH_5101_ForwordPreDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-PD-ENGY-CUM.E_CV",
                                "value": "64006551.539349265",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordPreDayGrossCumulative": {
                                "name": "KSH_5101_ForwordPreDayGrossCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-PD-GROSS-CUM.E_CV",
                                "value": "24298.919921875",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordPreDayMassCumulative": {
                                "name": "KSH_5101_ForwordPreDayMassCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-PD-MASS-CUM.E_CV",
                                "value": "1214.16875",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordPreDayStandardCumulative": {
                                "name": "KSH_5101_ForwordPreDayStandardCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-PD-STD-CUM.E_CV",
                                "value": "1691.39225",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordPreHourEnergyCumulative": {
                                "name": "KSH_5101_ForwordPreHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-PHR-ENGY-CUM.E_CV",
                                "value": "2459850.7720760065",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordPreHourStandardCumulative": {
                                "name": "KSH_5101_ForwordPreHourStandardCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-PHR-STD-CUM.E_CV",
                                "value": "65.0022890625",
                                "quality": "Good"
                            },
                            "KSH_5101_ForwordStandardCumulative": {
                                "name": "KSH_5101_ForwordStandardCumulative",
                                "address": "SHCBM13.KSH_5101_F_FWD-STD-CUM.E_CV",
                                "value": "761016.326064192",
                                "quality": "Good"
                            },
                            "KSH_5101_GrossFlowrate": {
                                "name": "KSH_5101_GrossFlowrate",
                                "address": "SHCBM13.KSH_5101_F_GROSS-FLOWRATE.F_CV",
                                "value": "1043.7059",
                                "quality": "Good"
                            },
                            "KSH_5101_HighCalorificValue": {
                                "name": "KSH_5101_HighCalorificValue",
                                "address": "SHCBM13.KSH_5101_F_HI-CALVAL.F_CV",
                                "value": "37.842525",
                                "quality": "Good"
                            },
                            "KSH_5101_IC4": {
                                "name": "KSH_5101_IC4",
                                "address": "SHCBM13.KSH_5101_LPD.F_IC4",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_IC5": {
                                "name": "KSH_5101_IC5",
                                "address": "SHCBM13.KSH_5101_LPD.F_IC5",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_LoopStatus": {
                                "name": "KSH_5101_LoopStatus",
                                "address": "SHCBM13.KSH_5101_LPD.F_LoopStat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_LowCalorificValue": {
                                "name": "KSH_5101_LowCalorificValue",
                                "address": "SHCBM13.KSH_5101_F_LO-CALVAL.F_CV",
                                "value": "34.13853",
                                "quality": "Good"
                            },
                            "KSH_5101_MassFlowrate": {
                                "name": "KSH_5101_MassFlowrate",
                                "address": "SHCBM13.KSH_5101_F_MASS-FLOWRATE.F_CV",
                                "value": "57.006958",
                                "quality": "Good"
                            },
                            "KSH_5101_N2": {
                                "name": "KSH_5101_N2",
                                "address": "SHCBM13.KSH_5101_LPD.F_N2",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_NC4": {
                                "name": "KSH_5101_NC4",
                                "address": "SHCBM13.KSH_5101_LPD.F_NC4",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_NC5": {
                                "name": "KSH_5101_NC5",
                                "address": "SHCBM13.KSH_5101_LPD.F_NC5",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_NeoC5": {
                                "name": "KSH_5101_NeoC5",
                                "address": "SHCBM13.KSH_5101_LPD.F_NeoC5",
                                "value": "???",
                                "quality": "Bad"
                            },
                            "KSH_5101_Path1AGain": {
                                "name": "KSH_5101_Path1AGain",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path1AGain",
                                "value": "17599",
                                "quality": "Good"
                            },
                            "KSH_5101_Path1Alarm": {
                                "name": "KSH_5101_Path1Alarm",
                                "address": "SHCBM13.KSH_5101_M_ALM-PATH1-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_Path1BGain": {
                                "name": "KSH_5101_Path1BGain",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path1BGain",
                                "value": "18107",
                                "quality": "Good"
                            },
                            "KSH_5101_Path1Performance": {
                                "name": "KSH_5101_Path1Performance",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path1Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5101_Path1VOG": {
                                "name": "KSH_5101_Path1VOG",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path1VOG",
                                "value": "9.394834",
                                "quality": "Good"
                            },
                            "KSH_5101_Path1VOGDevRate": {
                                "name": "KSH_5101_Path1VOGDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path1VOGDevRate",
                                "value": "4.5296254",
                                "quality": "Good"
                            },
                            "KSH_5101_Path1VOS": {
                                "name": "KSH_5101_Path1VOS",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path1VOS",
                                "value": "409.5814",
                                "quality": "Good"
                            },
                            "KSH_5101_Path1VOSDevRate": {
                                "name": "KSH_5101_Path1VOSDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path1VOSDevRate",
                                "value": "0.024015995",
                                "quality": "Good"
                            },
                            "KSH_5101_Path2AGain": {
                                "name": "KSH_5101_Path2AGain",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path2AGain",
                                "value": "18385",
                                "quality": "Good"
                            },
                            "KSH_5101_Path2Alarm": {
                                "name": "KSH_5101_Path2Alarm",
                                "address": "SHCBM13.KSH_5101_M_ALM-PATH2-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_Path2BGain": {
                                "name": "KSH_5101_Path2BGain",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path2BGain",
                                "value": "18241",
                                "quality": "Good"
                            },
                            "KSH_5101_Path2Performance": {
                                "name": "KSH_5101_Path2Performance",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path2Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5101_Path2VOG": {
                                "name": "KSH_5101_Path2VOG",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path2VOG",
                                "value": "8.9238",
                                "quality": "Good"
                            },
                            "KSH_5101_Path2VOGDevRate": {
                                "name": "KSH_5101_Path2VOGDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path2VOGDevRate",
                                "value": "0.7112244",
                                "quality": "Good"
                            },
                            "KSH_5101_Path2VOS": {
                                "name": "KSH_5101_Path2VOS",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path2VOS",
                                "value": "409.61526",
                                "quality": "Good"
                            },
                            "KSH_5101_Path2VOSDevRate": {
                                "name": "KSH_5101_Path2VOSDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path2VOSDevRate",
                                "value": "0.01574746",
                                "quality": "Good"
                            },
                            "KSH_5101_Path3AGain": {
                                "name": "KSH_5101_Path3AGain",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path3AGain",
                                "value": "18437",
                                "quality": "Good"
                            },
                            "KSH_5101_Path3Alarm": {
                                "name": "KSH_5101_Path3Alarm",
                                "address": "SHCBM13.KSH_5101_M_ALM-PATH3-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_Path3BGain": {
                                "name": "KSH_5101_Path3BGain",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path3BGain",
                                "value": "18266",
                                "quality": "Good"
                            },
                            "KSH_5101_Path3Performance": {
                                "name": "KSH_5101_Path3Performance",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path3Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5101_Path3VOG": {
                                "name": "KSH_5101_Path3VOG",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path3VOG",
                                "value": "8.968642",
                                "quality": "Good"
                            },
                            "KSH_5101_Path3VOGDevRate": {
                                "name": "KSH_5101_Path3VOGDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path3VOGDevRate",
                                "value": "0.212302",
                                "quality": "Good"
                            },
                            "KSH_5101_Path3VOS": {
                                "name": "KSH_5101_Path3VOS",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path3VOS",
                                "value": "409.6359",
                                "quality": "Good"
                            },
                            "KSH_5101_Path3VOSDevRate": {
                                "name": "KSH_5101_Path3VOSDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path3VOSDevRate",
                                "value": "0.010711849",
                                "quality": "Good"
                            },
                            "KSH_5101_Path4AGain": {
                                "name": "KSH_5101_Path4AGain",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path4AGain",
                                "value": "33737",
                                "quality": "Good"
                            },
                            "KSH_5101_Path4Alarm": {
                                "name": "KSH_5101_Path4Alarm",
                                "address": "SHCBM13.KSH_5101_M_ALM-PATH4-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_Path4BGain": {
                                "name": "KSH_5101_Path4BGain",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path4BGain",
                                "value": "18333",
                                "quality": "Good"
                            },
                            "KSH_5101_Path4Performance": {
                                "name": "KSH_5101_Path4Performance",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path4Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5101_Path4VOG": {
                                "name": "KSH_5101_Path4VOG",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path4VOG",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_Path4VOGDevRate": {
                                "name": "KSH_5101_Path4VOGDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path4VOGDevRate",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5101_Path4VOS": {
                                "name": "KSH_5101_Path4VOS",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path4VOS",
                                "value": "409.5994",
                                "quality": "Good"
                            },
                            "KSH_5101_Path4VOSDevRate": {
                                "name": "KSH_5101_Path4VOSDevRate",
                                "address": "SHCBM13.KSH_5101_LPD.F_Path4VOSDevRate",
                                "value": "0.019621007",
                                "quality": "Good"
                            },
                            "KSH_5101_PathsVOGAvg": {
                                "name": "KSH_5101_PathsVOGAvg",
                                "address": "SHCBM13.KSH_5101_LPD.F_PathsVOGAvg",
                                "value": "8.987723",
                                "quality": "Good"
                            },
                            "KSH_5101_PathsVOSAvg": {
                                "name": "KSH_5101_PathsVOSAvg",
                                "address": "SHCBM13.KSH_5101_LPD.F_PathsVOSAvg",
                                "value": "409.67978",
                                "quality": "Good"
                            },
                            "KSH_5101_PressureHighAlarm": {
                                "name": "KSH_5101_PressureHighAlarm",
                                "address": "SHCBM13.KSH_5101_P_ALM-PRESS-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_PressureInuse": {
                                "name": "KSH_5101_PressureInuse",
                                "address": "SHCBM13.KSH_5101_P_PRESS-INUSE.F_CV",
                                "value": "6621.0205",
                                "quality": "Good"
                            },
                            "KSH_5101_PressureKeypad": {
                                "name": "KSH_5101_PressureKeypad",
                                "address": "SHCBM13.KSH_5101_P_PRESS-KEYPAD.F_CV",
                                "value": "8000",
                                "quality": "Good"
                            },
                            "KSH_5101_PressureLowAlarm": {
                                "name": "KSH_5101_PressureLowAlarm",
                                "address": "SHCBM13.KSH_5101_P_ALM-PRESS-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_PressureMeasure": {
                                "name": "KSH_5101_PressureMeasure",
                                "address": "SHCBM13.KSH_5101_P_PRESS-MEASURE.F_CV",
                                "value": "6621.0205",
                                "quality": "Good"
                            },
                            "KSH_5101_ProfileFactor": {
                                "name": "KSH_5101_ProfileFactor",
                                "address": "SHCBM13.KSH_5101_LPD.F_ProfileFactor",
                                "value": "1.070554",
                                "quality": "Good"
                            },
                            "KSH_5101_PTToFCCommunicationAlarm": {
                                "name": "KSH_5101_PTToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5101_P_ALM-HART.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_RelativeDensity": {
                                "name": "KSH_5101_RelativeDensity",
                                "address": "SHCBM13.KSH_5101_F_RLT-DENS.F_CV",
                                "value": "0.5960002",
                                "quality": "Good"
                            },
                            "KSH_5101_StandardFlowrate": {
                                "name": "KSH_5101_StandardFlowrate",
                                "address": "SHCBM13.KSH_5101_F_STD-FLOWRATE.F_CV",
                                "value": "79.413284",
                                "quality": "Good"
                            },
                            "KSH_5101_SwirlAngle": {
                                "name": "KSH_5101_SwirlAngle",
                                "address": "SHCBM13.KSH_5101_LPD.F_SwirlAngle",
                                "value": "-5.4887424",
                                "quality": "Good"
                            },
                            "KSH_5101_TemperatureHighAlarm": {
                                "name": "KSH_5101_TemperatureHighAlarm",
                                "address": "SHCBM13.KSH_5101_T_ALM-TEMP-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_TemperatureInuse": {
                                "name": "KSH_5101_TemperatureInuse",
                                "address": "SHCBM13.KSH_5101_LPD.F_Temperature",
                                "value": "17.047092",
                                "quality": "Good"
                            },
                            "KSH_5101_TemperatureKeypad": {
                                "name": "KSH_5101_TemperatureKeypad",
                                "address": "SHCBM13.KSH_5101_T_TEMP-KEYPAD.F_CV",
                                "value": "10",
                                "quality": "Good"
                            },
                            "KSH_5101_TemperatureLowAlarm": {
                                "name": "KSH_5101_TemperatureLowAlarm",
                                "address": "SHCBM13.KSH_5101_T_ALM-TEMP-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_TemperatureMeasure": {
                                "name": "KSH_5101_TemperatureMeasure",
                                "address": "SHCBM13.KSH_5101_T_TEMP-MEASURE.F_CV",
                                "value": "17.047092",
                                "quality": "Good"
                            },
                            "KSH_5101_TTToFCCommunicationAlarm": {
                                "name": "KSH_5101_TTToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5101_T_ALM-HART.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5101_VOGInuse": {
                                "name": "KSH_5101_VOGInuse",
                                "address": "SHCBM13.KSH_5101_M_VOG-INUSE.F_CV",
                                "value": "8.987723",
                                "quality": "Good"
                            }
                        },
                        "Diagnostic": {
                            "id": 280,
                            "dateTime": "2023-11-29 14:27:50",
                            "name": "5101",
                            "flowmeterTypeName": "UltraSonic",
                            "flowmeterTypeDescription": "    ",
                            "brandName": "Elster",
                            "fmDiagnosticResult": "正常",
                            "ttDiagnosticResult": "正常",
                            "ptDiagnosticResult": "正常",
                            "fcDiagnosticResult": "正常",
                            "vosDiagnosticResult": "正常"
                        },
                        "AlarmCount": {
                            "PT": {
                                "name": "KSH_5101_P",
                                "value": "0"
                            },
                            "TT": {
                                "name": "KSH_5101_T",
                                "value": "0"
                            },
                            "FM": {
                                "name": "KSH_5101_M",
                                "value": "0"
                            },
                            "FC": {
                                "name": "KSH_5101_F",
                                "value": "0"
                            }
                        },
                        "EarlyWarningCount": 0
                    },
                    "5201": {
                        "Loop": {
                            "KSH_5201_C1": {
                                "name": "KSH_5201_C1",
                                "address": "SHCBM13.KSH_5201_LPD.F_C1",
                                "value": "93.422195",
                                "quality": "Good"
                            },
                            "KSH_5201_C2": {
                                "name": "KSH_5201_C2",
                                "address": "SHCBM13.KSH_5201_LPD.F_C2",
                                "value": "3.304484",
                                "quality": "Good"
                            },
                            "KSH_5201_C3": {
                                "name": "KSH_5201_C3",
                                "address": "SHCBM13.KSH_5201_LPD.F_C3",
                                "value": "0.711739",
                                "quality": "Good"
                            },
                            "KSH_5201_C6": {
                                "name": "KSH_5201_C6",
                                "address": "SHCBM13.KSH_5201_LPD.F_C6",
                                "value": "0.043781",
                                "quality": "Good"
                            },
                            "KSH_5201_CO2": {
                                "name": "KSH_5201_CO2",
                                "address": "SHCBM13.KSH_5201_LPD.F_CO2",
                                "value": "0.752977",
                                "quality": "Good"
                            },
                            "KSH_5201_EnergyFlowrate": {
                                "name": "KSH_5201_EnergyFlowrate",
                                "address": "SHCBM13.KSH_5201_F_ENGY-FLOWRATE.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_FCCalculatedVOS": {
                                "name": "KSH_5201_FCCalculatedVOS",
                                "address": "SHCBM13.KSH_5201_LPD.F_FCCalcVOS",
                                "value": "415.54532",
                                "quality": "Good"
                            },
                            "KSH_5201_FCCalculationDevRate": {
                                "name": "KSH_5201_FCCalculationDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_FCCalcVOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_FMToFCCommunicationAlarm": {
                                "name": "KSH_5201_FMToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5201_F_ALM-FMTOFC-COMM.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordCurDayEnergyCumulative": {
                                "name": "KSH_5201_ForwordCurDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-CD-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordCurDayStandardCumulative": {
                                "name": "KSH_5201_ForwordCurDayStandardCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-CD-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordCurHourEnergyCumulative": {
                                "name": "KSH_5201_ForwordCurHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-CHR-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordCurHourStandardCumulative": {
                                "name": "KSH_5201_ForwordCurHourStandardCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-CHR-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordEnergyCumulative": {
                                "name": "KSH_5201_ForwordEnergyCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-ENGY-CUM.E_CV",
                                "value": "34148970755.742695",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordGrossCumulative": {
                                "name": "KSH_5201_ForwordGrossCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-GROSS-CUM.E_CV",
                                "value": "14139005.508743",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordMassCumulative": {
                                "name": "KSH_5201_ForwordMassCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-MASS-CUM.E_CV",
                                "value": "722712.8263809059",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordPreDayEnergyCumulative": {
                                "name": "KSH_5201_ForwordPreDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-PD-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordPreDayGrossCumulative": {
                                "name": "KSH_5201_ForwordPreDayGrossCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-PD-GROSS-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordPreDayMassCumulative": {
                                "name": "KSH_5201_ForwordPreDayMassCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-PD-MASS-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordPreDayStandardCumulative": {
                                "name": "KSH_5201_ForwordPreDayStandardCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-PD-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordPreHourEnergyCumulative": {
                                "name": "KSH_5201_ForwordPreHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-PHR-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordPreHourStandardCumulative": {
                                "name": "KSH_5201_ForwordPreHourStandardCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-PHR-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_ForwordStandardCumulative": {
                                "name": "KSH_5201_ForwordStandardCumulative",
                                "address": "SHCBM13.KSH_5201_F_FWD-STD-CUM.E_CV",
                                "value": "902639.0628314479",
                                "quality": "Good"
                            },
                            "KSH_5201_GrossFlowrate": {
                                "name": "KSH_5201_GrossFlowrate",
                                "address": "SHCBM13.KSH_5201_F_GROSS-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_HighCalorificValue": {
                                "name": "KSH_5201_HighCalorificValue",
                                "address": "SHCBM13.KSH_5201_F_HI-CALVAL.F_CV",
                                "value": "37.842525",
                                "quality": "Good"
                            },
                            "KSH_5201_IC4": {
                                "name": "KSH_5201_IC4",
                                "address": "SHCBM13.KSH_5201_LPD.F_IC4",
                                "value": "0.085575",
                                "quality": "Good"
                            },
                            "KSH_5201_IC5": {
                                "name": "KSH_5201_IC5",
                                "address": "SHCBM13.KSH_5201_LPD.F_IC5",
                                "value": "0.022561999",
                                "quality": "Good"
                            },
                            "KSH_5201_LoopStatus": {
                                "name": "KSH_5201_LoopStatus",
                                "address": "SHCBM13.KSH_5201_LPD.F_LoopStat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_LowCalorificValue": {
                                "name": "KSH_5201_LowCalorificValue",
                                "address": "SHCBM13.KSH_5201_F_LO-CALVAL.F_CV",
                                "value": "34.13853",
                                "quality": "Good"
                            },
                            "KSH_5201_MassFlowrate": {
                                "name": "KSH_5201_MassFlowrate",
                                "address": "SHCBM13.KSH_5201_F_MASS-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_N2": {
                                "name": "KSH_5201_N2",
                                "address": "SHCBM13.KSH_5201_LPD.F_N2",
                                "value": "1.541959",
                                "quality": "Good"
                            },
                            "KSH_5201_NC4": {
                                "name": "KSH_5201_NC4",
                                "address": "SHCBM13.KSH_5201_LPD.F_NC4",
                                "value": "0.095961",
                                "quality": "Good"
                            },
                            "KSH_5201_NC5": {
                                "name": "KSH_5201_NC5",
                                "address": "SHCBM13.KSH_5201_LPD.F_NC5",
                                "value": "0.018767",
                                "quality": "Good"
                            },
                            "KSH_5201_NeoC5": {
                                "name": "KSH_5201_NeoC5",
                                "address": "SHCBM13.KSH_5201_LPD.F_NeoC5",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path1AGain": {
                                "name": "KSH_5201_Path1AGain",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path1AGain",
                                "value": "19414",
                                "quality": "Good"
                            },
                            "KSH_5201_Path1Alarm": {
                                "name": "KSH_5201_Path1Alarm",
                                "address": "SHCBM13.KSH_5201_M_ALM-PATH1-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path1BGain": {
                                "name": "KSH_5201_Path1BGain",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path1BGain",
                                "value": "19394",
                                "quality": "Good"
                            },
                            "KSH_5201_Path1Performance": {
                                "name": "KSH_5201_Path1Performance",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path1Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5201_Path1VOG": {
                                "name": "KSH_5201_Path1VOG",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path1VOG",
                                "value": "-0.001447623",
                                "quality": "Good"
                            },
                            "KSH_5201_Path1VOGDevRate": {
                                "name": "KSH_5201_Path1VOGDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path1VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path1VOS": {
                                "name": "KSH_5201_Path1VOS",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path1VOS",
                                "value": "415.0286",
                                "quality": "Good"
                            },
                            "KSH_5201_Path1VOSDevRate": {
                                "name": "KSH_5201_Path1VOSDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path1VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path2AGain": {
                                "name": "KSH_5201_Path2AGain",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path2AGain",
                                "value": "18618",
                                "quality": "Good"
                            },
                            "KSH_5201_Path2Alarm": {
                                "name": "KSH_5201_Path2Alarm",
                                "address": "SHCBM13.KSH_5201_M_ALM-PATH2-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path2BGain": {
                                "name": "KSH_5201_Path2BGain",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path2BGain",
                                "value": "18644",
                                "quality": "Good"
                            },
                            "KSH_5201_Path2Performance": {
                                "name": "KSH_5201_Path2Performance",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path2Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5201_Path2VOG": {
                                "name": "KSH_5201_Path2VOG",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path2VOG",
                                "value": "0.0042998376",
                                "quality": "Good"
                            },
                            "KSH_5201_Path2VOGDevRate": {
                                "name": "KSH_5201_Path2VOGDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path2VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path2VOS": {
                                "name": "KSH_5201_Path2VOS",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path2VOS",
                                "value": "415.07382",
                                "quality": "Good"
                            },
                            "KSH_5201_Path2VOSDevRate": {
                                "name": "KSH_5201_Path2VOSDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path2VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path3AGain": {
                                "name": "KSH_5201_Path3AGain",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path3AGain",
                                "value": "18727",
                                "quality": "Good"
                            },
                            "KSH_5201_Path3Alarm": {
                                "name": "KSH_5201_Path3Alarm",
                                "address": "SHCBM13.KSH_5201_M_ALM-PATH3-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path3BGain": {
                                "name": "KSH_5201_Path3BGain",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path3BGain",
                                "value": "18701",
                                "quality": "Good"
                            },
                            "KSH_5201_Path3Performance": {
                                "name": "KSH_5201_Path3Performance",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path3Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5201_Path3VOG": {
                                "name": "KSH_5201_Path3VOG",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path3VOG",
                                "value": "-0.00034125693",
                                "quality": "Good"
                            },
                            "KSH_5201_Path3VOGDevRate": {
                                "name": "KSH_5201_Path3VOGDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path3VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path3VOS": {
                                "name": "KSH_5201_Path3VOS",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path3VOS",
                                "value": "415.05685",
                                "quality": "Good"
                            },
                            "KSH_5201_Path3VOSDevRate": {
                                "name": "KSH_5201_Path3VOSDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path3VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path4AGain": {
                                "name": "KSH_5201_Path4AGain",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path4AGain",
                                "value": "32854",
                                "quality": "Good"
                            },
                            "KSH_5201_Path4Alarm": {
                                "name": "KSH_5201_Path4Alarm",
                                "address": "SHCBM13.KSH_5201_M_ALM-PATH4-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path4BGain": {
                                "name": "KSH_5201_Path4BGain",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path4BGain",
                                "value": "18069",
                                "quality": "Good"
                            },
                            "KSH_5201_Path4Performance": {
                                "name": "KSH_5201_Path4Performance",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path4Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5201_Path4VOG": {
                                "name": "KSH_5201_Path4VOG",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path4VOG",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path4VOGDevRate": {
                                "name": "KSH_5201_Path4VOGDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path4VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_Path4VOS": {
                                "name": "KSH_5201_Path4VOS",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path4VOS",
                                "value": "415.1035",
                                "quality": "Good"
                            },
                            "KSH_5201_Path4VOSDevRate": {
                                "name": "KSH_5201_Path4VOSDevRate",
                                "address": "SHCBM13.KSH_5201_LPD.F_Path4VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_PathsVOGAvg": {
                                "name": "KSH_5201_PathsVOGAvg",
                                "address": "SHCBM13.KSH_5201_LPD.F_PathsVOGAvg",
                                "value": "0.0013919374",
                                "quality": "Good"
                            },
                            "KSH_5201_PathsVOSAvg": {
                                "name": "KSH_5201_PathsVOSAvg",
                                "address": "SHCBM13.KSH_5201_LPD.F_PathsVOSAvg",
                                "value": "415.0657",
                                "quality": "Good"
                            },
                            "KSH_5201_PressureHighAlarm": {
                                "name": "KSH_5201_PressureHighAlarm",
                                "address": "SHCBM13.KSH_5201_P_ALM-PRESS-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_PressureInuse": {
                                "name": "KSH_5201_PressureInuse",
                                "address": "SHCBM13.KSH_5201_P_PRESS-INUSE.F_CV",
                                "value": "6631.937",
                                "quality": "Good"
                            },
                            "KSH_5201_PressureKeypad": {
                                "name": "KSH_5201_PressureKeypad",
                                "address": "SHCBM13.KSH_5201_P_PRESS-KEYPAD.F_CV",
                                "value": "8000",
                                "quality": "Good"
                            },
                            "KSH_5201_PressureLowAlarm": {
                                "name": "KSH_5201_PressureLowAlarm",
                                "address": "SHCBM13.KSH_5201_P_ALM-PRESS-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_PressureMeasure": {
                                "name": "KSH_5201_PressureMeasure",
                                "address": "SHCBM13.KSH_5201_P_PRESS-MEASURE.F_CV",
                                "value": "6631.937",
                                "quality": "Good"
                            },
                            "KSH_5201_ProfileFactor": {
                                "name": "KSH_5201_ProfileFactor",
                                "address": "SHCBM13.KSH_5201_LPD.F_ProfileFactor",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_PTToFCCommunicationAlarm": {
                                "name": "KSH_5201_PTToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5201_P_ALM-HART.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_RelativeDensity": {
                                "name": "KSH_5201_RelativeDensity",
                                "address": "SHCBM13.KSH_5201_F_RLT-DENS.F_CV",
                                "value": "0.5960002",
                                "quality": "Good"
                            },
                            "KSH_5201_StandardFlowrate": {
                                "name": "KSH_5201_StandardFlowrate",
                                "address": "SHCBM13.KSH_5201_F_STD-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_SwirlAngle": {
                                "name": "KSH_5201_SwirlAngle",
                                "address": "SHCBM13.KSH_5201_LPD.F_SwirlAngle",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_TemperatureHighAlarm": {
                                "name": "KSH_5201_TemperatureHighAlarm",
                                "address": "SHCBM13.KSH_5201_T_ALM-TEMP-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_TemperatureInuse": {
                                "name": "KSH_5201_TemperatureInuse",
                                "address": "SHCBM13.KSH_5201_LPD.F_Temperature",
                                "value": "24.11996",
                                "quality": "Good"
                            },
                            "KSH_5201_TemperatureKeypad": {
                                "name": "KSH_5201_TemperatureKeypad",
                                "address": "SHCBM13.KSH_5201_T_TEMP-KEYPAD.F_CV",
                                "value": "10",
                                "quality": "Good"
                            },
                            "KSH_5201_TemperatureLowAlarm": {
                                "name": "KSH_5201_TemperatureLowAlarm",
                                "address": "SHCBM13.KSH_5201_T_ALM-TEMP-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_TemperatureMeasure": {
                                "name": "KSH_5201_TemperatureMeasure",
                                "address": "SHCBM13.KSH_5201_T_TEMP-MEASURE.F_CV",
                                "value": "24.11996",
                                "quality": "Good"
                            },
                            "KSH_5201_TTToFCCommunicationAlarm": {
                                "name": "KSH_5201_TTToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5201_T_ALM-HART.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5201_VOGInuse": {
                                "name": "KSH_5201_VOGInuse",
                                "address": "SHCBM13.KSH_5201_M_VOG-INUSE.F_CV",
                                "value": "0.0013919374",
                                "quality": "Good"
                            }
                        },
                        "Diagnostic": {
                            "id": 281,
                            "dateTime": "2023-11-29 14:27:50",
                            "name": "5201",
                            "flowmeterTypeName": "UltraSonic",
                            "flowmeterTypeDescription": "    ",
                            "brandName": "Elster",
                            "fmDiagnosticResult": "正常",
                            "ttDiagnosticResult": "正常",
                            "ptDiagnosticResult": "正常",
                            "fcDiagnosticResult": "正常",
                            "vosDiagnosticResult": "正常"
                        },
                        "AlarmCount": {
                            "PT": {
                                "name": "KSH_5201_P",
                                "value": "0"
                            },
                            "TT": {
                                "name": "KSH_5201_T",
                                "value": "0"
                            },
                            "FM": {
                                "name": "KSH_5201_M",
                                "value": "0"
                            },
                            "FC": {
                                "name": "KSH_5201_F",
                                "value": "0"
                            }
                        },
                        "EarlyWarningCount": 2
                    },
                    "5301": {
                        "Loop": {
                            "KSH_5301_C1": {
                                "name": "KSH_5301_C1",
                                "address": "SHCBM13.KSH_5301_LPD.F_C1",
                                "value": "93.422195",
                                "quality": "Good"
                            },
                            "KSH_5301_C2": {
                                "name": "KSH_5301_C2",
                                "address": "SHCBM13.KSH_5301_LPD.F_C2",
                                "value": "3.304484",
                                "quality": "Good"
                            },
                            "KSH_5301_C3": {
                                "name": "KSH_5301_C3",
                                "address": "SHCBM13.KSH_5301_LPD.F_C3",
                                "value": "0.711739",
                                "quality": "Good"
                            },
                            "KSH_5301_C6": {
                                "name": "KSH_5301_C6",
                                "address": "SHCBM13.KSH_5301_LPD.F_C6",
                                "value": "0.043781",
                                "quality": "Good"
                            },
                            "KSH_5301_CO2": {
                                "name": "KSH_5301_CO2",
                                "address": "SHCBM13.KSH_5301_LPD.F_CO2",
                                "value": "0.752977",
                                "quality": "Good"
                            },
                            "KSH_5301_EnergyFlowrate": {
                                "name": "KSH_5301_EnergyFlowrate",
                                "address": "SHCBM13.KSH_5301_F_ENGY-FLOWRATE.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_FCCalculatedVOS": {
                                "name": "KSH_5301_FCCalculatedVOS",
                                "address": "SHCBM13.KSH_5301_LPD.F_FCCalcVOS",
                                "value": "431.2416",
                                "quality": "Good"
                            },
                            "KSH_5301_FCCalculationDevRate": {
                                "name": "KSH_5301_FCCalculationDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_FCCalcVOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_FMToFCCommunicationAlarm": {
                                "name": "KSH_5301_FMToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5301_F_ALM-FMTOFC-COMM.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordCurDayEnergyCumulative": {
                                "name": "KSH_5301_ForwordCurDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-CD-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordCurDayStandardCumulative": {
                                "name": "KSH_5301_ForwordCurDayStandardCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-CD-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordCurHourEnergyCumulative": {
                                "name": "KSH_5301_ForwordCurHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-CHR-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordCurHourStandardCumulative": {
                                "name": "KSH_5301_ForwordCurHourStandardCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-CHR-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordEnergyCumulative": {
                                "name": "KSH_5301_ForwordEnergyCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-ENGY-CUM.E_CV",
                                "value": "95257434282.8395",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordGrossCumulative": {
                                "name": "KSH_5301_ForwordGrossCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-GROSS-CUM.E_CV",
                                "value": "38198100.628289",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordMassCumulative": {
                                "name": "KSH_5301_ForwordMassCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-MASS-CUM.E_CV",
                                "value": "1932816.780839217",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordPreDayEnergyCumulative": {
                                "name": "KSH_5301_ForwordPreDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-PD-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordPreDayGrossCumulative": {
                                "name": "KSH_5301_ForwordPreDayGrossCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-PD-GROSS-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordPreDayMassCumulative": {
                                "name": "KSH_5301_ForwordPreDayMassCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-PD-MASS-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordPreDayStandardCumulative": {
                                "name": "KSH_5301_ForwordPreDayStandardCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-PD-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordPreHourEnergyCumulative": {
                                "name": "KSH_5301_ForwordPreHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-PHR-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordPreHourStandardCumulative": {
                                "name": "KSH_5301_ForwordPreHourStandardCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-PHR-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_ForwordStandardCumulative": {
                                "name": "KSH_5301_ForwordStandardCumulative",
                                "address": "SHCBM13.KSH_5301_F_FWD-STD-CUM.E_CV",
                                "value": "2490932.977677589",
                                "quality": "Good"
                            },
                            "KSH_5301_GrossFlowrate": {
                                "name": "KSH_5301_GrossFlowrate",
                                "address": "SHCBM13.KSH_5301_F_GROSS-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_HighCalorificValue": {
                                "name": "KSH_5301_HighCalorificValue",
                                "address": "SHCBM13.KSH_5301_F_HI-CALVAL.F_CV",
                                "value": "37.842525",
                                "quality": "Good"
                            },
                            "KSH_5301_IC4": {
                                "name": "KSH_5301_IC4",
                                "address": "SHCBM13.KSH_5301_LPD.F_IC4",
                                "value": "0.085575",
                                "quality": "Good"
                            },
                            "KSH_5301_IC5": {
                                "name": "KSH_5301_IC5",
                                "address": "SHCBM13.KSH_5301_LPD.F_IC5",
                                "value": "0.022561999",
                                "quality": "Good"
                            },
                            "KSH_5301_LoopStatus": {
                                "name": "KSH_5301_LoopStatus",
                                "address": "SHCBM13.KSH_5301_LPD.F_LoopStat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_LowCalorificValue": {
                                "name": "KSH_5301_LowCalorificValue",
                                "address": "SHCBM13.KSH_5301_F_LO-CALVAL.F_CV",
                                "value": "34.13853",
                                "quality": "Good"
                            },
                            "KSH_5301_MassFlowrate": {
                                "name": "KSH_5301_MassFlowrate",
                                "address": "SHCBM13.KSH_5301_F_MASS-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_N2": {
                                "name": "KSH_5301_N2",
                                "address": "SHCBM13.KSH_5301_LPD.F_N2",
                                "value": "1.541959",
                                "quality": "Good"
                            },
                            "KSH_5301_NC4": {
                                "name": "KSH_5301_NC4",
                                "address": "SHCBM13.KSH_5301_LPD.F_NC4",
                                "value": "0.095961",
                                "quality": "Good"
                            },
                            "KSH_5301_NC5": {
                                "name": "KSH_5301_NC5",
                                "address": "SHCBM13.KSH_5301_LPD.F_NC5",
                                "value": "0.018767",
                                "quality": "Good"
                            },
                            "KSH_5301_NeoC5": {
                                "name": "KSH_5301_NeoC5",
                                "address": "SHCBM13.KSH_5301_LPD.F_NeoC5",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path1AGain": {
                                "name": "KSH_5301_Path1AGain",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path1AGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path1Alarm": {
                                "name": "KSH_5301_Path1Alarm",
                                "address": "SHCBM13.KSH_5301_M_ALM-PATH1-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path1BGain": {
                                "name": "KSH_5301_Path1BGain",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path1BGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path1Performance": {
                                "name": "KSH_5301_Path1Performance",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path1Perf",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path1VOG": {
                                "name": "KSH_5301_Path1VOG",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path1VOG",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path1VOGDevRate": {
                                "name": "KSH_5301_Path1VOGDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path1VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path1VOS": {
                                "name": "KSH_5301_Path1VOS",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path1VOS",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path1VOSDevRate": {
                                "name": "KSH_5301_Path1VOSDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path1VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path2AGain": {
                                "name": "KSH_5301_Path2AGain",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path2AGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path2Alarm": {
                                "name": "KSH_5301_Path2Alarm",
                                "address": "SHCBM13.KSH_5301_M_ALM-PATH2-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path2BGain": {
                                "name": "KSH_5301_Path2BGain",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path2BGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path2Performance": {
                                "name": "KSH_5301_Path2Performance",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path2Perf",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path2VOG": {
                                "name": "KSH_5301_Path2VOG",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path2VOG",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path2VOGDevRate": {
                                "name": "KSH_5301_Path2VOGDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path2VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path2VOS": {
                                "name": "KSH_5301_Path2VOS",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path2VOS",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path2VOSDevRate": {
                                "name": "KSH_5301_Path2VOSDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path2VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path3AGain": {
                                "name": "KSH_5301_Path3AGain",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path3AGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path3Alarm": {
                                "name": "KSH_5301_Path3Alarm",
                                "address": "SHCBM13.KSH_5301_M_ALM-PATH3-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path3BGain": {
                                "name": "KSH_5301_Path3BGain",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path3BGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path3Performance": {
                                "name": "KSH_5301_Path3Performance",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path3Perf",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path3VOG": {
                                "name": "KSH_5301_Path3VOG",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path3VOG",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path3VOGDevRate": {
                                "name": "KSH_5301_Path3VOGDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path3VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path3VOS": {
                                "name": "KSH_5301_Path3VOS",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path3VOS",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path3VOSDevRate": {
                                "name": "KSH_5301_Path3VOSDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path3VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path4AGain": {
                                "name": "KSH_5301_Path4AGain",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path4AGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path4Alarm": {
                                "name": "KSH_5301_Path4Alarm",
                                "address": "SHCBM13.KSH_5301_M_ALM-PATH4-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path4BGain": {
                                "name": "KSH_5301_Path4BGain",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path4BGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path4Performance": {
                                "name": "KSH_5301_Path4Performance",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path4Perf",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path4VOG": {
                                "name": "KSH_5301_Path4VOG",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path4VOG",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path4VOGDevRate": {
                                "name": "KSH_5301_Path4VOGDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path4VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path4VOS": {
                                "name": "KSH_5301_Path4VOS",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path4VOS",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_Path4VOSDevRate": {
                                "name": "KSH_5301_Path4VOSDevRate",
                                "address": "SHCBM13.KSH_5301_LPD.F_Path4VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_PathsVOGAvg": {
                                "name": "KSH_5301_PathsVOGAvg",
                                "address": "SHCBM13.KSH_5301_LPD.F_PathsVOGAvg",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_PathsVOSAvg": {
                                "name": "KSH_5301_PathsVOSAvg",
                                "address": "SHCBM13.KSH_5301_LPD.F_PathsVOSAvg",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_PressureHighAlarm": {
                                "name": "KSH_5301_PressureHighAlarm",
                                "address": "SHCBM13.KSH_5301_P_ALM-PRESS-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_PressureInuse": {
                                "name": "KSH_5301_PressureInuse",
                                "address": "SHCBM13.KSH_5301_P_PRESS-INUSE.F_CV",
                                "value": "105.55792",
                                "quality": "Good"
                            },
                            "KSH_5301_PressureKeypad": {
                                "name": "KSH_5301_PressureKeypad",
                                "address": "SHCBM13.KSH_5301_P_PRESS-KEYPAD.F_CV",
                                "value": "8000",
                                "quality": "Good"
                            },
                            "KSH_5301_PressureLowAlarm": {
                                "name": "KSH_5301_PressureLowAlarm",
                                "address": "SHCBM13.KSH_5301_P_ALM-PRESS-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_PressureMeasure": {
                                "name": "KSH_5301_PressureMeasure",
                                "address": "SHCBM13.KSH_5301_P_PRESS-MEASURE.F_CV",
                                "value": "105.55792",
                                "quality": "Good"
                            },
                            "KSH_5301_ProfileFactor": {
                                "name": "KSH_5301_ProfileFactor",
                                "address": "SHCBM13.KSH_5301_LPD.F_ProfileFactor",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_PTToFCCommunicationAlarm": {
                                "name": "KSH_5301_PTToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5301_P_ALM-HART.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_RelativeDensity": {
                                "name": "KSH_5301_RelativeDensity",
                                "address": "SHCBM13.KSH_5301_F_RLT-DENS.F_CV",
                                "value": "0.5960002",
                                "quality": "Good"
                            },
                            "KSH_5301_StandardFlowrate": {
                                "name": "KSH_5301_StandardFlowrate",
                                "address": "SHCBM13.KSH_5301_F_STD-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_SwirlAngle": {
                                "name": "KSH_5301_SwirlAngle",
                                "address": "SHCBM13.KSH_5301_LPD.F_SwirlAngle",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_TemperatureHighAlarm": {
                                "name": "KSH_5301_TemperatureHighAlarm",
                                "address": "SHCBM13.KSH_5301_T_ALM-TEMP-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_TemperatureInuse": {
                                "name": "KSH_5301_TemperatureInuse",
                                "address": "SHCBM13.KSH_5301_LPD.F_Temperature",
                                "value": "25.377365",
                                "quality": "Good"
                            },
                            "KSH_5301_TemperatureKeypad": {
                                "name": "KSH_5301_TemperatureKeypad",
                                "address": "SHCBM13.KSH_5301_T_TEMP-KEYPAD.F_CV",
                                "value": "10",
                                "quality": "Good"
                            },
                            "KSH_5301_TemperatureLowAlarm": {
                                "name": "KSH_5301_TemperatureLowAlarm",
                                "address": "SHCBM13.KSH_5301_T_ALM-TEMP-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_TemperatureMeasure": {
                                "name": "KSH_5301_TemperatureMeasure",
                                "address": "SHCBM13.KSH_5301_T_TEMP-MEASURE.F_CV",
                                "value": "25.377365",
                                "quality": "Good"
                            },
                            "KSH_5301_TTToFCCommunicationAlarm": {
                                "name": "KSH_5301_TTToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5301_T_ALM-HART.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5301_VOGInuse": {
                                "name": "KSH_5301_VOGInuse",
                                "address": "SHCBM13.KSH_5301_M_VOG-INUSE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            }
                        },
                        "Diagnostic": {
                            "id": 282,
                            "dateTime": "2023-11-29 14:27:50",
                            "name": "5301",
                            "flowmeterTypeName": "UltraSonic",
                            "flowmeterTypeDescription": "    ",
                            "brandName": "Elster",
                            "fmDiagnosticResult": "正常",
                            "ttDiagnosticResult": "正常",
                            "ptDiagnosticResult": "正常",
                            "fcDiagnosticResult": "正常",
                            "vosDiagnosticResult": "正常"
                        },
                        "AlarmCount": {
                            "PT": {
                                "name": "KSH_5301_P",
                                "value": "0"
                            },
                            "TT": {
                                "name": "KSH_5301_T",
                                "value": "0"
                            },
                            "FM": {
                                "name": "KSH_5301_M",
                                "value": "0"
                            },
                            "FC": {
                                "name": "KSH_5301_F",
                                "value": "0"
                            }
                        },
                        "EarlyWarningCount": 0
                    },
                    "5401": {
                        "Loop": {
                            "KSH_5401_C1": {
                                "name": "KSH_5401_C1",
                                "address": "SHCBM13.KSH_5401_LPD.F_C1",
                                "value": "93.422195",
                                "quality": "Good"
                            },
                            "KSH_5401_C2": {
                                "name": "KSH_5401_C2",
                                "address": "SHCBM13.KSH_5401_LPD.F_C2",
                                "value": "3.304484",
                                "quality": "Good"
                            },
                            "KSH_5401_C3": {
                                "name": "KSH_5401_C3",
                                "address": "SHCBM13.KSH_5401_LPD.F_C3",
                                "value": "0.711739",
                                "quality": "Good"
                            },
                            "KSH_5401_C6": {
                                "name": "KSH_5401_C6",
                                "address": "SHCBM13.KSH_5401_LPD.F_C6",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_CO2": {
                                "name": "KSH_5401_CO2",
                                "address": "SHCBM13.KSH_5401_LPD.F_CO2",
                                "value": "0.752977",
                                "quality": "Good"
                            },
                            "KSH_5401_CrossFlow": {
                                "name": "KSH_5401_CrossFlow",
                                "address": "SHCBM13.KSH_5401_LPD.F_CrossFlow",
                                "value": "0.9672056",
                                "quality": "Good"
                            },
                            "KSH_5401_EnergyFlowrate": {
                                "name": "KSH_5401_EnergyFlowrate",
                                "address": "SHCBM13.KSH_5401_F_ENGY-FLOWRATE.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_FCCalculateVOS": {
                                "name": "KSH_5401_FCCalculateVOS",
                                "address": "SHCBM13.KSH_5401_LPD.F_FCCalcVOS",
                                "value": "415.93152",
                                "quality": "Good"
                            },
                            "KSH_5401_FCCalculationDevRate": {
                                "name": "KSH_5401_FCCalculationDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_FCCalcVOSDevRate",
                                "value": "0.18421881",
                                "quality": "Good"
                            },
                            "KSH_5401_FMToFCCommunicationAlarm": {
                                "name": "KSH_5401_FMToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5401_F_ALM-FMTOFC-COMM.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordCurDayEnergyCumulative": {
                                "name": "KSH_5401_ForwordCurDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-CD-ENGY-CUM.E_CV",
                                "value": "3414215.7188408673",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordCurDayStandardCumulative": {
                                "name": "KSH_5401_ForwordCurDayStandardCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-CD-STD-CUM.E_CV",
                                "value": "90.2055625",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordCurHourEnergyCumulative": {
                                "name": "KSH_5401_ForwordCurHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-CHR-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordCurHourStandardCumulative": {
                                "name": "KSH_5401_ForwordCurHourStandardCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-CHR-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordEnergyCumulative": {
                                "name": "KSH_5401_ForwordEnergyCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-ENGY-CUM.E_CV",
                                "value": "107806387.67701504",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordGrossCumulative": {
                                "name": "KSH_5401_ForwordGrossCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-GROSS-CUM.E_CV",
                                "value": "49925.9765625",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordMassCumulative": {
                                "name": "KSH_5401_ForwordMassCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-MASS-CUM.E_CV",
                                "value": "2031.983625",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordPreDayEnergyCumulative": {
                                "name": "KSH_5401_ForwordPreDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-PD-ENGY-CUM.E_CV",
                                "value": "3792339.945480913",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordPreDayGrossCumulative": {
                                "name": "KSH_5401_ForwordPreDayGrossCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-PD-GROSS-CUM.E_CV",
                                "value": "1468.5780029296875",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordPreDayMassCumulative": {
                                "name": "KSH_5401_ForwordPreDayMassCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-PD-MASS-CUM.E_CV",
                                "value": "71.94053125",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordPreDayStandardCumulative": {
                                "name": "KSH_5401_ForwordPreDayStandardCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-PD-STD-CUM.E_CV",
                                "value": "100.195828125",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordPreHourEnergyCumulative": {
                                "name": "KSH_5401_ForwordPreHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-PHR-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordPreHourStandardCumulative": {
                                "name": "KSH_5401_ForwordPreHourStandardCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-PHR-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_ForwordStandardCumulative": {
                                "name": "KSH_5401_ForwordStandardCumulative",
                                "address": "SHCBM13.KSH_5401_F_FWD-STD-CUM.E_CV",
                                "value": "2843.238",
                                "quality": "Good"
                            },
                            "KSH_5401_GCToFCCommunicationAlarm": {
                                "name": "KSH_5401_GCToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5401_F_ALM-GCTOFC-COMM.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_GrossFlowrate": {
                                "name": "KSH_5401_GrossFlowrate",
                                "address": "SHCBM13.KSH_5401_F_GROSS-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_HighCalorificValue": {
                                "name": "KSH_5401_HighCalorificValue",
                                "address": "SHCBM13.KSH_5401_F_HI-CALVAL.F_CV",
                                "value": "37.84928",
                                "quality": "Good"
                            },
                            "KSH_5401_IC4": {
                                "name": "KSH_5401_IC4",
                                "address": "SHCBM13.KSH_5401_LPD.F_IC4",
                                "value": "0.085575",
                                "quality": "Good"
                            },
                            "KSH_5401_IC5": {
                                "name": "KSH_5401_IC5",
                                "address": "SHCBM13.KSH_5401_LPD.F_IC5",
                                "value": "0.022561999",
                                "quality": "Good"
                            },
                            "KSH_5401_LineDensity": {
                                "name": "KSH_5401_LineDensity",
                                "address": "SHCBM13.KSH_5401_F_LINE-DENS.F_CV",
                                "value": "52.525806",
                                "quality": "Good"
                            },
                            "KSH_5401_LoopStatus": {
                                "name": "KSH_5401_LoopStatus",
                                "address": "SHCBM13.KSH_5401_LPD.F_LoopStat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_LowCalorificValue": {
                                "name": "KSH_5401_LowCalorificValue",
                                "address": "SHCBM13.KSH_5401_F_LO-CALVAL.F_CV",
                                "value": "34.144886",
                                "quality": "Good"
                            },
                            "KSH_5401_MassFlowrate": {
                                "name": "KSH_5401_MassFlowrate",
                                "address": "SHCBM13.KSH_5401_F_MASS-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_N2": {
                                "name": "KSH_5401_N2",
                                "address": "SHCBM13.KSH_5401_LPD.F_N2",
                                "value": "1.541959",
                                "quality": "Good"
                            },
                            "KSH_5401_NC4": {
                                "name": "KSH_5401_NC4",
                                "address": "SHCBM13.KSH_5401_LPD.F_NC4",
                                "value": "0.095961",
                                "quality": "Good"
                            },
                            "KSH_5401_NC5": {
                                "name": "KSH_5401_NC5",
                                "address": "SHCBM13.KSH_5401_LPD.F_NC5",
                                "value": "0.018767",
                                "quality": "Good"
                            },
                            "KSH_5401_NeoC5": {
                                "name": "KSH_5401_NeoC5",
                                "address": "SHCBM13.KSH_5401_LPD.F_NeoC5",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1AGain": {
                                "name": "KSH_5401_Path1AGain",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1AGain",
                                "value": "805",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1ASNR": {
                                "name": "KSH_5401_Path1ASNR",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1ASNR",
                                "value": "64.43138",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1BGain": {
                                "name": "KSH_5401_Path1BGain",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1BGain",
                                "value": "805",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1BSNR": {
                                "name": "KSH_5401_Path1BSNR",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1BSNR",
                                "value": "64.29968",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1Performance": {
                                "name": "KSH_5401_Path1Performance",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1PulseRate": {
                                "name": "KSH_5401_Path1PulseRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1PulseRate",
                                "value": "-0.1057087",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1Status": {
                                "name": "KSH_5401_Path1Status",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1Stat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1TransducerAGainAlarm": {
                                "name": "KSH_5401_Path1TransducerAGainAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F8.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1TransducerASignalLowAlarm": {
                                "name": "KSH_5401_Path1TransducerASignalLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F10.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1TransducerASNRAlarm": {
                                "name": "KSH_5401_Path1TransducerASNRAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F12.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1TransducerAUsedRateAlarm": {
                                "name": "KSH_5401_Path1TransducerAUsedRateAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F6.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1TransducerBGainAlarm": {
                                "name": "KSH_5401_Path1TransducerBGainAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1TransducerBSignalLowAlarm": {
                                "name": "KSH_5401_Path1TransducerBSignalLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F11.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1TransducerBSNRAlarm": {
                                "name": "KSH_5401_Path1TransducerBSNRAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F13.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1TransducerBUsedRateAlarm": {
                                "name": "KSH_5401_Path1TransducerBUsedRateAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F7.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1VOG": {
                                "name": "KSH_5401_Path1VOG",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1VOG",
                                "value": "-0.03156442",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1VOGAlarm": {
                                "name": "KSH_5401_Path1VOGAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1VOGDevRate": {
                                "name": "KSH_5401_Path1VOGDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1VOGDevRate",
                                "value": "26.32894",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1VOGRatioAlarm": {
                                "name": "KSH_5401_Path1VOGRatioAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F2.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1VOS": {
                                "name": "KSH_5401_Path1VOS",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1VOS",
                                "value": "416.48337",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1VOSAlarm": {
                                "name": "KSH_5401_Path1VOSAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F1.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1VOSDevRate": {
                                "name": "KSH_5401_Path1VOSDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path1VOSDevRate",
                                "value": "0.009273934",
                                "quality": "Good"
                            },
                            "KSH_5401_Path1VOSRatioAlarm": {
                                "name": "KSH_5401_Path1VOSRatioAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH1-F3.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2AGain": {
                                "name": "KSH_5401_Path2AGain",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2AGain",
                                "value": "946",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2ASNR": {
                                "name": "KSH_5401_Path2ASNR",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2ASNR",
                                "value": "63.747833",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2BGain": {
                                "name": "KSH_5401_Path2BGain",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2BGain",
                                "value": "946",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2BSNR": {
                                "name": "KSH_5401_Path2BSNR",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2BSNR",
                                "value": "63.43374",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2Performance": {
                                "name": "KSH_5401_Path2Performance",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2PulseRate": {
                                "name": "KSH_5401_Path2PulseRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2PulseRate",
                                "value": "-0.6330453",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2Status": {
                                "name": "KSH_5401_Path2Status",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2Stat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2TransducerAGainAlarm": {
                                "name": "KSH_5401_Path2TransducerAGainAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F8.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2TransducerASignalLowAlarm": {
                                "name": "KSH_5401_Path2TransducerASignalLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F10.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2TransducerASNRAlarm": {
                                "name": "KSH_5401_Path2TransducerASNRAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F12.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2TransducerAUsedRateAlarm": {
                                "name": "KSH_5401_Path2TransducerAUsedRateAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F6.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2TransducerBGainAlarm": {
                                "name": "KSH_5401_Path2TransducerBGainAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2TransducerBSignalLowAlarm": {
                                "name": "KSH_5401_Path2TransducerBSignalLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F11.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2TransducerBSNRAlarm": {
                                "name": "KSH_5401_Path2TransducerBSNRAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F13.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2TransducerBUsedRateAlarm": {
                                "name": "KSH_5401_Path2TransducerBUsedRateAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F7.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2VOG": {
                                "name": "KSH_5401_Path2VOG",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2VOG",
                                "value": "-0.0019219248",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2VOGAlarm": {
                                "name": "KSH_5401_Path2VOGAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2VOGDevRate": {
                                "name": "KSH_5401_Path2VOGDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2VOGDevRate",
                                "value": "23.721817",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2VOGRatioAlarm": {
                                "name": "KSH_5401_Path2VOGRatioAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F2.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2VOS": {
                                "name": "KSH_5401_Path2VOS",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2VOS",
                                "value": "416.36176",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2VOSAlarm": {
                                "name": "KSH_5401_Path2VOSAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F1.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2VOSDevRate": {
                                "name": "KSH_5401_Path2VOSDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path2VOSDevRate",
                                "value": "0.0083644325",
                                "quality": "Good"
                            },
                            "KSH_5401_Path2VOSRatioAlarm": {
                                "name": "KSH_5401_Path2VOSRatioAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH2-F3.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3AGain": {
                                "name": "KSH_5401_Path3AGain",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3AGain",
                                "value": "1016",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3ASNR": {
                                "name": "KSH_5401_Path3ASNR",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3ASNR",
                                "value": "62.171604",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3BGain": {
                                "name": "KSH_5401_Path3BGain",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3BGain",
                                "value": "1016",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3BSNR": {
                                "name": "KSH_5401_Path3BSNR",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3BSNR",
                                "value": "62.968033",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3Performance": {
                                "name": "KSH_5401_Path3Performance",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3PulseRate": {
                                "name": "KSH_5401_Path3PulseRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3PulseRate",
                                "value": "1.0643028",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3Status": {
                                "name": "KSH_5401_Path3Status",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3Stat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3TransducerAGainAlarm": {
                                "name": "KSH_5401_Path3TransducerAGainAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F8.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3TransducerASignalLowAlarm": {
                                "name": "KSH_5401_Path3TransducerASignalLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F10.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3TransducerASNRAlarm": {
                                "name": "KSH_5401_Path3TransducerASNRAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F12.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3TransducerAUsedRateAlarm": {
                                "name": "KSH_5401_Path3TransducerAUsedRateAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F6.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3TransducerBGainAlarm": {
                                "name": "KSH_5401_Path3TransducerBGainAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3TransducerBSignalLowAlarm": {
                                "name": "KSH_5401_Path3TransducerBSignalLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F11.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3TransducerBSNRAlarm": {
                                "name": "KSH_5401_Path3TransducerBSNRAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F13.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3TransducerBUsedRateAlarm": {
                                "name": "KSH_5401_Path3TransducerBUsedRateAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F7.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3VOG": {
                                "name": "KSH_5401_Path3VOG",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3VOG",
                                "value": "0.0055160974",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3VOGAlarm": {
                                "name": "KSH_5401_Path3VOGAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3VOGDevRate": {
                                "name": "KSH_5401_Path3VOGDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3VOGDevRate",
                                "value": "16.044418",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3VOGRatioAlarm": {
                                "name": "KSH_5401_Path3VOGRatioAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F2.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3VOS": {
                                "name": "KSH_5401_Path3VOS",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3VOS",
                                "value": "416.16608",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3VOSAlarm": {
                                "name": "KSH_5401_Path3VOSAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F1.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3VOSDevRate": {
                                "name": "KSH_5401_Path3VOSDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path3VOSDevRate",
                                "value": "0.0075593004",
                                "quality": "Good"
                            },
                            "KSH_5401_Path3VOSRatioAlarm": {
                                "name": "KSH_5401_Path3VOSRatioAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH3-F3.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4AGain": {
                                "name": "KSH_5401_Path4AGain",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4AGain",
                                "value": "813",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4ASNR": {
                                "name": "KSH_5401_Path4ASNR",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4ASNR",
                                "value": "64.433266",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4BGain": {
                                "name": "KSH_5401_Path4BGain",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4BGain",
                                "value": "813",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4BSNR": {
                                "name": "KSH_5401_Path4BSNR",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4BSNR",
                                "value": "63.862152",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4Performance": {
                                "name": "KSH_5401_Path4Performance",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4Perf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4PulseRate": {
                                "name": "KSH_5401_Path4PulseRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4PulseRate",
                                "value": "0.18254803",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4Status": {
                                "name": "KSH_5401_Path4Status",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4Stat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4TransducerAGainAlarm": {
                                "name": "KSH_5401_Path4TransducerAGainAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F8.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4TransducerASignalLowAlarm": {
                                "name": "KSH_5401_Path4TransducerASignalLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F10.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4TransducerASNRAlarm": {
                                "name": "KSH_5401_Path4TransducerASNRAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F12.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4TransducerAUsedRateAlarm": {
                                "name": "KSH_5401_Path4TransducerAUsedRateAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F6.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4TransducerBGainAlarm": {
                                "name": "KSH_5401_Path4TransducerBGainAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4TransducerBSignalLowAlarm": {
                                "name": "KSH_5401_Path4TransducerBSignalLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F11.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4TransducerBSNRAlarm": {
                                "name": "KSH_5401_Path4TransducerBSNRAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F13.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4TransducerBUsedRateAlarm": {
                                "name": "KSH_5401_Path4TransducerBUsedRateAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F7.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4VOG": {
                                "name": "KSH_5401_Path4VOG",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4VOG",
                                "value": "0.015827244",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4VOGAlarm": {
                                "name": "KSH_5401_Path4VOGAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4VOGDevRate": {
                                "name": "KSH_5401_Path4VOGDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4VOGDevRate",
                                "value": "25.1725",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4VOGRatioAlarm": {
                                "name": "KSH_5401_Path4VOGRatioAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F2.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4VOS": {
                                "name": "KSH_5401_Path4VOS",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4VOS",
                                "value": "415.7216",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4VOSAlarm": {
                                "name": "KSH_5401_Path4VOSAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F1.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4VOSDevRate": {
                                "name": "KSH_5401_Path4VOSDevRate",
                                "address": "SHCBM13.KSH_5401_LPD.F_Path4VOSDevRate",
                                "value": "0.010071612",
                                "quality": "Good"
                            },
                            "KSH_5401_Path4VOSRatioAlarm": {
                                "name": "KSH_5401_Path4VOSRatioAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-PATH4-F3.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_PathNumberTooLowAlarm": {
                                "name": "KSH_5401_PathNumberTooLowAlarm",
                                "address": "SHCBM13.KSH_5401_M_ALM-SYS-F8.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_PathsVOGAvg": {
                                "name": "KSH_5401_PathsVOGAvg",
                                "address": "SHCBM13.KSH_5401_LPD.F_PathsVOGAvg",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_PathsVOSAvg": {
                                "name": "KSH_5401_PathsVOSAvg",
                                "address": "SHCBM13.KSH_5401_LPD.F_PathsVOSAvg",
                                "value": "416.1832",
                                "quality": "Good"
                            },
                            "KSH_5401_PressureHighAlarm": {
                                "name": "KSH_5401_PressureHighAlarm",
                                "address": "SHCBM13.KSH_5401_P_ALM-PRESS-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_PressureInuse": {
                                "name": "KSH_5401_PressureInuse",
                                "address": "SHCBM13.KSH_5401_P_PRESS-INUSE.F_CV",
                                "value": "6629.849",
                                "quality": "Good"
                            },
                            "KSH_5401_PressureLowAlarm": {
                                "name": "KSH_5401_PressureLowAlarm",
                                "address": "SHCBM13.KSH_5401_P_ALM-PRESS-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_ProfileFactor": {
                                "name": "KSH_5401_ProfileFactor",
                                "address": "SHCBM13.KSH_5401_LPD.F_ProfileFactor",
                                "value": "0.6216365",
                                "quality": "Good"
                            },
                            "KSH_5401_PTToFCCommunicationAlarm": {
                                "name": "KSH_5401_PTToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5401_P_ALM-HART.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_StandardDensity": {
                                "name": "KSH_5401_StandardDensity",
                                "address": "SHCBM13.KSH_5401_F_STD-DENS.F_CV",
                                "value": "52.525806",
                                "quality": "Good"
                            },
                            "KSH_5401_StandardFlowrate": {
                                "name": "KSH_5401_StandardFlowrate",
                                "address": "SHCBM13.KSH_5401_F_STD-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_SwirlAngle": {
                                "name": "KSH_5401_SwirlAngle",
                                "address": "SHCBM13.KSH_5401_LPD.F_SwirlAngle",
                                "value": "22.249655",
                                "quality": "Good"
                            },
                            "KSH_5401_Symmetry": {
                                "name": "KSH_5401_Symmetry",
                                "address": "SHCBM13.KSH_5401_LPD.F_Symmetry",
                                "value": "0.94174653",
                                "quality": "Good"
                            },
                            "KSH_5401_TemperatureHighAlarm": {
                                "name": "KSH_5401_TemperatureHighAlarm",
                                "address": "SHCBM13.KSH_5401_T_ALM-TEMP-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_TemperatureInuse": {
                                "name": "KSH_5401_TemperatureInuse",
                                "address": "SHCBM13.KSH_5401_LPD.F_Temperature",
                                "value": "24.544294",
                                "quality": "Good"
                            },
                            "KSH_5401_TemperatureLowAlarm": {
                                "name": "KSH_5401_TemperatureLowAlarm",
                                "address": "SHCBM13.KSH_5401_T_ALM-TEMP-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_TTToFCCommunicationAlarm": {
                                "name": "KSH_5401_TTToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5401_T_ALM-HART.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5401_VOGInuse": {
                                "name": "KSH_5401_VOGInuse",
                                "address": "SHCBM13.KSH_5401_M_VOG-INUSE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            }
                        },
                        "Diagnostic": {
                            "id": 891,
                            "dateTime": "2023-11-29 14:27:50",
                            "name": "5401",
                            "flowmeterTypeName": "UltraSonic",
                            "flowmeterTypeDescription": "    ",
                            "brandName": "Weise",
                            "fmDiagnosticResult": "正常",
                            "ttDiagnosticResult": "正常",
                            "ptDiagnosticResult": "正常",
                            "fcDiagnosticResult": "正常",
                            "vosDiagnosticResult": "正常"
                        },
                        "AlarmCount": {
                            "PT": {
                                "name": "KSH_5401_P",
                                "value": "0"
                            },
                            "TT": {
                                "name": "KSH_5401_T",
                                "value": "0"
                            },
                            "FM": {
                                "name": "KSH_5401_M",
                                "value": "0"
                            },
                            "FC": {
                                "name": "KSH_5401_F",
                                "value": "0"
                            }
                        },
                        "EarlyWarningCount": 0
                    },
                    "5501": {
                        "Loop": {
                            "KSH_5501_C1": {
                                "name": "KSH_5501_C1",
                                "address": "SHCBM13.KSH_5501_LPD.F_C1",
                                "value": "94.84",
                                "quality": "Good"
                            },
                            "KSH_5501_C2": {
                                "name": "KSH_5501_C2",
                                "address": "SHCBM13.KSH_5501_LPD.F_C2",
                                "value": "0.76",
                                "quality": "Good"
                            },
                            "KSH_5501_C3": {
                                "name": "KSH_5501_C3",
                                "address": "SHCBM13.KSH_5501_LPD.F_C3",
                                "value": "0.13",
                                "quality": "Good"
                            },
                            "KSH_5501_C6": {
                                "name": "KSH_5501_C6",
                                "address": "SHCBM13.KSH_5501_LPD.F_C6",
                                "value": "0.06",
                                "quality": "Good"
                            },
                            "KSH_5501_CO2": {
                                "name": "KSH_5501_CO2",
                                "address": "SHCBM13.KSH_5501_LPD.F_CO2",
                                "value": "2.25",
                                "quality": "Good"
                            },
                            "KSH_5501_CrossFlow": {
                                "name": "KSH_5501_CrossFlow",
                                "address": "SHCBM13.KSH_5501_LPD.F_CrossFlow",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_DataReceiveFailedAlarm": {
                                "name": "KSH_5501_DataReceiveFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-SYS-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_EnergyFlowrate": {
                                "name": "KSH_5501_EnergyFlowrate",
                                "address": "SHCBM13.KSH_5501_F_ENGY-FLOWRATE.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_FCCalculateVOS": {
                                "name": "KSH_5501_FCCalculateVOS",
                                "address": "SHCBM13.KSH_5501_LPD.F_FCCalcVOS",
                                "value": "419.17203",
                                "quality": "Good"
                            },
                            "KSH_5501_FCCalculationDevRate": {
                                "name": "KSH_5501_FCCalculationDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_FCCalcVOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_FCComputerAlarm": {
                                "name": "KSH_5501_FCComputerAlarm",
                                "address": "SHCBM13.KSH_5501_LPD.F_FCComputerAlm",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_FCProcessAlarm": {
                                "name": "KSH_5501_FCProcessAlarm",
                                "address": "SHCBM13.KSH_5501_LPD.F_FCProcessAlm",
                                "value": "1",
                                "quality": "Good"
                            },
                            "KSH_5501_FCSystemAlarm": {
                                "name": "KSH_5501_FCSystemAlarm",
                                "address": "SHCBM13.KSH_5501_LPD.F_FCSystemAlm",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_FMToFCCommunicationAlarm": {
                                "name": "KSH_5501_FMToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5501_F_ALM-FMTOFC-COMM.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordCurDayEnergyCumulative": {
                                "name": "KSH_5501_ForwordCurDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-CD-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordCurDayStandardCumulative": {
                                "name": "KSH_5501_ForwordCurDayStandardCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-CD-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordCurHourEnergyCumulative": {
                                "name": "KSH_5501_ForwordCurHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-CHR-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordCurHourStandardCumulative": {
                                "name": "KSH_5501_ForwordCurHourStandardCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-CHR-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordEnergyCumulative": {
                                "name": "KSH_5501_ForwordEnergyCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-ENGY-CUM.E_CV",
                                "value": "4278.88",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordGrossCumulative": {
                                "name": "KSH_5501_ForwordGrossCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-GROSS-CUM.E_CV",
                                "value": "41161.17",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordMassCumulative": {
                                "name": "KSH_5501_ForwordMassCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-MASS-CUM.E_CV",
                                "value": "84.38",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordPreDayEnergyCumulative": {
                                "name": "KSH_5501_ForwordPreDayEnergyCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-PD-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordPreDayGrossCumulative": {
                                "name": "KSH_5501_ForwordPreDayGrossCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-PD-GROSS-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordPreDayMassCumulative": {
                                "name": "KSH_5501_ForwordPreDayMassCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-PD-MASS-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordPreDayStandardCumulative": {
                                "name": "KSH_5501_ForwordPreDayStandardCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-PD-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordPreHourEnergyCumulative": {
                                "name": "KSH_5501_ForwordPreHourEnergyCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-PHR-ENGY-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordPreHourStandardCumulative": {
                                "name": "KSH_5501_ForwordPreHourStandardCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-PHR-STD-CUM.E_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_ForwordStandardCumulative": {
                                "name": "KSH_5501_ForwordStandardCumulative",
                                "address": "SHCBM13.KSH_5501_F_FWD-STD-CUM.E_CV",
                                "value": "117.73",
                                "quality": "Good"
                            },
                            "KSH_5501_GCToFCCommunicationAlarm": {
                                "name": "KSH_5501_GCToFCCommunicationAlarm",
                                "address": "SHCBM13.KSH_5501_F_ALM-GCTOFC-COMM.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_GrossCompressionCoefficient": {
                                "name": "KSH_5501_GrossCompressionCoefficient",
                                "address": "SHCBM13.KSH_5501_F_GROSS-CMPRS-COEF.F_CV",
                                "value": "0.886221",
                                "quality": "Good"
                            },
                            "KSH_5501_GrossFlowrate": {
                                "name": "KSH_5501_GrossFlowrate",
                                "address": "SHCBM13.KSH_5501_F_GROSS-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_HighCalorificValue": {
                                "name": "KSH_5501_HighCalorificValue",
                                "address": "SHCBM13.KSH_5501_F_HI-CALVAL.F_CV",
                                "value": "36.331657",
                                "quality": "Good"
                            },
                            "KSH_5501_IC4": {
                                "name": "KSH_5501_IC4",
                                "address": "SHCBM13.KSH_5501_LPD.F_IC4",
                                "value": "0.06",
                                "quality": "Good"
                            },
                            "KSH_5501_IC5": {
                                "name": "KSH_5501_IC5",
                                "address": "SHCBM13.KSH_5501_LPD.F_IC5",
                                "value": "0.06",
                                "quality": "Good"
                            },
                            "KSH_5501_LineDensity": {
                                "name": "KSH_5501_LineDensity",
                                "address": "SHCBM13.KSH_5501_F_LINE-DENS.F_CV",
                                "value": "52.018864",
                                "quality": "Good"
                            },
                            "KSH_5501_LoopStatus": {
                                "name": "KSH_5501_LoopStatus",
                                "address": "SHCBM13.KSH_5501_LPD.F_LoopStat",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_LowCalorificValue": {
                                "name": "KSH_5501_LowCalorificValue",
                                "address": "SHCBM13.KSH_5501_F_LO-CALVAL.F_CV",
                                "value": "32.74704",
                                "quality": "Good"
                            },
                            "KSH_5501_MassFlowrate": {
                                "name": "KSH_5501_MassFlowrate",
                                "address": "SHCBM13.KSH_5501_F_MASS-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_N2": {
                                "name": "KSH_5501_N2",
                                "address": "SHCBM13.KSH_5501_LPD.F_N2",
                                "value": "1.66",
                                "quality": "Good"
                            },
                            "KSH_5501_NC4": {
                                "name": "KSH_5501_NC4",
                                "address": "SHCBM13.KSH_5501_LPD.F_NC4",
                                "value": "0.06",
                                "quality": "Good"
                            },
                            "KSH_5501_NC5": {
                                "name": "KSH_5501_NC5",
                                "address": "SHCBM13.KSH_5501_LPD.F_NC5",
                                "value": "0.12",
                                "quality": "Good"
                            },
                            "KSH_5501_NeoC5": {
                                "name": "KSH_5501_NeoC5",
                                "address": "SHCBM13.KSH_5501_LPD.F_NeoC5",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1AGain": {
                                "name": "KSH_5501_Path1AGain",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1AGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1Alarm": {
                                "name": "KSH_5501_Path1Alarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1APerformance": {
                                "name": "KSH_5501_Path1APerformance",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1APerf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1ASNR": {
                                "name": "KSH_5501_Path1ASNR",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1ASNR",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1BadPerformanceAlarm": {
                                "name": "KSH_5501_Path1BadPerformanceAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1BatchSignalFailedAlarm": {
                                "name": "KSH_5501_Path1BatchSignalFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F14.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1BatchSignalStopAlarm": {
                                "name": "KSH_5501_Path1BatchSignalStopAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F13.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1BGain": {
                                "name": "KSH_5501_Path1BGain",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1BGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1BPerformance": {
                                "name": "KSH_5501_Path1BPerformance",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1BPerf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1BSNR": {
                                "name": "KSH_5501_Path1BSNR",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1BSNR",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1MeasuredVOSOverRangeAlarm": {
                                "name": "KSH_5501_Path1MeasuredVOSOverRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F12.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1NoiseOutOfRangeAlarm": {
                                "name": "KSH_5501_Path1NoiseOutOfRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1PulseRate": {
                                "name": "KSH_5501_Path1PulseRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1PulseRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1SignalSelfCheckModeAlarm": {
                                "name": "KSH_5501_Path1SignalSelfCheckModeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F15.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1SNRLowAlarm": {
                                "name": "KSH_5501_Path1SNRLowAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F1.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1TransferTimeCheckFailedAlarm": {
                                "name": "KSH_5501_Path1TransferTimeCheckFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F2.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1TransferTimeDifferenceFailedAlarm": {
                                "name": "KSH_5501_Path1TransferTimeDifferenceFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F4.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1VOG": {
                                "name": "KSH_5501_Path1VOG",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1VOG",
                                "value": "-0.0040699383",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1VOGDevRate": {
                                "name": "KSH_5501_Path1VOGDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1VOS": {
                                "name": "KSH_5501_Path1VOS",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1VOS",
                                "value": "417.6509",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1VOSDevRate": {
                                "name": "KSH_5501_Path1VOSDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path1VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path1VOSSelfCheckOverRangeAlarm": {
                                "name": "KSH_5501_Path1VOSSelfCheckOverRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH1-F3.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2AGain": {
                                "name": "KSH_5501_Path2AGain",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2AGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2Alarm": {
                                "name": "KSH_5501_Path2Alarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2APerformance": {
                                "name": "KSH_5501_Path2APerformance",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2APerf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2ASNR": {
                                "name": "KSH_5501_Path2ASNR",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2ASNR",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2BadPerformanceAlarm": {
                                "name": "KSH_5501_Path2BadPerformanceAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2BatchSignalFailedAlarm": {
                                "name": "KSH_5501_Path2BatchSignalFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F14.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2BatchSignalStopAlarm": {
                                "name": "KSH_5501_Path2BatchSignalStopAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F13.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2BGain": {
                                "name": "KSH_5501_Path2BGain",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2BGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2BPerformance": {
                                "name": "KSH_5501_Path2BPerformance",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2BPerf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2BSNR": {
                                "name": "KSH_5501_Path2BSNR",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2BSNR",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2MeasuredVOSOverRangeAlarm": {
                                "name": "KSH_5501_Path2MeasuredVOSOverRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F12.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2NoiseOutOfRangeAlarm": {
                                "name": "KSH_5501_Path2NoiseOutOfRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2PulseRate": {
                                "name": "KSH_5501_Path2PulseRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2PulseRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2SignalSelfCheckModeAlarm": {
                                "name": "KSH_5501_Path2SignalSelfCheckModeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F15.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2SNRLowAlarm": {
                                "name": "KSH_5501_Path2SNRLowAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F1.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2TransferTimeCheckFailedAlarm": {
                                "name": "KSH_5501_Path2TransferTimeCheckFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F2.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2TransferTimeDifferenceFailedAlarm": {
                                "name": "KSH_5501_Path2TransferTimeDifferenceFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F4.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2VOG": {
                                "name": "KSH_5501_Path2VOG",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2VOG",
                                "value": "-0.0069136373",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2VOGDevRate": {
                                "name": "KSH_5501_Path2VOGDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2VOS": {
                                "name": "KSH_5501_Path2VOS",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2VOS",
                                "value": "417.11096",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2VOSDevRate": {
                                "name": "KSH_5501_Path2VOSDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path2VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path2VOSSelfCheckOverRangeAlarm": {
                                "name": "KSH_5501_Path2VOSSelfCheckOverRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH2-F3.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3AGain": {
                                "name": "KSH_5501_Path3AGain",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3AGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3Alarm": {
                                "name": "KSH_5501_Path3Alarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3APerformance": {
                                "name": "KSH_5501_Path3APerformance",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3APerf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3ASNR": {
                                "name": "KSH_5501_Path3ASNR",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3ASNR",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3BadPerformanceAlarm": {
                                "name": "KSH_5501_Path3BadPerformanceAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3BatchSignalFailedAlarm": {
                                "name": "KSH_5501_Path3BatchSignalFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F14.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3BatchSignalStopAlarm": {
                                "name": "KSH_5501_Path3BatchSignalStopAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F13.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3BGain": {
                                "name": "KSH_5501_Path3BGain",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3BGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3BPerformance": {
                                "name": "KSH_5501_Path3BPerformance",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3BPerf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3BSNR": {
                                "name": "KSH_5501_Path3BSNR",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3BSNR",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3MeasuredVOSOverRangeAlarm": {
                                "name": "KSH_5501_Path3MeasuredVOSOverRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F12.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3NoiseOutOfRangeAlarm": {
                                "name": "KSH_5501_Path3NoiseOutOfRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3PulseRate": {
                                "name": "KSH_5501_Path3PulseRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3PulseRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3SignalSelfCheckModeAlarm": {
                                "name": "KSH_5501_Path3SignalSelfCheckModeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F15.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3SNRLowAlarm": {
                                "name": "KSH_5501_Path3SNRLowAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F1.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3TransferTimeCheckFailedAlarm": {
                                "name": "KSH_5501_Path3TransferTimeCheckFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F2.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3TransferTimeDifferenceFailedAlarm": {
                                "name": "KSH_5501_Path3TransferTimeDifferenceFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F4.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3VOG": {
                                "name": "KSH_5501_Path3VOG",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3VOG",
                                "value": "-0.011118924",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3VOGDevRate": {
                                "name": "KSH_5501_Path3VOGDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3VOS": {
                                "name": "KSH_5501_Path3VOS",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3VOS",
                                "value": "416.5667",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3VOSDevRate": {
                                "name": "KSH_5501_Path3VOSDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path3VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path3VOSSelfCheckOverRangeAlarm": {
                                "name": "KSH_5501_Path3VOSSelfCheckOverRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH3-F3.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4AGain": {
                                "name": "KSH_5501_Path4AGain",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4AGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4Alarm": {
                                "name": "KSH_5501_Path4Alarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-FAILED.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4APerformance": {
                                "name": "KSH_5501_Path4APerformance",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4APerf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4ASNR": {
                                "name": "KSH_5501_Path4ASNR",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4ASNR",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4BadPerformanceAlarm": {
                                "name": "KSH_5501_Path4BadPerformanceAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4BatchSignalFailedAlarm": {
                                "name": "KSH_5501_Path4BatchSignalFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F14.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4BatchSignalStopAlarm": {
                                "name": "KSH_5501_Path4BatchSignalStopAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F13.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4BGain": {
                                "name": "KSH_5501_Path4BGain",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4BGain",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4BPerformance": {
                                "name": "KSH_5501_Path4BPerformance",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4BPerf",
                                "value": "100",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4BSNR": {
                                "name": "KSH_5501_Path4BSNR",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4BSNR",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4MeasuredVOSOverRangeAlarm": {
                                "name": "KSH_5501_Path4MeasuredVOSOverRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F12.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4NoiseOutOfRangeAlarm": {
                                "name": "KSH_5501_Path4NoiseOutOfRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F0.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4PulseRate": {
                                "name": "KSH_5501_Path4PulseRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4PulseRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4SignalSelfCheckModeAlarm": {
                                "name": "KSH_5501_Path4SignalSelfCheckModeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F15.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4SNRLowAlarm": {
                                "name": "KSH_5501_Path4SNRLowAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F1.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4TransferTimeCheckFailedAlarm": {
                                "name": "KSH_5501_Path4TransferTimeCheckFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F2.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4TransferTimeDifferenceFailedAlarm": {
                                "name": "KSH_5501_Path4TransferTimeDifferenceFailedAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F4.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4VOG": {
                                "name": "KSH_5501_Path4VOG",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4VOG",
                                "value": "-0.12900607",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4VOGDevRate": {
                                "name": "KSH_5501_Path4VOGDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4VOGDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4VOS": {
                                "name": "KSH_5501_Path4VOS",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4VOS",
                                "value": "416.3881",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4VOSDevRate": {
                                "name": "KSH_5501_Path4VOSDevRate",
                                "address": "SHCBM13.KSH_5501_LPD.F_Path4VOSDevRate",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Path4VOSSelfCheckOverRangeAlarm": {
                                "name": "KSH_5501_Path4VOSSelfCheckOverRangeAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-PATH4-F3.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_PathNumberTooLowAlarm": {
                                "name": "KSH_5501_PathNumberTooLowAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-SYS-F8.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_PathsVOGAvg": {
                                "name": "KSH_5501_PathsVOGAvg",
                                "address": "SHCBM13.KSH_5501_LPD.F_PathsVOGAvg",
                                "value": "-0.02508961",
                                "quality": "Good"
                            },
                            "KSH_5501_PathsVOSAvg": {
                                "name": "KSH_5501_PathsVOSAvg",
                                "address": "SHCBM13.KSH_5501_LPD.F_PathsVOSAvg",
                                "value": "416.92917",
                                "quality": "Good"
                            },
                            "KSH_5501_PressureHighAlarm": {
                                "name": "KSH_5501_PressureHighAlarm",
                                "address": "SHCBM13.KSH_5501_P_ALM-PRESS-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_PressureHighLimit": {
                                "name": "KSH_5501_PressureHighLimit",
                                "address": "SHCBM13.KSH_5501_P_PRESS-HILIM.F_CV",
                                "value": "12000",
                                "quality": "Good"
                            },
                            "KSH_5501_PressureInuse": {
                                "name": "KSH_5501_PressureInuse",
                                "address": "SHCBM13.KSH_5501_P_PRESS-INUSE.F_CV",
                                "value": "6632.7515",
                                "quality": "Good"
                            },
                            "KSH_5501_PressureKeypad": {
                                "name": "KSH_5501_PressureKeypad",
                                "address": "SHCBM13.KSH_5501_P_PRESS-KEYPAD.F_CV",
                                "value": "8000",
                                "quality": "Good"
                            },
                            "KSH_5501_PressureLowAlarm": {
                                "name": "KSH_5501_PressureLowAlarm",
                                "address": "SHCBM13.KSH_5501_P_ALM-PRESS-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_PressureLowLimit": {
                                "name": "KSH_5501_PressureLowLimit",
                                "address": "SHCBM13.KSH_5501_P_PRESS-LOLIM.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_PressureMeasure": {
                                "name": "KSH_5501_PressureMeasure",
                                "address": "SHCBM13.KSH_5501_P_PRESS-MEASURE.F_CV",
                                "value": "6632.7515",
                                "quality": "Good"
                            },
                            "KSH_5501_ProfileFactor": {
                                "name": "KSH_5501_ProfileFactor",
                                "address": "SHCBM13.KSH_5501_LPD.F_ProfileFactor",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_StandardDensity": {
                                "name": "KSH_5501_StandardDensity",
                                "address": "SHCBM13.KSH_5501_F_STD-DENS.F_CV",
                                "value": "0.71674275",
                                "quality": "Good"
                            },
                            "KSH_5501_StandardFlowrate": {
                                "name": "KSH_5501_StandardFlowrate",
                                "address": "SHCBM13.KSH_5501_F_STD-FLOWRATE.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_SwirlAngle": {
                                "name": "KSH_5501_SwirlAngle",
                                "address": "SHCBM13.KSH_5501_LPD.F_SwirlAngle",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_Symmetry": {
                                "name": "KSH_5501_Symmetry",
                                "address": "SHCBM13.KSH_5501_LPD.F_Symmetry",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_TemperatureHighAlarm": {
                                "name": "KSH_5501_TemperatureHighAlarm",
                                "address": "SHCBM13.KSH_5501_T_ALM-TEMP-HI.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_TemperatureHighLimit": {
                                "name": "KSH_5501_TemperatureHighLimit",
                                "address": "SHCBM13.KSH_5501_T_TEMP-HILIM.F_CV",
                                "value": "80",
                                "quality": "Good"
                            },
                            "KSH_5501_TemperatureInuse": {
                                "name": "KSH_5501_TemperatureInuse",
                                "address": "SHCBM13.KSH_5501_LPD.F_Temperature",
                                "value": "24.61523",
                                "quality": "Good"
                            },
                            "KSH_5501_TemperatureKeypad": {
                                "name": "KSH_5501_TemperatureKeypad",
                                "address": "SHCBM13.KSH_5501_T_TEMP-KEYPAD.F_CV",
                                "value": "10",
                                "quality": "Good"
                            },
                            "KSH_5501_TemperatureLowAlarm": {
                                "name": "KSH_5501_TemperatureLowAlarm",
                                "address": "SHCBM13.KSH_5501_T_ALM-TEMP-LO.F_CV",
                                "value": "0",
                                "quality": "Good"
                            },
                            "KSH_5501_TemperatureLowLimit": {
                                "name": "KSH_5501_TemperatureLowLimit",
                                "address": "SHCBM13.KSH_5501_T_TEMP-LOLIM.F_CV",
                                "value": "-40",
                                "quality": "Good"
                            },
                            "KSH_5501_TemperatureMeasure": {
                                "name": "KSH_5501_TemperatureMeasure",
                                "address": "SHCBM13.KSH_5501_T_TEMP-MEASURE.F_CV",
                                "value": "24.61843",
                                "quality": "Good"
                            },
                            "KSH_5501_VOGInuse": {
                                "name": "KSH_5501_VOGInuse",
                                "address": "SHCBM13.KSH_5501_M_VOG-INUSE.F_CV",
                                "value": "-0.024177397",
                                "quality": "Good"
                            },
                            "KSH_5501_VOGOverRangerAlarm": {
                                "name": "KSH_5501_VOGOverRangerAlarm",
                                "address": "SHCBM13.KSH_5501_M_ALM-SYS-F9.F_CV",
                                "value": "0",
                                "quality": "Good"
                            }
                        },
                        "Diagnostic": {
                            "id": 892,
                            "dateTime": "2023-11-29 14:27:50",
                            "name": "5501",
                            "flowmeterTypeName": "UltraSonic",
                            "flowmeterTypeDescription": "    ",
                            "brandName": "Daniel",
                            "fmDiagnosticResult": "正常",
                            "ttDiagnosticResult": "正常",
                            "ptDiagnosticResult": "正常",
                            "fcDiagnosticResult": "正常",
                            "vosDiagnosticResult": "正常"
                        },
                        "AlarmCount": {
                            "PT": {
                                "name": "KSH_5501_P",
                                "value": "0"
                            },
                            "TT": {
                                "name": "KSH_5501_T",
                                "value": "0"
                            },
                            "FM": {
                                "name": "KSH_5501_M",
                                "value": "0"
                            },
                            "FC": {
                                "name": "KSH_5501_F",
                                "value": "1"
                            }
                        },
                        "EarlyWarningCount": 0
                    }
                },
                "EquipmentDatas": {}
            }
        };
            this.listData = aa.Data
        this.loopData = aa.Data.LoopDatas;
        this.EquipmentDatas = aa.Data.EquipmentDatas;

        //axios.post(
        //    ipaddress,
        //    JSON.stringify(JSON.stringify(this.station)),
        //    { headers: { 'Content-Type': 'application/json' } },
        //    { timeout: 1000 * 60 * 2 })
        //    .then((res) => {
        //        this.listData = res.data.Data
        //        this.loopData = res.data.Data.LoopDatas;
        //        this.EquipmentDatas = res.data.Data.EquipmentDatas;
        //        this.status = true
        //    }, (err) => {
        //        this.listData = [];
        //        this.loopData = [];
        //        this.EquipmentDatas = [];
        //        this.status = true
        //    }
        //    );

        //if (this.intervalId != null) {
        //    return;
        //}
        ////计时器为空，操作
        //this.intervalId = setInterval(() => {

        //    this.StationLoops = station.Loops
        //    this.Equipments = station.Equipments
        //    this.homeAbbrName = station.AbbrName + '_'

        //    var ipaddress = "http://" + this.station.IPAddress + ":" + this.station.IPPort + "/api/Station/GetStationData";
        //    axios.post(
        //        ipaddress,
        //        JSON.stringify(JSON.stringify(this.station)),
        //        { headers: { 'Content-Type': 'application/json' } },
        //        { timeout: 1000 * 60 * 2 })
        //        .then((res) => {
        //            this.listData = res.data.Data
        //            this.loopData = res.data.Data.LoopDatas;
        //            this.EquipmentDatas = res.data.Data.EquipmentDatas;
        //            this.status = true
        //        }, (err) => {
        //            this.listData = [];
        //            this.loopData = [];
        //            this.EquipmentDatas = [];
        //            this.status = true
        //        }
        //        );
        //    axios.post(
        //        "/api/CheckData/KeepSession",
        //        { headers: { 'Content-Type': 'application/json' } },
        //        { timeout: 1000 * 60 * 2 })
        //        .then((res) => {

        //        }, (err) => {

        //        }
        //        );
        //}, 10000);

    },
    mounted() {

    },
    methods: {
        close() {
            this.Daniel1dialogVisible = false
            this.Daniel1clicked = false
            this.Sick1dialogVisible = false
            this.Sick1clicked = false
            this.Weise1dialogVisible = false
            this.Weise1clicked = false
            this.ManydialogVisible = false
            this.Manyclicked = false
            this.LessdialogVisible = false
            this.Lessclicked = false
            this.Elster1dialogVisible = false
            this.isElster1Click = false
            this.Elster2dialogVisible = false
            this.RMG1dialogVisible = false
            this.isElster2Click = false
            this.isRMG1Click = false
            this.Elster4dialogVisible = false
            this.isElster4Click = false
            this.Turbo1dialogVisible = false
            this.Turbo2dialogVisible = false
            this.Turbo3dialogVisible = false
            this.Turbo4dialogVisible = false
            this.isTurbo1Click = false
            this.isTurbo2Click = false
            this.isTurbo3Click = false
            this.isTurbo4Click = false
            this.EquipmentsABB1dialogVisible = false
            this.isEquipmentsABB1Click = false
            this.EquipmentsDaniel1dialogVisible = false
            this.isEquipmentsDaniel1Click = false
            this.EquipmentsElster1dialogVisible = false
            this.isEquipmentsElster1Click = false
            this.earlyWarningdialogVisible = false
            this.EarlyWarningDescription = '预警参数',
                this.EarlyWarningTrendTimesData = '',
                this.EarlyWarningTrendData = ''
        },
        Daniel1Details(data) {
            this.Daniel1dialogVisible = true
            this.Daniel1clicked = true
            var StaAbbrName = data.AbbrName
            this.StaAbbrName = StaAbbrName
            this.AbbrName = station.AbbrName + '_'
            this.LoopAbbrName = data.AbbrName + '_'
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = data.AbbrName
            this.LoopsName = data.Name + "详情"

        },
        Weise1Details(data) {
            this.Weise1dialogVisible = true
            this.Weise1clicked = true
            var StaAbbrName = data.AbbrName
            this.StaAbbrName = StaAbbrName
            this.AbbrName = station.AbbrName + '_'
            this.AbbrNames = station.AbbrName
            this.LoopAbbrNames = data.AbbrName
            this.LoopAbbrName = data.AbbrName + '_'

            this.LoopsName = data.Name + "详情"
        },
        Sick1Details(data) {
            this.Sick1dialogVisible = true
            this.Sick1clicked = true
            var StaAbbrName = data.AbbrName
            this.StaAbbrName = StaAbbrName
            this.AbbrNames = station.AbbrName
            this.LoopAbbrNames = data.AbbrName
            this.AbbrName = station.AbbrName + '_'
            this.LoopAbbrName = data.AbbrName + '_'

            this.LoopsName = data.Name + "详情"
        },
        handleElster1Details(initData) {
            this.LoopsName = initData.Name + "详情";
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + "_";
            this.LoopAbbrName = initData.AbbrName + '_';
            this.Elster1dialogVisible = true;
            this.isElster1Click = true;
        },
        handleElster2Details(initData) {
            this.LoopsName = initData.Name + "详情";
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + "_";
            this.LoopAbbrName = initData.AbbrName + '_';
            this.Elster2dialogVisible = true;
            this.isElster2Click = true;
        },
        handleElster4Details(initData) {
            this.LoopsName = initData.Name + "详情";
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + "_";
            this.LoopAbbrName = initData.AbbrName + '_';
            this.Elster4dialogVisible = true;
            this.isElster4Click = true;
        },
        handleRMG1Details(initData) {
            this.LoopsName = initData.Name + "详情";
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + "_";
            this.LoopAbbrName = initData.AbbrName + '_';
            this.RMG1dialogVisible = true;
            this.isRMG1Click = true;
        },
        // 打开Turbo1详情页面
        handleTurbo1Details(initData) {
            this.Turbo1Title = initData.Name + '详情';
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + '_'
            this.LoopAbbrName = initData.AbbrName + '_'
            this.Turbo1dialogVisible = true;
            this.isTurbo1Click = true;
        },
        // 打开Turbo2详情页面
        handleTurbo2Details(initData) {
            this.Turbo2Title = initData.Name + '详情';
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + '_'
            this.LoopAbbrName = initData.AbbrName + '_'
            this.Turbo2dialogVisible = true;
            this.isTurbo2Click = true;
        },
        // // 打开Turbo3详情页面
        handleTurbo3Details(initData) {
            this.Turbo3Title = initData.Name + '详情';
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + '_'
            this.LoopAbbrName = initData.AbbrName + '_'
            this.Turbo3dialogVisible = true;
            this.isTurbo3Click = true;
        },
        // // 打开Turbo4详情页面
        handleTurbo4Details(initData) {
            this.Turbo4Title = initData.Name + '详情';
            this.StaAbbrName = initData.AbbrName;
            this.AbbrNames = this.station.AbbrName
            this.LoopAbbrNames = initData.AbbrName
            this.homeAbbrName = this.station.AbbrName + '_'
            this.LoopAbbrName = initData.AbbrName + '_'
            this.Turbo4dialogVisible = true;
            this.isTurbo4Click = true;
        },
        onEquipmentsABB1(data) {
            this.EquipmentsName = data.Name + "详情"
            this.StaAbbrName = data.AbbrName;
            this.homeAbbrName = station.AbbrName + '_'
            this.EquipmentsAbbrName = data.AbbrName + '_'
            this.homeAbbrNames = station.AbbrName
            this.EquipmentsAbbrNames = data.AbbrName
            this.EquipmentsABB1dialogVisible = true
            this.isEquipmentsABB1Click = true
        },
        onEquipmentsDaniel1(data) {
            this.EquipmentsName = data.Name + "详情"
            this.StaAbbrName = data.AbbrName;
            this.homeAbbrName = station.AbbrName + '_'
            this.EquipmentsAbbrName = data.AbbrName + '_'
            this.homeAbbrNames = station.AbbrName
            this.EquipmentsAbbrNames = data.AbbrName
            this.EquipmentsDaniel1dialogVisible = true
            this.isEquipmentsDaniel1Click = true
        },
        onEquipmentsElster1(data) {
            this.EquipmentsName = data.Name + "详情"
            this.StaAbbrName = data.AbbrName;
            this.homeAbbrName = station.AbbrName + '_'
            this.EquipmentsAbbrName = data.AbbrName + '_'
            this.homeAbbrNames = station.AbbrName
            this.EquipmentsAbbrNames = data.AbbrName
            this.EquipmentsElster1dialogVisible = true
            this.isEquipmentsElster1Click = true
        },
        OpenEarlyWarning(data) {
            var ipaddress = "/api/Alarm/GetEarlyWarning";
            console.log(data);
            var data = {
                LoopID: data.ID,
            }
            console.log(data);
            axios.post(
                ipaddress,
                JSON.stringify(JSON.stringify(data)),
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.EarlyWarning = res.data
                    this.EarlyWarningSolution = res.data[0].solution;
                    this.earlyWarningdialogVisible = true;
                }, (err) => {
                    this.EarlyWarningSolution = '无解决方案';
                    this.earlyWarningdialogVisible = false;
                });

        },
        diagnosisMany(data, nam, e) {
            this.FlowmeterData = []
            this.ManydialogVisible = true
            this.Manyclicked = true
            var ipaddress = "http://" + this.station.IPAddress + ":" + this.station.IPPort
            let url
            if (nam == 'fmDiagnosticResult') {
                url = ipaddress + '/api/DiagnosticData/GetFlowMeterDiagnosticDataDetail'
                this.titleDia = data.AbbrName + '流量计诊断详情'
            } else if (nam == 'vosDiagnosticResult') {
                url = ipaddress + '/api/DiagnosticData/GetVOSDiagnosticDataDetail'
                this.titleDia = data.AbbrName + '声速核查诊断详情'
            }
            var date = {
                LoopID: data.ID,
                BrandName: data.BrandName
            }
            axios.post(
                url,
                JSON.stringify(JSON.stringify(date)),
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.FlowmeterData = res.data
                }, (err) => {
                    console.log(err)
                }
                );

        },
        diagnosisLess(data, nam, e) {
            this.FlowmeterDatas = []
            this.LessdialogVisible = true
            this.Lessclicked = true
            var ipaddress = "http://" + this.station.IPAddress + ":" + this.station.IPPort
            let url
            if (nam == 'ptDiagnosticResult') {
                url = ipaddress + '/api/DiagnosticData/GetPressureTransmitterDiagnosticDataDetail'
                this.LesstitleDia = data.AbbrName + '压变诊断详情'
            } else if (nam == 'ttDiagnosticResult') {
                url = ipaddress + '/api/DiagnosticData/GetTemperatureTransmitterDiagnosticDataDetail'
                this.LesstitleDia = data.AbbrName + '温变诊断详情'
            } else if (nam == 'fcDiagnosticResult') {
                url = ipaddress + '/api/DiagnosticData/GetFlowComputerDiagnosticDataDetail'
                this.LesstitleDia = data.AbbrName + '流量计算机诊断详情'
            } else if (nam == 'diagnosticResult') {
                url = ipaddress + '/api/DiagnosticData/GetEquipmentDiagnosticDataDetail'
                this.LesstitleDia = data.AbbrName + '诊断详情'
            }
            if (nam == 'diagnosticResult') {
                var date = {
                    EquipmentID: data.ID,
                    EquipmentType: data.EquipmentType,
                    BrandName: data.BrandName
                }
            } else {
                var date = {
                    LoopID: data.ID,
                    BrandName: data.BrandName
                }
            }
            axios.post(
                url,
                JSON.stringify(JSON.stringify(date)),
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.FlowmeterDatas = res.data
                }, (err) => {
                    console.log(err)
                }
                );

        },
        open() {
            this.$nextTick(() => {
                var temperatureChart = echarts.init(document.getElementById('TemperatureInUseID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                temperatureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: -20,
                        max: 100,
                        radius: '40%',
                        splitNumber: 12,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '90%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + '°C',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2)
                        }]
                    }],
                })

                var pressureChart = echarts.init(document.getElementById('PressureTransmitterID'))
                pressureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 12000,
                        radius: '40%',
                        splitNumber: 5,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '130%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4, 2) + 'kPa',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4, 2)
                        }]
                    }],
                })

                var UltrasonicChart = echarts.init(document.getElementById('UltrasonicFlowmeterID'))
                UltrasonicChart.setOption({
                    series: [{
                        type: 'gauge',
                        radius: '90%',
                        progress: {
                            show: true,
                            width: 18
                        },
                        axisLine: {
                            lineStyle: {
                                width: 18
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            distance: 3,
                            length: 3,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 20,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: true,
                            showAbove: true,
                            size: 10,
                            itemStyle: {
                                borderWidth: 7
                            }
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            fontSize: 15,
                            color: '#fff',
                            offsetCenter: [0, '85%'],
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + 'm/s',
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                        }]
                    }]
                })
                var soundVelocityChart = echarts.init(document.getElementById('soundVelocityID'))
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        "ChordD": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        "ChordC": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        "ChordB": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        "ChordA": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    }
                };
                soundVelocityChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var performanceChart = echarts.init(document.getElementById('performanceID'))
                var builderJson = {
                    "charts": {
                        "ChordD2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4BPerformance", 3),
                        "ChordD1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4APerformance", 3),
                        "ChordC2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3BPerformance", 3),
                        "ChordC1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3APerformance", 3),
                        "ChordB2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2BPerformance", 3),
                        "ChordB1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2APerformance", 3),
                        "ChordA2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1BPerformance", 3),
                        "ChordA1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1APerformance", 3),
                    }
                };
                performanceChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false
                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 60,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} %',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var CurrentSpeedChart = echarts.init(document.getElementById('CurrentSpeedID'))
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        "ChordD": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        "ChordC": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        "ChordB": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        "ChordA": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    }
                };
                CurrentSpeedChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]


                })




            })
        },
        Weise1open() {
            this.$nextTick(() => {
                var Weise1soundVelocityChart = echarts.init(document.getElementById('Weise1soundVelocityID'))
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    }
                };
                Weise1soundVelocityChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var Weise1performanceChart = echarts.init(document.getElementById('Weise1performanceID'))
                var builderJson = {
                    "charts": {
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    }
                };
                Weise1performanceChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 60,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} %',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var Weise1CurrentSpeedChart = echarts.init(document.getElementById('Weise1CurrentSpeedID'))
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    }
                };
                Weise1CurrentSpeedChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]


                })

                var Weise1temperatureChart = echarts.init(document.getElementById('Weise1TemperatureInUseID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                Weise1temperatureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: -20,
                        max: 100,
                        radius: '40%',
                        splitNumber: 12,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '90%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + '°C',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2)
                        }]
                    }],
                })
                var Weise1pressureChart = echarts.init(document.getElementById('Weise1PressureTransmitterID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                Weise1pressureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 12000,
                        radius: '40%',
                        splitNumber: 5,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '130%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4, 2) + 'kPa',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4, 2)
                        }]
                    }],
                })
                var Weise1UltrasonicChart = echarts.init(document.getElementById('Weise1UltrasonicFlowmeterID'))
                Weise1UltrasonicChart.setOption({
                    series: [{
                        type: 'gauge',
                        radius: '90%',
                        progress: {
                            show: true,
                            width: 18
                        },
                        axisLine: {
                            lineStyle: {
                                width: 18
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            distance: 3,
                            length: 3,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 20,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: true,
                            showAbove: true,
                            size: 10,
                            itemStyle: {
                                borderWidth: 7
                            }
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            fontSize: 15,
                            color: '#fff',
                            offsetCenter: [0, '85%'],
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + 'm/s',

                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                        }]
                    }]
                })
            })
        },
        Sick1open() {
            this.$nextTick(() => {
                var Sick1soundVelocityChart = echarts.init(document.getElementById('Sick1soundVelocityID'))   // 声速
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    }
                };
                Sick1soundVelocityChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var Sick1performanceChart = echarts.init(document.getElementById('Sick1performanceID'))   // 性能
                var builderJson = {
                    "charts": {
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    }
                };
                Sick1performanceChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 60,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} %',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]

                })
                var Sick1CurrentSpeedChart = echarts.init(document.getElementById('Sick1CurrentSpeedID'))  // 流速
                var builderJson = {
                    "charts": {
                        "平均值": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        "Chord4": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        "Chord3": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        "Chord2": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        "Chord1": this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    }
                };
                Sick1CurrentSpeedChart.setOption({
                    grid: [{
                        top: 5,
                        width: '90%',
                        height: '100%',
                        left: '-13%',
                        containLabel: true
                    }],
                    xAxis: [{
                        show: false,
                        min: function (value) {
                            return value.min - 1

                        },
                        max: function (value) {
                            return value.max + 1
                        },

                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            fontSize: 12,
                            color: '#fff',
                            interval: 0,
                            margin: 50,
                            textStyle: {
                                align: 'left',
                                baseline: 'middle'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            position: 'right',
                            show: true,
                            formatter: '{c} m/s',
                            color: '#fff'
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }]


                })
                var Sick1temperatureChart = echarts.init(document.getElementById('Sick1TemperatureInUseID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                Sick1temperatureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: -20,
                        max: 100,
                        radius: '40%',
                        splitNumber: 12,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '90%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + '°C',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2)
                        }]
                    }],
                })
                var Sick1pressureChart = echarts.init(document.getElementById('Sick1PressureTransmitterID'))   //document.getElementById('TemperatureInUseID')  this.$refs.TemperatureInUseEch   
                Sick1pressureChart.setOption({
                    series: [{
                        type: 'gauge',
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 12000,
                        radius: '40%',
                        splitNumber: 5,
                        itemStyle: {
                            color: '#FFAB91'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },

                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -45,
                            splitNumber: 5,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            distance: -52,
                            length: 14,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 0,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            height: '15%',
                            borderRadius: 8,
                            offsetCenter: [0, '130%'],
                            fontSize: 15,
                            fontWeight: 'bolder',
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4, 2) + 'kPa',
                            color: 'auto'
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 4, 2)
                        }]
                    }],
                })
                var Sick1UltrasonicChart = echarts.init(document.getElementById('Sick1UltrasonicFlowmeterID'))
                Sick1UltrasonicChart.setOption({
                    series: [{
                        type: 'gauge',
                        radius: '90%',
                        progress: {
                            show: true,
                            width: 18
                        },
                        axisLine: {
                            lineStyle: {
                                width: 18
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            distance: 3,
                            length: 3,
                            lineStyle: {
                                width: 1,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 20,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: true,
                            showAbove: true,
                            size: 10,
                            itemStyle: {
                                borderWidth: 7
                            }
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            fontSize: 15,
                            color: '#fff',
                            offsetCenter: [0, '85%'],
                            formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + 'm/s',
                        },
                        data: [{
                            value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                        }]
                    }]
                })

            })
        },
        renderElster4Charts() {
            this.$nextTick(() => {
                // 声速
                // 基于准备好的dom，初始化echarts实例
                var velocityChart = echarts.init(document.getElementById('velocityChart'));
                // 需要渲染的数据
                var velocityChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAverage", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    },
                };
                // 进行图表的配置
                velocityChart.setOption({
                    grid: [
                        {
                            top: 5,
                            width: "85%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(velocityChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(velocityChartJson.charts).map(function (key) {
                                return velocityChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 流速
                var flowChart = echarts.init(document.getElementById('flowChart'));
                var flowChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAverage", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    },
                };
                flowChart.setOption({
                    grid: [
                        {
                            top: 5,
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(flowChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(flowChartJson.charts).map(function (key) {
                                return flowChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 性能
                var propertyChart = echarts.init(document.getElementById('propertyChart'));
                var propertyChartJson = {
                    charts: {
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    },
                };
                propertyChart.setOption({
                    grid: [
                        {
                            top: 5,
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(propertyChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} %",
                                color: '#fff'
                            },
                            data: Object.keys(propertyChartJson.charts).map(function (key) {
                                return propertyChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('tempInfoChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "55%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",

                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('pressureInfoChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "55%",
                            splitNumber: 5,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 超声流量计图表
                var flowMeterChart = echarts.init(document.getElementById('flowMeterChart'));
                flowMeterChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            radius: "100%",
                            progress: {
                                show: true,
                                width: 18,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                distance: 3,
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 7,
                                },
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                fontSize: 15,
                                color: "#fff",
                                offsetCenter: [0, "85%"],
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + "m/s",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                                },
                            ],
                        },
                    ],
                });
            })

        },
        renderElster2Charts() {
            this.$nextTick(() => {
                // 声速
                // 基于准备好的dom，初始化echarts实例
                var velocityChart = echarts.init(document.getElementById('velocityChart'));
                // 需要渲染的数据
                var velocityChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6VOS", 3, 2),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5VOS", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    },
                };
                // 进行图表的配置
                velocityChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(velocityChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(velocityChartJson.charts).map(function (key) {
                                return velocityChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 流速
                var flowChart = echarts.init(document.getElementById('flowChart'));
                var flowChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6VOG", 3, 2),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5VOG", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    },
                };
                flowChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(flowChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(flowChartJson.charts).map(function (key) {
                                return flowChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 性能
                var propertyChart = echarts.init(document.getElementById('propertyChart'));
                var propertyChartJson = {
                    charts: {
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6Performance", 3),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5Performance", 3),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    },
                };
                propertyChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(propertyChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} %",
                                color: '#fff'
                            },
                            data: Object.keys(propertyChartJson.charts).map(function (key) {
                                return propertyChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('tempInfoChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "55%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('pressureInfoChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "55%",
                            splitNumber: 5,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 超声流量计图表
                var flowMeterChart = echarts.init(document.getElementById('flowMeterChart'));
                flowMeterChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            radius: "100%",
                            progress: {
                                show: true,
                                width: 18,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                distance: 3,
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 7,
                                },
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                fontSize: 15,
                                color: "#fff",
                                offsetCenter: [0, "85%"],
                                formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + "m/s",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                                },
                            ],
                        },
                    ],
                });
            })

        },
        renderElster1Charts() {
            this.$nextTick(() => {
                // 声速
                // 基于准备好的dom，初始化echarts实例
                var velocityChart = echarts.init(document.getElementById('velocityChart'));
                // 需要渲染的数据
                var velocityChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    },
                };
                // 进行图表的配置
                velocityChart.setOption({
                    grid: [
                        {
                            top: 10,
                            width: "85%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(velocityChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(velocityChartJson.charts).map(function (key) {
                                return velocityChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 流速
                var flowChart = echarts.init(document.getElementById('flowChart'));
                var flowChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    },
                };
                flowChart.setOption({
                    grid: [
                        {
                            top: 10,
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(flowChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(flowChartJson.charts).map(function (key) {
                                return flowChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 性能
                var propertyChart = echarts.init(document.getElementById('propertyChart'));
                var propertyChartJson = {
                    charts: {
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    },
                };
                propertyChart.setOption({
                    grid: [
                        {
                            top: 10,
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(propertyChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} %",
                                color: '#fff'
                            },
                            data: Object.keys(propertyChartJson.charts).map(function (key) {
                                return propertyChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('tempInfoChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "55%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",

                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('pressureInfoChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "55%",
                            splitNumber: 5,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 超声流量计图表
                var flowMeterChart = echarts.init(document.getElementById('flowMeterChart'));
                flowMeterChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            radius: "100%",
                            progress: {
                                show: true,
                                width: 18,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                distance: 3,
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 7,
                                },
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                fontSize: 15,
                                color: "#fff",
                                offsetCenter: [0, "85%"],
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + "m/s",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                                },
                            ],
                        },
                    ],
                });
            })

        },
        renderRMG1Charts() {
            this.$nextTick(() => {
                // 声速
                // 基于准备好的dom，初始化echarts实例
                var velocityChart = echarts.init(document.getElementById('velocityChart'));
                // 需要渲染的数据
                var velocityChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOSAvg", 3, 2),
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6VOS", 3, 2),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5VOS", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOS", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOS", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOS", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOS", 3, 2),
                    },
                };
                // 进行图表的配置
                velocityChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "82%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(velocityChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(velocityChartJson.charts).map(function (key) {
                                return velocityChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 流速
                var flowChart = echarts.init(document.getElementById('flowChart'));
                var flowChartJson = {
                    charts: {
                        平均值: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PathsVOGAvg", 3, 2),
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6VOG", 3, 2),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5VOG", 3, 2),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4VOG", 3, 2),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3VOG", 3, 2),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2VOG", 3, 2),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1VOG", 3, 2),
                    },
                };
                flowChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false,
                            boundaryGap: ["5%", "5%"], //留白大小，坐标轴两边留白
                            min: function (value) {
                                return value.min - 1

                            },
                            max: function (value) {
                                return value.max + 1
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(flowChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} m/s",
                                color: '#fff'
                            },
                            data: Object.keys(flowChartJson.charts).map(function (key) {
                                return flowChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 性能
                var propertyChart = echarts.init(document.getElementById('propertyChart'));
                var propertyChartJson = {
                    charts: {
                        Chord6: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path6Performance", 3),
                        Chord5: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path5Performance", 3),
                        Chord4: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path4Performance", 3),
                        Chord3: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path3Performance", 3),
                        Chord2: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path2Performance", 3),
                        Chord1: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "Path1Performance", 3),
                    },
                };
                propertyChart.setOption({
                    grid: [
                        {
                            top: "10%",
                            width: "88%",
                            height: "90%",
                            left: "-13%",
                            containLabel: true,
                        },
                    ],
                    xAxis: [
                        {
                            show: false
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            data: Object.keys(propertyChartJson.charts),
                            axisLabel: {
                                fontSize: 12,
                                color: "#fff",
                                interval: 0,
                                margin: 50,
                                textStyle: {
                                    align: "left",
                                    baseline: "middle",
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            type: "bar",
                            stack: "chart",
                            z: 3,
                            label: {
                                position: "right",
                                show: true,
                                formatter: "{c} %",
                                color: '#fff'
                            },
                            data: Object.keys(propertyChartJson.charts).map(function (key) {
                                return propertyChartJson.charts[key];
                            }),
                            itemStyle: {
                                normal: {
                                    color: "#5470C6",
                                },
                            },
                        },
                    ],
                });
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('tempInfoChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "55%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('pressureInfoChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "55%",
                            splitNumber: 5,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 超声流量计图表
                var flowMeterChart = echarts.init(document.getElementById('flowMeterChart'));
                flowMeterChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            radius: "100%",
                            progress: {
                                show: true,
                                width: 18,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 18,
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                distance: 3,
                                length: 3,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 20,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 7,
                                },
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                fontSize: 15,
                                color: "#fff",
                                offsetCenter: [0, "85%"],
                                formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2) + "m/s",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "VOGInuse", 4, 2),
                                },
                            ],
                        },
                    ],
                });
            })

        },
        renderTurbo1Charts() {
            this.$nextTick(() => {
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('TempChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "30%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('PressChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "30%",
                            splitNumber: 6,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
            })
        },
        renderTurbo2Charts() {
            this.$nextTick(() => {
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('TempChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "30%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('PressChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "30%",
                            splitNumber: 6,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
            })
        },
        renderTurbo3Charts() {
            this.$nextTick(() => {
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('TempChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 60,
                            radius: "27%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('PressChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "27%",
                            splitNumber: 6,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
            })
        },
        renderTurbo4Charts() {
            this.$nextTick(() => {
                // 温度变送器
                var tempInfoChart = echarts.init(document.getElementById('TempChart'));
                tempInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: -20,
                            max: 100,
                            radius: "30%",
                            splitNumber: 12,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter:
                                    this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2) + "°C",

                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "TemperatureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
                // 压力变送器
                var pressureInfoChart = echarts.init(document.getElementById('PressChart'));
                pressureInfoChart.setOption({
                    series: [
                        {
                            type: "gauge",
                            center: ["50%", "60%"],
                            startAngle: 200,
                            endAngle: -20,
                            min: 0,
                            max: 12000,
                            radius: "30%",
                            splitNumber: 6,
                            itemStyle: {
                                color: "#FFAB91",
                            },
                            progress: {
                                show: true,
                                width: 30,
                            },

                            pointer: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 30,
                                },
                            },
                            axisTick: {
                                distance: -45,
                                splitNumber: 5,
                                lineStyle: {
                                    width: 1,
                                    color: "#999",
                                },
                            },
                            splitLine: {
                                distance: -52,
                                length: 14,
                                lineStyle: {
                                    width: 2,
                                    color: "#999",
                                },
                            },
                            axisLabel: {
                                distance: 0,
                                color: "#999",
                                fontSize: 10,
                            },
                            anchor: {
                                show: false,
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                valueAnimation: true,
                                width: "60%",
                                lineHeight: 40,
                                height: "15%",
                                borderRadius: 8,
                                offsetCenter: [0, "90%"],
                                fontSize: 15,
                                fontWeight: "bolder",
                                formatter: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2) + "kPa",
                                color: "auto",
                            },
                            data: [
                                {
                                    value: this.SetValDigits("LoopDatas", this.AbbrNames, this.LoopAbbrNames, "PressureInuse", 3, 2),
                                },
                            ],
                        },
                    ],
                });
            })
        },
        rendEarlyWarningChart() {
            this.$nextTick(() => {
                this.LoadEarlyWarningCharts();
            })
        },
        LoadEarlyWarningCharts() {
            if (
                this.chart != null &&
                this.chart != "" &&
                this.chart != undefined
            ) {
                this.chart.dispose(); //销毁
            }
            this.chart = echarts.init(document.getElementById('EarlyWarningChart'));
            window.onresize = () => {
                //  根据窗口大小调整曲线大小
                this.chart.resize();
            };
            const option = {
                // title: {
                // 	text: '标题'
                // },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        color: '#FFF'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#75878a'
                        }
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#FFF'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#75878a'
                        }
                    },
                    max: 1,
                    min: 0,
                },
                series: [{
                    name: 'Highest',
                    type: 'line',
                    lineStyle: {
                        color: '#3eede7'
                    },
                    data: [0],

                    markLine: {
                        data: [{
                            name: '上报警线',
                            yAxis: '15',
                            label: {
                                formatter: '报警线',
                                position: 'end',
                                color: '#F00'
                            },
                            lineStyle: {
                                color: '#F00'
                            }
                        }, {
                            name: '上预警线',
                            yAxis: '10',
                            label: {
                                formatter: '预警线',
                                position: 'end',
                                color: '#FF9500'
                            },
                            lineStyle: {
                                color: '#FF9500'
                            }
                        }, {
                            name: '下报警线',
                            yAxis: '2',
                            label: {
                                formatter: '报警线',
                                position: 'end',
                                color: '#F00'
                            },
                            lineStyle: {
                                color: '#F00'
                            }
                        }, {
                            name: '下预警线',
                            yAxis: '4',
                            label: {
                                formatter: '预警线',
                                position: 'end',
                                color: '#FF9500'
                            },
                            lineStyle: {
                                color: '#FF9500'
                            }
                        }],
                    }
                }]
            }
            this.chart.setOption(option);
        },
        getEarlyWarningCharts(tab, event) {
    
            if (tab.description == "增益(4A)") {
                this.EarlyWarningTrendData = {"TagName": "KSH_5201_Path4AGain","TagAbbrName": "SHCBM13:KSH_5201_LPD.F_Path4AGain","HighLimit": 31317, "LowLimit": null,"AlarmHighLimit": 50000, "AlarmLowLimit": null,"Description": "增益(4A)", "TrendMaxVal": 50005,"TrendMinVal": 31900,
                };
                let maxVal = 50000;
                let minVal = 15000;

                let data = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: (params) => {
                            let str = params[0].name + "<br />";
                            str +=
                                params[0].seriesName + " : " + params[0].value + "<br />";
                            return str;
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            color: '#FFF'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#75878a'
                            }
                        },
                        data: ["2023-11-28 05:18:01", "2023-11-28 05:33:01", "2023-11-28 05:48:01", "2023-11-28 06:03:01", "2023-11-28 06:18:01", "2023-11-28 06:33:01", "2023-11-28 06:48:01", "2023-11-28 07:03:01", "2023-11-28 07:18:01", "2023-11-28 07:33:01", "2023-11-28 07:48:01", "2023-11-28 08:03:01", "2023-11-28 08:18:01", "2023-11-28 08:33:01", "2023-11-28 08:48:01", "2023-11-28 09:03:01", "2023-11-28 09:18:01", "2023-11-28 09:33:01", "2023-11-28 09:48:01", "2023-11-28 10:03:01", "2023-11-28 10:18:01", "2023-11-28 10:33:01", "2023-11-28 10:48:01", "2023-11-28 11:03:01", "2023-11-28 11:18:01", "2023-11-28 11:33:01", "2023-11-28 11:48:01", "2023-11-28 12:03:01", "2023-11-28 12:18:01", "2023-11-28 12:33:01", "2023-11-28 12:48:01", "2023-11-28 01:03:01", "2023-11-28 01:18:01", "2023-11-28 01:33:01", "2023-11-28 01:48:01", "2023-11-28 02:03:01", "2023-11-28 02:18:01", "2023-11-28 02:33:01", "2023-11-28 02:48:01", "2023-11-28 03:03:01", "2023-11-28 03:18:01", "2023-11-28 03:33:01", "2023-11-28 03:48:01", "2023-11-28 04:03:01", "2023-11-28 04:18:01", "2023-11-28 04:33:01", "2023-11-28 04:48:01", "2023-11-28 05:03:01", "2023-11-28 05:18:01", "2023-11-28 05:33:01", "2023-11-28 05:48:01", "2023-11-28 06:03:01", "2023-11-28 06:18:01", "2023-11-28 06:33:01", "2023-11-28 06:48:01", "2023-11-28 07:03:01", "2023-11-28 07:18:01", "2023-11-28 07:33:01", "2023-11-28 07:48:01", "2023-11-28 08:03:01", "2023-11-28 08:18:01", "2023-11-28 08:33:01", "2023-11-28 08:48:01", "2023-11-28 09:03:01", "2023-11-28 09:18:01", "2023-11-28 09:33:01", "2023-11-28 09:48:01", "2023-11-28 10:03:01", "2023-11-28 10:18:01", "2023-11-28 10:33:01", "2023-11-28 10:48:01", "2023-11-28 11:03:01", "2023-11-28 11:18:01", "2023-11-28 11:33:01", "2023-11-28 11:48:01", "2023-11-29 12:03:01", "2023-11-29 12:18:01", "2023-11-29 12:33:01", "2023-11-29 12:48:01", "2023-11-29 01:03:01", "2023-11-29 01:18:01", "2023-11-29 01:33:01", "2023-11-29 01:48:01", "2023-11-29 02:03:01", "2023-11-29 02:18:01", "2023-11-29 02:33:01", "2023-11-29 02:48:01", "2023-11-29 03:03:01", "2023-11-29 03:18:01", "2023-11-29 03:33:01", "2023-11-29 03:48:01", "2023-11-29 04:03:01", "2023-11-29 04:18:01", "2023-11-29 04:33:01", "2023-11-29 04:48:01", "2023-11-29 05:03:01"],
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            color: '#FFF'
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#75878a'
                            }
                        },
                        max: maxVal,
                        min: minVal,
                    },
                    series: [{
                        name: '增益(4A)',
                        type: 'line',
                        data: [18833.0, 19106.0, 18931.0, 18828.0, 18905.0, 18924.0, 19004.0, 18953.0, 18810.0, 19080.0, 18868.0, 19120.0, 18928.0, 18860.0, 19082.0, 18817.0, 19272.0, 19207.0, 19050.0, 18925.0, 19106.0, 19184.0, 19234.0, 18883.0, 18906.0, 19089.0, 18902.0, 18831.0, 19283.0, 18907.0, 19067.0, 19290.0, 19108.0, 19250.0, 19027.0, 18941.0, 19144.0, 18988.0, 19174.0, 19033.0, 18953.0, 18844.0, 18828.0, 18869.0, 18862.0, 19029.0, 18959.0, 18873.0, 19109.0, 19178.0, 18930.0, 19070.0, 18889.0, 18987.0, 19262.0, 18813.0, 19035.0, 19211.0, 19085.0, 18979.0, 19185.0, 18836.0, 18833.0, 19067.0, 19176.0, 19242.0, 19174.0, 18841.0, 18995.0, 18804.0, 18836.0, 18946.0, 19196.0, 19181.0, 19134.0, 18926.0, 19019.0, 19028.0, 19184.0, 19040.0, 19292.0, 19192.0, 18885.0, 19269.0, 19140.0, 19161.0, 19064.0, 19285.0, 19151.0, 18878.0, 19069.0, 19096.0, 19066.0, 18858.0, 19011.0, 19281.0],
                        markLine: {
                            data: [{
                                name: '上报警线',
                                yAxis: '50000',
                                label: {
                                    formatter: '报警上限',
                                    position: 'end',
                                    color: '#F00'
                                },
                                lineStyle: {
                                    color: '#F00'
                                }
                            }, {
                                name: '上预警线',
                                yAxis: '31317',
                                label: {
                                    formatter: '预警上限',
                                    position: 'end',
                                    color: '#FF9500'
                                },
                                lineStyle: {
                                    color: '#FF9500'
                                }
                            }, {
                                name: '下报警线',
                                yAxis: 'NULL',
                                label: {
                                    formatter: '报警下限',
                                    position: 'end',
                                    color: '#F00'
                                },
                                lineStyle: {
                                    color: '#F00'
                                }
                            }, {
                                name: '下预警线',
                                yAxis: 'NULL',
                                label: {
                                    formatter: '预警下限',
                                    position: 'end',
                                    color: '#FF9500'
                                },
                                lineStyle: {
                                    color: '#FF9500'
                                }
                            }],
                        }
                    }]
                }
                this.chart.setOption(data);
            }
            else
            {
                this.EarlyWarningTrendData = {
                    "TagName": "KSH_5201_SwirlAngle", "TagAbbrName": "SHCBM13:KSH_5201_LPD.F_SwirlAngle", "HighLimit": 1.269, "LowLimit": -0.711, "AlarmHighLimit": 1.28, "AlarmLowLimit": -0.72, "Description": "漩涡角", "TrendMaxVal": 6.3, "TrendMinVal": -5.7
                };
                let maxVal = 1.3;
                let minVal = -1;
                let data = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: (params) => {
                            let str = params[0].name + "<br />";
                            str +=
                                params[0].seriesName + " : " + params[0].value + "<br />";
                            return str;
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            color: '#FFF'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#75878a'
                            }
                        },
                        data: ["2023-11-28 05:18:01", "2023-11-28 05:33:01", "2023-11-28 05:48:01", "2023-11-28 06:03:01", "2023-11-28 06:18:01", "2023-11-28 06:33:01", "2023-11-28 06:48:01", "2023-11-28 07:03:01", "2023-11-28 07:18:01", "2023-11-28 07:33:01", "2023-11-28 07:48:01", "2023-11-28 08:03:01", "2023-11-28 08:18:01", "2023-11-28 08:33:01", "2023-11-28 08:48:01", "2023-11-28 09:03:01", "2023-11-28 09:18:01", "2023-11-28 09:33:01", "2023-11-28 09:48:01", "2023-11-28 10:03:01", "2023-11-28 10:18:01", "2023-11-28 10:33:01", "2023-11-28 10:48:01", "2023-11-28 11:03:01", "2023-11-28 11:18:01", "2023-11-28 11:33:01", "2023-11-28 11:48:01", "2023-11-28 12:03:01", "2023-11-28 12:18:01", "2023-11-28 12:33:01", "2023-11-28 12:48:01", "2023-11-28 01:03:01", "2023-11-28 01:18:01", "2023-11-28 01:33:01", "2023-11-28 01:48:01", "2023-11-28 02:03:01", "2023-11-28 02:18:01", "2023-11-28 02:33:01", "2023-11-28 02:48:01", "2023-11-28 03:03:01", "2023-11-28 03:18:01", "2023-11-28 03:33:01", "2023-11-28 03:48:01", "2023-11-28 04:03:01", "2023-11-28 04:18:01", "2023-11-28 04:33:01", "2023-11-28 04:48:01", "2023-11-28 05:03:01", "2023-11-28 05:18:01", "2023-11-28 05:33:01", "2023-11-28 05:48:01", "2023-11-28 06:03:01", "2023-11-28 06:18:01", "2023-11-28 06:33:01", "2023-11-28 06:48:01", "2023-11-28 07:03:01", "2023-11-28 07:18:01", "2023-11-28 07:33:01", "2023-11-28 07:48:01", "2023-11-28 08:03:01", "2023-11-28 08:18:01", "2023-11-28 08:33:01", "2023-11-28 08:48:01", "2023-11-28 09:03:01", "2023-11-28 09:18:01", "2023-11-28 09:33:01", "2023-11-28 09:48:01", "2023-11-28 10:03:01", "2023-11-28 10:18:01", "2023-11-28 10:33:01", "2023-11-28 10:48:01", "2023-11-28 11:03:01", "2023-11-28 11:18:01", "2023-11-28 11:33:01", "2023-11-28 11:48:01", "2023-11-29 12:03:01", "2023-11-29 12:18:01", "2023-11-29 12:33:01", "2023-11-29 12:48:01", "2023-11-29 01:03:01", "2023-11-29 01:18:01", "2023-11-29 01:33:01", "2023-11-29 01:48:01", "2023-11-29 02:03:01", "2023-11-29 02:18:01", "2023-11-29 02:33:01", "2023-11-29 02:48:01", "2023-11-29 03:03:01", "2023-11-29 03:18:01", "2023-11-29 03:33:01", "2023-11-29 03:48:01", "2023-11-29 04:03:01", "2023-11-29 04:18:01", "2023-11-29 04:33:01", "2023-11-29 04:48:01", "2023-11-29 05:03:01"],
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            color: '#FFF'
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#75878a'
                            }
                        },
                        max: maxVal,
                        min: minVal,
                    },
                    series: [{
                        name: '增益(2A)',
                        type: 'line',
                        data: [0.967, 0.972, 0.975, 0.995, 0.955, 1.0, 0.978, 0.98, 0.997, 0.978, 1.016, 0.981, 0.954, 1.003, 0.978, 1.004, 0.963, 0.96, 0.959, 0.979, 0.992, 0.995, 0.999, 0.961, 0.978, 0.957, 0.976, 0.97, 1.011, 0.996, 0.981, 0.997, 1.015, 1.017, 0.956, 0.99, 0.982, 0.992, 0.996, 0.983, 0.968, 1.004, 0.975, 1.015, 1.016, 0.982, 0.994, 0.965, 1.014, 0.996, 1.006, 0.972, 1.007, 0.988, 0.993, 0.974, 0.974, 1.015, 1.018, 0.999, 0.957, 1.009, 0.97, 1.002, 0.998, 1.02, 0.967, 1.006, 0.98, 0.989, 0.955, 0.973, 0.966, 0.978, 1.013, 0.989, 0.953, 0.985, 1.014, 0.998, 0.965, 1.013, 0.958, 1.016, 0.992, 1.011, 0.992, 0.961, 0.957, 0.984, 1.018, 0.969, 0.975, 0.998, 0.959, 0.96],
                        markLine: {
                            data: [{
                                name: '上报警线',
                                yAxis: '1.1000',
                                label: {
                                    formatter: '报警上限',
                                    position: 'end',
                                    color: '#F00'
                                },
                                lineStyle: {
                                    color: '#F00'
                                }
                            }, {
                                name: '上预警线',
                                yAxis: '1.1906',
                                label: {
                                    formatter: '预警上限',
                                    position: 'end',
                                    color: '#FF9500'
                                },
                                lineStyle: {
                                    color: '#FF9500'
                                }
                            }, {
                                name: '下报警线',
                                yAxis: '0.9000',
                                label: {
                                    formatter: '报警下限',
                                    position: 'end',
                                    color: '#F00'
                                },
                                lineStyle: {
                                    color: '#F00'
                                }
                            }, {
                                name: '下预警线',
                                yAxis: '0.9287',
                                label: {
                                    formatter: '预警下限',
                                    position: 'end',
                                    color: '#FF9500'
                                },
                                lineStyle: {
                                    color: '#FF9500'
                                }
                            }],
                        }
                    }]
                }
                this.chart.setOption(data);
            }


            this.EarlyWarningDescription = tab.description;
            //this.EarlyWarningTrendData.AlarmHighLimit = "0.2";
            //this.EarlyWarningTrendData.AlarmLowLimit = "0.2";
            //this.EarlyWarningTrendData.HighLimit = "0.2";
            //this.EarlyWarningTrendData.LowLimit = "0.2";
                   
            //this.earlyWarningdialogVisible = true;
                
        },
        IsEarlyWarning(LoopID) {
            if (this.EarlyWarningStettingLoops.includes(LoopID)) {
                return true;
            } else {
                return false;
            }

        },
        clear() {
            clearInterval(this.intervalId); //清除计时器
            this.intervalId = null; //设置为null
        },
        compareVog(value) {
            if (String(value).indexOf('?') != -1) {
                return value;
            }
            if (value < 0.1 && value > -0.1) {
                return 0
            } else {
                return value
            }
        },

        numberDigits(value, lead = 3, decimal = 0) {
            if (String(value).indexOf('?') != -1) {

                return '-----'
            } else {
                var num = new Number(value);
                return num.toFixed(decimal)
            }
        },

        SetValDigits(loopData, staAbbrName, loopAbbrName, tagName, lead = 3, decimal = 0) {
            console.log()
            if (loopData == 'LoopDatas') {
                var data = this.loopData[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.loopData[loopAbbrName].Loop[staAbbrName + '_' + loopAbbrName + '_' + tagName]
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.loopData[loopAbbrName].Loop[staAbbrName + '_' + loopAbbrName + '_' + tagName].value;
                        if (tagVal.indexOf('?') != -1) {

                            return '-----'
                        } else {
                            var num = new Number(tagVal);
                            return num.toFixed(decimal)
                        }
                    }
                }

            } else if (loopData == 'EquipmentDatas') {
                var data = this.EquipmentDatas[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.EquipmentDatas[loopAbbrName].Equipment[staAbbrName + '_' + loopAbbrName + '_' + tagName]
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.EquipmentDatas[loopAbbrName].Equipment[staAbbrName + '_' + loopAbbrName + '_' + tagName].value;

                        if (tagVal.indexOf('?') != -1) {

                            return '-----'
                        } else {
                            var num = new Number(tagVal);
                            return num.toFixed(decimal)
                        }
                    }
                }
            }
        },

        SetDiagnosticDetail(loopData, loopAbbrName, tagName, lead = 3, decimal = 0) {
            if (loopData == 'LoopDatas') {
                var data = this.loopData[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.loopData[loopAbbrName].Diagnostic
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.loopData[loopAbbrName].Diagnostic[tagName];


                        return tagVal

                    }
                }
            } else if (loopData == 'EquipmentDatas') {
                var data = this.EquipmentDatas[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.EquipmentDatas[loopAbbrName].Diagnostic
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.EquipmentDatas[loopAbbrName].Diagnostic[tagName];


                        return tagVal

                    }
                }
            }

        },

        SetAlarmCountDetail(loopData, loopAbbrName, tagName, lead = 3, decimal = 0) {
            if (loopData == 'LoopDatas') {
                var data = this.loopData[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.loopData[loopAbbrName].AlarmCount
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.loopData[loopAbbrName].AlarmCount[tagName].value;

                        if (tagVal.indexOf('?') != -1) {

                            return '-----'
                        } else {
                            var num = new Number(tagVal);
                            return num.toFixed(decimal)
                        }
                    }
                }
            } else if (loopData == 'EquipmentDatas') {
                var data = this.EquipmentDatas[loopAbbrName]
                if (data == undefined) {

                    return '-----'
                } else {
                    var tag = this.EquipmentDatas[loopAbbrName].AlarmCount
                    if (tag == undefined) {
                        //console.log('loss: ' + staAbbrName + '_' + loopAbbrName + '_' + tagName);

                        return '-----'
                    } else {
                        var tagVal = this.EquipmentDatas[loopAbbrName].AlarmCount[tagName].value;

                        if (tagVal.indexOf('?') != -1) {

                            return '-----'
                        } else {
                            var num = new Number(tagVal);
                            return num.toFixed(decimal)
                        }
                    }
                }
            }

        },
        SetEarlyWarningCountDetail(loopData, LoopAbbrName) {
            if (loopData == 'LoopDatas') {

                var data = this.loopData[LoopAbbrName]
                if (data == undefined) {
                    return 0;
                }
                else {
                    if (data.EarlyWarningCount == undefined) {
                        return 0;
                    } else {
                        return data.EarlyWarningCount
                    }
                }
            }
        }
    },
    destroyed() {
        this.clear()
    }
})
