import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export const InterviewReportForm = (props) => {
  const { form, onFinish } = props;
  return (
    <Form
      form={form}
      colon={false}
      onFinish={onFinish}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <Title level={3}>Interview report</Title>
      <Form.Item
        name={`advantage`}
        required
        label={<Title level={4}>Advantage</Title>}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input.TextArea className={'text-area'} placeholder="Applicant's advantage" rows={7} />
      </Form.Item>
      <Form.Item
        name={`disadvantage`}
        required
        label={<Title level={4}>Disadvantage</Title>}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input.TextArea className={'text-area'} placeholder="Applicant's disadvantage" rows={7} />
      </Form.Item>
      <Form.Item
        name={`note`}
        required
        label={<Title level={4}>Note</Title>}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input.TextArea className={'text-area'} placeholder="Applicant's disadvantage" rows={7} />
      </Form.Item>
      <div style={{ width: '100%', display: 'flex' }}>
        <Button className={'button'} type='primary' htmlType={'submit'} style={{ marginLeft: 'auto' }}>
          Submit
        </Button>
      </div>
    </Form>
  );
};
