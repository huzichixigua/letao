$(function () {
    var currentPage = 1;
    var pageSize = 5;
    // 初始化渲染页面
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                $("tbody").html(template("user-tpl", data));
                // 添加paginator分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / data.size),
                    size: "small",
                    onPageClicked: function (a, b, c, p) {
                        currentPage = p;
                        render();
                    }
                })
            }
            
        });
    }
    render();

    // 点击模态框出现
    $("tbody").on("click",".btn",function(){
        $("#user-modal").modal("show");
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        // 数据交互
        $(".btn-sure").off().on("click",function(){
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id: id,
                    isDelete: isDelete
                },
                success:function(data){
                    if(data.success){
                        $("#user-modal").modal("hide");
                        render();
                    }
                }
            })
        })
    })






})