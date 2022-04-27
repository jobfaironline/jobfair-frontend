import { Form, notification } from 'antd';

import { PATH, PATH_ADMIN, PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { SigninHandler } from '../../../redux-flow/authentication/authentication-action';
import { signInAPI } from '../../../services/jobhub-api/AuthControllerService';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginFormComponent from '../../../components/forms/LoginForm/LoginForm.component';
import React from 'react';

const LoginFormContainer = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    const body = {
      email: values.email,
      password: values.password
    };
    signInAPI(body)
      .then((res) => {
        notification['success']({
          message: `Login successfully.`,
          duration: 1
        });
        dispatch(SigninHandler(res.data));
        switch (res.data.roles) {
          case 'COMPANY_EMPLOYEE':
            history.push(PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE);
            return;
          case 'COMPANY_MANAGER':
            history.push(PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE);
            return;
          case 'ATTENDANT':
            history.push(PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE);
            return;
          case 'ADMIN':
            history.push(PATH_ADMIN.JOB_FAIR_LIST_PAGE);
        }
      })
      .catch(() => {
        notification['error']({
          message: `Login failed - Invalid email or password.`,
          duration: 1
        });
      });
  };

  return (
    <>
      <LoginFormComponent form={form} onFinish={onFinish} />
    </>
  );
};

export default LoginFormContainer;
