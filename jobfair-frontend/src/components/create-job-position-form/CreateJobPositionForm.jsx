import React, { useState } from 'react'
import { Button, Card, Divider, Form, Input, Radio, Select, Space, Switch, Typography } from 'antd'
import { JOB_POSITION_MODEL } from '../../default_models/CreateJobPositionModel/JobPositionModel'
import {
  IsRequiredLetterConst,
  JobLevelConst,
  JobTypeConst,
  LanguageConst,
  NUM_OF_SKILL_TAGS,
  SalaryRangeConst,
  SkillTagsConst
} from '../../constants/JobPositionConst'
import TextArea from 'antd/es/input/TextArea'
import { JobPositionValidation } from '../../validate/CreateJobPositionValidation'
import { CategoriesConst, NUM_OF_SIZE_MAXIMUM, SubCategories } from '../../constants/CompanyProfileConstant'
const { Option, OptGroup } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 25 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

const CreateJobPositionForm = props => {
  const [totalSelect, setTotalSelect] = useState(0)
  const [totalSkillTags, setTotalSkillTags] = useState(0)
  const [isShowSalary, setIsShowSalary] = useState(JOB_POSITION_MODEL.isShowSalary)
  const [isRequiredLetter, setIsRequiredLetter] = useState(JOB_POSITION_MODEL.isRequiredLetter)
  const [isShowContactPerson, setIsShowContactPerson] = useState(JOB_POSITION_MODEL.isShowContactPerson)

  const { form, onFinish } = props

  const { Text } = Typography

  return (
    <div style={{ width: '80%' }}>
      <Form onFinish={onFinish} form={form} {...formItemLayout}>
        <Card title={`Create job position application`} headStyle={{ fontWeight: 700, fontSize: 24 }}>
          <Form.Item
            label="Job title"
            name="title"
            required
            tooltip="This is required"
            rules={JobPositionValidation.title}
          >
            <Input placeholder="Job title" />
          </Form.Item>
          <Form.Item
            label="Job level"
            required
            tooltip="This is required"
            name="level"
            rules={JobPositionValidation.jobLevel}
          >
            <Select
              showSearch
              onChange={value => {}}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onSearch={value => {}}
            >
              {JobLevelConst.map(item => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Job type"
            required
            tooltip="This is required"
            rules={JobPositionValidation.jobType}
            name="jobType"
          >
            <Select
              showSearch
              onChange={value => {}}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onSearch={value => {}}
            >
              {JobTypeConst.map(item => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Job category"
            required
            tooltip="This is required"
            rules={JobPositionValidation.jobCategory}
            name="subCategoryIds"
          >
            <Select
              mode="multiple"
              onChange={value => {
                //value is a array
                if (value.length > NUM_OF_SIZE_MAXIMUM) {
                  value.pop()
                }
                setTotalSelect(value.length)
              }}
              showSearch
              dropdownRender={menu => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Text type={totalSelect > 3 ? 'danger' : 'success'}>
                    {totalSelect > 3
                      ? null
                      : `You can select ${NUM_OF_SIZE_MAXIMUM} items only. (${NUM_OF_SIZE_MAXIMUM - totalSelect} left)`}
                  </Text>
                </>
              )}
            >
              {CategoriesConst.map(category => (
                <OptGroup label={category.label}>
                  {SubCategories.filter(item => item.category_id === category.value).map(item => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            required
            tooltip="This is required"
            rules={JobPositionValidation.description}
            name="description"
          >
            <TextArea placeholder="Description" showCount maxLength={3000} autoSize={{ minRows: 5 }} />
          </Form.Item>
          <Form.Item
            label="Requirements"
            required
            tooltip="This is required"
            rules={JobPositionValidation.requirements}
            name="requirements"
          >
            <TextArea placeholder="Requirements" showCount maxLength={3000} autoSize={{ minRows: 5 }} />
          </Form.Item>
          <Form.Item
            label="Skill tags"
            required
            tooltip="This is required"
            rules={JobPositionValidation.skillTags}
            name="skillTagIds"
          >
            <Select
              mode="multiple"
              onChange={value => {
                //value is a array
                if (value.length > NUM_OF_SKILL_TAGS) {
                  value.pop()
                }
                setTotalSkillTags(value.length)
              }}
              onSearch={value => {}}
              dropdownRender={menu => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Text type={totalSkillTags > 3 ? 'danger' : 'success'}>
                    {totalSkillTags > 5
                      ? null
                      : `You can select ${NUM_OF_SKILL_TAGS} items only. (${NUM_OF_SKILL_TAGS - totalSkillTags} left)`}
                  </Text>
                </>
              )}
            >
              {SkillTagsConst.map(item => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Contact person"
            required
            tooltip="This is required"
            rules={JobPositionValidation.contactPerson}
            name="contactPersonName"
          >
            <Input placeholder="Contact person name" />
          </Form.Item>
          <Form.Item label="Language" name={'preferredLanguage'} required rules={JobPositionValidation.language}>
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              {LanguageConst.map(item => (
                <Option value={item.value}>{item.value}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Location for applications"
            required
            tooltip="This is required"
            rules={JobPositionValidation.contactPerson}
            name="locationId"
          >
            <Input placeholder="Location" />
          </Form.Item>
          <Form.Item
            label="Email for applications"
            required
            tooltip="This is required"
            rules={JobPositionValidation.email}
            name="contactEmail"
          >
            <Input placeholder="Email for receiving applications" />
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
            <Space style={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="primary" htmlType="submit" style={{ margin: '0 3rem', width: '7rem' }}>
                Create
              </Button>
            </Space>
          </Form.Item>
        </Card>
      </Form>
    </div>
  )
}

export default CreateJobPositionForm
