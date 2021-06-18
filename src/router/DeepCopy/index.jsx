import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Card } from 'antd';
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";

let newObj = null
let deepObj = null
let strOld = null
let strNew = null
let strDeep = null
class index extends Component {
    state = {
        oldObj: {
            name: "张三",
            Age: "33",
            city: "香格里拉",
        },
        extendObj: {},
        change: 1,
        numOfThousand: 123456789.123,
    }

    render() {

        const { oldObj, extendObj, numOfThousand } = this.state
        strOld = JSON.stringify(oldObj)
        let strOld2 = JSON.stringify(extendObj)
        if (this.state.change === 1) {

            newObj = oldObj
            deepObj = JSON.parse(strOld)
        }
        strNew = JSON.stringify(newObj)
        strDeep = JSON.stringify(deepObj)
        return (
            <div>

                <div className={styles.box}>
                    <Card
                        title="原对象"
                        extra={<span style={{ cursor: "pointer", color: "#23a9f2" }} onClick={this.handleclick.bind(this, "oldObj")} >改变</span>}
                        style={{ width: 300 }}
                    // loading={true}
                    >
                        {strOld}

                    </Card>
                    <Card
                        title="直接赋值对象"
                        extra={<span style={{ cursor: "pointer", color: "#23a9f2" }} onClick={this.handleclick.bind(this, "newObj")}>改变</span>}
                        style={{ width: 300 }}>
                        {strNew}
                    </Card>
                    <Card
                        title="深拷贝对象"
                        extra={<span style={{ cursor: "pointer", color: "#23a9f2" }} onClick={this.handleclick.bind(this, "deepObj")}>改变</span>}
                        style={{ width: 300 }}>
                        {strDeep}
                    </Card>

                </div>
                <div className={styles.box}>
                    <Card
                        title="展开运算符"
                        extra={<span style={{ cursor: "pointer", color: "#23a9f2" }} onClick={this.handleclick.bind(this, "extend")}>展开对象</span>}
                        style={{ width: 300 }}>
                        {strOld2}
                    </Card>
                    <Card
                        title="千分位数值"
                        extra={<span style={{ cursor: "pointer", color: "#23a9f2" }} onClick={this.handleclick.bind(this, "thousand")}>改变</span>}
                        style={{ width: 300 }}>
                        {numOfThousand}
                    </Card>
                </div>
            </div>
        );
    }
    handleclick = (who) => {
        let { change, oldObj, numOfThousand } = this.state
        if (who === "newObj") {
            newObj.name = "李四" + change
            this.setState({
                change: change + 1,
            })
        }
        if (who === "deepObj") {
            deepObj.name = "王五" + change
            this.setState({
                change: change + 1,
            })
        }
        if (who === "extend") {
            let newObj = {
                new1: "新一",
                new2: "新二",
                ...oldObj,
            }

            this.setState({
                change: change + 1,
                extendObj: newObj,
            })
        }
        if (who === "thousand") {
            const newNum = numOfThousand.toLocaleString('en-US')
            this.setState({
                numOfThousand: newNum,
            })
        }
    }
    // 去重
    seTArr = () => {
        // 需要去重的数组oldArr
        const oldArr = [
            { name: "小华华", age: 18, },
            { name: "华", age: 18, },
            { name: "华小华", age: 18, },
            { name: "小华华", age: 18, },
            { name: "华小华", age: 18, },
            { name: "小华华", age: 18, },
            { name: "华小华", age: 18, },
            { name: "华小邓", age: 18, },
            { name: "华小华", age: 18, },
            { name: "华小邓", age: 18, },
            { name: "华小邓", age: 18, },
            { name: "华", age: 18, },
        ]
        // 接收去重后的数组newArr
        const newArr = []
        // sameSty放判断重复的属性
        const sameSty = []
        oldArr.map(item => {
            if (sameSty.indexOf(item.name) === -1) {
                newArr.push(item)
                sameSty.push(item.name)
            }
        })
        console.log("newArr", newArr);
    }
    paramsTransGET(obj) {
        if (!obj || typeof obj !== "object") return ''
        if (Object.keys(obj).length > 0) {
            return Object.keys(obj).reduce((prev, item) => {
                if (obj[item] === null || obj[item] === undefined || obj[item] === "") return prev;
                return `${prev}${item}=${obj[item]}&`
            }, '?').slice(0, -1);
        } else {
            return ""
        }
    }
    componentDidMount() {
        const { oldObj } = this.state
        const url = `https://restapi.amap.com/v3/direction/driving`;
        console.log(url + this.paramsTransGET(oldObj));
        this.seTArr()
    }


}

export default index;


