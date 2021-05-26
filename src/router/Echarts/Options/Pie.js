export default function Option() {
    return {
        legend: {
            orient: "vertical",
            left: "left",
            data: ["Apple", "Grapes", "Pineapples", "Oranges"]
        },
        series: [{
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
                                offset: 0,
                                color: '#ffd22c' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#ff9c00' // 100% 处的颜色
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
                                offset: 0,
                                color: '#ffd22c' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#ff9c00' // 100% 处的颜色
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
                data: [{
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
                                offset: 0,
                                color: '#00e0fe' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#0073ff' // 100% 处的颜色
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
                                offset: 0,
                                color: '#00e0fe' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#0073ff' // 100% 处的颜色
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
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#fe764c' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#cb1f1e' // 100% 处的颜色
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
                                offset: 0,
                                color: '#fe764c' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#cb1f1e' // 100% 处的颜色
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
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#5b89ff' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#8810ff' // 100% 处的颜色
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
                                offset: 0,
                                color: '#5b89ff' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#8810ff' // 100% 处的颜色
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
    };
}