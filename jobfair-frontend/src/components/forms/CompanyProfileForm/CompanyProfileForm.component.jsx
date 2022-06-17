import { Button, Divider, Form, Input, Select, Typography } from 'antd';
import {
  CategoriesConst,
  NUM_OF_SIZE_MAXIMUM,
  SizeConst,
  SubCategories,
  benefitConst
} from '../../../constants/CompanyProfileConstant';
import { CompanyProfileValidation } from '../../../validate/CompanyProfileValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GiftOutlined, PlusOutlined } from '@ant-design/icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import UploadComponent from '../../commons/UploadComponent/Upload.component';

const { Option, OptGroup } = Select;
const { Text } = Typography;

const CompanyProfileForm = ({ form, editable, mediaUrl, onFinish, onCancel, ...mediaUpload }) => {
  const [totalSelect, setTotalSelect] = useState(0);

  return (
    <div className={!editable ? 'disable-form' : ''}>
      <Form form={form} onFinish={onFinish} requiredMark={editable} autoComplete='off' scrollToFirstError={true}>
        <Form.Item
          style={{ display: 'inline-block', width: '100%' }}
          label={editable ? 'Company logo' : ''}
          name='companyLogoURL'>
          <UploadComponent uploadProps={mediaUpload} disabled={!editable}>
            <img src={mediaUrl} alt='avatar' style={{ maxHeight: '200px' }} />
          </UploadComponent>
        </Form.Item>
        {/*------------------------------------------------*/}
        <Form.Item
          style={editable ? { display: 'inline-block', width: '40%' } : { margin: 0 }}
          shouldUpdate
          label='Company name'
          name='name'
          required
          rules={editable ? CompanyProfileValidation.name : []}>
          <Input placeholder={editable ? 'Company name' : ''} style={{ width: 200 }} disabled={!editable} />
        </Form.Item>
        <Form.Item
          style={editable ? { display: 'inline-block', width: '60%' } : { margin: 0 }}
          shouldUpdate
          label='Company Email'
          required
          rules={editable ? CompanyProfileValidation.email : []}
          name='email'>
          <Input placeholder={editable ? 'Company email' : ''} disabled={!editable} />
        </Form.Item>
        <Form.Item
          style={editable ? { display: 'inline-block', width: '30%' } : { margin: 0 }}
          shouldUpdate
          label='Phone number'
          name='phone'
          hasFeedback
          rules={editable ? CompanyProfileValidation.phone : []}>
          <Input placeholder={editable ? 'Company phone' : ''} style={{ width: 150 }} disabled={!editable} />
        </Form.Item>
        <Form.Item
          style={editable ? { display: 'inline-block', width: '70%' } : { margin: 0 }}
          shouldUpdate
          label='Company Address'
          name='address'
          rules={editable ? CompanyProfileValidation.address : []}>
          <Input placeholder={editable ? 'Company address' : ''} disabled={!editable} />
        </Form.Item>
        <Form.Item
          style={editable ? { display: 'inline-block', width: '40%' } : { margin: 0 }}
          shouldUpdate
          label='Company tax ID'
          required
          rules={editable ? CompanyProfileValidation.taxId : []}
          name='taxId'>
          <Input placeholder={editable ? 'Company Tax ID' : ''} style={{ width: 200 }} disabled={!editable} />
        </Form.Item>
        <Form.Item
          label='Company URL'
          name='websiteUrl'
          style={editable ? { display: 'inline-block', width: '60%' } : { margin: 0 }}
          rules={editable ? CompanyProfileValidation.url : []}>
          <Input style={{ width: '70%' }} disabled={!editable} />
        </Form.Item>
        <Form.Item
          style={{ display: 'inline-block', width: '100%' }}
          shouldUpdate
          label='Company description'
          required
          rules={editable ? CompanyProfileValidation.description : []}
          name='companyDescription'>
          <TextArea
            showCount={editable}
            maxLength={3000}
            placeholder={editable ? 'Company description' : ''}
            disabled={!editable}
            autoSize={!editable}
          />
        </Form.Item>
        <Form.Item
          style={editable ? { display: 'inline-block', width: '40%' } : { margin: 0 }}
          label='Company size (workers)'
          name='sizeId'>
          <Select style={{ width: 150 }} defaultValue='Select a size...' disabled={!editable}>
            {SizeConst.map((item) => (
              <Option value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={editable ? { display: 'inline-block', width: '60%' } : { margin: 0 }}
          label='Company industry'
          name='subCategoriesIds'>
          <Select
            disabled={!editable}
            placeholder={editable ? 'Company industry' : ''}
            mode='multiple'
            onChange={(value) => {
              //value is a array
              if (value.length > NUM_OF_SIZE_MAXIMUM) value.pop();
              setTotalSelect(value.length);
            }}
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
        {/*------------------------------------------------*/}
        <Divider />
        <Text strong>Benefits</Text>
        <Form.List label='Company benefits' name='benefits'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={editable ? { display: 'flex', flexDirection: 'row' } : { margin: 0 }}>
                  <Form.Item
                    {...restField}
                    label={editable ? 'Benefit type' : ''}
                    name={[name, 'id']}
                    style={{
                      display: 'inline-block',
                      width: editable ? '30%' : 'initial',
                      height: editable ? '5rem' : '1rem'
                    }}>
                    <Select defaultValue='Select one...' disabled={!editable}>
                      {benefitConst.map((item) => (
                        <Option value={item.value}>
                          <GiftOutlined style={{ marginRight: '5px' }} />
                          {item.label}
                          {editable ? '' : ':'}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    label={editable ? 'Description' : ''}
                    rules={editable ? CompanyProfileValidation.description : []}
                    style={{ display: 'inline-block', width: '70%' }}>
                    <Input disabled={!editable} />
                  </Form.Item>
                  {editable ? <FontAwesomeIcon icon={faTrash} onClick={() => remove(name)} /> : null}
                </div>
              ))}
              <Button
                style={{ width: '100%', display: !editable ? 'none' : 'block' }}
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}>
                Add benefit
              </Button>
            </>
          )}
        </Form.List>
        {/*------------------------------------------*/}
        <div style={{ marginTop: '1rem', display: 'flex' }}>
          <Button
            style={{ display: editable ? 'block' : 'none', marginLeft: 'auto', marginRight: '1rem' }}
            onClick={onCancel}
            className={'button'}>
            Cancel
          </Button>
          <Button
            style={{ display: editable ? 'block' : 'none' }}
            className={'button'}
            onClick={onCancel}
            type={'primary'}
            htmlType={'submit'}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CompanyProfileForm;
