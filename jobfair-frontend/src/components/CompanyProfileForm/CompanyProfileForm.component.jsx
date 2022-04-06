import React, { useState } from 'react'
import { Button, Divider, Form, Input, message, Select, Tooltip, Typography } from 'antd'
import { CopyOutlined, GiftOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import {
  benefitConst,
  CategoriesConst,
  NUM_OF_SIZE_MAXIMUM,
  SizeConst,
  SubCategories
} from '../../constants/CompanyProfileConstant'
import ImageUploadComponent from '../ImageUpload/ImageUpload.component'
import { CompanyProfileValidation } from '../../validate/CompanyProfileValidation'
import TextArea from 'antd/es/input/TextArea'

const CompanyProfileForm = ({ urlValue, noStyle, data, editable }) => {
  //state
  const [totalSelect, setTotalSelect] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [benefitId, setBenefitId] = useState(0)
  const [url, setUrl] = useState(urlValue)

  //
  const { Option, OptGroup } = Select

  const { Text } = Typography

  return (
    <>
      <Form.Item
        shouldUpdate
        label="Company Name"
        name="name"
        required
        tooltip="This is required"
        rules={editable ? CompanyProfileValidation.name : []}
      >
        {noStyle ? <Text>{data.name}</Text> : <Input placeholder="Company name" style={{ width: 300 }} />}
      </Form.Item>
      <Form.Item
        shouldUpdate
        label="Company Email"
        required
        tooltip="This is required"
        rules={editable ? CompanyProfileValidation.email : []}
        name="email"
      >
        {noStyle ? <Text>{data.email}</Text> : <Input placeholder="Company email" style={{ width: 250 }} />}
      </Form.Item>
      <Form.Item
        shouldUpdate
        label="Phone number"
        name="phone"
        hasFeedback
        rules={editable ? CompanyProfileValidation.phone : []}
      >
        {noStyle ? <Text>{data.phone}</Text> : <Input placeholder="Company phone" style={{ width: 250 }} />}
      </Form.Item>
      <Form.Item
        shouldUpdate
        label="Company Address"
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />
        }}
        name="address"
        rules={editable ? CompanyProfileValidation.address : []}
      >
        {noStyle ? <Text>{data.address}</Text> : <Input placeholder="Company address" style={{ width: 350 }} />}
      </Form.Item>
      <Form.Item
        shouldUpdate
        label="Company tax ID"
        required
        tooltip="This is required"
        rules={editable ? CompanyProfileValidation.taxId : []}
        name="taxId"
      >
        {noStyle ? <Text>{data.taxId}</Text> : <Input placeholder="Company Tax ID" style={{ width: 300 }} />}
      </Form.Item>
      <Form.Item
        shouldUpdate
        label="Company description"
        required
        tooltip="This is required"
        rules={editable ? CompanyProfileValidation.description : []}
        name="companyDescription"
      >
        {noStyle ? (
          <Text>{data.companyDescription}</Text>
        ) : (
          <TextArea showCount maxLength={3000} placeholder="Company description" style={{ width: 300 }} />
        )}
      </Form.Item>
      <div className="site-input-group-wrapper">
        <Form.Item
          label="Company URL"
          tooltip={{
            title: 'This is optional',
            icon: <InfoCircleOutlined />
          }}
        >
          <Input.Group compact>
            <Form.Item
              shouldUpdate
              noStyle
              name="url"
              rules={editable ? CompanyProfileValidation.url : []}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              {noStyle ? (
                <Text>{data.url}</Text>
              ) : (
                <Input
                  style={{ width: 'calc( 60% - 200px)' }}
                  defaultValue={url}
                  onChange={e => setUrl(e.target.value)}
                />
              )}
            </Form.Item>
            <Tooltip title="copy url">
              <Button
                hidden={noStyle}
                onClick={() => {
                  navigator.clipboard
                    .writeText(url)
                    .then(message.success('Copied to clipboard'))
                    .catch(err => {
                      message.error(`An error occurred, ${err}`)
                    })
                }}
                icon={<CopyOutlined />}
              />
            </Tooltip>
          </Input.Group>
        </Form.Item>
      </div>
      <Form.Item
        noStyle={noStyle}
        label="Company size"
        name="sizeId"
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />
        }}
      >
        <Select hidden={noStyle} style={{ width: 150 }} onChange={() => {}} defaultValue="Select a size...">
          {SizeConst.map(item => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle={noStyle}
        label="Company industry"
        name="subCategoriesIds"
        tooltip={{
          title: 'You can select maximum 3 items',
          icon: <InfoCircleOutlined />
        }}
      >
        <Select
          hidden={noStyle}
          style={{ width: 300 }}
          placeholder="Company industry"
          mode="multiple"
          onChange={value => {
            //value is a array
            if (value.length > NUM_OF_SIZE_MAXIMUM) {
              value.pop()
            }
            setTotalSelect(value.length)
          }}
          onSearch={() => {}}
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
      <Form.List name="benefits" noStyle={noStyle}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Item
                      noStyle={noStyle}
                      {...restField}
                      label="Benefit type"
                      name={[name, 'id']}
                      style={{ width: 150 }}
                    >
                      <Select
                        hidden={noStyle}
                        defaultValue="Select one..."
                        onChange={value => {
                          setBenefitId(value)
                        }}
                      >
                        {benefitConst.map(item => (
                          <Option value={item.value}>
                            <GiftOutlined />
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      noStyle={noStyle}
                      {...restField}
                      name={[name, 'description']}
                      label="Description"
                      rules={editable ? CompanyProfileValidation.description : []}
                      style={{ width: 400 }}
                    >
                      <TextArea hidden={noStyle} placeholder="Description" showCount maxLength={3000} />
                    </Form.Item>
                    {noStyle !== true ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                  </div>
                )
              })}
              <Form.Item noStyle={noStyle}>
                <Button
                  hidden={noStyle}
                  style={{ width: '30%' }}
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )
        }}
      </Form.List>
      <Form.Item
        noStyle={noStyle}
        label="Company medias"
        name="mediaUrls"
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />
        }}
      >
        {noStyle !== true ? <ImageUploadComponent /> : null}
      </Form.Item>
    </>
  )
}

export default CompanyProfileForm
