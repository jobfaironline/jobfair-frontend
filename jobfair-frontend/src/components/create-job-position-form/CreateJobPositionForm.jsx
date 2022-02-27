import React, { useState } from 'react'
import { Button, Divider, Form, Input, Radio, Select, Switch, Tooltip, Typography } from 'antd'
import { CompanyProfileValidation } from '../../validate/CompanyProfileValidation'
import { CopyOutlined, GiftOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import {
  benefitConst,
  CategoriesConst,
  NUM_OF_SIZE_MAXIMUM,
  SizeConst,
  SubCategories
} from '../../pages/ProfilePage/Company/CompanyProfileConstant'
import ImageUpload from '../image-upload/ImageUpload'
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
import { tailLayout } from '../register-job-fair-form/RegisterJobFairForm'
import { JobPositionValidation } from '../../validate/CreateJobPositionValidation'

const CreateJobPositionForm = props => {
  const [totalSelect, setTotalSelect] = useState(0)
  const [totalSkillTags, setTotalSkillTags] = useState(0)
  const [isShowSalary, setIsShowSalary] = useState(
    JOB_POSITION_MODEL.isShowSalary
  )
  const [isRequiredLetter, setIsRequiredLetter] = useState(
    JOB_POSITION_MODEL.isRequiredLetter
  )
  const [isShowContactPerson, setIsShowContactPerson] = useState(
    JOB_POSITION_MODEL.isShowContactPerson
  )
  const [form] = Form.useForm()

  const { Option, OptGroup } = Select

  const handleOnChangeForm = values => {
    console.log('changing: ', values)
  }

  const onFinish = values => {
    console.log('submitted: ', values)
  }
  const { Text } = Typography

  return (
    <>
      <Form.Item label="Job title" name="title" required tooltip="This is required" rules={JobPositionValidation.title}>
        <Input placeholder="Job title" style={{ width: '20%' }} />
      </Form.Item>
      <Form.Item label="Job level" required tooltip="This is required" name="level">
        <Select
          style={{ width: 150 }}
          showSearch
          onChange={value => {
            console.log(`selected: ${value}`)
          }}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onSearch={value => console.log(value)}
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
        // rules={CompanyProfileValidation.email}
        name="jobType"
      >
        <Select
          style={{ width: 150 }}
          showSearch
          onChange={value => {
            console.log(`selected: ${value}`)
          }}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onSearch={value => console.log(value)}
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
        // rules={CompanyProfileValidation.phone}
        name="subCategoryIds"
      >
        <Select
          style={{ width: 300 }}
          mode="multiple"
          // defaultValue={}
          onChange={value => {
            //value is a array
            console.log(value)
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
        style={{ width: 300 }}
      >
        <TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item
        label="Requirements"
        required
        tooltip="This is required"
        rules={JobPositionValidation.requirements}
        name="requirements"
        style={{ width: 300 }}
      >
        <TextArea placeholder="Requirements" />
      </Form.Item>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Form.Item
          label="Min salary"
          required
          tooltip="This is required"
          name="minSalary"
          style={{ width: 300 }}
        >
          <Select
            style={{ width: 150 }}
            showSearch
            onChange={value => {
              console.log(`selected: ${value}`)
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onSearch={value => console.log(value)}
          >
            {SalaryRangeConst.map(item => (
              <Option value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Max salary"
          required
          tooltip="This is required"
          name="maxSalary"
          showSearch
          style={{ width: 300 }}
        >
          <Select
            style={{ width: 150 }}
            showSearch
            onChange={value => {
              console.log(`selected: ${value}`)
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onSearch={value => console.log(value)}
          >
            {SalaryRangeConst.map(item => (
              <Option value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Show the salary"
          required
          tooltip="This is required"
          // rules={CompanyProfileValidation.phone}
          name="isShowSalary"
          style={{ width: 300 }}
        >
          <Switch
            checked={isShowSalary}
            onChange={() => setIsShowSalary(!isShowSalary)}
          />
        </Form.Item>
      </div>
      <Form.Item
        label="Skill tags"
        required
        tooltip="This is required"
        // rules={CompanyProfileValidation.phone}
        name="skillTagIds"
        style={{ width: 300 }}
      >
        <Select
          style={{ width: 300 }}
          mode="multiple"
          onChange={value => {
            //value is a array
            console.log(value)
            if (value.length > NUM_OF_SKILL_TAGS) {
              value.pop()
            }
            setTotalSkillTags(value.length)
          }}
          onSearch={value => {
            console.log(value)
          }}
          dropdownRender={menu => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Text type={totalSkillTags > 3 ? 'danger' : 'success'}>
                {totalSkillTags > 5
                  ? null
                  : `You can select ${NUM_OF_SKILL_TAGS} items only. (${
                      NUM_OF_SKILL_TAGS - totalSkillTags
                    } left)`}
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
        label="Required the cover letter ?"
        required
        tooltip="This is required"
        name="isRequiredLetter"
        style={{ width: 300 }}
      >
        <Radio.Group onChange={() => setIsRequiredLetter(!isRequiredLetter)}>
          {IsRequiredLetterConst.map(item => (
            <Radio value={item.value}>{item.label}</Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Required the cover letter ?"
        required
        tooltip="This is required"
        // rules={CompanyProfileValidation.phone}
        name="preferredLanguage"
        style={{ width: 300 }}
      >
        <Select
          style={{ width: 150 }}
          showSearch
          onChange={value => {
            console.log(`selected: ${value}`)
          }}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onSearch={value => console.log(value)}
        >
          {LanguageConst.map(item => (
            <Option value={item.value}>{item.value}</Option>
          ))}
        </Select>
      </Form.Item>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Form.Item
          label="Contact person"
          required
          tooltip="This is required"
          rules={JobPositionValidation.contactPerson}
          name="contactPerson"
          style={{ width: 300 }}
        >
          <Input placeholder="Contact person name" />
        </Form.Item>
        <Form.Item
          label="Show in job ads"
          required
          tooltip="This is required"
          name="isShowContactPerson"
          style={{ width: 300 }}
        >
          <Switch
            checked={isShowContactPerson}
            onChange={() => setIsShowContactPerson(!isShowContactPerson)}
          />
        </Form.Item>
      </div>
      <Form.Item
        label="Email for applications"
        required
        tooltip="This is required"
        rules={JobPositionValidation.email}
        name="email"
        style={{ width: 300 }}
      >
        <Input placeholder="Email for receiving applications" />
      </Form.Item>
    </>
  )
}

export default CreateJobPositionForm
