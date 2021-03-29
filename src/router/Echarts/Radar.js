export default function Option() {
    return {
        title: {
            text: "Echarts-基础雷达图"
        },
        tooltip: {},
        legend: {
            data: ["白种人", "黄种人"],
            left: 240,
        },
        radar: {
            indicator: [{
                name: "力量",
                max: 6500
            }, {
                name: "智力",
                max: 16000
            }, {
                name: "社交",
                max: 30000
            }, {
                name: "情商",
                max: 38000
            }, {
                name: "颜值",
                max: 52000
            }, {
                name: "体重",
                max: 25000
            }]
        },
        series: [{
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            data: [{
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "白种人"
            }, {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "黄种人"
            }]
        }]
    }
}