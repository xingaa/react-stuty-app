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
    componentDidMount() {

    }
}

export default index;
