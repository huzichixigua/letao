$(function () {
    var currentPage = 1;
    var pageSize = 7;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                $("tbody").html(template("second-tpl", data));
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


    $("#second-btn").on("click", function () {
        $("#second-modal").modal("show");

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                $(".dropdown-menu").html(template("second-tpl1", data));
            }
        })
    })

    $(".dropdown-menu").on("click", "li", function () {
        $(".dropdown-text").text($(this).text());
        $("#categoryId").val($(this).data("id"));
        $("form").data('bootstrapValidator').updateStatus("categoryId", "VALID");

    })

    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            $("#brandLogo").val(data.result.picAddr);
            $(".picwrapper img").attr("src", data.result.picAddr);
            $("form").data('bootstrapValidator').updateStatus("brandLogo", "VALID");
        }
    });

    $("form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类不能为空'
                    },
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '一级分类不能为空'
                    },
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '图片不能为空'
                    },
                }
            },
            
        }
    })


    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("form").serialize(),
            success:function(data){
                if(data.success){
                    console.log(data);
                    currentPage = 1;
                    render();
                    $("#second-modal").modal("hide");

                    $("form").data('bootstrapValidator').resetForm();
                    $("form")[0].reset();
                    $(".dropdown-text").text("请选择一级分类");
                    $(".picwrapper img").attr("src", "./images/none.png");
                    $("[type='hidden']").val("");
                }
            }
        })
    });
    



})