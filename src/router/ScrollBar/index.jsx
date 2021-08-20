import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Card, Button } from 'antd';
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";

class index extends Component {
    state = {
    }

    render() {


        return (
            <div className={styles.box + " " + "removeFather"}>
                <div className={styles.scrollBox + " " + styles.barStyle}>
                    <div className={styles.scrollItem + " " + "remove"}>1</div>
                </div>
                <div className={styles.scrollBox + " " + styles.barStyle}>
                    <div className={styles.scrollItem}>2</div>
                </div>
                <div className={styles.scrollBox + " " + styles.barStyle}>
                    <div className={styles.scrollItem}>3</div>
                </div>
                <Button onClick={this.remove}>去除1的元素</Button>
            </div>
        );
    }
    remove = () => {
        const rmv = document.querySelector(".remove")
        const rmvF = rmv.parentNode
        console.log(rmv)
        console.log(rmvF)
        rmvF.removeChild(rmv)
    }
    // 删除字符串最后一个单词
    delLastWord = (str = "cardItem swiper-slide zhongxinCard boxShayouzhengCard swiper-slide-prev boxShayouzhengCard") => {
        var arr = str.split(" ")
        arr.pop()
        var str2 = arr.join(" ")
        console.log("str", str);
        console.log("str2", str2);
    }
    // 累加功能函数
    sum = function () {
        console.log("arguments", arguments);
        if (arguments.length === 0) {
            alert("请先传参")
            return
        }
        let sum = 0
        for (var i = 0; i < arguments.length; i++) {
            let item = arguments[i]
            if (isNaN(arguments[i]) || arguments[i] === null) {
                item = 0
            } else {
                item = arguments[i] - 0
            }
            sum += item
        }
        return sum
    }

    componentDidMount() {
        this.delLastWord()
        console.log(this.sum(2, null, 3));
        const datalist = []
        console.log(datalist[0]);
        const arr = [1, 2]
        if (JSON.stringify(arr) !== "[]") {
            console.log("该arr不是空数组");
        }
    }


}

export default index;
