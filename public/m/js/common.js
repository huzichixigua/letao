$(function () {

    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
    })

    mui('.mui-slider').slider({
        interval: 1000
    });

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
    window.getSearchObj = getSearchObj;
    window.getSearchItem = getSearchItem;
})