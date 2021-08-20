import { element } from 'prop-types';
import React, { Component } from 'react';
import styles from "./index.module.scss";
import waterMarkFn from "./waterMark"
import logo from '../../logo.svg';
import { Button } from "antd"

class index extends Component {
    state = {
    }

    render() {

        const list = []
        for (var i = 0; i < 8; i++) {
            list.push({ title: "诚", text: "精益求精 诚信待人" })
        }
        return (
            <div className={styles.box}>
                <div className={styles.listBox}>
                    {
                        list.map((item, index) => (
                            <div className={styles.listBoxItem} key={index}>
                                <div className={styles.listBoxItem1}>{item.title}</div>
                                <div className={styles.listBoxItem2}>{item.text}</div>
                            </div>)
                        )
                    }
                </div>
            </div>
        );
    }
    addLine = (params) => {
    }

    componentDidMount() {

    }
}

export default index;
