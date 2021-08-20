import { element } from 'prop-types';
import React, { Component } from 'react';
import styles from "./index.module.scss";
import waterMarkFn from "./waterMark"
import logo from '../../logo.svg';
import { Button } from "antd"

class index extends Component {
    state = {
        text: [
            "获取想要插入水印的文档节点的顶点坐标值x，y。",
            "获取文档节点的高度heigt和宽度width。",
            "用div包裹文字来生成水印。",
            "定义好div的长宽高间距等各种属性。。",
            "定义虚拟节点createDocumentFragment()包裹水印文档。。",
            "先进行行（hang）循环，一行一行生成水印，以x，y为初始坐标，生成一个top为y，left为x，自带宽高的一列水印。每生成一行，y的值递增（高度加行距），x的值重置为初始值。",
            "再进行列循环，一列一列生成水印，每生成一列，x的值递增（宽度加间距）。",
            "通过append方法插入每个水印节点。",
            "将水印append到最开始想要插入的文档节点中去。",
        ]
    }

    render() {


        return (
            <div className={styles.box} id="world">
                <ol id="waterMarkWrap">
                    {this.state.text.map((item, index) => {
                        return (
                            <li key={index}>
                                <p>
                                    {item}
                                </p>
                            </li>
                        )
                    })}
                </ol>
                <Button onClick={this.addLine}>新增一行</Button>
            </div>
        );
    }
    addLine = (params) => {
        const { text } = this.state
        text.push("获取想要插入水印的文档节点的顶点坐标值x，y。")
        this.setState({
            text,
        })
    }

    componentDidMount() {
        const ele = document.getElementById("waterMarkWrap")
        const img = `<img src="${logo}" className="App-logo" alt="logo" style="height:100%"/>`
        /*
            waterMarkFn函数：
            形参1：需要加水印的元素
            形参2：自定义配置
                text1: 'text', //文本1
                text2: 'text', // 文本2
                start_x: 0, // x轴起始位置
                start_y: 0, // y轴起始位置
                space_x: 100, // x轴间距
                space_y: 50, // y轴间距
                width: 210, // 宽度
                height: 80, // 长度
                fontSize: 20, // 字体
                color: '#aaa', // 字色
                alpha: 0.4, // 透明度
                rotate: 15, // 倾斜度
        */
        waterMarkFn(ele, {
            text1: img,
            text2: "华华",
            height: 20, // 长度
            width: 80, // 宽度
            space_x: 10, // x轴间距
        })
        // 获取当前水印DOM的高度
        var initHeight = ele.clientHeight
        // MutationObserver接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分。
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        // MutationObserver是一个监听DOM style改变的功能对象，当高度改变时会触发里面的函数
        let observer = new MutationObserver((mutationList) => {
            // 获取改变后的高度
            console.log("监听到变化");
            let height = getComputedStyle(ele).getPropertyValue('height')
            // 比较改变后的高度和当前高度大小，如果改变了则重新执行一次水印函数，并将新的高度赋值给initHeight
            if (initHeight != height) {
                // waterMarkFn(ele, {
                //     text1: img,
                //     text2: "华华",
                //     height: 20, // 长度
                //     width: 80, // 宽度
                //     space_x: 10, // x轴间距
                // })
                // initHeight = height
            }
        });
        // 配置观察选项:
        var config = {
            attributes: true,
            // childList: true,
            // subtree: true,
            // characterData: true,
            attributeOldValue: true,
            // characterDataOldValue: true,
            attributeFilter: ['style'],
        }
        // 传入目标节点和观察选项，启动监听
        // observer.observe(ele, config);
        // Resize Observer API提供了一种高性能的机制，通过该机制，代码可以监视元素的大小更改，并且每次大小更改时都会向观察者传递通知。
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0].contentRect.height != initHeight) {
                console.log("进入条件");
                waterMarkFn(ele, {
                    text1: img,
                    text2: "华华",
                    height: 20, // 长度
                    width: 80, // 宽度
                    space_x: 10, // x轴间距
                })
                initHeight = entries[0].contentRect.height
            }
        });
        resizeObserver.observe(ele);
    }
}

export default index;
