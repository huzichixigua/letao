$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var imgArr = [];
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                $("tbody").html(template("product-tpl", data));
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / data.size),
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "next":
                                return "下一页";
                            case "prev":
                                return "上一页";
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        };
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case "next":
                                return "下一页";
                            case "prev":
                                return "上一页";
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        };
                    },
                    onPageClicked: function (a, b, c, p) {
                        currentPage = p;
                        render();
                    }
                })

            }
        })
    }
    render();

    $("#product-btn").on("click", function () {
        $("#product-modal").modal("show");
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                $(".dropdown-menu").html(template("product-tpl2", data));
            }
        });
    });

    $(".dropdown-menu").on("click", "li", function () {
        $(".dropdown-text").text($(this).text());
        $("#brandId").val($(this).data("id"));
        $("form").data('bootstrapValidator').updateStatus("brandId","VALID");

    })

    $("form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"商品库存必须大于零"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺码"
                    },
                    regexp:{
                        regexp:/^\d{1,2}-\d{1,2}$/,
                        message:"请输入商品尺码(32-46)"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    },
                    regexp:{
                        regexp:/^\d*$/,
                        message:"请输入商品价格"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品价格"
                    },
                    regexp:{
                        regexp:/^\d*$/,
                        message:"请输入商品价格"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择三张图片"
                    }
                }
            },
        }
    })
    
    $("#fileupload").fileupload({
        dataType:"json",
        done:function (e, data) {
            if(imgArr.length > 3){
                return false;
            }
            imgArr.push(data.result);
            $(".picwrapper").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');
            if(imgArr.length === 3){
                $("form").data('bootstrapValidator').updateStatus("brandLogo","VALID");
            }else{
                $("form").data('bootstrapValidator').updateStatus("brandLogo","INVALID");
            }


        }
      });


    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        var param = $("form").serialize() + "&picName1=" + imgArr[0].picName + "&picAddr1=" +imgArr[0].picAddr + "&picName2=" + imgArr[1].picName + "&picAddr2=" +imgArr[1].picAddr + "&picName3=" + imgArr[2].picName + "&picAddr3=" +imgArr[2].picAddr;
  
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: param,
            success: function (data) {

                currentPage = 1;
                render();
                $("#product-modal").modal("hide");
                $("form").data('bootstrapValidator').resetForm();
                $("form")[0].reset();
                $(".dropdown-text").text("请选择二级分类");
                $("#brandId").val("");
                imgArr = [];
                $(".picwrapper img").remove();
            }
        });
    });
    
})

