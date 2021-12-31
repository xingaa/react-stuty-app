import React, { Component } from 'react';
import styles from "./index.module.scss";
import G6 from "@antv/g6";

class index extends Component {
    state = {}


    render() {
        return (
            <div className={styles.box}>
                <div id="container" className={styles.container}></div>
            </div>
        );
    }
    init = () => {
        const container = document.getElementById('container');

        let nodes = []
        let edges = []
        for (let i = 0; i < 15; i++) {
            if (i == 0) {
                nodes.push({
                    id: "node0",
                    size: 100,
                    label: "Circle0",
                    labelCfg: {
                        position: "center",
                    }
                })
            } else {
                nodes.push({
                    id: "node" + i,
                    label: "c" + i,
                    size: 36,
                    isLeaf: true,
                    color: "#8e8e8e",
                    style: {
                        fill: "#8e8e8e",
                        lineWidth: 3
                    },
                })
                edges.push({
                    source: "node0",
                    target: "node" + i,
                    label: 'edge' + i,

                })
            }
        }
        nodes.push({
            id: "leaf1",
            label: "l1",
            size: 20,
            isLeaf: true,
            color: "#5B8FF9",
        })
        edges.push({
            source: "node8",
            target: "leaf1",
            label: 'leaf1',

        })
        const data = {
            nodes,
            edges,
        };

        const graph = new G6.Graph({
            container: "container",
            layout: {
                type: 'force',
                preventOverlap: true,//是否防止重叠
                linkDistance: 200,//边长度
                nodeStrength: -1000,//节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用
                collideStrength: 1, //防止重叠的力强度，范围 [0, 1]
            },
            defaultNode: {
                shape: "circle",
                size: [100],
                color: "#5B8FF9",
                style: {
                    fill: "#9EC9FF",
                    lineWidth: 3
                },
                labelCfg: {
                    style: {
                        fill: "#333",
                        fontSize: 20
                    },
                    position: "bottom",
                }
            },
            defaultEdge: {
                style: {
                    stroke: "#e2e2e2"
                },
                label: '123',
                labelCfg: {
                    autoRotate: true,//跟随线旋转
                    style: {
                        fill: "red"
                    }
                }
            },
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
        });

        graph.on('node:dragstart', function (e) {
            graph.layout();
            refreshDragedNodePosition(e);
        });
        graph.on('node:drag', function (e) {
            refreshDragedNodePosition(e);
        });
        graph.on('node:dragend', function (e) {
            e.item.get('model').fx = null;
            e.item.get('model').fy = null;
        });

        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(container.scrollWidth, container.scrollHeight);
            };

        function refreshDragedNodePosition(e) {
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
        }

        graph.data(data);
        graph.render();

    }
    componentDidMount() {
        this.init()
    }
}

export default index;
