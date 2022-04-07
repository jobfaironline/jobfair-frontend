/* eslint-disable no-empty-function */
import { Button, Card, Form, Input, Popconfirm, Select, Space } from 'antd';
import { CategoriesConst, SubCategories } from '../../../constants/CompanyProfileConstant';
import { CompanyProfileValidation } from '../../../validate/CompanyProfileValidation';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { JobLevelConst, LanguageConst } from '../../../constants/JobPositionConst';
import { JobPositionValidation } from '../../../validate/CreateJobPositionValidation';
import React from 'react';

const { Option, OptGroup } = Select;
const JobPositionDetailFormComponent = ({ form, onFinish, handleDelete, data }) => (
  <Form
    form={form}
    onFinish={onFinish}
    requiredMark='required'
    autoComplete='off'
    scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
    <Card title='Basic information' style={{ width: 750 }} headStyle={{ fontWeight: 700, fontSize: 24 }}>
      <Form.Item noStyle name={'id'}>
        <Input type='hidden' />
      </Form.Item>
      <Form.Item label='Title' name={'title'} hasFeedback rules={JobPositionValidation.title}>
        <Input placeholder='Title' style={{ width: 200 }} />
      </Form.Item>
      <Form.Item label='Job level' name={'level'} rules={JobPositionValidation.jobLevel} hasFeedback>
        <Select
          showSearch
          style={{ width: 250 }}
          placeholder='Search to Select'
          optionFilterProp='children'
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }>
          {JobLevelConst.map((item) => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Language' name={'language'} hasFeedback rules={JobPositionValidation.language}>
        <Select
          showSearch
          style={{ width: 250 }}
          placeholder='Search to Select'
          optionFilterProp='children'
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }>
          {LanguageConst.map((item) => (
            <Option value={item.value}>{item.value}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Contact email' name={'contactEmail'} hasFeedback rules={JobPositionValidation.email}>
        <Input placeholder='Contact email' style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        label='Contact person name'
        name={'contactPersonName'}
        hasFeedback
        rules={JobPositionValidation.contactPerson}>
        <Input placeholder='Contact person name' style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        label='Company industry'
        name='subCategoriesIds'
        rules={JobPositionValidation.jobCategory} //TODO: Check again
        tooltip={{
          title: 'You can select maximum 3 items',
          icon: <InfoCircleOutlined />
        }}>
        <Select style={{ width: 300 }} placeholder='Company industry' mode='multiple' onSearch={() => {}}>
          {CategoriesConst.map((category) => (
            <OptGroup label={category.label}>
              {SubCategories.filter((item) => item.category_id === category.value).map((item) => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </OptGroup>
          ))}
        </Select>
      </Form.Item>
    </Card>

    <Space size='large'>
      <Card title='Skills' style={{ width: 750 }} headStyle={{ fontWeight: 700, fontSize: 24 }}>
        <Form.List name='skillTagIds' label='Skills' rules={JobPositionValidation.skillTags}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Item
                      {...restField}
                      label='Name'
                      name={[name, 'name']}
                      hasFeedback
                      rules={CompanyProfileValidation.name}
                      style={{ width: 250 }}>
                      <Input placeholder='Name' />
                    </Form.Item>
                  </div>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '35%' }}>
                  Add new skill
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>
    </Space>
    <Space>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Edit
        </Button>
      </Form.Item>
      <Popconfirm
        title='Are you sure to delete this task?'
        onConfirm={() => handleDelete(data.id)}
        okText='Yes'
        cancelText='No'>
        <Form.Item>
          <Button type='primary'>Delete</Button>
        </Form.Item>
      </Popconfirm>
    </Space>
  </Form>
);

export default JobPositionDetailFormComponent;
