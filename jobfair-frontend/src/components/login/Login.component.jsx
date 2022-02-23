import React from 'react';
import {Button, Checkbox, Divider, Form, Input, Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";

const LoginComponent = ({onFinish, form}) => {
    return (
        <>
            <Divider orientation="center" plain>
                Job Fair Online - Login
            </Divider>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Form
                    labelCol={{span: 8}}
                    wrapperCol={{span: 8}}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        hasFeedback
                        rules={[{required: true, message: 'Please input your email!'}, {
                            type: 'email',
                            message: 'This field has invalid email format.'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        hasFeedback
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <a href="" style={{marginLeft: 20}}>Forgot password ?</a>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};


export default LoginComponent;