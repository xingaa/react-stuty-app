import React, { Component } from 'react';
import { Card, Button } from 'antd';
import styles from "./index.module.scss";
import MyForm from "../MyForm";
import functions from "../../functionCode.json"
const { Meta } = Card;

class index extends Component {
    render() {
        return (
            <div className={styles.home_box}>
                {
                    functions.map(item => (
                        <div className={styles.home_Item} key={item.hashUrl}>
                            <div className={styles.home_task} onClick={this.JumpTo.bind(this, item.hashUrl)}>
                                {item.name}
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
    JumpTo = (path) => {
        console.log(path)
        this.props.history.push(path)
    }
}

export default index;
