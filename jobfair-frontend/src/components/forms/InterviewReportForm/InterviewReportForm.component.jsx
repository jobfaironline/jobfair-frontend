import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export const InterviewReportForm = (props) => {
  const { form, onFinish } = props;
  return (
    <Form form={form} colon={false} onFinish={onFinish}>
      <Form.Item
        name={`advantage`}
        required
        label={<Title level={3}>Advantage</Title>}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input.TextArea
          className={'text-area'}
          placeholder="Applicant's advantage"
          autoSize={{ minRows: 5, maxRows: 10 }}
        />
      </Form.Item>
      <Form.Item
        name={`disadvantage`}
        required
        label={<Title level={3}>Disadvantage</Title>}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input.TextArea
          className={'text-area'}
          placeholder="Applicant's disadvantage"
          autoSize={{ minRows: 5, maxRows: 10 }}
        />
      </Form.Item>
      <Form.Item
        name={`note`}
        required
        label={<Title level={3}>Note</Title>}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input.TextArea
          className={'text-area'}
          placeholder="Applicant's disadvantage"
          autoSize={{ minRows: 5, maxRows: 10 }}
        />
      </Form.Item>
      <Button className={'button'} type='primary' htmlType={'submit'}>
        Submit
      </Button>
    </Form>
  );
};
