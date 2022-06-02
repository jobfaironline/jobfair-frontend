/* eslint-disable no-unused-vars,no-empty-function */
import './NewAccountRegisterForm.styles.scss';
import { AttendantRegisterValidation, CompanyRegisterValidation } from '../../../validate/RegisterValidation';
import { Button, Card, Divider, Form, Input, Select, Space, Steps, Tabs, Typography, notification } from 'antd';
import { CategoriesConst, SizeConst, SubCategories, benefitConst } from '../../../constants/CompanyProfileConstant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createCompanyAPI } from '../../../services/jobhub-api/CompanyControllerService';
import { faArrowLeft, faArrowRight, faBuilding, faPhone, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { registerAttendantAPI } from '../../../services/jobhub-api/AttendantControllerService';
import { registerCompanyAPI } from '../../../services/jobhub-api/CompanyEmployeeControllerService';
import { v4 as uuidv4 } from 'uuid';
import CustomDropdownComponent from '../../commons/CustomDropdown/CustomDropdown.component';
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

const MAX_TOTAL_BENEFITS = 5;
const MAX_TOTAL_INDUSTRY = 5;
const DEFAULT_DOMAIN_NAME_LIST = ['.com', '.vn'];
const { Step } = Steps;

const NewAccountRegisterFormComponent = ({ form }) => (
  <div className='register-container'>
    <Divider orientation='center' plain>
      <Typography.Title level={4}>Job Fair Online - Sign in</Typography.Title>
    </Divider>
    <Tabs defaultActiveKey='ATTENDANT' centered>
      <TabPane tab='ATTENDANT' key='ATTENDANT'>
        <AttendantForm />
      </TabPane>
      <TabPane tab='COMPANY' key='COMPANY'>
        <CompanyForm />
      </TabPane>
    </Tabs>
  </div>
);

const AttendantForm = () => {
  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    const body = {
      ...values
    };
    try {
      const res = await registerAttendantAPI(body);
      form.resetFields();
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
      <Form form={form} name='register' onFinish={handleRegister} scrollToFirstError>
        <Form.Item name='firstname' rules={AttendantRegisterValidation.firstName}>
          <Input placeholder='First name' />
        </Form.Item>
        <Form.Item name='middlename' rules={AttendantRegisterValidation.middleName}>
          <Input placeholder='Middle name' />
        </Form.Item>
        <Form.Item name='lastname' rules={AttendantRegisterValidation.lastName}>
          <Input placeholder='Last name' />
        </Form.Item>
        <Form.Item name='phone' rules={AttendantRegisterValidation.phone}>
          <Input addonBefore={<FontAwesomeIcon icon={faPhone} />} placeholder='Phone' />
        </Form.Item>
        <Form.Item name='gender' label='Gender' rules={AttendantRegisterValidation.gender}>
          <Select defaultValue='Select gender...'>
            {genderType.map((gender) => (
              <Option value={gender.value}>{gender.title}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='email' rules={AttendantRegisterValidation.email}>
          <Input placeholder='Email' autoComplete='new-email' />
        </Form.Item>

        <Form.Item name='password' rules={AttendantRegisterValidation.password} hasFeedback>
          <Input.Password placeholder='Password' autoComplete='new-password' />
        </Form.Item>

        <Form.Item
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={AttendantRegisterValidation.rePassword}>
          <Input.Password placeholder='Confirm password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
        <Form.Item className='login-text'>
          <span>Already have an account?</span> <Button type='link'>Login now!</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const CompanyForm = () => {
  const [form] = Form.useForm();
  const [totalBenefits, setTotalBenefits] = useState(MAX_TOTAL_BENEFITS);
  const [totalIndustries, setTotalIndustries] = useState(MAX_TOTAL_INDUSTRY);
  const [currentStep, setCurrentStep] = useState(0);
  const [isError, setIsError] = useState(true);

  const handleRegisterCompany = async (values) => {
    const body = {
      ...values
    };
    try {
      await createCompanyAPI(body);
      notification['success']({
        message: 'Create company successfully'
      });
    } catch (e) {
      notification['error']({
        message: 'Create company failed'
      });
    }
  };

  const handleRegisterCompanyManager = async (values) => {
    const body = {
      companyId: uuidv4(),
      confirmPassword: values.confirm,
      department: 'string',
      email: values.email,
      firstName: 'string',
      gender: 'MALE',
      lastName: 'string',
      middleName: 'string',
      password: values.password,
      phone: values.phone
    };
    try {
      await registerCompanyAPI(body);
      notification['success']({
        message: 'Create company manager account successfully'
      });
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
            await form.validateFields();
            await handleRegisterCompanyManager(form.getFieldsValue(true));
            setCurrentStep(currentStep + 1);
            setIsError(false);
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
      case 1:
        return async () => {
          try {
            await form.validateFields();
            await handleRegisterCompany(form.getFieldsValue(true));
            setCurrentStep(currentStep + 1);
            setIsError(false);
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
        return () => setCurrentStep(currentStep + 1);
    }
  };

  const onPrev = (currentStep) => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
      setIsError(false);
    }
  };

  const stepComponentList = [
    {
      title: 'Manager',
      icon: <FontAwesomeIcon icon={faUserShield} />,
      content: (
        <>
          <Card
            title={
              <Space size='middle'>
                <Typography.Text>Company manager detail</Typography.Text>
                <a onClick={onNext(currentStep)}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </Space>
            }
            style={{
              boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
              marginBottom: '2rem'
            }}
            headStyle={{ backgroundColor: 'white', border: 0 }}
            bodyStyle={{ backgroundColor: 'white', border: 0 }}>
            <Form form={form} onFinish={handleRegisterCompanyManager} scrollToFirstError>
              <Form.Item
                label='Email'
                name='email'
                rules={CompanyRegisterValidation.email}
                style={{ display: 'inline-block', width: '100%' }}>
                <Input placeholder='Email' autoComplete='new-email' />
              </Form.Item>
              <Form.Item
                label='Phone'
                name='phone'
                rules={CompanyRegisterValidation.phone}
                style={{ display: 'inline-block', width: '100%' }}>
                <Input placeholder='Phone number' />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                rules={CompanyRegisterValidation.password}
                style={{ display: 'inline-block', width: '100%' }}
                hasFeedback>
                <Input.Password placeholder='Password' autoComplete='new-password' />
              </Form.Item>
              <Form.Item
                label='Confirm password'
                name='confirm'
                dependencies={['password']}
                style={{ display: 'inline-block', width: '100%' }}
                hasFeedback
                rules={CompanyRegisterValidation.rePassword}>
                <Input.Password placeholder='Confirm password' />
              </Form.Item>
            </Form>
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
            title={
              <Space size='middle'>
                <Typography.Text>Company detail</Typography.Text>
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
            <Form form={form} onFinish={handleRegisterCompany} scrollToFirstError>
              <Form.Item
                label='Company name'
                name='name'
                rules={CompanyRegisterValidation.companyName}
                style={{ display: 'inline-block', width: '100%' }}>
                <Input placeholder='Your company name' />
              </Form.Item>
              <Form.Item
                label='Tax ID'
                name='taxId'
                rules={CompanyRegisterValidation.taxId}
                style={{ display: 'inline-block', width: '100%' }}>
                <Input placeholder='Tax ID' />
              </Form.Item>
              <Form.Item
                label='Address'
                name='address'
                rules={CompanyRegisterValidation.address}
                style={{ display: 'inline-block', width: '100%' }}>
                <Input placeholder='Address' />
              </Form.Item>
              <Form.Item
                label='Phone'
                name='phone'
                rules={CompanyRegisterValidation.phone}
                style={{ display: 'inline-block', width: '100%' }}>
                <Input placeholder='Phone number' />
              </Form.Item>
              <Form.Item
                label='Website'
                name='url'
                rules={CompanyRegisterValidation.url}
                style={{ display: 'inline-block', width: '100%' }}>
                <Input
                  addonBefore='http://'
                  addonAfter={<CustomDropdownComponent itemList={DEFAULT_DOMAIN_NAME_LIST} />}
                  defaultValue='my-company-site'
                />
              </Form.Item>
              <Form.Item
                label='Company size'
                name='sizeId'
                rules={CompanyRegisterValidation.sizeId}
                style={{ width: '100%', display: 'inline-block' }}>
                <Select defaultValue='Select a size...'>
                  {SizeConst.map((item) => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label='Description'
                name='companyDescription'
                rules={CompanyRegisterValidation.phone}
                style={{ display: 'inline-block', width: '100%' }}>
                <Input.TextArea showCount maxLength={5000} placeholder='Description' />
              </Form.Item>
              <Form.Item
                label='Company benefits'
                required
                rules={CompanyRegisterValidation.benefits}
                name='benefits'
                style={{
                  width: '100%',
                  display: 'inline-block'
                }}>
                <Select
                  mode='multiple'
                  onChange={(value) => {
                    //value is a array
                    if (value.length > MAX_TOTAL_BENEFITS) value.pop();
                    setTotalBenefits(value.length);
                  }}
                  onSearch={() => {}}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Typography.Text type={totalBenefits > 5 ? 'danger' : 'success'}>
                        {totalBenefits > 5
                          ? null
                          : `You can select ${MAX_TOTAL_BENEFITS}  items only. (${
                              MAX_TOTAL_BENEFITS - totalBenefits
                            } left)`}
                      </Typography.Text>
                    </>
                  )}
                  // disabled={isDisplayDetail}
                >
                  {benefitConst.map((item) => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label='Company industries'
                required
                rules={CompanyRegisterValidation.categories}
                name='subCategoriesIds'
                style={{
                  width: '100%',
                  display: 'inline-block'
                }}>
                <Select
                  mode='multiple'
                  onChange={(value) => {
                    //value is a array
                    if (value.length > MAX_TOTAL_INDUSTRY) value.pop();
                    setTotalIndustries(value.length);
                  }}
                  showSearch
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Typography.Text type={totalIndustries > MAX_TOTAL_INDUSTRY ? 'danger' : 'success'}>
                        {totalIndustries > MAX_TOTAL_INDUSTRY
                          ? null
                          : `You can select ${MAX_TOTAL_INDUSTRY} items only. (${
                              MAX_TOTAL_INDUSTRY - totalIndustries
                            } left)`}
                      </Typography.Text>
                    </>
                  )}>
                  {CategoriesConst.map((category) => (
                    <Select.OptGroup label={category.label}>
                      {SubCategories.filter((item) => item.category_id === category.value).map((item) => (
                        <Option value={item.value}>{item.label}</Option>
                      ))}
                    </Select.OptGroup>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Register
                </Button>
              </Form.Item>
            </Form>
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
