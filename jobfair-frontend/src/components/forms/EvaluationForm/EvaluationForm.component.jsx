import { Button, Form, Input } from 'antd';
import { EvaluateConst } from '../../../constants/JobPositionConst';
import React from 'react';

const EvaluationFormComponent = ({ onFinish, id, name }) => {
  const [form] = Form.useForm();

  if (!id) return null;

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        requiredMark='required'
        autoComplete='off'
        scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
        <Form.Item name={name} noStyle initialValue={id}>
          <Input type='text' type='hidden' />
        </Form.Item>
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          {name === 'companyRegistrationId'
            ? EvaluateConst.map((item) => (
                <div key={item.id}>
                  <Form.Item name='status' noStyle>
                    <Input type='text' type='hidden' />
                  </Form.Item>
                  <Button
                    value={item.id}
                    type='primary'
                    htmlType='submit'
                    className={'button'}
                    style={{ backgroundColor: item.id === 'APPROVE' ? 'green' : 'red' }}
                    onClick={() => {
                      form.setFieldsValue({
                        status: item.id
                      });
                    }}>
                    {item.name}
                  </Button>
                </div>
              ))
            : EvaluateConst.filter((item) => item.id !== 'REQUEST_CHANGE').map((item) => (
                <div key={item.id}>
                  <Form.Item name='status' noStyle>
                    <Input type='text' type='hidden' />
                  </Form.Item>
                  <Button
                    value={item.id}
                    type='primary'
                    htmlType='submit'
                    className={'button'}
                    style={{ backgroundColor: item.id === 'APPROVE' ? 'green' : 'red' }}
                    onClick={() => {
                      form.setFieldsValue({
                        status: item.id
                      });
                    }}>
                    {item.name}
                  </Button>
                </div>
              ))}
        </div>
      </Form>
    </>
  );
};

export default EvaluationFormComponent;
