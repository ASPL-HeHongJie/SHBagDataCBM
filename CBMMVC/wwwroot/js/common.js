var vm = new Vue({
    el: '#app',
    data: {
        isSelected: false,
        navId: '',
        thirdNavID: "",
    },
     methods: {
        // 展示3级导航
         showSecondNav(id) {
             if (this.navId == id) {
                 this.navId = -id;
                 return;
             }  
             var secondLevel = $(".secondLevel_" + id).children(".item").length;
             if (secondLevel > 4) {
                 var secondLists = document.querySelector(".secondLevel_" + id);
                 secondLists.classList.add("scroll")
             }
             this.navId = id;
         },
        // 展示2级导航
         showThirdNav(id) {
             if (this.thirdNavID == id) {
                 this.thirdNavID = -id;
                 this.navId = -id;
                 return;
             }
             this.thirdNavID = id;    
         },
       
        // 处理选中
        handleSelected() {
            this.isSelected = !this.isSelected
        }
    },
})