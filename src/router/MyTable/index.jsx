import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Button } from 'antd';
import ExportJsonExcel from 'js-export-excel';
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";
import scroll from "../ScrollBar/index.module.scss";
// ES6
import { Resizable } from 'react-resizable';
// const { Resizable } = require('react-resizable');
import 'react-resizable/css/styles.css';
const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props
    if (!width) {
        return <th {...restProps}></th>
    }
    // console.log("生成了resizeble");
    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    )
}



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
    state = {
        width: 200,
        height: 60,
        columns: [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 600,
                fixed: "left",
                // render: text => <span className={styles.tabletd} title={text}>{text}</span>
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                // width: '12',
                width: 600,
                // render: text => <span className={styles.tabletd} title={text}>{text}</span>
            },
            {
                title: 'Address',
                dataIndex: 'address',
                // width: '30%',
                key: 'address',
                width: 600,
                // render: text => <span className={styles.tabletd} title={text}>{text}</span>
            },
        ],
        dataList: []
    }
    components = {
        header: {
            cell: ResizeableTitle,
        }
    }

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            }
            return { columns: nextColumns };
        })
    }
    // On top layout
    onResize = (event, { element, size, handle }) => {
        this.setState({ width: size.width, height: size.height });
    };

    render() {
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index)
            })
        }))
        const { width, dataList } = this.state
        return (
            <div className={styles.box + " " + scroll.barStyle}>
                <Resizable height={this.state.height} width={this.state.width} onResize={this.onResize}>
                    <div className={styles.scaling} style={{ width: this.state.width + 'px', height: this.state.height + 'px', lineHeight: this.state.height + 'px' }}>
                        可伸缩块
                    </div>
                </Resizable>
                <Button onClick={this.toExcel}>导出Excel</Button>
                <Table
                    dataSource={dataList}
                    columns={columns}
                    components={this.components}
                    expandIcon={this.expandRow}
                    expandRowByClick
                    bordered
                    onRow={this.rowSetting}
                    scroll={{ x: "max-content", y: "calc(100vh - 320px)" }}
                    className={styles.myTable}
                />
            </div>
        );
    }
    toExcel = (params) => {
        const data = [{
            "名称": "张三",
            "年级": 18,
            "sex": "male",
        }]
        const options = {
            fileName: "导出数据",
            datas: [{
                sheetData: data,
                sheetName: 'sheet',
                sheetFilter: ['名称', '年级', 'sex'],
                sheetHeader: ['名称', '年级', 'sex'],
            }]
        }
        var toExl = new ExportJsonExcel(options)
        toExl.saveExcel()
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
        let data = []
        for (var i = 0; i < 16000; i++) {
            data.push({
                key: i,
                name: 'Joe Black',
                age: 32,
                address: `Sidney No.${i + 1} Lake Park`,
            })
        }
        this.setState({
            dataList: data,
        })
    }
}

export default index;
