import React, {useState} from 'react'
import {AutoComplete, Button, Card, Divider, Form, Input, Select, Space} from 'antd'
import {
  JobLevelConst,
  JobTypeConst,
  LanguageConst,
  NUM_OF_SKILL_TAGS,
  SkillTagsConst
} from '../../constants/JobPositionConst'
import {CategoriesConst, NUM_OF_SIZE_MAXIMUM, SubCategories} from '../../constants/CompanyProfileConstant'
import Text from 'antd/es/typography/Text'
import TextArea from 'antd/es/input/TextArea'
import {JobPositionValidation} from '../../validate/CreateJobPositionValidation'

const {Option, OptGroup} = Select

const formItemLayout = {
  labelCol: {
    xs: {span: 25},
    sm: {span: 7}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14}
  }
}

const JobPositionDetailComponent = (props) => {
  const [totalSelect, setTotalSelect] = useState(0)
  const [totalSkillTags, setTotalSkillTags] = useState(0)

  const {
    data,
    form,
    onFinish,
    handleDelete,
    handleAutoCompleteContactPerson,
    handleAutoCompleteEmail,
    resultNameSuggested,
    resultEmailSuggested
  } = props
  return (
    <div style={{width: '80%'}}>
      <Card
        title={`Job position detail`}
        style={{width: '70%', margin: '3rem auto'}}
        headStyle={{fontWeight: 700, fontSize: 24}}
      >
        <Form
          form={form}
          onFinish={onFinish}
          {...formItemLayout}
          layout="vertical"
          labelCol={21}
          wrapperCol={21}
          requiredMark="required"
          autoComplete="off"
          scrollToFirstError={{block: 'center', behavior: 'smooth'}}
        >
          <Form.Item noStyle name={'id'}>
            <Input type="hidden"/>
          </Form.Item>
          <Form.Item
            label="Job title"
            name="title"
            required
            tooltip="This is required"
            rules={JobPositionValidation.title}
            style={{width: '95%', marginLeft: '1rem', marginRight: '1rem'}}
          >
            <Input placeholder="Job title"/>
          </Form.Item>
          <Form.Item
            label="Job level"
            required
            tooltip="This is required"
            name="level"
            rules={JobPositionValidation.jobLevel}
            style={{display: 'inline-block', width: '25%', marginRight: '1rem', marginLeft: '1rem'}}
          >
            <Select
              showSearch
              onChange={value => {
              }}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onSearch={value => {
              }}
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
            style={{display: 'inline-block', width: '30%', marginLeft: '1rem', marginRight: '1rem'}}
          >
            <Select
              showSearch
              onChange={value => {
              }}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onSearch={value => {
              }}
            >
              {JobTypeConst.map(item => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Prefer language"
            name={'preferredLanguage'}
            required
            rules={JobPositionValidation.language}
            style={{display: 'inline-block', width: '30%', marginLeft: '1.25rem'}}
          >
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
            label="Skill tags"
            required
            tooltip="This is required"
            rules={JobPositionValidation.skillTags}
            name="skillTagIds"
            style={{display: 'inline-block', width: '45%', marginLeft: '1rem', marginRight: '1.25rem'}}
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
              onSearch={value => {
              }}
              dropdownRender={menu => (
                <>
                  {menu}
                  <Divider style={{margin: '8px 0'}}/>
                  <Text type={totalSkillTags > 3 ? 'danger' : 'success'}>
                    {totalSkillTags > 5
                      ? null
                      : `You can select ${NUM_OF_SKILL_TAGS} items only. (${NUM_OF_SKILL_TAGS - totalSkillTags} left)`}
                  </Text>
                </>
              )}
            >
              {SkillTagsConst.map(item => (
                <Option value={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Category tag"
            required
            tooltip="This is required"
            rules={JobPositionValidation.jobCategory}
            name="subCategoryIds"
            style={{display: 'inline-block', width: '45%', marginLeft: '1.25rem', marginRight: '1rem'}}
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
                  <Divider style={{margin: '8px 0'}}/>
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
                    <Option value={item.label}>{item.label}</Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Contact person"
            required
            tooltip="This is required"
            rules={JobPositionValidation.contactPerson}
            name="contactPersonName"
            style={{display: 'inline-block', width: '45%', marginLeft: '1rem', marginRight: '1.25rem'}}
          >
            <AutoComplete onSearch={handleAutoCompleteContactPerson}>
              {resultNameSuggested.map(name => (
                <AutoComplete.Option key={name} value={name}>
                  {name}
                </AutoComplete.Option>
              ))}
              <Input placeholder="Contact person name"/>
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="Email for applications"
            required
            tooltip="This is required"
            rules={JobPositionValidation.email}
            name="contactEmail"
            style={{display: 'inline-block', width: '45%', marginLeft: '1.25rem', marginRight: '1rem'}}
          >
            <AutoComplete onSearch={handleAutoCompleteEmail}>
              {resultEmailSuggested.map(email => (
                <AutoComplete.Option key={email} value={email}>
                  {email}
                </AutoComplete.Option>
              ))}
              <Input placeholder="Email for receiving applications"/>
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="Location for applications"
            required
            tooltip="This is required"
            rules={JobPositionValidation.contactPerson}
            name="locationId"
            style={{display: 'inline-block', width: '96%', marginLeft: '1rem', marginRight: '1rem'}}
          >
            <Input placeholder="Location"/>
          </Form.Item>
          <Form.Item
            label="Description"
            required
            tooltip="This is required"
            rules={JobPositionValidation.description}
            name="description"
            style={{marginLeft: '1rem', width: '96%'}}
          >
            <TextArea placeholder="Description" showCount maxLength={3000} autoSize={{minRows: 5}}/>
          </Form.Item>
          <Form.Item
            label="Requirements"
            required
            tooltip="This is required"
            rules={JobPositionValidation.requirements}
            name="requirements"
            style={{marginLeft: '1rem', width: '96%'}}
          >
            <TextArea placeholder="Requirements" showCount maxLength={3000} autoSize={{minRows: 5}}/>
          </Form.Item>
          <Form.Item style={{display: 'flex', justifyContent: 'end'}}>
            <Space style={{display: 'flex', justifyContent: 'center'}}>
              <Button type="primary" htmlType="submit" style={{margin: '0 3rem', width: '7rem'}}>
                Edit
              </Button>
              <Button type="primary" onClick={handleDelete} style={{margin: '0 3rem', width: '7rem'}}>
                Delete
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default JobPositionDetailComponent
