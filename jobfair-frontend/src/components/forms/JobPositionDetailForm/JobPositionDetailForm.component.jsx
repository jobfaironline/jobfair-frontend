/* eslint-disable no-unused-vars,no-empty-function */
import { Button, Card, Divider, Form, Input, Popconfirm, Select } from 'antd';
import { CategoriesConst, NUM_OF_SIZE_MAXIMUM, SubCategories } from '../../../constants/CompanyProfileConstant';
import { InfoCircleOutlined } from '@ant-design/icons';
import { JobLevelConst, LanguageConst, NUM_OF_SKILL_TAGS, SkillTagsConst } from '../../../constants/JobPositionConst';
import { JobPositionValidation } from '../../../validate/CreateJobPositionValidation';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Text from 'antd/es/typography/Text';
import TextArea from 'antd/es/input/TextArea';

const { Option, OptGroup } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const JobPositionDetailFormComponent = ({ data, form, onFinish, handleDelete }) => {
  const [totalSelect, setTotalSelect] = useState(0);
  const [totalSkillTags, setTotalSkillTags] = useState(0);
  const history = useHistory();

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        requiredMark='required'
        autoComplete='off'
        {...formItemLayout}
        scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
        <Card
          title={`Job position's basic information`}
          style={{ width: 750 }}
          headStyle={{ fontWeight: 700, fontSize: 24 }}>
          <Form.Item noStyle name={'id'}>
            <Input type='hidden' />
          </Form.Item>
          <Form.Item label='Title' name={'title'} hasFeedback rules={JobPositionValidation.title}>
            <Input placeholder='Title' />
          </Form.Item>
          <Form.Item label='Job level' name={'level'} rules={JobPositionValidation.jobLevel}>
            <Select
              showSearch
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
          <Form.Item label='Language' name={'language'} rules={JobPositionValidation.language}>
            <Select
              showSearch
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
            <Input placeholder='Contact email' />
          </Form.Item>
          <Form.Item
            label='Contact person name'
            name={'contactPersonName'}
            hasFeedback
            rules={JobPositionValidation.contactPerson}>
            <Input placeholder='Contact person name' />
          </Form.Item>
          <Form.Item
            label='Company industry'
            name='subCategoriesIds'
            tooltip={{
              title: 'You can select maximum 3 items',
              icon: <InfoCircleOutlined />
            }}
            rules={JobPositionValidation.jobCategory}>
            <Select
              placeholder='Company industry'
              mode='multiple'
              onChange={(value) => {
                //value is a array
                if (value.length > NUM_OF_SIZE_MAXIMUM) value.pop();

                setTotalSelect(value.length);
              }}
              onSearch={(value) => {}}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Text type={totalSelect > 3 ? 'danger' : 'success'}>
                    {totalSelect > 3
                      ? null
                      : `You can select ${NUM_OF_SIZE_MAXIMUM} items only. (${NUM_OF_SIZE_MAXIMUM - totalSelect} left)`}
                  </Text>
                </>
              )}>
              {CategoriesConst.map((category) => (
                <OptGroup label={category.label}>
                  {SubCategories.filter((item) => item.category_id === category.value).map((item) => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Skill tags'
            required
            tooltip='This is required'
            rules={JobPositionValidation.skillTags}
            name='skillTagIds'>
            <Select
              mode='multiple'
              onChange={(value) => {
                //value is a array
                if (value.length > NUM_OF_SKILL_TAGS) value.pop();

                setTotalSkillTags(value.length);
              }}
              onSearch={() => {}}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Text type={totalSkillTags > 3 ? 'danger' : 'success'}>
                    {totalSkillTags > 5
                      ? null
                      : `You can select ${NUM_OF_SKILL_TAGS} items only. (${NUM_OF_SKILL_TAGS - totalSkillTags} left)`}
                  </Text>
                </>
              )}>
              {SkillTagsConst.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Description'
            required
            tooltip='This is required'
            rules={JobPositionValidation.description}
            name='description'>
            <TextArea placeholder='Description' showCount maxLength={3000} autoSize={{ minRows: 5 }} />
          </Form.Item>
          <Form.Item
            label='Requirements'
            required
            tooltip='This is required'
            rules={JobPositionValidation.requirements}
            name='requirements'>
            <TextArea placeholder='Requirements' showCount maxLength={3000} autoSize={{ minRows: 5 }} />
          </Form.Item>
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'end',
              height: 'fit-content'
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                height: 'fit-content'
              }}>
              <Button type='primary' htmlType='submit' style={{ margin: '0 0.5rem' }}>
                Edit
              </Button>
              <Popconfirm
                title='Are you sure to delete this task?'
                onConfirm={() => handleDelete(data.id)}
                okText='Yes'
                cancelText='No'>
                <Button style={{ margin: '0 0.5rem' }}>Delete</Button>
              </Popconfirm>
            </div>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default JobPositionDetailFormComponent;
