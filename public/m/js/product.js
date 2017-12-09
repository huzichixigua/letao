$(function(){
    var id = getSearchItem("id");
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {id:id},
        success: function (data) {
           var arr = data.size.split("-");
           data.arrSize = [];
           for(var i = +arr[0];i <= arr[1]; i++){
            data.arrSize.push(i);
           }
 

            console.log(data);
            $(".mui-scroll").html(template("tpl1",data));
            mui('.mui-slider').slider({
                interval: 1000
            });
            mui(".mui-numbox").numbox();
            mui('.mui-scroll-wrapper').scroll({
                indicators: false,
            })
        }
    });

   
    



   
})