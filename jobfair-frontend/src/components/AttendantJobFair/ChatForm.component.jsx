import {Button, Form, Input} from "antd";
import React from "react";

export const ChatForm = (props) => {
    const {isChatReady, form, onSubmit} = props;

    return (
        <Form
            form={form}
            onFinish={onSubmit}
        >
            <Form.Item
                label="Message"
                name="message"
                rules={[
                    {
                        required: true,
                        message: 'Please input your message!',
                    },
                ]}
            >
                <Input autoFocus/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!isChatReady}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}