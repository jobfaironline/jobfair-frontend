import { ExpandAltOutlined, MinusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { REQUIRED_VALIDATOR } from '../../../validate/GeneralValidation';
import ChatField from '../ChatField/ChatField.component';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import VideoCallContainer from '../VideoCall/VideoCall.container';

const ChatBoxComponent = (props) => {
  const {
    isShowChatBox,
    setIsShowChatBox,
    messageList,
    form,
    onSubmit,
    isChatReady,
    audioReady,
    audioTrack,
    cameraReady,
    cameraTrack,
    type
  } = props;
  const handleRender = (type, isShowChatBox, setIsShowChatBox) => {
    switch (type) {
      case 'INTERVIEW_ROOM':
        if (isShowChatBox) {
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <VideoCallContainer
                audioReady={audioReady}
                audioTrack={audioTrack}
                cameraReady={cameraReady}
                cameraTrack={cameraTrack}
              />
              <ChatField messageList={messageList} />
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
          );
        }
      default:
        if (isShowChatBox) {
          return (
            <div className={'chat-box'}>
              <div className={'chatContainer'}>
                <div className={'chatHeader'}>
                  <div className={'iconHeader'}>
                    <MinusOutlined onClick={() => setIsShowChatBox(false)} />
                  </div>
                </div>
                <div className={'videoContainer'}>
                  <VideoCallContainer
                    audioReady={audioReady}
                    audioTrack={audioTrack}
                    cameraReady={cameraReady}
                    cameraTrack={cameraTrack}
                  />
                </div>
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
        } else {
          return (
            <div className={'chat-box-minimize'}>
              <div className={'iconHeader'}>
                <ExpandAltOutlined onClick={() => setIsShowChatBox(true)} />
              </div>
            </div>
          );
        }
    }
  };
  return handleRender(type, isShowChatBox, setIsShowChatBox);
};

export default ChatBoxComponent;
