import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Tooltip,
    Select,
    Divider,
    Typography,
    Space,
    AutoComplete, message,
} from 'antd'
import {
  CopyOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  benefitConst,
  CategoriesConst,
  NUM_OF_SIZE_MAXIMUM,
  SizeConst,
  SubCategories,
} from '../../constants/CompanyProfileConstant'
import ImageUpload from '../image-upload/ImageUpload'
import {
  CompanyProfileValidation,
  MAX_LENGTH_VALIDATOR,
  REQUIRED_VALIDATOR,
} from '../../validate/CompanyProfileValidation'
import { COMPANY_DEFAULT_MODEL } from '../../default_models/CompanyProfileModel'
import TextArea from "antd/es/input/TextArea";

const CompanyProfileForm = ({urlValue}) => {
  //state
  const [totalSelect, setTotalSelect] = useState(0)
  const [benefitId, setBenefitId] = useState(0)
  const [url, setUrl] = useState(urlValue)

  //
  const { Option, OptGroup } = Select

  const { Text } = Typography

  return (
    <div>
      <Form.Item
        label="Company Name"
        name="name"
        required
        tooltip="This is required"
        rules={CompanyProfileValidation.name}
      >
        <Input placeholder="Company name" style={{ width: 300 }} />
      </Form.Item>
        <Form.Item
            label="Company Email"
            required
            tooltip="This is required"
            rules={CompanyProfileValidation.email}
            name="email"
        >
            <Input placeholder="Company email" style={{ width: 250 }} />
        </Form.Item>
        <Form.Item
            label="Phone number"
            name="phone"
            hasFeedback
            rules={CompanyProfileValidation.phone}
        >
            <Input placeholder="Company phone" style={{width: 200}}/>
        </Form.Item>
      <Form.Item
        label="Company Address"
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />,
        }}
        name="address"
        rules={CompanyProfileValidation.address}
      >
        <Input placeholder="Company address" style={{ width: 350 }} />
      </Form.Item>
      <Form.Item
        label="Company tax ID"
        required
        tooltip="This is required"
        rules={CompanyProfileValidation.taxId}
        name="taxId"
      >
        <Input placeholder="Company Tax ID" style={{ width: 300 }} />
      </Form.Item>
        <Form.Item
            label="Company description"
            required
            tooltip="This is required"
            rules={CompanyProfileValidation.description}
            name="companyDescription"
        >
            <TextArea showCount maxLength={3000} placeholder="Company description" style={{ width: 300 }} />
        </Form.Item>
      <div className="site-input-group-wrapper">
        <Form.Item
          label="Company URL"
          tooltip={{
            title: 'This is optional',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input.Group compact>
            <Form.Item
              noStyle
              name="url"
              rules={CompanyProfileValidation.url}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Input
                style={{ width: 'calc( 60% - 200px)' }}
                defaultValue={url}
                onChange={e => setUrl(e.target.value)}
              />
            </Form.Item>
            <Tooltip title="copy url">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(url)
                      .then(message.success('Copied to clipboard'))
                      .catch(err => {
                          console.log(err)
                          message.error(`An error occurred, ${err}`, )
                      })
                }}
                icon={<CopyOutlined />}
              />
            </Tooltip>
          </Input.Group>
        </Form.Item>
      </div>
      <Form.Item
        label="Company size"
        name="sizeId"
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select
          style={{ width: 150 }}
          onChange={value => {
            console.log(`size selected: ${value}`)
          }}
          defaultValue="Select a size..."
        >
          {SizeConst.map(item => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Company industry"
        name="subCategoriesIds"
        tooltip={{
          title: 'You can select maximum 3 items',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select
          style={{ width: 300 }}
          placeholder="Company industry"
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
          onSearch={value => {
            console.log(value)
          }}
          dropdownRender={menu => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Text type={totalSelect > 3 ? 'danger' : 'success'}>
                {totalSelect > 3
                  ? null
                  : `You can select ${NUM_OF_SIZE_MAXIMUM} items only. (${
                      NUM_OF_SIZE_MAXIMUM - totalSelect
                    } left)`}
              </Text>
            </>
          )}
        >
          {CategoriesConst.map(category => (
            <OptGroup label={category.label}>
              {SubCategories.filter(
                item => item.category_id === category.value
              ).map(item => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </OptGroup>
          ))}
        </Select>
      </Form.Item>
      <Form.List name="benefits">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Item
                      {...restField}
                      label="Benefit type"
                      name={[name, 'id']}
                      style={{ width: 150 }}
                    >
                      <Select
                        defaultValue="Select one..."
                        onChange={value => {
                          console.log('id: ', value)
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
                      {...restField}
                      name={[name, 'description']}
                      label="Description"
                      rules={CompanyProfileValidation.description}
                      style={{ width: 400 }}
                    >
                      <TextArea placeholder="Description" showCount maxLength={3000}/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                )
              })}
              <Form.Item>
                <Button
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
        label="Company medias"
        name="mediaUrls"
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />,
        }}
      >
        <ImageUpload />
      </Form.Item>
    </div>
  )
}

export default CompanyProfileForm
