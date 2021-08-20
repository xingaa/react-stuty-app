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
            <div className={styles.box}>
                <iframe src="https://www.lovestu.com/api/project/cnmapyinqing/obj.php?maph=800" height="1000" frameBorder="no" border="0" width="100%"> </iframe>
            </div>
        );
    }
    remove = () => {

    }
    componentDidMount() {

    }
}

export default index;
