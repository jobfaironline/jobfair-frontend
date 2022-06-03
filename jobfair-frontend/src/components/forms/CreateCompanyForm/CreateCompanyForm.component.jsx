import { CompanyRegisterValidation } from '../../../validate/RegisterValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input, Select, Space, Typography } from 'antd';
import { SizeConst } from '../../../constants/CompanyProfileConstant';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const MAX_TOTAL_BENEFITS = 5;
const DEFAULT_DOMAIN_NAME_LIST = ['.com', '.vn'];
const MAX_TOTAL_INDUSTRY = 5;

const CreateCompanyFormComponent = ({ form, handleRegisterCompany, onNext }) => {
  const [totalBenefits, setTotalBenefits] = useState(MAX_TOTAL_BENEFITS);
  const [totalIndustries, setTotalIndustries] = useState(MAX_TOTAL_INDUSTRY);
  return (
    <div>
      <Space size='middle'>
        <Typography.Text>Company detail</Typography.Text>
        <a onClick={onNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </Space>
      <Form form={form} onFinish={handleRegisterCompany} scrollToFirstError>
        <Form.Item
          label='Company name'
          name='name'
          rules={CompanyRegisterValidation.companyName}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='Your company name' />
        </Form.Item>
        <Form.Item
          label='Company email'
          name='companyEmail'
          rules={CompanyRegisterValidation.email}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='Company email' autoComplete='new-email' />
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
          label='Company size'
          name='sizeId'
          rules={CompanyRegisterValidation.sizeId}
          style={{ width: '100%', display: 'inline-block' }}>
          <Select defaultValue='Select a size...'>
            {SizeConst.map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCompanyFormComponent;
