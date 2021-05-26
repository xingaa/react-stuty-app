import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Card } from 'antd';
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";

class index extends Component {
    state = {
        loading: false,
        text: "点击"
    }

    render() {


        return (

            <div className={styles.box}>
                <div className={styles.mask}></div>
                <div className={styles.maskouter}></div>

                <div className={styles.clickbox}>

                    <div
                        className={styles.click}
                        onClick={this.click}
                        onMouseOver={this.mouseOver}
                    >{this.state.text}</div>
                </div>
            </div>
        );
    }
    click = () => {
        const { text } = this.state
        this.setState({
            text: text + "了"
        })
    }
    mouseOver = () => {
        const { text } = this.state
        this.setState({
            text: text + "入"
        })
    }
    componentDidMount() {
    }
}


export default index;
