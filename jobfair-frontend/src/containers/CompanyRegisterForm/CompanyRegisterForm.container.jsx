import { Button, Card, Form, Modal, Steps, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH } from '../../constants/Paths/Path';
import { createCompanyAPI } from '../../services/jobhub-api/CompanyControllerService';
import { faBuilding, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { handleFieldsError } from '../../utils/handleFIeldsError';
import { registerCompanyAPI } from '../../services/jobhub-api/CompanyEmployeeControllerService';
import { useHistory } from 'react-router-dom';
import CompanyManagerRegisterFormComponent from '../../components/forms/CompanyManagerRegisterForm/CompanyManagerRegisterFormComponent';
import CreateCompanyFormComponent from '../../components/forms/CreateCompanyForm/CreateCompanyForm.component';
import React, { useState } from 'react';
import RegisterSuccessContentComponent from '../../components/commons/RegisterSuccessContent/RegisterSuccessContent.component';

const CompanyRegisterFormContainer = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const history = useHistory();

  const registerCompanyMapper = (values) => ({
    name: values.name,
    companyEmail: values.companyEmail,
    taxId: values.taxId,
    sizeId: values.sizeId,
    subCategoriesIds: values.subCategoriesIds
  });

  const handleRegisterCompany = async (values) => {
    const companyBody = registerCompanyMapper(values);
    try {
      return await createCompanyAPI(companyBody);
    } catch (e) {
      Modal.error({
        title: 'Register company failed !',
        width: '30rem',
        height: '40rem',
        closable: true,
        maskClosable: true,
        content: (
          <>
            <Typography.Text strong>{e.response.data.message}</Typography.Text>
          </>
        )
      });
    }
  };

  const handleOnFinish = async () => {
    try {
      await handleRegisterCompany(form.getFieldsValue(true));
      await handleRegisterCompanyManager(form.getFieldsValue(true), res.data.id);
      Modal.success({
        title: 'Register company manager successfully !',
        width: '30rem',
        closable: true,
        maskClosable: true,
        okText: 'OK',
        keyboard: false,
        onOk: () => history.push(PATH.LOGIN_PAGE),
        content: <RegisterSuccessContentComponent email={form.getFieldValue('email')} />
      });
    } catch (e) {
      //handle field error
      handleFieldsError(form);
    }
  };

  const handleRegisterCompanyManager = async (values, companyId) => {
    const body = {
      companyId,
      confirmPassword: values.confirm,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      password: values.password
    };
    try {
      return await registerCompanyAPI(body);
    } catch (e) {
      Modal.error({
        title: 'Register company manager failed !',
        width: '30rem',
        height: '40rem',
        closable: true,
        maskClosable: true,
        content: (
          <>
            <Typography.Text strong>{e.response.data.message}</Typography.Text>
          </>
        )
      });
    }
  };

  const onNext = (step) => {
    switch (step) {
      case 0:
        return async () => {
          try {
            await form.validateFields();
            setCurrentStep(currentStep + 1);
          } catch (e) {
            handleFieldsError(form);
          }
        };
      default:
        return () => {
          setCurrentStep(currentStep + 1);
        };
    }
  };

  const onPrev = (currentStep) => async () => {
    if (currentStep !== 0) {
      try {
        await form.validateFields();
        setCurrentStep(currentStep - 1);
      } catch (e) {
        handleFieldsError(form);
      }
    }
  };

  const stepComponentList = [
    {
      title: 'Manager',
      icon: <FontAwesomeIcon icon={faUserShield} />,
      content: (
        <>
          <Card
            style={{
              boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              marginBottom: '2rem'
            }}
            headStyle={{ backgroundColor: 'white', border: 0 }}
            bodyStyle={{ backgroundColor: 'white', border: 0 }}>
            <CompanyManagerRegisterFormComponent
              form={form}
              onNext={onNext(currentStep)}
              onFinish={handleRegisterCompanyManager}
            />
          </Card>
        </>
      )
    },
    {
      title: 'Company',
      icon: <FontAwesomeIcon icon={faBuilding} />,
      content: (
        <>
          <Card
            style={{
              boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              marginBottom: '2rem'
            }}
            headStyle={{ backgroundColor: 'white', border: 0 }}
            bodyStyle={{ backgroundColor: 'white', border: 0 }}>
            <CreateCompanyFormComponent form={form} onFinish={handleOnFinish} onPrev={onPrev(currentStep)} />
          </Card>
        </>
      )
    }
  ];

  return (
    <>
      <Steps
        current={currentStep}
        style={{
          background: '#FFF',
          zIndex: '1000',
          padding: '1rem 3rem',
          borderBottom: '0.5px solid gray',
          marginBottom: '1rem'
        }}>
        {stepComponentList.map((item) => (
          <Steps.Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <div>{stepComponentList[currentStep].content}</div>
      <Form.Item className='login-text'>
        <span>Already have an account?</span> <Button type='link'>Login now!</Button>
      </Form.Item>
    </>
  );
};

export default CompanyRegisterFormContainer;
