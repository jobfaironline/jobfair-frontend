import './ProfileForm.scss';
import { BackTop, Button, Divider, Form, Modal, Typography } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import { deactivateOwnAccountAPI } from '../../../services/jobhub-api/AccountControllerService';
import { logoutHandler } from '../../../redux-flow/authentication/authentication-action';
import { selectWebSocket } from '../../../redux-flow/web-socket/web-socket-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AnchorComponent from '../../../components/commons/Anchor/Achor.component';
import React, { useState } from 'react';

const { Title, Text } = Typography;

export const ProfileFormContainer = ({ form, onFinish, data, formTitle, canDeactivate = true, children }) => {
  const [deactivateAccountModalVisibility, setDeactivateAccountModalVisibility] = useState(false);

  const webSocketClient = useSelector(selectWebSocket);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeactivateAccount = async () => {
    await deactivateOwnAccountAPI();
    webSocketClient?.close();
    dispatch(logoutHandler());
    history.push(PATH.INDEX);
  };

  const openDeactivateAccount = () => {
    setDeactivateAccountModalVisibility(true);
  };

  const onChangePassword = () => {
    history.push(PATH.CHANGE_PASSWORD_PAGE);
  };

  form.setFieldsValue({ ...data });
  const email = form.getFieldValue('account')?.email;
  return (
    <>
      <Modal
        visible={deactivateAccountModalVisibility}
        title={'Deactivate account'}
        okText={'Deactivate'}
        onOk={handleDeactivateAccount}
        onCancel={() => setDeactivateAccountModalVisibility(false)}>
        <Title level={4}>Are you sure to deactivate your account? </Title>
        <Text> You can always reactive your account by login again </Text>
      </Modal>
      <div className={'profile-form'}>
        <Divider orientation='left'>
          <Title level={2} id={'account-profile'} style={{ scrollMarginTop: '126px' }}>
            Account profile
          </Title>
        </Divider>
        <div style={{ marginBottom: '1rem' }}>
          <Text>{email}</Text> -{' '}
          <a style={{ textDecoration: 'underline' }} onClick={onChangePassword}>
            <Text strong>Change password</Text>
          </a>{' '}
          {canDeactivate ? (
            <>
              -{' '}
              <a style={{ textDecoration: 'underline' }} onClick={openDeactivateAccount}>
                <Text strong>Deactivate account</Text>
              </a>
            </>
          ) : null}
        </div>
        <div style={{ position: 'fixed', left: '10%' }}>
          <AnchorComponent listData={formTitle} href={'#account-profile'} title={'Attendant profile'} />
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          requiredMark='required'
          autoComplete='off'
          layout={'vertical'}
          scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
          {children}
          <div style={{ display: 'flex', marginTop: '1rem' }}>
            <Button type='primary' htmlType='submit' className={'button'} style={{ marginLeft: 'auto' }}>
              Save
            </Button>
          </div>
        </Form>
        <BackTop />
      </div>
    </>
  );
};
