$(function () {
    // 初始化页面渲染
    var currentPage = 1;
    var pageSize = 3;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function (data) {
                $("tbody").html(template("first-tpl", data));
                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / data.size),
                    // size: "small",
                    onPageClicked: function (a, b, c, p) {
                        currentPage = p,
                            render();
                    }
                });
            }
        })
    }
    render();


    // 点击模态框出现
    $("#first-btn").on("click", function () {
        $("#first-modal").modal("show");
    })
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators:{
                    notEmpty: {
                        message: "分类不能为空"
                    }
                }
            }
        }
    })

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            success:function(data){
                if(data.success){
                    $("#first-modal").modal("hide");
                    currentPage = 1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm();
                    $("#form")[0].reset();
                }
            }

        })
    });


 
})