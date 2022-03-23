import React from 'react';
import {Button, Form, notification, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ApplicationValidation} from "../../../validate/ApplicationValidation";
import {
  draftApplication,
  submitApplication
} from "../../../services/application-controller/ApplicationControllerService";


const ConfirmSubmitResumeComponent = (props) => {
  const {resume, jobPosition, closeModal} = props

  const onFinish = async (values) => {
    const body = {
      ...values,
      cvId: resume.id,
      registrationJobPositionId: jobPosition.id,
    }
    try {
      const response = await draftApplication(body);
      const data = response.data;
      await submitApplication(data.id);
      notification['success']({
        message: 'Your application has been submitted'
      })
    } catch (err) {
      notification['error']({
        message: err.response.data.message
      })
    }

    closeModal();
  }

  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark="required"
      autoComplete="off"
      labelAlign={'left'}
      scrollToFirstError={{block: 'center', behavior: 'smooth'}}
    >
      <Space direction="vertical" style={{width: '100%'}}>
        <Form.Item
          label='Message to employers'
          name='summary'
          rules={ApplicationValidation.summary}
          style={{width: '100%', display: "flex", flexDirection: "column"}}
        >
          <TextArea placeholder="Summary" showCount maxLength={1000} autoSize={{minRows: 5}}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{position: "absolute", right: "0"}}>Apply</Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default ConfirmSubmitResumeComponent;