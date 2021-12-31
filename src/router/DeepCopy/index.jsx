import React, { Component } from 'react';
import { Card, Tooltip, Button } from 'antd';
import { encodeURI } from 'js-base64';
import styles from "./index.module.scss";
import { throttle } from '../../utils/helper'

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
        numOfThousand: 123456789.123456789,
        base64Str: "hello world",
        bigNum: ['915546001781252', '19933704435929343'],
        strlong: "巴拉不 \n 了不了不了不了不了不了不了不了不了不了不了不了",
        tooltipLong: ""
    }

    render() {

        const { oldObj, extendObj, numOfThousand, base64Str, base64word, bigNum } = this.state
        strOld = JSON.stringify(oldObj)
        let strOld2 = JSON.stringify(extendObj)
        if (this.state.change === 1) {
            newObj = oldObj
            deepObj = JSON.parse(strOld)
        }
        strNew = JSON.stringify(newObj)
        strDeep = JSON.stringify(deepObj)
        return (
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
                <Card
                    title={base64Str}
                    extra={<span style={{ cursor: "pointer", color: "#23a9f2" }} onClick={this.handleclick.bind(this, "base64")}>base64</span>}
                    style={{ width: 300 }}>
                    {base64word}
                </Card>
                <Card
                    title={"长度超17位失真加法解决"}
                    style={{ width: 300 }}>
                    {bigNum[0] + "+" + bigNum[1] + "=" + this.add('915546001781252', '19933704435929343')}
                </Card>
                <Card
                    title={"tooltip控制换行"}
                    style={{ width: 300 }}>
                    <Tooltip title={`巴拉不了
                    不了不了不了不了不了了不
                    了不了不了不了不了\n不了不了不了不了不了不了`}>
                        <div className={styles.huanhang}>
                            {this.state.strlong}
                        </div>
                    </Tooltip>
                </Card>
                <Card
                    title={"tooltip控制换行"}
                    style={{ width: 300 }}>
                    <Button onClick={throttle(this.throttle.bind(this, "节流了", '成功了'), 5000)}>节流</Button>
                </Card>
                <br></br>
            </div>
        );
    }
    handleclick = (who) => {
        let { change, oldObj, numOfThousand, base64Str } = this.state
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
        if (who === "base64") {
            this.setState({ base64word: encodeURI(base64Str) })
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
        // console.log("newArr", newArr);
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

    // 数据合并
    mergeId = (arr) => {
        let diffTypes = []
        const newArr = []
        arr.map((obj, index) => {
            if (diffTypes.indexOf(obj.res_type) < 0) {
                diffTypes.push(obj.res_type)
                let ids = []
                arr.map((o, i) => {
                    if (o.res_type === obj.res_type) ids.push(o.res_id)
                })
                newArr.push({ res_type: obj.res_type, res_id: ids.join(",") })
            }
        })
        return newArr
    }

    componentDidMount() {
        const { oldObj } = this.state
        const url = `https://restapi.amap.com/v3/direction/driving`;
        // console.log(url + this.paramsTransGET(oldObj));
        this.seTArr()


        // 获取小数点后数字长度
        function getLength(num) {
            if (typeof (num) === "number") {
                const strNum = num + ""
                const arrNum = strNum.split(".")
                if (arrNum.length === 2) {
                    return arrNum[1].length
                } else {
                    return 0
                }
            } else {
                return 0
            }
        }

        const a = 123.123450000
        const b = a + ""
        // console.log("a", a);//123.12345
        // console.log("b", b);//"123.12345"
        // console.log(getLength(a));//5

        let arr = [
            { res_id: 12345812, res_type: 5 },
            { res_id: 123812, res_type: 8 },
            { res_id: 12812, res_type: 5 },
            { res_id: 123452, res_type: 6 },
            { res_id: 12345812, res_type: 8 },
            { res_id: 125, res_type: 5 },
            { res_id: 369, res_type: 5 },
            { res_id: 9, res_type: 9 },
            { res_id: 169, res_type: 5 },
            { res_id: 147, res_type: 15 },
        ]
        const obj = { name: "zhangsan" }
        let cont = true
        let num2 = 1
        while (cont) {
            if (num2 == 5) {
                cont = false
            }
            num2 += 1
            // console.log("num2", num2);
        }
        let arr3 = [1, 2, 3, 4, 5]
        arr3.splice(1)
        // console.log("splice", arr3)
        // console.log("strlong", this.state.strlong.indexOf('\n'));
        let strrr = "heaabcjjjabc"
        console.log("replace", strrr.replace("abc", "大"));
    }
    // 超大正整数加法计算，解决长度超过17出现的精度问题
    add = (a, b) => {
        a = (a + '').split('');
        b = (b + '').split('');
        var jinwei = 0, result = '';
        // 这里一定不要忘了加上“ || jinwei”，否则最后面一个进位会被漏掉
        while (a.length || b.length || jinwei) {
            var temp = parseInt(a.pop() || 0) + parseInt(b.pop() || 0) + jinwei;
            result = temp % 10 + result;
            jinwei = Math.floor(temp / 10);
        }
        return result;
    }
    // 节流
    throttle = (a, b) => {
        console.log(a, b);
    }

}
export default index;


