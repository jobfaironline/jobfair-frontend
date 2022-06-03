/* eslint-disable no-unused-vars,no-empty-function */
import './NewAccountRegisterForm.styles.scss';
import { Button, Card, Divider, Form, Select, Space, Steps, Tabs, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH } from '../../../constants/Paths/Path';
import { createCompanyAPI } from '../../../services/jobhub-api/CompanyControllerService';
import { faArrowLeft, faBuilding, faUserShield } from '@fortawesome/free-solid-svg-icons';
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

const NewAccountRegisterFormComponent = ({ form }) => (
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
      form.resetFields();
      history.push(PATH.LOGIN_PAGE);
      if (res.status === 201) {
        notification['success']({
          message: `${res.data.message}`,
          duration: 2
        });
      }
    } catch (err) {
      notification['error']({
        message: `${err.response.data.message}`,
        duration: 2
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
  const [companyForm] = Form.useForm();
  const [managerForm] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isError, setIsError] = useState(true);
  const [companyId, setCompanyId] = useState();
  const history = useHistory();

  const handleRegisterCompany = async (values) => {
    const body = {
      address: values.address,
      companyEmail: values.companyEmail,
      name: values.name,
      phone: values.phone,
      taxId: values.taxId,
      sizeId: values.sizeId
    };
    try {
      const res = await createCompanyAPI(body);
      setCompanyId(res.data.id);
    } catch (e) {
      notification['error']({
        message: 'Create company failed'
      });
    }
  };

  const handleRegisterCompanyManager = async (values) => {
    const body = {
      companyId,
      confirmPassword: values.confirm,
      department: values.department,
      email: values.email,
      firstName: values.firstName,
      gender: values.gender,
      lastName: values.lastName,
      middleName: values.middleName,
      password: values.password,
      phone: values.phone
    };
    try {
      await registerCompanyAPI(body);
      notification['success']({
        message: 'Create company manager account successfully'
      });
      managerForm.resetFields();
      history.push(PATH.LOGIN_PAGE);
    } catch (e) {
      notification['error']({
        message: 'Create company manager account failed'
      });
    }
  };

  const onNext = (step) => {
    switch (step) {
      case 0:
        return async () => {
          try {
            await companyForm.validateFields();
            await handleRegisterCompany(companyForm.getFieldsValue(true));
            setCurrentStep(currentStep + 1);
            setIsError(false);
          } catch (e) {
            const errorsArray = companyForm.getFieldsError();
            for (const error of errorsArray) {
              if (error.errors.length > 0) {
                companyForm.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
                break;
              }
            }
          }
        };
      case 1:
        return async () => {
          try {
            await managerForm.validateFields();
            await handleRegisterCompanyManager(managerForm.getFieldsValue(true));
            setCurrentStep(currentStep + 1);
            setIsError(false);
          } catch (e) {
            const errorsArray = managerForm.getFieldsError();
            for (const error of errorsArray) {
              if (error.errors.length > 0) {
                managerForm.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
                break;
              }
            }
          }
        };
      default:
        return () => setCurrentStep(currentStep + 1);
    }
  };

  const onPrev = (currentStep) => () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
      setIsError(false);
    }
  };

  const stepComponentList = [
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
              form={companyForm}
              handleRegisterCompany={handleRegisterCompany}
              onNext={onNext(currentStep)}
            />
          </Card>
        </>
      )
    },
    {
      title: 'Manager',
      icon: <FontAwesomeIcon icon={faUserShield} />,
      content: (
        <>
          <Card
            title={
              <Space size='middle'>
                <Typography.Text>Company manager detail</Typography.Text>
                <a onClick={onPrev(currentStep)}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </a>
              </Space>
            }
            style={{
              boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              marginBottom: '2rem'
            }}
            headStyle={{ backgroundColor: 'white', border: 0 }}
            bodyStyle={{ backgroundColor: 'white', border: 0 }}>
            <CompanyManagerRegisterFormComponent
              form={managerForm}
              handleRegisterCompanyManager={handleRegisterCompanyManager}
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
