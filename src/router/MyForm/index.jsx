import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import styles from "./index.module.scss";

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

                <Form.Item name="remember" className="formItem" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item className="formItem">
                    <Button type="primary" htmlType="submit" onClick={this.submit}>
                        Submit
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
}

export default index;


