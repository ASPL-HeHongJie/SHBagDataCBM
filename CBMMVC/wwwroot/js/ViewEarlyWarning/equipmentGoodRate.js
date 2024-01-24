
var EarlyWarningvm = new Vue({
    el: '#equipmentGoodRate',
    data: {
        companyName: [], // 公司的文本框内容
        datas: [],  // 公司遍历的内容
        TemptableData: [{ 'companyName': '郑州输气分公司', 'stationName': '博爱站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备异常' }, { 'companyName': '郑州输气分公司', 'stationName': '博爱站', 'loopName': 3401, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '郑州输气分公司', 'stationName': '长铝站', 'loopName': 3401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '胡集站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '胡集站', 'loopName': 5201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '江北站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '江北站', 'loopName': 5301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '江北站', 'loopName': 5401, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '十堰站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '十堰站', 'loopName': 5201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '十堰站', 'loopName': 5301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '十堰站', 'loopName': 5401, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '襄樊站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '襄樊站', 'loopName': 5201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '宜昌站', 'loopName': 4301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '宜昌站', 'loopName': 4303, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '宜昌站', 'loopName': 4304, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '宜城站', 'loopName': 22301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '宜城站', 'loopName': 22302, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '武汉输气分公司', 'stationName': '枝江站', 'loopName': 5301, 'brandName': 'Elster', 'status': '设备异常' }, { 'companyName': '武汉输气分公司', 'stationName': '枝江站', 'loopName': 5302, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '常州站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '常州站', 'loopName': 3301, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '常州站', 'loopName': 3401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '常州站', 'loopName': 3801, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '常州站', 'loopName': 3901, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '常州站', 'loopName': 3911, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '东桥站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备异常' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '东桥站', 'loopName': 3201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '东桥站', 'loopName': 3401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '东桥站', 'loopName': 3501, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '东桥站', 'loopName': 3601, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '东桥站', 'loopName': 3701, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '东桥站', 'loopName': 3801, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '东桥站', 'loopName': 3901, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '芙蓉站', 'loopName': 3311, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '芙蓉站', 'loopName': 3411, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '江阴站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '江阴站', 'loopName': 5201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '昆山站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '昆山站', 'loopName': 5201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '昆山站', 'loopName': 5301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '浏河站', 'loopName': 301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '浏河站', 'loopName': 302, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '浏河站', 'loopName': 304, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '浏河站', 'loopName': 305, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '龙池站', 'loopName': 3101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '龙池站', 'loopName': 3201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '龙池站', 'loopName': 3401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '龙池站', 'loopName': 3501, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '龙池站', 'loopName': 3601, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '龙潭站', 'loopName': 3301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '龙潭站', 'loopName': 3401, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '甪直站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '甪直站', 'loopName': 3201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '甪直站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '甪直站', 'loopName': 5201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '甪直站', 'loopName': 5301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '甪直站', 'loopName': 5401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '甪直站', 'loopName': 5501, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '南渡站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '南渡站', 'loopName': 5201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '南京站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '南京站', 'loopName': 3201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '南京站', 'loopName': 3401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '南京站', 'loopName': 3501, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '南京站', 'loopName': 3701, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '青山站', 'loopName': 3201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '青山站', 'loopName': 3601, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '青山站', 'loopName': 3701, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '青山站', 'loopName': 3801, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '青山站', 'loopName': 3901, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '青山站', 'loopName': 3311, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '青山站', 'loopName': 3411, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '苏州站', 'loopName': 3101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '苏州站', 'loopName': 3201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '太仓站', 'loopName': 301, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '太仓站', 'loopName': 311, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '太仓站', 'loopName': 321, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '太仓站', 'loopName': 322, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '太仓站', 'loopName': 331, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '太仓站', 'loopName': 332, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '望亭站', 'loopName': 3301, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3301, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3501, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3601, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3701, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3801, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '无锡站', 'loopName': 3901, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '吴江站', 'loopName': 5101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '吴江站', 'loopName': 5201, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '吴江站', 'loopName': 5301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '吴江站', 'loopName': 5401, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '吴江站', 'loopName': 5501, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '吴江站', 'loopName': 5601, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '吴江站', 'loopName': 5701, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '吴江站', 'loopName': 5801, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '武进站', 'loopName': 3301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '武进站', 'loopName': 3401, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '扬巴站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '扬巴站', 'loopName': 3401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '宜兴站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '宜兴站', 'loopName': 3201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '宜兴站', 'loopName': 3301, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '宜兴站', 'loopName': 3401, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '镇江站', 'loopName': 3901, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '镇江站', 'loopName': 3111, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '镇江站', 'loopName': 2311, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '镇江站', 'loopName': 2321, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '安沙站', 'loopName': 5101, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '安沙站', 'loopName': 5301, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '长沙站', 'loopName': 35310, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '长沙站', 'loopName': 35311, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '醴陵站', 'loopName': 5301, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '株洲站', 'loopName': 5101, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '株洲站', 'loopName': 5301, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '株洲站', 'loopName': 5401, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '固原站', 'loopName': 3101, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '太阳山站', 'loopName': 5101, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '太阳山站', 'loopName': 5201, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '中卫站', 'loopName': 35101, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '中卫站', 'loopName': 35201, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '中卫站', 'loopName': 35401, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '中卫站', 'loopName': 35501, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '中卫站', 'loopName': 35601, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '中卫站', 'loopName': 35701, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '银川输气分公司', 'stationName': '中卫站', 'loopName': 102, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '定远站', 'loopName': 3801, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '定远站', 'loopName': 3901, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '定远站', 'loopName': 23801, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '定远站', 'loopName': 23901, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '合肥站', 'loopName': 3701, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '合肥站', 'loopName': 3801, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '合肥站', 'loopName': 3901, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '合肥站', 'loopName': 31001, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '合肥站', 'loopName': 31101, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '合肥站', 'loopName': 3411, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '合肥站', 'loopName': 3511, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '罗集末站', 'loopName': 5301, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '罗集末站', 'loopName': 5401, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '罗集末站', 'loopName': 5601, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '罗集末站', 'loopName': 5701, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '合肥输气分公司', 'stationName': '罗集末站', 'loopName': 5801, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '干线靖边站', 'loopName': 5101, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '干线靖边站', 'loopName': 5201, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '干线靖边站', 'loopName': 5301, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '干线靖边站', 'loopName': 5601, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '干线靖边站', 'loopName': 5701, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '干线靖边站', 'loopName': 5801, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '华阴站', 'loopName': 501, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '华阴站', 'loopName': 502, 'brandName': 'Elster', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '泾川站', 'loopName': 3101, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '泾川站', 'loopName': 3201, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '泾阳站', 'loopName': 3101, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '泾阳站', 'loopName': 3201, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '潼关站', 'loopName': 5101, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '潼关站', 'loopName': 5201, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '昌北站', 'loopName': 5101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '昌北站', 'loopName': 5201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '赣州站', 'loopName': 5101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '赣州站', 'loopName': 5201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '九江站', 'loopName': 5101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '九江站', 'loopName': 5201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '萍乡站', 'loopName': 5101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '萍乡站', 'loopName': 5201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '福清站', 'loopName': 5101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '福清站', 'loopName': 5201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '海沧站', 'loopName': 5201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '同安站', 'loopName': 5101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '同安站', 'loopName': 5201, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '浙江输气分公司', 'stationName': '长兴站', 'loopName': 3101, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '浙江输气分公司', 'stationName': '萧山站', 'loopName': 503, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '浙江输气分公司', 'stationName': '萧山站', 'loopName': 504, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '太仓站', 'loopName': 341, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '太仓站', 'loopName': 342, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '渭南煤层气站', 'loopName': 5301, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '甘陕输气分公司', 'stationName': '渭南煤层气站', 'loopName': 5401, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '长汀站', 'loopName': 5101, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '长汀站', 'loopName': 5201, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '昌北站', 'loopName': 5301, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '昌北站', 'loopName': 5401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '九江站', 'loopName': 5301, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '九江站', 'loopName': 5401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '上饶站', 'loopName': 5301, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '南昌输气分公司', 'stationName': '上饶站', 'loopName': 5401, 'brandName': 'Daniel', 'status': '设备完好' }, { 'companyName': '长沙输气分公司', 'stationName': '望城站', 'loopName': 5601, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '南安站', 'loopName': 5101, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '南安站', 'loopName': 5201, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '厦门输气分公司', 'stationName': '南安站', 'loopName': 5301, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '丹阳站', 'loopName': 5101, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '丹阳站', 'loopName': 5201, 'brandName': 'Sick', 'status': '设备完好' }, { 'companyName': '郑州输气分公司', 'stationName': '洛阳末站', 'loopName': 5501, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '苏州站', 'loopName': 5301, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '苏州站', 'loopName': 5401, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '苏州站', 'loopName': 5501, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '苏州站', 'loopName': 5601, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '昆山站', 'loopName': 5401, 'brandName': 'Weise', 'status': '设备完好' }, { 'companyName': '苏浙沪输气分公司', 'stationName': '昆山站', 'loopName': 5501, 'brandName': 'Daniel', 'status': '设备完好' }],
        tableData: [],
        ipPort: '',
        ipAddress: '',
        loading: true,
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
            Name: '设备完好',
            ID: '设备完好'
        }, {
            Name: '设备异常',
            ID: '设备异常'
        }],
        StatusName: [],
        timeSlot: [],
        equipmentGoodRateChart: ''

    },
    created() {
        function fall(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? fall(x) : x)) }
        this.datas = fall(companies.map((res) => { return [{ Name: res.Name, ID: res.ID }] }))
        this.datas.map((res) => {
            this.companyName.push(res.ID);
        })
        var myDate = new Date();  // 当前时间
        var preDate = new Date(new Date(myDate.getTime() - 24 * 60 * 60 * 1000 * 7).toLocaleDateString()); // 前一天时间00:00:00
        this.timeSlot = [preDate, myDate];

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
            this.dialogVisible = true;
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
            if (this.companyName.length == 0) {
                this.$message({ showClose: true, message: '请选择公司', type: 'error' });
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
            var data = {
                CompanyIDs: this.companyName,
                BeginDateTime: times[0],
                EndDateTime: times[1]
            }
            this.loading = true;
            var ipaddress = "/api/EarlyWarning/GetEquipmentStatisticAvalability";
            data = JSON.stringify(JSON.stringify(data));
            var that = this;
            axios.post(
                ipaddress,
                data,
                { headers: { 'Content-Type': 'application/json' } },
                { timeout: 1000 * 60 * 2 })
                .then((res) => {
                    this.loading = false;
                    that.tableData = res.data.EquipmentAvalability;
                   var equipmentAvalability = res.data.EquipmentAvalability;
                    /*var brands =that.notificationRateTableData.fo;*/
                    var chartsCmopanys = [];
                    var chartsRates = [];
                    equipmentAvalability.map((res) => {
                        chartsCmopanys.push(res.company.replace("输气分公司", ""));
                        chartsRates.push(res.rate);
                    })
                    this.equipmentGoodRateChart = echarts.init(document.getElementById('equipmentGoodRatechert'))
                    this.equipmentGoodRateChart.setOption({
                        grid: [{
                            /*top: '5%',*/
                            width: '90%',
                            height: '90%',
                            left: '1%',
                            containLabel: true
                        }],
                        xAxis: [{
                            type: 'category',
                            data: chartsCmopanys,
                            axisLabel: {
                                margin: 8,
                                fontSize: 14,
                                color: '#fff',
                                interval: 0,
                                rotate: 0,
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
                            barWidth: '30%',
                            emphasis: {
                                focus: 'series'
                            },
                            label: {
                                show: true,
                                position: 'top',
                                color: '#707070',
                                backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(179, 255, 171, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(18, 255, 247, 1)',
                                },
                                ]),
                                padding: 5,
                                borderRadius: 6
                            },
                            itemStyle: {
                                barBorderRadius: [5, 5, 0, 0],
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(179, 255, 171, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(18, 255, 247, 1)',
                                },
                                ]),
                            },
                            data: chartsRates
                        }]

                    })
                }, (err) => {
                    this.loading = false;
                });
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
