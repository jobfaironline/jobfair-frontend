import { Button, Form, Space } from 'antd';
import React from 'react';

const ConfirmSubmitResumeFormComponent = (props) => {
  const { onFinish, applicationData } = props;

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
        <Form.Item>
          {applicationData ? <span>Use have pass this test</span> : null}
          <Button type='primary' htmlType='submit' style={{ position: 'absolute', right: '0' }} className={'button'}>
            Apply
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default ConfirmSubmitResumeFormComponent;
