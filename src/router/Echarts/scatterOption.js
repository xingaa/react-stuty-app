export default function Option() {
    return {
        title: {
            text: 'ECharts-scatter 入门示例'
        },
        legend: {
            data: ["Male"],
            show: true,
            right: 0,
        },
        grid: {
            left: "3%",
            right: "7%",
            bottom: "10%",
            containLabel: true
        },
        xAxis: {
            type: "value",
            scale: true, //值范围不从0开始
            axisLabel: {
                formatter: "{value} cm"
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: "value",
            scale: true,
            axisLabel: {
                formatter: "{value} kg"
            },
            splitLine: {
                show: false
            }
        },

        series: [{
            name: "Male",
            type: "scatter",
            // symbol: "pin", //标记的图形
            data: [
                [10.0, 8.04],
                [8.07, 6.95],
                [13.0, 7.58],
                [9.05, 8.81],
                [11.0, 8.33],
                [14.0, 7.66],
                [13.4, 6.81],
                [10.0, 6.33],
                [14.0, 8.96],
                [12.5, 6.82],
                [9.15, 7.20],
                [11.5, 7.20],
                [3.03, 4.23],
                [12.2, 7.83],
                [2.02, 4.47],
                [1.05, 3.33],
                [4.05, 4.96],
                [6.03, 7.24],
                [12.0, 6.26],
                [12.0, 8.84],
                [7.08, 5.82],
                [5.02, 5.68]
            ]
        }]
    }
}