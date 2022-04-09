import { Form, notification } from 'antd';
import { changePasswordAPI } from '../../../services/jobhub-api/AccountControllerService';
import ChangePasswordFormComponent from '../../../components/forms/ChangePasswordForm/ChangePasswordForm.component';
import React from 'react';

const ChangePasswordFormContainer = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const body = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword
    };
    changePasswordAPI(body)
      .then(() => {
        notification['success']({
          message: `Change password successfully`
        });
      })
      .catch((err) => {
        notification['error']({
          message: `Oops! - ${err.response.data.message}`
        });
      });
  };

  return (
    <>
      <ChangePasswordFormComponent form={form} onFinish={onFinish} />
    </>
  );
};

export default ChangePasswordFormContainer;
