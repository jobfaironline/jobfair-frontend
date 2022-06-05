import { Form, Modal, Typography } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import { modalErrorObject } from '../../../utils/modalErrorObject';
import { resetPasswordAPI } from '../../../services/jobhub-api/ResetPasswordControllerService';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import ResetPasswordFormComponent from '../../../components/forms/ResetPasswordForm/ResetPasswordForm.component';

const ResetPasswordFormContainer = () => {
  const [otpCode, setOtpCode] = useState();
  const location = useLocation();
  const [form] = Form.useForm();
  const history = useHistory();
  const mapValues = (values) => ({
    email: location?.state?.email,
    otp: otpCode,
    newPassword: values.newPassword,
    confirmPassword: values.confirmPassword
  });
  const onFinish = async (values) => {
    const body = mapValues(values);
    try {
      await resetPasswordAPI(body);
      Modal.success({
        title: 'Reset password successfully !',
        width: '30rem',
        closable: true,
        maskClosable: true,
        onOk: () => history.push(PATH.LOGIN_PAGE),
        keyboard: false,
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography.Text>Your password has been updated</Typography.Text>
          </div>
        )
      });
    } catch (e) {
      Modal.error(modalErrorObject(e));
    }
  };
  return (
    <div className='page'>
      <ResetPasswordFormComponent
        form={form}
        onFinish={onFinish}
        email={location?.state?.email}
        setOtpCode={setOtpCode}
      />
    </div>
  );
};
export default ResetPasswordFormContainer;
