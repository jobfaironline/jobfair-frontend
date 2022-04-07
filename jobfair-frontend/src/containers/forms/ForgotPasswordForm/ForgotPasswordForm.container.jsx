import { Form, notification } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import { forgotPasswordAPI } from '../../../services/account-controller/AccountControllerService';
import { useHistory } from 'react-router-dom';
import ForgotPasswordFormComponent from '../../../components/forms/ForgotPasswordForm/ForgotPasswordForm.component';
import React from 'react';

const ForgotPasswordFormContainer = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = async (values) => {
    const body = {
      email: values.email
    };
    forgotPasswordAPI(body)
      .then(() => {
        notification['success']({
          message: `Your OTP Code has been sent in your email box.`,
          duration: 1
        });
        history.push({
          pathname: PATH.CHANGE_PASSWORD_PAGE,
          state: { email: body.email }
        });
      })
      .catch((err) => {
        notification['error']({
          message: `Error - ${err.response.data.message}`,
          duration: 1
        });
      });
  };
  return (
    <>
      <ForgotPasswordFormComponent form={form} onFinish={onFinish} />
    </>
  );
};
export default ForgotPasswordFormContainer;
