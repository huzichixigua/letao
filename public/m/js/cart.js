$(function(){
    $.ajax({
        type: "get",
        url: "/cart/queryCart",
        success: function (data) {
            console.log(data);  
            if(data.error){
                location.href = "login.html";
                return false;
            };
            $(".mui-scroll ul").html(template("tpl",{list:data}));  



            $("input").on("click",function(){
                console.log(1);
                
        
            })
        
        }
    });

   

})