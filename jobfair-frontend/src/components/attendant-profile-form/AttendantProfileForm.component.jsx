import React from 'react'
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Rate,
  Select,
  Space,
  Spin,
} from 'antd'
import {
  // FrownOutlined,
  // MehOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  // SmileOutlined,
} from '@ant-design/icons'
import {
  CountryConst,
  GenderConst,
  JobLevelConst,
  MaritalConst,
  QualificationConst,
  ResidenceConst,
  YesNoConst,
} from './AttendantConstants'
import { AttendantProfileValidation } from '../../validate/AttendantProfileValidation'
import { convertToDateString, convertToDateValue } from '../../utils/common'
import moment from 'moment'

const AttendantProfileFormComponent = ({ form, onFinish, data }) => {
  if (data === undefined || data === null || Object.keys(data).length === 0) {
    console.log(data)
    return <Spin size="large" />
  }

  const onFormChange = values => {
    console.log('changing: ', values)
  }

  const { Option } = Select

  const defaultData = {
    ...data,
    dob: moment(convertToDateString(data.dob)),
    workHistories: data.workHistories.map(item => {
      return {
        ...item,
        fromDate: moment(convertToDateString(item.fromDate)),
        toDate: moment(convertToDateString(item.toDate)),
      }
    }),
    activities: data.activities.map(item => {
      return {
        ...item,
        fromDate: moment(convertToDateString(item.fromDate)),
        toDate: moment(convertToDateString(item.toDate)),
      }
    }),
    educations: data.educations.map(item => {
      return {
        ...item,
        fromDate: moment(convertToDateString(item.fromDate)),
        toDate: moment(convertToDateString(item.toDate)),
      }
    }),
  }

  form.setFieldsValue({ ...defaultData })

  // const ProficiencyIcons = {
  //   1: <FrownOutlined />,
  //   2: <MehOutlined />,
  //   3: <SmileOutlined />,
  // }

  const handleOnChangeDob = dateString => {
    return convertToDateValue(dateString)
  }

  const DateFormat = 'YYYY/MM/DD'

  return (
    <div>
      <Divider orientation="left">Attendant profile</Divider>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={e => onFormChange(e)}
        requiredMark="required"
        autoComplete="off"
      >
        <Space direction="vertical" size="large">
          <Card
            title="Contact information"
            style={{ width: 1400 }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item
                label="Email"
                name={['account', 'email']}
                rules={AttendantProfileValidation.account.email}
              >
                <Input placeholder="Email" style={{ width: 322 }} />
              </Form.Item>
              <Form.Item
                label="Phone number"
                name={['account', 'phone']}
                rules={AttendantProfileValidation.account.phone}
              >
                <Input placeholder="Phone" style={{ width: 200 }} />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item
                label="Date of birth"
                name="dob"
                rules={AttendantProfileValidation.account.dob}
              >
                <DatePicker
                  format={DateFormat}
                  onChange={(date, dateString) => handleOnChangeDob(dateString)}
                />
              </Form.Item>
              <Form.Item label="Country" name="countryId">
                <Select
                  showSearch
                  style={{ width: 250 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {CountryConst.map(item => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                name={['account', 'profileImageUrl']}
                src={data.account.profileImageUrl}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item label="Gender" name={['account', 'gender']}>
                <Radio.Group>
                  {GenderConst.map(item => (
                    <Radio.Button value={item.value}>{item.label}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Marital status" name="maritalStatus">
                <Radio.Group>
                  {MaritalConst.map(item => (
                    <Radio.Button value={item.value}>{item.label}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item
                label="Address"
                name="address"
                rules={AttendantProfileValidation.address}
              >
                <Input placeholder="Address" style={{ width: 300 }} />
              </Form.Item>
              <Form.Item label="Residence" name="residenceId">
                <Select
                  showSearch
                  style={{ width: 150 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {ResidenceConst.map(item => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Year of experience"
                name="yearOfExp"
                hasFeedback
                rules={AttendantProfileValidation.yearOfExp}
              >
                <Input
                  placeholder="Year of exp"
                  style={{ width: '50%', textAlign: 'right' }}
                  type="number"
                  min="0"
                />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item
                label="First Name"
                name={['account', 'firstname']}
                rules={AttendantProfileValidation.account.firstname}
              >
                <Input placeholder="First name" style={{ width: 150 }} />
              </Form.Item>
              <Form.Item
                label="Middle Name"
                name={['account', 'middlename']}
                rules={AttendantProfileValidation.account.middlename}
              >
                <Input placeholder="Middle name" style={{ width: 150 }} />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name={['account', 'lastname']}
                rules={AttendantProfileValidation.account.lastname}
              >
                <Input placeholder="Last name" style={{ width: 150 }} />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item
                label="Title"
                name="title"
                rules={AttendantProfileValidation.title}
              >
                <Input placeholder="Title" style={{ width: 150 }} />
              </Form.Item>
              <Form.Item
                label="Job title"
                name="jobTitle"
                rules={AttendantProfileValidation.jobTitle}
              >
                <Input placeholder="Job title" style={{ width: 150 }} />
              </Form.Item>
              <Form.Item label="Job level" name="jobLevel">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {JobLevelConst.map(item => (
                    <Option value={item.name}>{item.description}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Card>
          <Card
            title="Skills"
            style={{ width: 1400 }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}
          >
            <Form.List name="skills" label="Skills">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ name, ...restField }) => {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <Form.Item
                              {...restField}
                              label="Name"
                              name={[name, 'name']}
                              rules={AttendantProfileValidation.skills.name}
                              style={{ width: 250 }}
                            >
                              <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'proficiency']}
                              label="Proficiency"
                              style={{ width: 250 }}
                            >
                              <Rate />
                            </Form.Item>
                          </div>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      )
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{ width: '15%' }}
                      >
                        Add new skill
                      </Button>
                    </Form.Item>
                  </>
                )
              }}
            </Form.List>
          </Card>
          <Card
            title="Work history"
            style={{ width: 1400 }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}
          >
            <Form.List name="workHistories">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ name, ...restField }) => {
                      return (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <Form.Item
                              {...restField}
                              label="Company"
                              name={[name, 'company']}
                              rules={
                                AttendantProfileValidation.workHistories.company
                              }
                              style={{ width: 250 }}
                            >
                              <Input placeholder="company" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              label="Description"
                              rules={
                                AttendantProfileValidation.workHistories
                                  .description
                              }
                              style={{ width: 450 }}
                            >
                              <Input placeholder="description" />
                            </Form.Item>
                          </div>
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <Form.Item
                              {...restField}
                              label="From date"
                              name={[name, 'fromDate']}
                              rules={
                                AttendantProfileValidation.workHistories
                                  .fromDate
                              }
                              style={{ width: '20%' }}
                            >
                              <DatePicker format={DateFormat} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'toDate']}
                              label="To date"
                              rules={
                                AttendantProfileValidation.workHistories.toDate
                              }
                              style={{ width: '20%' }}
                            >
                              <DatePicker format={DateFormat} />
                            </Form.Item>
                          </div>
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'isCurrentJob']}
                              label="Current job"
                              style={{ width: '20%' }}
                            >
                              <Radio.Group>
                                {YesNoConst.map(item => (
                                  <Radio.Button value={item.value}>
                                    {item.label}
                                  </Radio.Button>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'position']}
                              label="Position"
                              rules={
                                AttendantProfileValidation.workHistories
                                  .position
                              }
                              style={{ width: '20%' }}
                            >
                              <Input placeholder="Position" />
                            </Form.Item>
                          </div>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      )
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{ width: '15%' }}
                      >
                        Add new work history
                      </Button>
                    </Form.Item>
                  </>
                )
              }}
            </Form.List>
          </Card>
          <Card
            title="Education"
            style={{ width: 1400 }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}
          >
            <Form.List name="educations">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ name, ...restField }) => {
                      return (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'subject']}
                              label="Subject"
                              rules={
                                AttendantProfileValidation.educations.subject
                              }
                              style={{ width: 250 }}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'school']}
                              label="School"
                              rules={
                                AttendantProfileValidation.educations.school
                              }
                              style={{ width: 300 }}
                            >
                              <Input placeholder="School" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'achievement']}
                              label="Achievement"
                              rules={
                                AttendantProfileValidation.educations
                                  .achievement
                              }
                              style={{ width: 300 }}
                            >
                              <Input placeholder="School" />
                            </Form.Item>
                          </div>
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'fromDate']}
                              label="From date"
                              rules={
                                AttendantProfileValidation.educations.fromDate
                              }
                              style={{ width: '20%' }}
                            >
                              <DatePicker format={DateFormat} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'toDate']}
                              label="To date"
                              rules={
                                AttendantProfileValidation.educations.toDate
                              }
                              style={{ width: '20%' }}
                            >
                              <DatePicker format={DateFormat} />
                            </Form.Item>
                          </div>
                          <Form.Item
                            {...restField}
                            name={[name, 'qualification']}
                            label="Qualification"
                            style={{ width: '20%' }}
                          >
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Search to Select"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              filterSort={(optionA, optionB) =>
                                optionA.children
                                  .toLowerCase()
                                  .localeCompare(optionB.children.toLowerCase())
                              }
                            >
                              {QualificationConst.map(item => (
                                <Option value={item.enumName}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      )
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{ width: '15%' }}
                      >
                        Add new work education
                      </Button>
                    </Form.Item>
                  </>
                )
              }}
            </Form.List>
          </Card>
          <Card
            title="Certification"
            style={{ width: 1400 }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}
          >
            <Form.List name="certifications">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ name, ...restField }) => {
                      return (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <Form.Item
                            {...restField}
                            label="Name"
                            name={[name, 'name']}
                            rules={
                              AttendantProfileValidation.certifications.name
                            }
                            style={{ width: 300 }}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'institution']}
                            label="Institution"
                            rules={
                              AttendantProfileValidation.certifications
                                .institution
                            }
                            style={{ width: 300 }}
                          >
                            <Input placeholder="Institution" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'year']}
                            label="Year"
                            rules={
                              AttendantProfileValidation.certifications.year
                            }
                            style={{ width: '20%' }}
                          >
                            <Input
                              placeholder="Year"
                              style={{ width: '50%', textAlign: 'right' }}
                              type="number"
                              min="0"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'certificationLink']}
                            label="Certification link"
                            rules={
                              AttendantProfileValidation.certifications
                                .certificationLink
                            }
                            style={{ width: 350 }}
                          >
                            <Input placeholder="Certification link" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      )
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{ width: '15%' }}
                      >
                        Add new work certification
                      </Button>
                    </Form.Item>
                  </>
                )
              }}
            </Form.List>
          </Card>
          <Card
            title="References"
            style={{ width: 1400 }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}
          >
            <Form.List name="references">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ name, ...restField }) => {
                      return (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'company']}
                            label="Company"
                            rules={
                              AttendantProfileValidation.references.company
                            }
                            style={{ width: 300 }}
                          >
                            <Input placeholder="name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'email']}
                            label="Email"
                            rules={AttendantProfileValidation.references.email}
                            style={{ width: 350 }}
                          >
                            <Input placeholder="Email" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'fullname']}
                            label="Full name"
                            rules={
                              AttendantProfileValidation.references.fullname
                            }
                            style={{ width: 400 }}
                          >
                            <Input placeholder="Full name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'phone']}
                            label="Phone"
                            rules={AttendantProfileValidation.references.phone}
                            style={{ width: 300 }}
                          >
                            <Input placeholder="Phone" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'position']}
                            label="Position"
                            rules={
                              AttendantProfileValidation.references.position
                            }
                            style={{ width: 250 }}
                          >
                            <Input placeholder="Position" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      )
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{ width: '15%' }}
                      >
                        Add new work reference
                      </Button>
                    </Form.Item>
                  </>
                )
              }}
            </Form.List>
          </Card>
          <Card
            title="Activities"
            style={{ width: 1400 }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}
          >
            <Form.List name="activities">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ name, ...restField }) => {
                      return (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            label="Name"
                            rules={AttendantProfileValidation.activities.name}
                            style={{ width: 300 }}
                          >
                            <Input placeholder="Name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'functionTitle']}
                            label="Function title"
                            rules={
                              AttendantProfileValidation.activities
                                .functionTitle
                            }
                            style={{ width: 300 }}
                          >
                            <Input placeholder="Function title" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'organization']}
                            label="Organization"
                            rules={
                              AttendantProfileValidation.activities.organization
                            }
                            style={{ width: 350 }}
                          >
                            <Input placeholder="Organization" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'fromDate']}
                            label="From date"
                            rules={
                              AttendantProfileValidation.activities.fromDate
                            }
                            style={{ width: 300 }}
                          >
                            <DatePicker format={DateFormat} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'toDate']}
                            label="To date"
                            rules={AttendantProfileValidation.activities.toDate}
                            style={{ width: 300 }}
                          >
                            <DatePicker format={DateFormat} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'isCurrentActivity']}
                            label="Current activity"
                            style={{ width: 250 }}
                          >
                            <Radio.Group>
                              {YesNoConst.map(item => (
                                <Radio.Button value={item.value}>
                                  {item.label}
                                </Radio.Button>
                              ))}
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'description']}
                            label="Description"
                            rules={
                              AttendantProfileValidation.activities.description
                            }
                            style={{ width: 350 }}
                          >
                            <Input placeholder="Description" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      )
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{ width: '15%' }}
                      >
                        Add new activity
                      </Button>
                    </Form.Item>
                  </>
                )
              }}
            </Form.List>
          </Card>
        </Space>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AttendantProfileFormComponent
