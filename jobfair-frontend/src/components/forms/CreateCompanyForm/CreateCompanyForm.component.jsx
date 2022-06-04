import { Button, Divider, Form, Input, Select, Space, Typography } from 'antd';
import { CategoriesConst, SizeConst, SubCategories } from '../../../constants/CompanyProfileConstant';
import { CompanyRegisterValidation } from '../../../validate/RegisterValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faIndustry, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const MAX_TOTAL_INDUSTRY = 4;

const CreateCompanyFormComponent = ({ form, onFinish, onPrev }) => {
  const [totalIndustries, setTotalIndustries] = useState(0);
  return (
    <div>
      <Space size='middle'>
        <Typography.Text strong>Company detail</Typography.Text>
        <a onClick={onPrev}>
          <FontAwesomeIcon icon={faArrowLeft} /> Previous
        </a>
      </Space>
      <Form form={form} onFinish={onFinish} scrollToFirstError>
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
          <Input placeholder='Your company email' />
        </Form.Item>
        <Form.Item
          label='Tax ID'
          name='taxId'
          tooltip={
            <>
              Mã số thuế (Tax ID hoặc TIN) là một dãy số, chữ cái hoặc ký tự do cơ quan quản lý thuế cấp cho người nộp
              thuế theo quy định của Luật quản lý thuế.{' '}
              <a href='https://www.irs.gov/individuals/international-taxpayers/taxpayer-identification-numbers-tin '>
                Chi tiết
              </a>
            </>
          }
          rules={CompanyRegisterValidation.taxId}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='Tax ID' />
        </Form.Item>
        <Form.Item
          label='Company size'
          name='sizeId'
          tooltip={'The number of workers in your company'}
          rules={CompanyRegisterValidation.sizeId}
          style={{ width: '100%', display: 'inline-block' }}>
          <Select defaultValue='Select a size...' suffixIcon={<FontAwesomeIcon icon={faUser} />}>
            {SizeConst.map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Company industries'
          required
          tooltip={'The industry areas that your company involved'}
          rules={CompanyRegisterValidation.categories}
          name='subCategoriesIds'
          style={{
            width: '100%',
            display: 'inline-block'
          }}>
          <Select
            mode='multiple'
            suffixIcon={<FontAwesomeIcon icon={faIndustry} />}
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
                    : `You can select ${MAX_TOTAL_INDUSTRY} items only. (${MAX_TOTAL_INDUSTRY - totalIndustries} left)`}
                </Typography.Text>
              </>
            )}>
            {CategoriesConst.map((category) => (
              <Select.OptGroup label={category.label}>
                {SubCategories.filter((item) => item.category_id === category.value).map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
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
    </div>
  );
};

export default CreateCompanyFormComponent;
