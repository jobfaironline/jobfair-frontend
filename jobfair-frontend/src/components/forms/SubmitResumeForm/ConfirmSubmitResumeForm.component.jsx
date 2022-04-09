import { ApplicationValidation } from '../../../validate/ApplicationValidation';
import { Button, Form, Space } from 'antd';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';

const ConfirmSubmitResumeFormComponent = (props) => {
  const { onFinish } = props;

  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark='required'
      autoComplete='off'
      labelAlign={'left'}
      scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Form.Item
          label='Message to employers'
          name='summary'
          rules={ApplicationValidation.summary}
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <TextArea placeholder='Summary' showCount maxLength={1000} autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ position: 'absolute', right: '0' }}>
            Apply
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default ConfirmSubmitResumeFormComponent;
