import './ProfileForm.scss';
import { Avatar, BackTop, Button, Card, Divider, Form, Modal, Typography, message, notification } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import {
  changeProfileURL,
  changeUserFullName,
  logoutHandler
} from '../../../redux-flow/authentication/authentication-action';
import { deactivateOwnAccountAPI, uploadProfileImage } from '../../../services/jobhub-api/AccountControllerService';
import { getBase64 } from '../../../utils/common';
import { selectWebSocket } from '../../../redux-flow/web-socket/web-socket-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AnchorComponent from '../../../components/commons/Anchor/Achor.component';
import React, { useRef, useState } from 'react';
import UploadComponent from '../../../components/commons/UploadComponent/Upload.component';

const { Title, Text } = Typography;

export const ProfileFormContainer = ({ form, onFinish, data, formAnchorTitles, canDeactivate = true, children }) => {
  const [imageUrl, setMediaUrl] = useState(data.account.profileImageUrl);
  const [deactivateAccountModalVisibility, setDeactivateAccountModalVisibility] = useState(false);
  const uploadFileRef = useRef();

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

  const mediaUpload = {
    name: 'file',
    beforeUpload: (file) => {
      uploadFileRef.current = file;
      return false;
    },
    onChange: async () => {
      try {
        const file = uploadFileRef.current;
        if (file === undefined) return;
        const fileExtension = file.name.split('.').pop();
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
          notification['error']({
            message: `${file.name} is not image file`
          });
          return;
        }
        const url = await getBase64(file);
        const formData = new FormData();
        formData.append('file', file);
        await uploadProfileImage(formData);
        dispatch(changeProfileURL(url));
        setMediaUrl(url);
        message.success('Upload profile image successfully');
      } catch (err) {
        message.error('Upload profile image failed.');
      }
    },
    onRemove: async () => {
      setMediaUrl(undefined);
    },
    showUploadList: false,
    maxCount: 1
  };

  const internalOnFinish = async (values) => {
    await onFinish(values);
    const { firstname, middlename, lastname } = values.account;
    const fullName = `${firstname} ${middlename} ${lastname}`;
    dispatch(changeUserFullName(fullName));
  };

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
        <div style={{ position: 'fixed', left: '5%' }}>
          <Card style={{ marginBottom: '1rem', padding: '0.5rem 2rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <UploadComponent uploadProps={mediaUpload} isImageCrop={true} aspect={1 / 1}>
                <Avatar size={200} src={imageUrl} alt='avatar' style={{ maxHeight: '200px' }} />
              </UploadComponent>
              <Text strong style={{ marginTop: '1rem', fontSize: '1rem', marginBottom: '1rem' }}>
                {email}
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button onClick={onChangePassword} style={{ borderRadius: '8px', marginBottom: '1rem' }}>
                  <Text strong>Change password</Text>
                </Button>
                {canDeactivate ? (
                  <>
                    <Button onClick={openDeactivateAccount} type={'primary'} style={{ borderRadius: '8px' }}>
                      <Text strong>Deactivate account</Text>
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          </Card>
        </div>
        <div style={{ position: 'fixed', right: '15%' }}>
          <AnchorComponent listData={formAnchorTitles} href={'#account-profile'} title={'Account profile'} />
        </div>
        <Form
          form={form}
          onFinish={internalOnFinish}
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
        <BackTop visibilityHeight={500} target={() => document} />
      </div>
    </>
  );
};
