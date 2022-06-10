import './SendQuestionForm.styles.scss';
import { Button, Form, Input } from 'antd';
import { SendQuestionValidation } from '../../../validate/SendQuestionValidation';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';

const SendQuestionFormComponent = ({ form, onFinish }) => (
  <div className='container'>
    <div className='title'>Gửi câu hỏi cho chúng tôi</div>
    <Form form={form} onFinish={(values) => onFinish(values)}>
      <Form.Item name='email' label='Email' rules={SendQuestionValidation.email} className='form-item'>
        <Input style={{ width: '20rem', borderRadius: '15px', border: '3px #1E3B9B solid' }} />
      </Form.Item>
      <Form.Item name='question' label='Câu hỏi' rules={SendQuestionValidation.question} className='form-item'>
        <TextArea
          showCount
          maxLength={1000}
          style={{ width: '20rem', borderRadius: '10px', border: '3px #1E3B9B solid' }}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='button'>
          Gửi câu hỏi
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default SendQuestionFormComponent;
