import React, { Component } from 'react';
import axios from "axios"
import styles from "./index.module.scss";

class index extends Component {
    state = {
        datas: []
    }

    render() {
        console.log();
        return (
            <div className={styles.box + ' ' + styles.barStyle}>
                {
                    this.state.datas.map(item => (
                        <div className={styles.imgBox} key={item.title}>
                            <img src={item.url} alt={item.title} />
                        </div>
                    ))
                }
            </div>
        );
    }
    componentDidMount() {
        axios.get('http://192.168.70.98:3000/bing/pic?limit=1&area=zh-CN').then(res => {
            console.log('bing壁纸', res);
            this.setState({
                datas: res.data.data
            })
        }).catch(err => {
            console.log('bing壁纸err', err);
        })
    }

}

export default index;
