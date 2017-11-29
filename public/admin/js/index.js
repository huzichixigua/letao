$(function(){
    var myChart = echarts.init(document.querySelector('article .main .left'));
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["10期","11期","12期","13期","14期","15期"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [555, 2550, 3226, 1100, 1510, 2220]
        }]
    };
    myChart.setOption(option);

    var myChart1 = echarts.init(document.querySelector('article .main .right'));
    option1 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年11月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['阿迪','耐克','新百伦','李宁','阿迪王']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'阿迪'},
                    {value:310, name:'耐克'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart1.setOption(option1);    
})