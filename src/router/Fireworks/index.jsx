import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from "./index.module.scss";
import "./index.css"

import action from "./action"



class index extends Component {

    render() {
        return (
            <div className={styles.box}>
                <div id="gui"></div>
                <div id="canvas-container">
                    <div id="mountains2"></div>
                    <div id="mountains1"></div>
                    <div id="skyline"></div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        action()
    }
}

export default index;

