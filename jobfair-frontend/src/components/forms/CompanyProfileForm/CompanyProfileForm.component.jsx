/* eslint-disable no-empty-function */
import { Button, Card, Divider, Form, Input, Select, Tooltip, Typography, message } from 'antd';
import {
  CategoriesConst,
  NUM_OF_SIZE_MAXIMUM,
  SizeConst,
  SubCategories,
  benefitConst
} from '../../../constants/CompanyProfileConstant';
import { CompanyProfileValidation } from '../../../validate/CompanyProfileValidation';
import { CopyOutlined, GiftOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import UploadComponent from '../../commons/UploadComponent/Upload.component';

const CompanyProfileForm = ({ form, urlValue, editable, mediaUrl, ...mediaUpload }) => {
  //state
  const [totalSelect, setTotalSelect] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [benefitId, setBenefitId] = useState(0);
  const [url, setUrl] = useState(urlValue);
  //
  const { Option, OptGroup } = Select;

  const { Text } = Typography;

  return (
    <>
      <Form.Item
        style={{ display: 'inline-block', width: '40%' }}
        shouldUpdate
        label='Company Name'
        name='name'
        required
        tooltip='This is required'
        rules={editable ? CompanyProfileValidation.name : []}>
        <Input placeholder='Company name' style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-block', width: '60%' }}
        shouldUpdate
        label='Company Email'
        required
        tooltip='This is required'
        rules={editable ? CompanyProfileValidation.email : []}
        name='email'>
        <Input placeholder='Company email' />
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-block', width: '30%' }}
        shouldUpdate
        label='Phone number'
        name='phone'
        hasFeedback
        rules={editable ? CompanyProfileValidation.phone : []}>
        <Input placeholder='Company phone' style={{ width: 150 }} />
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-block', width: '70%' }}
        shouldUpdate
        label='Company Address'
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />
        }}
        name='address'
        rules={editable ? CompanyProfileValidation.address : []}>
        <Input placeholder='Company address' />
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-block', width: '40%' }}
        shouldUpdate
        label='Company tax ID'
        required
        tooltip='This is required'
        rules={editable ? CompanyProfileValidation.taxId : []}
        name='taxId'>
        <Input placeholder='Company Tax ID' style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        label='Company URL'
        style={{ display: 'inline-block', width: '60%' }}
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />
        }}>
        <Input.Group compact>
          <Form.Item
            shouldUpdate
            name='url'
            rules={editable ? CompanyProfileValidation.url : []}
            style={{ display: 'inline-block', width: '50%' }}>
            <Input style={{ width: '175%' }} defaultValue={url} onChange={(e) => setUrl(e.target.value)} />
          </Form.Item>
          <Tooltip title='copy url'>
            <Button
              style={{ marginLeft: '7rem' }}
              onClick={() => {
                navigator.clipboard
                  .writeText(url)
                  .then(message.success('Copied to clipboard'))
                  .catch((err) => {
                    message.error(`An error occurred, ${err}`);
                  });
              }}
              icon={<CopyOutlined />}
            />
          </Tooltip>
        </Input.Group>
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-block', width: '100%' }}
        shouldUpdate
        label='Company description'
        required
        tooltip='This is required'
        rules={editable ? CompanyProfileValidation.description : []}
        name='companyDescription'>
        <TextArea showCount maxLength={3000} placeholder='Company description' />
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-block', width: '40%' }}
        label='Company size (workers)'
        name='sizeId'
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />
        }}>
        <Select style={{ width: 150 }} onChange={() => {}} defaultValue='Select a size...'>
          {SizeConst.map((item) => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-block', width: '60%' }}
        label='Company industry'
        name='subCategoriesIds'
        tooltip={{
          title: 'You can select maximum 3 items',
          icon: <InfoCircleOutlined />
        }}>
        <Select
          placeholder='Company industry'
          mode='multiple'
          onChange={(value) => {
            //value is a array
            if (value.length > NUM_OF_SIZE_MAXIMUM) value.pop();
            setTotalSelect(value.length);
          }}
          onSearch={() => {}}
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
      <Card
        title='Company benefits'
        style={{
          marginBottom: '2rem'
        }}
        headStyle={{ backgroundColor: 'white', border: 0 }}
        bodyStyle={{ backgroundColor: 'white', border: 0 }}>
        <Form.List label='Company benefits' name='benefits'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
                  <Form.Item
                    {...restField}
                    label='Benefit type'
                    name={[name, 'id']}
                    style={{ display: 'inline-block', width: '30%', height: '5rem' }}>
                    <Select
                      defaultValue='Select one...'
                      onChange={(value) => {
                        setBenefitId(value);
                      }}>
                      {benefitConst.map((item) => (
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
                    label='Description'
                    rules={editable ? CompanyProfileValidation.description : []}
                    style={{ display: 'inline-block', width: '70%' }}>
                    <TextArea placeholder='Description' showCount maxLength={3000} />
                  </Form.Item>
                  <FontAwesomeIcon icon={faTrash} onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button style={{ width: '100%' }} type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Add benefit
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>
      <Form.Item
        style={{ display: 'inline-block', width: '100%' }}
        label='Company logo'
        name='companyLogoURL'
        tooltip={{
          title: 'This is optional',
          icon: <InfoCircleOutlined />
        }}>
        <UploadComponent uploadProps={mediaUpload}>
          {mediaUrl ? (
            <img src={mediaUrl} alt='avatar' style={{ width: '100%' }} />
          ) : (
            <img src={form.getFieldValue('companyLogoURL')} alt='avatar' style={{ width: '100%' }} />
          )}
        </UploadComponent>
      </Form.Item>
    </>
  );
};

export default CompanyProfileForm;
