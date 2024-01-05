
$("#detailsForm").validate({
    rules: {
        ManagerName: { required: true, range: [2, 4] },
        Phone: { required: true, range: [18, 150] },
        MobilePhone1: { required: true, minlength: 10 },
        MobilePhone2: { required: true, minlength: 10 },
        EMail: { required: true, minlength: 10 },
        AdministrativeLevel: { required: true, minlength: 10 },
        Department: { required: true, minlength: 10 },
        country: { required: true },
    },
    messages: {
        ManagerName: {required:"请输入姓名！",range:"名字必须在2到4个中文之内！"}
        Phone: "Please enter valid age",
        address: "Please enter address (more than 10 chars)",
        country: "Please select country"
    },
    submitHandler: function () {
        formSubmitHandler();
    }
});