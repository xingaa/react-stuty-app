import * as echarts from "echarts"

var mapName = 'china'
var data = [{
        name: "北京",
        value: 199
    },
    {
        name: "天津",
        value: 42
    },
    {
        name: "河北",
        value: 102
    },
    {
        name: "山西",
        value: 81
    },
    {
        name: "内蒙古",
        value: 47
    },
    {
        name: "辽宁",
        value: 67
    },
    {
        name: "吉林",
        value: 82
    },
    {
        name: "黑龙江",
        value: 123
    },
    {
        name: "上海",
        value: 24
    },
    {
        name: "江苏",
        value: 92
    },
    {
        name: "浙江",
        value: 114
    },
    {
        name: "安徽",
        value: 109
    },
    {
        name: "福建",
        value: 116
    },
    {
        name: "江西",
        value: 91
    },
    {
        name: "山东",
        value: 119
    },
    {
        name: "河南",
        value: 137
    },
    {
        name: "湖北",
        value: 116
    },
    {
        name: "湖南",
        value: 114
    },
    {
        name: "重庆",
        value: 91
    },
    {
        name: "四川",
        value: 125
    },
    {
        name: "贵州",
        value: 62
    },
    {
        name: "云南",
        value: 83
    },
    {
        name: "西藏",
        value: 9
    },
    {
        name: "陕西",
        value: 80
    },
    {
        name: "甘肃",
        value: 56
    },
    {
        name: "青海",
        value: 10
    },
    {
        name: "宁夏",
        value: 18
    },
    {
        name: "新疆",
        value: 180,
    },
    {
        name: "广东",
        value: 123
    },
    {
        name: "广西",
        value: 59
    },
    {
        name: "海南",
        value: 14
    },
];

var geoCoordMap = {};
var toolTipData = [{
        name: "北京",
        value: [{
            name: "科技人才总数",
            value: 95
        }, {
            name: "理科",
            value: 82
        }]
    },
    {
        name: "天津",
        value: [{
            name: "文科",
            value: 22
        }, {
            name: "理科",
            value: 20
        }]
    },
    {
        name: "河北",
        value: [{
            name: "文科",
            value: 60
        }, {
            name: "理科",
            value: 42
        }]
    },
    {
        name: "山西",
        value: [{
            name: "文科",
            value: 40
        }, {
            name: "理科",
            value: 41
        }]
    },
    {
        name: "内蒙古",
        value: [{
            name: "文科",
            value: 23
        }, {
            name: "理科",
            value: 24
        }]
    },
    {
        name: "辽宁",
        value: [{
            name: "文科",
            value: 39
        }, {
            name: "理科",
            value: 28
        }]
    },
    {
        name: "吉林",
        value: [{
            name: "文科",
            value: 41
        }, {
            name: "理科",
            value: 41
        }]
    },
    {
        name: "黑龙江",
        value: [{
            name: "文科",
            value: 35
        }, {
            name: "理科",
            value: 31
        }]
    },
    {
        name: "上海",
        value: [{
            name: "文科",
            value: 12
        }, {
            name: "理科",
            value: 12
        }]
    },
    {
        name: "江苏",
        value: [{
            name: "文科",
            value: 47
        }, {
            name: "理科",
            value: 45
        }]
    },
    {
        name: "浙江",
        value: [{
            name: "文科",
            value: 57
        }, {
            name: "理科",
            value: 57
        }]
    },
    {
        name: "安徽",
        value: [{
            name: "文科",
            value: 57
        }, {
            name: "理科",
            value: 52
        }]
    },
    {
        name: "福建",
        value: [{
            name: "文科",
            value: 59
        }, {
            name: "理科",
            value: 57
        }]
    },
    {
        name: "江西",
        value: [{
            name: "文科",
            value: 49
        }, {
            name: "理科",
            value: 42
        }]
    },
    {
        name: "山东",
        value: [{
            name: "文科",
            value: 67
        }, {
            name: "理科",
            value: 52
        }]
    },
    {
        name: "河南",
        value: [{
            name: "文科",
            value: 69
        }, {
            name: "理科",
            value: 68
        }]
    },
    {
        name: "湖北",
        value: [{
            name: "文科",
            value: 60
        }, {
            name: "理科",
            value: 56
        }]
    },
    {
        name: "湖南",
        value: [{
            name: "文科",
            value: 62
        }, {
            name: "理科",
            value: 52
        }]
    },
    {
        name: "重庆",
        value: [{
            name: "文科",
            value: 47
        }, {
            name: "理科",
            value: 44
        }]
    },
    {
        name: "四川",
        value: [{
            name: "文科",
            value: 65
        }, {
            name: "理科",
            value: 60
        }]
    },
    {
        name: "贵州",
        value: [{
            name: "文科",
            value: 32
        }, {
            name: "理科",
            value: 30
        }]
    },
    {
        name: "云南",
        value: [{
            name: "文科",
            value: 42
        }, {
            name: "理科",
            value: 41
        }]
    },
    {
        name: "西藏",
        value: [{
            name: "文科",
            value: 5
        }, {
            name: "理科",
            value: 4
        }]
    },
    {
        name: "陕西",
        value: [{
            name: "文科",
            value: 38
        }, {
            name: "理科",
            value: 42
        }]
    },
    {
        name: "甘肃",
        value: [{
            name: "文科",
            value: 28
        }, {
            name: "理科",
            value: 28
        }]
    },
    {
        name: "青海",
        value: [{
            name: "文科",
            value: 5
        }, {
            name: "理科",
            value: 5
        }]
    },
    {
        name: "宁夏",
        value: [{
            name: "文科",
            value: 10
        }, {
            name: "理科",
            value: 8
        }]
    },
    {
        name: "新疆",
        value: [{
            name: "文科",
            value: 36
        }, {
            name: "理科",
            value: 31
        }]
    },
    {
        name: "广东",
        value: [{
            name: "文科",
            value: 63
        }, {
            name: "理科",
            value: 60
        }]
    },
    {
        name: "广西",
        value: [{
            name: "文科",
            value: 29
        }, {
            name: "理科",
            value: 30
        }]
    },
    {
        name: "海南",
        value: [{
            name: "文科",
            value: 8
        }, {
            name: "理科",
            value: 6
        }]
    },
];
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};

/*获取地图数据*/
// myChart.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
// myChart.hideLoading();
mapFeatures.forEach(function (v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;

});

export default function Option() {
    return {
        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 200,
        //     left: '10%',
        //     top: 'bottom',
        //     calculable: true,
        //     seriesIndex: [1],
        //     inRange: {
        //         color: ['#04387b', '#467bc0'] // 蓝绿
        //     }
        // },
        geo: {
            show: true,
            map: "china",
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#023677',
                    borderColor: '#1180c7',
                },
                emphasis: {
                    areaColor: '#4499d0',
                }
            }
        },
        series: [{
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                // showEffectOn: 'emphasis',

                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                }
            },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 6,
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 10)),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                // none-需要鼠标移入触发
                // showEffectOn: 'none',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'left',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'yellow',
                        shadowBlur: 10,
                        shadowColor: 'yellow'
                    }
                },
                zlevel: 1
            },

        ]
    }
}