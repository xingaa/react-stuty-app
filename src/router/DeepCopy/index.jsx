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
        change: 1,
    }

    render() {

        const { oldObj } = this.state
        strOld = JSON.stringify(oldObj)
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
                    extra={<span style={{ cursor: "pointer" }} onClick={this.handleclick.bind(this, "oldObj")} >改变</span>}
                    style={{ width: 300 }}
                // loading={true}
                >
                    {strOld}

                </Card>
                <Card
                    title="直接赋值对象"
                    extra={<span style={{ cursor: "pointer" }} onClick={this.handleclick.bind(this, "newObj")}>改变</span>}
                    style={{ width: 300 }}>
                    {strNew}
                </Card>
                <Card
                    title="深拷贝对象"
                    extra={<span style={{ cursor: "pointer" }} onClick={this.handleclick.bind(this, "deepObj")}>改变</span>}
                    style={{ width: 300 }}>
                    {strDeep}
                </Card>
            </div>
        );
    }
    handleclick = (who) => {
        const { change } = this.state
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
    }
}

export default index;