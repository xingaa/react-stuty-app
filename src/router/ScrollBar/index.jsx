import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Card, Button } from 'antd';
import axios from "axios"
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";
import { assertExpressionStatement } from '@babel/types';

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
            console.log("请先传参")
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

    async componentDidMount() {
        this.delLastWord()
        console.log(this.sum(2, null, 3));
        const datalist = []
        console.log(datalist[0]);
        const arr = [1, 2]
        if (JSON.stringify(arr) !== "[]") {
            console.log("该arr不是空数组");
        }

        function ClassA(arg) { this.arg = arg; }
        ClassA.prototype.x = 20;
        function ClassB(x) { this.x = x; }
        ClassB.prototype = new ClassA(30);
        var a = new ClassA('xxxxx '), b = new ClassB(40);
        console.log(a instanceof Object);//true
        console.log(a instanceof ClassA);//true
        console.log(b instanceof Object);//true
        console.log(b instanceof ClassA);//true
        a.x = 30;
        console.log(a.x); //30
        delete a.x
        console.log(a.x);//20
        console.log(b.x);//40
        delete b.x;
        console.log(b.x);//20

        const weburl = "https://www.qq.com/query?id=news&name=search&ref=website"
        function handleWebUrl(url) {
            var paramsStr = url.split("?")[1]
            var paramsArr = paramsStr.split("&")
            const objUrl = {}
            paramsArr && paramsArr.map(item => {
                var itemArr = item.split("=")
                objUrl[itemArr[0]] = itemArr[1]
            })
            return objUrl
        }
        console.log("objUrl", handleWebUrl(weburl));

        // }, 1000)


        const numLine = "1>2>3>4>5>6"
        function reverse(params, k) {
            const numLineArr = params.split(">")
            const length = numLineArr.length
            if (k > length || k <= 0) return numLineArr.join(">")
            const reverseArr = []
            for (var i = 0; i < (length / k) - 1; i++) {
                const newArr = numLineArr.slice(i * k, (i + 1) * k).reverse()
                reverseArr.push(...newArr)
            }
            if ((length % k) !== 0) {
                const newArr = numLineArr.slice(length - length % k, length)
                reverseArr.push(...newArr)
            } else {
                const newArr = numLineArr.slice(length - k, length).reverse()
                reverseArr.push(...newArr)
            }

            return reverseArr.join(">")
        }
        console.log("reverse", reverse(numLine, 6));

        let abc = [1, 2, 3, 4, 5]
        console.log("abc", abc.reduce((sum, item) => sum + item));

        // for (let i = 0; i < 20; i++) {
        //     await this.questFn(i)
        // }
        console.log("{...{}}", { ...{} });

    }
    questFn = async (i) => {
        let arr = [i]
        let promise = new Promise((resolve, reject) => {
            for (let j = i * 10; j < (i * 10 + 10); j++) {
                // axios.get("https://test.com/get", { params: { id: j } })
                setTimeout(() => {
                    console.log("arr,j", arr, "j");
                }, 0)
            }
            setTimeout(() => {
                resolve("done!")
            }, 1000)
        })
        let result = await promise




    }


}

export default index;
