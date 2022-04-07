import { Form, notification } from 'antd';
import { PATH } from '../../constants/Paths/Path';
import { resetPasswordAPI } from '../../services/reset-password-controller/ResetPasswordControllerService';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import ResetPasswordFormComponent from '../../components/forms/ResetPasswordForm/ResetPasswordForm.component';

const ResetPasswordContainer = () => {
  const [otpCode, setOtpCode] = useState();
  const location = useLocation();
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = async (values) => {
    const body = {
      email: values?.email ? values.email : location?.state?.email,
      otp: otpCode,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword
    };
    resetPasswordAPI(body)
      .then(() => {
        notification['success']({
          message: `Your password has been change!.`,
          duration: 1
        });
        history.push(PATH.LOGIN_PAGE);
      })
      .catch((err) => {
        notification['error']({
          message: `Error - ${err.response.data.message}`,
          duration: 1
        });
      });
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
export default ResetPasswordContainer;
