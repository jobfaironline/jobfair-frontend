import { Button, Checkbox, Divider, Form, Input, Select, Space, Typography } from 'antd';
import { CategoriesConst, SizeConst, SubCategories } from '../../../constants/CompanyProfileConstant';
import { CompanyRegisterValidation } from '../../../validate/RegisterValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MAX_TOTAL_INDUSTRY } from '../../../constants/CompanyIndustryConst';
import { PATH } from '../../../constants/Paths/Path';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faIndustry, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const CreateCompanyFormComponent = ({ form, onFinish, onPrev }) => {
  const [totalIndustries, setTotalIndustries] = useState(0);
  const [isAgree, setIsAgree] = useState(false);

  return (
    <div>
      <Space size='middle'>
        <Typography.Text strong>Company detail</Typography.Text>
        <a onClick={onPrev}>
          <FontAwesomeIcon icon={faArrowLeft} /> Previous
        </a>
      </Space>
      <Form form={form} onFinish={onFinish} preserve={true}>
        <Form.Item
          label='Company name'
          name='name'
          preserve={true}
          rules={CompanyRegisterValidation.companyName}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='Your company name' />
        </Form.Item>
        <Form.Item
          label='Company email'
          name='companyEmail'
          preserve={true}
          rules={CompanyRegisterValidation.email}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='Your company email' />
        </Form.Item>
        <Form.Item
          label='Tax ID'
          name='taxId'
          preserve={true}
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
          preserve={true}
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
          preserve={true}
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
            filterOption={(input, option) => option.children?.toLowerCase().includes(input?.toLowerCase())}
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
        <div>
          <Checkbox onChange={(e) => setIsAgree(e.target.checked)}>
            <span>By clicking the "Register" button, I agree to the</span> <a href={PATH.FAQ_PAGE}>Term of use</a>{' '}
            <span>and</span> <a href={PATH.FAQ_PAGE}>Privacy Policy</a> <span>of JobHub</span>
          </Checkbox>
        </div>
        <Form.Item>
          <Button type='primary' htmlType='submit' disabled={!isAgree}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCompanyFormComponent;
