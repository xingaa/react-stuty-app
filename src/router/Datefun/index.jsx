import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Card } from 'antd';
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";

class index extends Component {
    state = {
        today: "",
        lastSunday: "",
        endOfMonth: "",
        EOS: "",
        EOFH: "",
        EOLY: "",
    }

    render() {

        const { today, lastSunday, endOfMonth, EOS, EOFH, EOLY } = this.state
        return (

            <div className={styles.box}>
                <div className={styles.dateItem}>
                    <div>当前日期：</div>
                    <div>{today}</div>
                </div>
                <div className={styles.dateItem}>
                    <div>上周末：</div>
                    <div>{lastSunday}</div>
                </div>
                <div className={styles.dateItem}>
                    <div>上月末：</div>
                    <div>{endOfMonth}</div>
                </div>
                <div className={styles.dateItem}>
                    <div>上季末：</div>
                    <div>{EOS}</div>
                </div>
                <div className={styles.dateItem}>
                    <div>上半年末：</div>
                    <div>{EOFH}</div>
                </div>
                <div className={styles.dateItem}>
                    <div>上年末：</div>
                    <div>{EOLY}</div>
                </div>

                <div className={styles.createIcon}>查看明细</div>
            </div>
        );
    }
    // 获取时间
    getToday = (num = 0, str = "") => {
        const timestamp = num * 24 * 3600 * 1000
        const t = new Date()
        let nowTimestamp = t.getTime()
        nowTimestamp = nowTimestamp + timestamp
        const time = new Date(nowTimestamp)
        let day = time.getDate().toString()
        let moth = (time.getMonth() + 1).toString()
        let year = time.getFullYear()
        day.length < 2 && (day = "0" + day)
        moth.length < 2 && (moth = "0" + moth)
        return year + str + moth + str + day
    }
    // 获取上周末
    getSunday = () => {
        const time = new Date()
        let today = time.getDay()
        if (today === 0) {
            today = 7
        }
        return this.getToday(0 - today, "-")
    }
    // 获取上月末
    getEndOfMonth = () => {
        const time = new Date()
        let today = time.getDate()
        return this.getToday(0 - today, "-")
    }
    // 获取上季末
    getEOS = (str = "") => {
        const time = new Date()
        let year = time.getFullYear()
        let EOSList = [year - 1 + str + "12" + str + "31", year + str + "03" + str + "31", year + str + "06" + str + "30", year + str + "09" + str + "30"]
        let month = time.getMonth()
        if (month < 3) {
            return EOSList[0]
        }
        if (month < 6) {
            return EOSList[1]
        }
        if (month < 9) {
            return EOSList[2]
        }
        return EOSList[3]
    }
    // 上半年末
    getEOFH = (str = "") => {
        const time = new Date()
        let year = time.getFullYear()
        let EOFHList = [year - 1 + str + "12" + str + "31", year + str + "06" + str + "30",]
        let month = time.getMonth()
        if (month < 6) {
            return EOFHList[0]
        }
        return EOFHList[1]
    }
    // 上年末
    getEOLY = (str = "") => {
        const time = new Date()
        let year = time.getFullYear()
        return year - 1 + str + "12" + str + "31"
    }

    // 秒数格式化


    componentDidMount() {
        this.setState({
            today: this.getToday(0, "-"),
            lastSunday: this.getSunday(),
            endOfMonth: this.getEndOfMonth(),
            EOS: this.getEOS("-"),
            EOFH: this.getEOFH("-"),
            EOLY: this.getEOLY("-"),
        })

        function diyFunc(obj) {
            if (Object.prototype.toString.call(obj) !== "[object Object]") return
            const a = { ...obj }
        }

        // ES5方法
        let arr1 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 1, 9, 3, 25, 4]
        function setArr(arr) {
            if (!Array.isArray(arr)) return
            arr = arr.sort()
            var arrry = [arr[0]];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] !== arr[i - 1]) {
                    arrry.push(arr[i]);
                }
            }
            return arrry;
        }
        console.log("setArr(arr1)", setArr(arr1));
        // ES6方法
        const newArr1 = new Set(arr1)
        console.log("new Set(arr1)", newArr1);


    }
}


export default index;
