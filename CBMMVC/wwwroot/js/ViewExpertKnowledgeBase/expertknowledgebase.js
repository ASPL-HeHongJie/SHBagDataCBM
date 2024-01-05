
var loopCheckReportvm = new Vue({
    el: '#ExpertKnowledgeBase',
    data: {
        Brands: [],
        BrandName:[],
        tableData: [],
        ipPort: '',
        ipAddress: '',
        loading: false,
        dialogVisible: false,
        dialogloading: false,
        currentPage: 1,
        pagesize: 25,
    },
    created() {
        this.Brands = [
            {
                Name: 'Daniel',
                ID:'Daniel'
            }, {
                Name: 'Elster',
                ID: 'Elster'
            }, {
                Name: 'Weise',
                ID: 'Weise'
            }, {
                Name: 'Sick',
                ID: 'Sick'
            }
        ];
        this.BrandName = this.Brands[0].Name
        this.Refresh();
    },
    methods: {
        handleSizeChange: function (val) {
            this.pagesize = val;
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
        },
        onBrand(id) {
            
        },
        Refresh() {
            this.currentPage = 1
            console.log(this.BrandName)
            this.loading = true;
            var ipaddress = "/api/ExpertKnowledgeBase/GetExpertKnowledgeBase";
            var that = this;
            axios.post(
                ipaddress,
                JSON.stringify(this.BrandName),
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



        },

        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },


    }     
})
