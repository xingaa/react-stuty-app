export default function Option() {
    return {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: [{
            type: 'value',
            name: '温度',
            min: (value) => {
                return value.min
            },
            max: (value) => {
                return value.max
            },
            axisLabel: {
                formatter: '{value}℃'
            },
            nameTextStyle: {
                color: "blue"
            }
        }, {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 100,
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: true,
                // lineStyle: {
                //     // background:"red",
                //     color: "red",

                // }
            }
        }],
        series: [{
            label: {
                show: true,
            },
            name: '销量',
            type: 'line',
            stack: "总量",
            data: [1.01, 2.02, 3.03, 4.04, 5.05, 6.06]
        }, {
            name: '金额',
            type: 'bar',
            yAxisIndex: 1,
            data: [{
                value: 60.33,
                name: "衬衫"
            }, 20.33, 36.33, 10.33, 10.33, 20.33],
            label: {
                show: true,
                position: [-10, -30],
            },
            labelLine: {
                show: true,
            }
        }],
    };
}