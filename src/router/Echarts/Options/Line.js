export default function Option() {
    return {
        title: {
            text: '组合收益率对比',
            textStyle: {
                color: "#55A2DD"
            }
        },
        tooltip: {
            trigger: "axis", //触发方式：axis坐标轴
            axisPointer: {
                type: "line", //高亮形式：线
                z: 1, //层叠顺序
            }
        },
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false, //是否有0刻度
            axisLabel: {
                show: false,
                interval: 0, //间隔多少省略标签
            }
        },
        yAxis: {
            type: 'value',
            name: '收益率(%)',
            nameLocation: 'end',
            nameTextStyle: {
                color: "#666",
                align: "center",
                lineHeight: 24,
                // padding: [2, 160, 2, 2],
            }
        },
        series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                symbol: "none",
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                                offset: 0,
                                color: '#fff' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(24, 144, 255,0.3)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    }
                },
                lineStyle: {
                    color: "#1890FF"
                },
                symbol: "circle",
                showSymbol: false,
                symbolSize: 12,
                itemStyle: {
                    color: "#67C7F9",
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowColor: "rgba(174,223,255,0.60)",
                    shadowBlur: 10,
                    //   boxShadow: "0 7px 10px 0 rgba(174,223,255,0.60)" ,
                },
            },
            {
                data: ["-", "-", 901, "-", "-", 1330, "-"],
                type: 'bar',
                barWidth: 3,
                itemStyle: {
                    color: "#9D7BE9"
                }
            },
        ]
    };
}