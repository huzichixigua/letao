$(function () {
    // 分类商品下拉
    $(".category").prev().on("click", function () {
        $(".category").slideToggle();
    })
    // 菜单点击左移
    $(".menu").on("click", function () {
        $("aside").toggleClass("active");
        $("article").toggleClass("active");
    })
    // 进度条
    NProgress.configure({ showSpinner: false });
    $(document).ajaxStart(function () {
        NProgress.start();
    })
    $(document).ajaxStop(function () {
       setTimeout(function(){
            NProgress.done();
       },1000)
        
    })
    // 退出
    $(".logout").on("click", function () {
        $(".modal").modal("show");
    })
    $(".btn-logout").on("click",function(){
        $.get("/employee/employeeLogout",function(data){
            if (data.success) {
                location.href = "login.html";
            }
        })
       
    })
   
})