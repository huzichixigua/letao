$(function () {
    renderHistory();
    // 增
    $(".search button").on("click", function () {
        var history = getHistory();
        var key = $(".search input").val();
        history.unshift(key);
        localStorage.setItem("history",JSON.stringify(history));
        renderHistory();
        $(".search input").val("");
        location.href = "searchList.html?key="+key;
       


    })
      // 删
    $(".empty").on("click",function(){
        localStorage.clear();
        renderHistory();
    })

    $(".history").on("click",".delete",function(){
        var arr = getHistory();
        var index = $(this).data("index");
        arr.splice(index,1);
        localStorage.setItem("history",JSON.stringify(arr));
        renderHistory();
    })




    function getHistory() {
        var history = localStorage.getItem("history") || [];
        return JSON.parse(history);
    }

    function renderHistory() {
        var history = getHistory();
        $(".history").html(template("tpl1", {
            list: history
        }));
    }

})