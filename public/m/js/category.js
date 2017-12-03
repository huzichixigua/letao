$(function(){
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function (data) {
            $(".first-category").html(template("tpl1",data)); 
            var id = data.rows[0].id;
            renderSecond(id);
        }
    });


    
    $(".first-category").on("click","li",function(){

        $(this).addClass("now").siblings().removeClass("now");
        var id = $(this).data("id");
        renderSecond(id);
    })

    function renderSecond(id){
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {id:id},
            success: function (data) {
                $(".second-category").html(template("tpl2",data));
            }
        });
    }
})