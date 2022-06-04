import { Form, notification } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import { forgotPasswordAPI, getGeneralInfoAPI } from '../../../services/jobhub-api/AccountControllerService';
import { useHistory } from 'react-router-dom';
import ForgotPasswordFormComponent from '../../../components/forms/ForgotPasswordForm/ForgotPasswordForm.component';
import React, { useState } from 'react';

const ForgotPasswordFormContainer = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [generalInfo, setGeneralInfo] = useState();
  const onFinish = async (values) => {
    const body = {
      email: values.email
    };
    forgotPasswordAPI(body)
      .then(() => {
        notification['success']({
          message: 'An email with the embedded OTP has been sent to your email. Please check for more detail.',
          duration: 1
        });
        history.push(PATH.RESET_PASSWORD_PAGE, {
          email: values.email
        });
      })
      .catch((err) => {
        notification['error']({
          message: `Error - ${err.response.data.message}`,
          duration: 1
        });
      });
  };
  const handleSearchEmail = async (values) => {
    try {
      const res = await getGeneralInfoAPI(values.email);
      setGeneralInfo(res.data);
    } catch (err) {
      notification['error']({
        message: `Not found user with email ${values.email}`
      });
      setGeneralInfo(undefined);
    }
  };
  return (
    <>
      <ForgotPasswordFormComponent
        form={form}
        onFinish={onFinish}
        handleSearchEmail={handleSearchEmail}
        info={generalInfo}
      />
    </>
  );
};
export default ForgotPasswordFormContainer;
