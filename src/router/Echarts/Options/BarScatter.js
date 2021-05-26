export default function Option() {
    return {
        title: {
            text: '组合位置',
            textStyle: {
                color: "#55A2DD"
            }
        },
        tooltip: {},
        grid: {
            width: "70%",
            left: "28%",
        },
        legend: {
            data: ["活期10固收80权益10", "期5固收65权益30", "组合收益率"],
            orient: "vertical",
            left: 0,
            top: 100,

            formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 5; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整

                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = ""; // 表示每一次截取的字符串
                        var start = p * provideNumber; // 开始截取的位置
                        var end = start + provideNumber; // 结束截取的位置
                        // 此处特殊处理最后一行的索引值
                        if (p == rowNumber - 1) {
                            // 最后一次不换行
                            tempStr = params.substring(start, paramsNameNumber);
                        } else {
                            // 每一次拼接字符串并换行
                            tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr; // 最终拼成的字符串
                    }
                } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName
            },

            textStyle: {
                width: 36,
                height: 100,
                overflow: 'break', //超出换行
            }

        },
        xAxis: {
            data: ["近3个月", "近6个月", "近9个月", "近1年", "成立以来"],
            axisLabel: {
                interval: 0,
            }
        },
        yAxis: {
            type: 'value',
            name: 'y(%)',
            nameLocation: 'middle',
            nameTextStyle: {
                color: "#666",
                // align: "left",
                lineHeight: 24,
                padding: [2, 160, 2, 2],
            }
        },
        series: [{
                name: '辅助',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: [100, 900, 1245, 1530, 1376]
            },
            {
                name: '收入',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    borderWidth: 1,
                    borderColor: "rgba(5, 82, 248, 1)",
                    color: "rgba(255, 0, 0, 0)"
                },
                data: [900, 345, 393, '200', '100']
            },
            {
                name: '支出',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    borderWidth: 1,
                    borderColor: "rgba(5, 82, 248, 1)",
                    color: "rgba(255, 0, 0, 0)"
                },
                data: ['100', '200', 400, 108, 154]
            },
            {
                name: '活期10固收80权益10',
                type: "scatter",
                data: [500, 1000, 1500, 1800, 1900]
            },
            {
                name: '期5固收65权益30',
                type: "scatter",
                data: [550, 1120, 1700, 2000, 2200]
            },
            {
                name: '组合收益率',
                type: "scatter",
                data: [450, 800, 1400, 1600, 1800]
            }
        ]
    };
}