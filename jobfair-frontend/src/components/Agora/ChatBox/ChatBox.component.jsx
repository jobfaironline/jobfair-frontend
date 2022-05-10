import { Form, Input } from 'antd';
import { REQUIRED_VALIDATOR } from '../../../validate/GeneralValidation';
import ChatField from '../ChatField/ChatField.component';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

const ChatBoxComponent = (props) => {
  const { messageList, form, onSubmit, isChatReady, videoCallComponent } = props;
  return (
    <div className={'chat-box'}>
      <div className={'chatContainer'}>
        <div className={'chatHeader'}></div>
        <div className={'videoContainer'}>{videoCallComponent()}</div>
        <div className={'chatZone'}>
          <ChatField messageList={messageList} />
        </div>
      </div>
      <div className={'chatInput'}>
        <Form form={form} onFinish={onSubmit} disabled={!isChatReady}>
          <Form.Item name='message' rules={[REQUIRED_VALIDATOR('Message')]}>
            <Input
              autoFocus
              style={{ borderRadius: '5rem 5rem 5rem 5rem' }}
              placeholder='Type message...'
              suffix={<SendIcon onClick={() => onSubmit(form.getFieldsValue(true))} />}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChatBoxComponent;
