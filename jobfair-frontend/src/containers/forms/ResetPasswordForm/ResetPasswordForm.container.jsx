import { Form, Modal } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import { modalErrorObject } from '../../../utils/modalErrorObject';
import { modalSuccessObject } from '../../../utils/modalSuccessObject';
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
      Modal.success(modalSuccessObject(() => history.push(PATH.LOGIN_PAGE)));
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
