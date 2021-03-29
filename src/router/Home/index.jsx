import React, { Component } from 'react';
import { Card, Button } from 'antd';
import styles from "./index.module.scss";
import MyForm from "../MyForm";
const { Meta } = Card;

class index extends Component {
    render() {
        return (
            <div className={styles.home_box}>
                <div className={styles.home_Item}>
                    <div className={styles.home_task} onClick={this.JumpTo.bind(this, "/myForm")}>
                        Form使用
                    </div>
                </div>
                <div className={styles.home_Item}>
                    <div className={styles.home_task} onClick={this.JumpTo.bind(this, "/fireworks")}>
                        烟花效果
                    </div>
                </div>
                <div className={styles.home_Item}>
                    <div className={styles.home_task} onClick={this.JumpTo.bind(this, "/myTable")}>
                        Table使用
                    </div>
                </div>
                <div className={styles.home_Item}>
                    <div className={styles.home_task} onClick={this.JumpTo.bind(this, "/deepCopy")}>
                        深拷贝原理
                    </div>
                </div>
                <div className={styles.home_Item}>
                    <div className={styles.home_task} onClick={this.JumpTo.bind(this, "/scrollBar")}>
                        滚动条样式
                    </div>
                </div>
                <div className={styles.home_Item}>
                    <div className={styles.home_task} onClick={this.JumpTo.bind(this, "/echarts")}>
                        Echarts使用
                    </div>
                </div>
                <div className={styles.home_Item}>
                    <div className={styles.home_task} onClick={this.JumpTo.bind(this, "/lazyLoad")}>
                        图片懒加载
                    </div>
                </div>
            </div>
        );
    }
    JumpTo = (path) => {
        console.log(path)
        this.props.history.push(path)
    }
}

export default index;
