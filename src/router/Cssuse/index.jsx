import React, { Component } from 'react';
import styles from "./index.module.scss";
import { Button } from "antd"

class index extends Component {
    state = {
    }
    render() {
        const list = []

        for (var i = 1; i < 3; i++) {
            list.push(require('../../assets/images/image' + i + ".jpg"))
        }
        console.log(list);
        return (
            <div className={styles.box}>
                {list.map(item => {
                    return (<div className={styles.imgbox}>
                        <img src={item.default} alt="" className={styles.img} />
                    </div>)
                })}
                <div className={styles.imgbox} style={{ "--imgurl": "#985" }}>将js变量传入sass中使用</div>
                <div className={styles.imgbox + " " + styles.globalcss} >跳过className处理，直接找class
                    <Button>样式展示</Button>
                </div>
                <iframe className={styles.imgbox} src="http://49.234.105.65/"></iframe>
                <div className={styles.imgbox} >

                    <iframe src="https://www.lovestu.com/api/project/cnmapyinqing/obj.php?maph=400" scrolling="auto" height="480" frameBorder="no" border="0" width="100%"></iframe>
                </div>
            </div>

        );
    }
    componentDidMount() {

    }
}

export default index;


