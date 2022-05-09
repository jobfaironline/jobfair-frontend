import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import { REQUIRED_VALIDATOR } from '../../../validate/GeneralValidation';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatField from '../ChatField/ChatField.component';
import React from 'react';

const InterviewChatFieldComponent = (props) => {
  const { messageList, form, onSubmit, isChatReady } = props;
  return (
    <>
      <ChatField messageList={messageList} />
      <Form form={form} onFinish={onSubmit} disabled={!isChatReady}>
        <Form.Item name='message' rules={[REQUIRED_VALIDATOR('Message')]}>
          <Input
            autoFocus
            style={{ borderRadius: '5rem 5rem 5rem 5rem' }}
            placeholder='Type message...'
            suffix={
              <div>
                <FontAwesomeIcon icon={faPaperPlane} onClick={() => onSubmit(form.getFieldsValue(true))} />
                <FontAwesomeIcon icon={faImage} />
              </div>
            }
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default InterviewChatFieldComponent;
