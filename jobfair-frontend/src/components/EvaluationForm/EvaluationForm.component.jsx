import React from 'react';
import {Button, Form, Input, Popover, Radio, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import {EvaluateConst} from "../../constants/JobPositionConst";

const EvaluationFormComponent = ({onFinish, id, name}) => {
    const [form] = Form.useForm();
    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                requiredMark="required"
                autoComplete="off"
                scrollToFirstError={{block: "center", behavior: "smooth"}}
            >
                <Space direction="vertical" size="medium">
                    <Form.Item name={name} noStyle
                               initialValue={id}>
                        <Input type="text" type="hidden"/>
                    </Form.Item>
                    <Form.Item
                        label="Message"
                        name={'message'}
                        hasFeedback
                    >
                        <TextArea placeholder="Message"/>
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name={'status'}
                        hasFeedback
                        initialValue={'APPROVE'}
                    >
                        <Radio.Group>
                            <Radio.Button value={'APPROVE'}>
                                Approve
                            </Radio.Button>
                            {/*<Radio.Button value={'REQUEST_CHANGE'} disabled>*/}
                            {/*    Request change*/}
                            {/*</Radio.Button>*/}
                            <Radio.Button value={'REJECT'}>
                                Reject
                            </Radio.Button>
                            {/*{EvaluateConst.map(item => (*/}
                            {/*    <Radio.Button value={item.id}>*/}
                            {/*        {item.name}*/}
                            {/*    </Radio.Button>*/}
                            {/*))}*/}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </>
    );
};


export default EvaluationFormComponent;