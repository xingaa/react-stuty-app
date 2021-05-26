import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message, DatePicker } from 'antd';
import Datecom from "../Datefun/index"
import styles from "./index.module.scss";
const { RangePicker } = DatePicker;

class index extends Component {

    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return (
            <Form
                // {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                    username: "xiaohuahua",
                }}
                className={styles.myform}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    className="formItem"
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                // initialValue="dhx"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="formItem"
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    className="formItem"
                    label="monthpiker"
                    name="monthpiker"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your monthpiker!',
                        },
                    ]}
                >
                    <DatePicker size={"default"} picker="month" />
                </Form.Item>
                <Form.Item name="remember" className="formItem" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item className="formItem">
                    <Button type="primary" htmlType="submit" onClick={this.submit}>
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item className="formItem">
                    <Button onClick={this.postExport.bind(this, { wo: "jenurs" }, "http://wxs.ngrok.xiaomiqiu.cn/kpi/chnOperate/realTime/daily/list/export")}>
                        postExport
                    </Button>
                </Form.Item>
            </Form>
        );
    }
    onFinish = (values) => {
        console.log('Success:', values);
        message.success("提交成功")
    }
    submit = () => {
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    //params是post请求需要的参数，url是请求url地址
    postExport = (params1, url) => {
        let params = {
            "start_time": "ttt",
            "end_time": "ttt",
        }
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        xhr.open('POST', '/api/busi/service_manage/servdev/export', true);
        xhr.setRequestHeader("usid", "123123");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            console.log(e, this.response)
            if (this.status == 200) {
                var blob = this.response;
                var filename = '服务统计.csv';
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var a = document.createElement('a');
                    var url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
            }
        };
        xhr.send(JSON.stringify(params));
        // ————————————————
        // 版权声明：本文为CSDN博主「@曾经@」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
        // 原文链接：https://blog.csdn.net/weixin_41628411/article/details/105815034
    }

}

export default index;


