/* eslint-disable no-unused-vars,no-empty-function */
import './NewAccountRegisterForm.styles.scss';
import { Button, Card, Divider, Form, Modal, Select, Space, Steps, Tabs, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH } from '../../../constants/Paths/Path';
import { createCompanyAPI } from '../../../services/jobhub-api/CompanyControllerService';
import { faBuilding, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { registerAttendantAPI } from '../../../services/jobhub-api/AttendantControllerService';
import { registerCompanyAPI } from '../../../services/jobhub-api/CompanyEmployeeControllerService';
import { useHistory } from 'react-router-dom';
import AttendantRegisterFormComponent from '../AttendantRegisterForm/AttendantRegisterForm.component';
import CompanyManagerRegisterFormComponent from '../CompanyManagerRegisterForm/CompanyManagerRegisterFormComponent';
import CreateCompanyFormComponent from '../CreateCompanyForm/CreateCompanyForm.component';
import React, { useState } from 'react';

const { TabPane } = Tabs;
const { Option } = Select;

const genderType = [
  {
    title: 'Male',
    value: 'MALE'
  },
  {
    title: 'Female',
    value: 'FEMALE'
  }
];

const { Step } = Steps;

const NewAccountRegisterFormComponent = () => (
  <div className='register-container'>
    <Divider orientation='center' plain>
      <Typography.Title level={4}>Job Fair Online - Sign in</Typography.Title>
    </Divider>
    <Tabs defaultActiveKey='ATTENDANT' centered>
      <TabPane tab='ATTENDANT' key='ATTENDANT'>
        <AttendantRegisterContainer />
      </TabPane>
      <TabPane tab='COMPANY' key='COMPANY'>
        <CompanyRegisterContainer />
      </TabPane>
    </Tabs>
  </div>
);

const AttendantRegisterContainer = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const handleRegisterAttendant = async (values) => {
    const body = {
      ...values
    };
    try {
      const res = await registerAttendantAPI(body);
      if (res.status === 201) {
        Modal.success({
          title: 'Register attendant account successfully !',
          width: '30rem',
          closable: true,
          maskClosable: true,
          okText: 'Login now',
          content: (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography.Title level={3} style={{ display: 'block', margin: '0 auto' }}>
                Please check your email address
              </Typography.Title>
              <Typography.Paragraph style={{ display: 'block', margin: '0 auto', marginTop: '2rem' }}>
                <Space direction='vertical'>
                  <div>
                    <Typography.Text>An confirmation email has been sent to</Typography.Text>
                    <Typography.Text strong> {values.email}</Typography.Text>
                  </div>
                  <Typography.Text>Please check your inbox and follow the instruction</Typography.Text>
                </Space>
              </Typography.Paragraph>
            </div>
          )
        });
      }
    } catch (err) {
      Modal.error({
        title: 'Register attendant account failed !',
        width: '30rem',
        height: '40rem',
        closable: true,
        maskClosable: true,
        content: (
          <>
            <Typography.Text strong>{err.response.data.message}</Typography.Text>
          </>
        )
      });
    }
  };
  return (
    <Card
      style={{
        boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
        marginBottom: '2rem'
      }}
      headStyle={{ backgroundColor: 'white', border: 0 }}
      bodyStyle={{ backgroundColor: 'white', border: 0 }}>
      <AttendantRegisterFormComponent
        form={form}
        handleRegisterAttendant={handleRegisterAttendant}
        genderType={genderType}
      />
    </Card>
  );
};

const CompanyRegisterContainer = () => {
  // const [companyForm] = Form.useForm();
  // const [managerForm] = Form.useForm();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompanyError, setIsCompanyError] = useState(true);
  const [isManagerError, setIsManagerError] = useState(true);
  const history = useHistory();

  const handleRegisterCompany = async (values) => {
    const companyBody = {
      name: values.name,
      companyEmail: values.companyEmail,
      taxId: values.taxId,
      sizeId: values.sizeId,
      subCategoriesIds: values.subCategoriesIds
    };
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
      const res = await handleRegisterCompany(form.getFieldsValue(true));
      const responseManager = await handleRegisterCompanyManager(form.getFieldsValue(true), res.data.id);
      if (res.status === 200 && responseManager.status === 201) {
        Modal.success({
          title: 'Register company manager successfully !',
          width: '30rem',
          closable: true,
          maskClosable: true,
          okText: 'OK',
          afterClose: history.push(PATH.LOGIN_PAGE),
          content: (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography.Title level={3} style={{ display: 'block', margin: '0 auto' }}>
                Please check your email address
              </Typography.Title>
              <Typography.Paragraph style={{ display: 'block', margin: '0 auto', marginTop: '2rem' }}>
                <Space direction='vertical'>
                  <div>
                    <Typography.Text>
                      An confirmation email has been sent to {form.getFieldValue('email')}
                    </Typography.Text>
                    <Typography.Text strong> </Typography.Text>
                  </div>
                  <Typography.Text>Please check your inbox and follow the instruction</Typography.Text>
                </Space>
              </Typography.Paragraph>
            </div>
          )
        });
      }
    } catch (e) {
      //manager form errors
      const errorsArray = form.getFieldsError();
      for (const error of errorsArray) {
        if (error.errors.length > 0) {
          form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
          break;
        }
      }
      //company form errors
      const errorsCompany = form.getFieldsError();
      for (const error of errorsCompany) {
        if (error.errors.length > 0) {
          form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
          break;
        }
      }
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
            const errorsArray = form.getFieldsError();
            for (const error of errorsArray) {
              if (error.errors.length > 0) {
                form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
                break;
              }
            }
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
      await form.validateFields();
      setCurrentStep(currentStep - 1);
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
              isError={isManagerError}
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
            <CreateCompanyFormComponent
              form={form}
              onFinish={handleOnFinish}
              onPrev={onPrev(currentStep)}
              isError={isCompanyError}
            />
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
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <div>{stepComponentList[currentStep].content}</div>
      <Form.Item className='login-text'>
        <span>Already have an account?</span> <Button type='link'>Login now!</Button>
      </Form.Item>
    </>
  );
};

export default NewAccountRegisterFormComponent;
