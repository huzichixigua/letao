$(function(){
    var key = getSearchItem("key");
    $(".search input").val(key);
    render();
    function render(){
        var param = {
            proName:$(".search input").val().trim(),
            page:1,
            pageSize:100
        };
        var nowList = $(".list a.now");

        if(nowList.length > 0){
            var type = nowList.data("type");
            var value = nowList.find("span").hasClass("fa-angle-up") ? 1: 2;
            param[type] = value;
        }

        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: param,
            success: function (data) {
                // console.log(data);   
                $(".goods ul").html(template("tpl1",data)); 
            }
        });
    }
    
    $(".search button").on("click",function(){
        render();
    });
    $(".list a[data-type]").on("click",function(){
       
        if(!$(this).hasClass("now")){
            $(this).addClass("now").siblings().removeClass("now");
            $(this).siblings().find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }else{
            $(this).find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
            
        }
        render();
    })
    function getSearchObj() {
        var search = decodeURI(location.search).slice(1);
        var arr = search.split("&");
        var obj = {};
        arr.forEach(function (e) {
            var key = e.split("=")[0];
            var value = e.split("=")[1];
            obj[key] = value;
        })
        return obj;
    }

    function getSearchItem(key) {
        return getSearchObj()[key];
    }



    

    
    
})