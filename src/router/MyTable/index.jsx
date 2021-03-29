import React, { Component } from 'react';
import { Table, Switch, Space, Icon } from 'antd';
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";
import scroll from "../ScrollBar/index.module.scss";
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address',
    },
];

const data = [
    {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
            {
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
            },
            {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',
                children: [
                    {
                        key: 121,
                        name: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park',
                    },
                ],
            },
            {
                key: 13,
                name: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
                children: [
                    {
                        key: 131,
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 2 Lake Park',
                        children: [
                            {
                                key: 1311,
                                name: 'Jim Green jr.',
                                age: 25,
                                address: 'London No. 3 Lake Park',
                            },
                            {
                                key: 1312,
                                name: 'Jimmy Green sr.',
                                age: 18,
                                address: 'London No. 4 Lake Park',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 4,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 5,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 6,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 7,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 8,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 9,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 10,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 11,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: 12,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

class index extends Component {

    render() {
        return (
            <div className={styles.box + " " + scroll.barStyle}

            >
                <Table
                    dataSource={data}
                    columns={columns}
                    expandIcon={this.expandRow}
                    expandRowByClick
                    bordered
                    onRow={this.rowSetting}
                    scroll={{ x: "max-content", y: "calc(100vh - 320px)" }}
                />
            </div>
        );
    }
    expandRow = (props) => {
        if (props.expandable) {
            if (props.expanded) {
                return <CaretDownOutlined className={styles.expandIcon} />
            } else {

                return <CaretRightOutlined className={styles.expandIcon} />
            }
        } else {
            return <span className={styles.expandSpan}></span>
        }
    }
    onScrollEvent = (event) => {
        // console.log("event", event)
        const { scrollHeight, scrollTop, clientHeight } = event.target
        if ((scrollTop + clientHeight) >= scrollHeight) {
            console.log("滚到底了")
        }
    }
    rowSetting = (record, index) => {
        return {
            onClick: event => { }, // 点击行
            onDoubleClick: event => { },
            onContextMenu: event => { },
            onMouseEnter: event => {
                // console.log("鼠标移入event", event)
            }, // 鼠标移入行
            onMouseLeave: event => { },
        };
    }
    componentDidMount() {
        const tBody = document.querySelector(".ant-table-body")
        console.log("表格", tBody);
        tBody.onscroll = this.onScrollEvent

    }
}

export default index;
