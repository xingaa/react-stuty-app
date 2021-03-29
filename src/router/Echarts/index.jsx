import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Card } from 'antd';
import * as echarts from "echarts";
import "echarts-gl"
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";
import scatter from "./scatterOption"
import EffectScatter from "./EffectScatter"
import Radar from "./Radar"
import Candlestick from "./Candlestick"
import Bard from "./Bard"


const scatterOption = scatter()
const EffectScatterOption = EffectScatter()
const RadarOption = Radar()
const CandlestickOption = Candlestick()
const BardOption = Bard()

class index extends Component {
    state = {

    }

    render() {

        // const { } = this.state
        return (
            <div className={styles.box}>
                <div className={styles.echartsItem} id="echarts"></div>
                <div className={styles.echartsItem} id="echartsPie"></div>
                <div className={styles.echartsItem} id="scatter"></div>
                <div className={styles.echartsItem} id="radar"></div>
                <div className={styles.echartsItem} id="effectScatter"></div>
                <div className={styles.echartsItem} id="candlestick"></div>
                <div className={styles.echartsItem} id="bard"></div>
            </div>
        );
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts'));
        // 指定图表的配置项和数据
        var option = {
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
                min: 0,
                max: 10,
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
                data: [1, 2, 3, 4, 5, 6]
            }, {
                name: '金额',
                type: 'bar',
                yAxisIndex: 1,
                data: [{ value: 60, name: "衬衫" }, 20, 36, 10, 10, 20],
                label: {
                    show: true,
                    position: [-10, -30],
                },
                labelLine: {
                    show: true,
                }
            }],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // 饼图
        var myPie = echarts.init(document.getElementById('echartsPie'));
        myPie.setOption({
            legend: {
                orient: "vertical",
                left: "left",
                data: ["Apple", "Grapes", "Pineapples", "Oranges"]
            },
            series: [
                {
                    type: "pie",
                    radius: ['40%', '70%'],
                    startAngle: 20,
                    z: 2,
                    // roseType: 'angle',
                    hoverAnimation: false, //鼠标移入变大
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    // data: [232,233,111,333],
                    data: [{
                        value: 335,
                        name: "Apple",
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#ffd22c' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#ff9c00' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            },
                            opacity: 1,
                        },
                    }, {
                        value: 310,
                        name: "Grapes",
                        itemStyle: {
                            opacity: 0,
                        },
                    }, {
                        value: 234,
                        name: "Pineapples"
                    }, {
                        value: 135,
                        name: "Oranges"
                    }],
                    itemStyle: {
                        opacity: 0,
                        label: {
                            show: false,
                        },

                    },
                    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                    // color: [{
                    //     type: 'linear',
                    //     x: 0,
                    //     y: 0,
                    //     x2: 0,
                    //     y2: 1,
                    //     colorStops: [{
                    //         offset: 0, color: '#ffd22c' // 0% 处的颜色
                    //     }, {
                    //         offset: 1, color: '#ff9c00' // 100% 处的颜色
                    //     }],
                    //     global: false // 缺省为 false
                    // },
                    // {
                    //     type: 'linear',
                    //     x: 0,
                    //     y: 0,
                    //     x2: 0,
                    //     y2: 1,

                    //     colorStops: [{
                    //         offset: 0, color: '#00e0fe' // 0% 处的颜色
                    //     }, {
                    //         offset: 1, color: '#0073ff' // 100% 处的颜色
                    //     }],
                    //     global: false // 缺省为 false
                    // },
                    // {
                    //     type: 'linear',
                    //     x: 0,
                    //     y: 0,
                    //     x2: 0,
                    //     y2: 1,
                    //     colorStops: [{
                    //         offset: 0, color: '#fe764c' // 0% 处的颜色
                    //     }, {
                    //         offset: 1, color: '#cb1f1e' // 100% 处的颜色
                    //     }],
                    //     global: false // 缺省为 false
                    // },
                    // {
                    //     type: 'linear',
                    //     x: 0,
                    //     y: 0,
                    //     x2: 0,
                    //     y2: 1,
                    //     colorStops: [{
                    //         offset: 0, color: '#5b89ff' // 0% 处的颜色
                    //     }, {
                    //         offset: 1, color: '#8810ff' // 100% 处的颜色
                    //     }],
                    //     global: false // 缺省为 false
                    // },
                    // ],
                    // itemStyle:{   
                    //     borderWidth: 24,
                    //     // borderRadius: [10, 20],
                    //     borderColor: {
                    //         type: 'linear',
                    //         x: 0,
                    //         y: 0,
                    //         x2: 0,
                    //         y2: 1,
                    //         colorStops: [{
                    //             offset: 0, color: 'rgba(214, 49, 40,0.5)' // 0% 处的颜色
                    //         }, {
                    //             offset: 1, color: 'rgba(243, 100, 66,0.5)' // 100% 处的颜色
                    //         }],
                    //         // global: false, // 缺省为 false
                    //         // opacity:0,
                    //     },
                    // },
                    // roseType: "radius",
                    // stillShowZeroSum: true
                    // roseType: 'angle'
                },
                {
                    type: "pie",
                    radius: ['35%', '75%'],
                    // roseType: 'angle',
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    startAngle: 20,
                    z: 1,
                    hoverAnimation: false, //鼠标移入变大
                    data: [{
                        value: 335,
                        name: "Apple",
                        itemStyle: {
                            opacity: 0.3,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#ffd22c' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#ff9c00' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            },
                        },
                        label: {
                            show: true,
                        },
                        labelLine: {
                            show: true,
                        },
                    }, {
                        value: 310,
                        name: "Grapes",
                    }, {
                        value: 234,
                        name: "Pineapples"
                    }, {
                        value: 135,
                        name: "Oranges"
                    }],
                    itemStyle: {
                        opacity: 0,
                        labelLine: {
                            show: false,
                        }
                    },
                },
                {
                    type: "pie",
                    radius: ['40%', '60%'],
                    startAngle: 20,
                    z: 2,
                    hoverAnimation: false, //鼠标移入变大
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            value: 335,
                            name: "Apple",
                            itemStyle: {
                                opacity: 0,
                            },
                        }, {
                            value: 310,
                            name: "Grapes",
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#00e0fe' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#0073ff' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                },
                                opacity: 1,
                            },
                        }, {
                            value: 234,
                            name: "Pineapples"
                        }, {
                            value: 135,
                            name: "Oranges"
                        }],
                    itemStyle: {
                        opacity: 0,
                        label: {
                            show: false,
                        },

                    },
                },
                {
                    type: "pie",
                    radius: ['35%', '65%'],
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    startAngle: 20,
                    z: 1,
                    hoverAnimation: false, //鼠标移入变大
                    data: [{
                        value: 335,
                        name: "Apple",
                    }, {
                        value: 310,
                        name: "Grapes",
                        itemStyle: {
                            opacity: 0.3,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#00e0fe' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#0073ff' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            },
                        },
                        label: {
                            show: true,
                        },
                        labelLine: {
                            show: true,
                        },
                    }, {
                        value: 234,
                        name: "Pineapples"
                    }, {
                        value: 135,
                        name: "Oranges"
                    }],
                    itemStyle: {
                        opacity: 0,
                        labelLine: {
                            show: false,
                        }
                    },
                },
                {
                    type: "pie",
                    radius: ['40%', '80%'],
                    startAngle: 20,
                    z: 2,
                    hoverAnimation: false, //鼠标移入变大
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            value: 335,
                            name: "Apple",
                        }, {
                            value: 310,
                            name: "Grapes",

                        }, {
                            value: 234,
                            name: "Pineapples",
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#fe764c' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#cb1f1e' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                },
                                opacity: 1,
                            },
                        }, {
                            value: 135,
                            name: "Oranges"
                        }],
                    itemStyle: {
                        opacity: 0,
                        label: {
                            show: false,
                        },

                    },
                },
                {
                    type: "pie",
                    radius: ['35%', '85%'],
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    startAngle: 20,
                    z: 1,
                    hoverAnimation: false, //鼠标移入变大
                    data: [{
                        value: 335,
                        name: "Apple",
                    }, {
                        value: 310,
                        name: "Grapes",

                    }, {
                        value: 234,
                        name: "Pineapples",
                        itemStyle: {
                            opacity: 0.3,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#fe764c' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#cb1f1e' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            },
                        },
                        label: {
                            show: true,
                        },
                        labelLine: {
                            show: true,
                        },
                    }, {
                        value: 135,
                        name: "Oranges"
                    }],
                    itemStyle: {
                        opacity: 0,
                        labelLine: {
                            show: false,
                        }
                    },
                },
                {
                    type: "pie",
                    radius: ['40%', '65%'],
                    startAngle: 20,
                    z: 2,
                    hoverAnimation: false, //鼠标移入变大
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            value: 335,
                            name: "Apple",
                        }, {
                            value: 310,
                            name: "Grapes",

                        }, {
                            value: 234,
                            name: "Pineapples",

                        }, {
                            value: 135,
                            name: "Oranges",
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#5b89ff' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#8810ff' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                },
                                opacity: 1,
                            },
                        }],
                    itemStyle: {
                        opacity: 0,
                        label: {
                            show: false,
                        },

                    },
                },
                {
                    type: "pie",
                    name: "Apple",
                    radius: ['35%', '70%'],
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    startAngle: 20,
                    z: 1,
                    hoverAnimation: false, //鼠标移入变大
                    data: [{
                        value: 335,
                        name: "Apple",
                    }, {
                        value: 310,
                        name: "Grapes",

                    }, {
                        value: 234,
                        name: "Pineapples",

                    }, {
                        value: 135,
                        name: "Oranges",
                        itemStyle: {
                            opacity: 0.3,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#5b89ff' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#8810ff' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            },
                        },
                        label: {
                            show: true,
                        },
                        labelLine: {
                            show: true,
                        },
                    }],
                    itemStyle: {
                        opacity: 0,
                        labelLine: {
                            show: false,
                        }
                    },
                },
            ],
        })
        // 散点气泡图
        var myScatter = echarts.init(document.getElementById('scatter'));
        myScatter.setOption(scatterOption)
        // 特效气泡图
        var effectScatter = echarts.init(document.getElementById('effectScatter'));
        effectScatter.setOption(EffectScatterOption)
        // 基础雷达图
        var radar = echarts.init(document.getElementById('radar'));
        radar.setOption(RadarOption)
        // K线图
        var candlestick = echarts.init(document.getElementById('candlestick'));
        candlestick.setOption(CandlestickOption)
        // 3D柱状图
        var bard = echarts.init(document.getElementById('bard'));
        bard.setOption(BardOption)
    }
}

export default index;
