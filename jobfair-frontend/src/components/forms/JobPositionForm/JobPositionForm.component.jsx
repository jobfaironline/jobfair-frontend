import './JobPositionForm.styles.scss';
import { Card, Divider, Form, Input, Select, Space, Typography } from 'antd';
import { CategoriesConst, NUM_OF_SIZE_MAXIMUM, SubCategories } from '../../../constants/CompanyProfileConstant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  JobLevelConst,
  JobTypeConst,
  LanguageConst,
  NUM_OF_SKILL_TAGS,
  SkillTagsConst
} from '../../../constants/JobPositionConst';
import { JobPositionValidation } from '../../../validate/CreateJobPositionValidation';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import SuggestedContactEmailContainer from '../../../containers/SuggestedComponent/SuggestedContactEmail.container';
import SuggestedContactNameContainer from '../../../containers/SuggestedComponent/SuggestedContactName.container';
import TextArea from 'antd/es/input/TextArea';

const { Option, OptGroup } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 25 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const JobPositionFormComponent = (props) => {
  const [totalSelect, setTotalSelect] = useState(0);
  const [totalSkillTags, setTotalSkillTags] = useState(0);
  const { Text } = Typography;
  const {
    form,
    formItemButtons,
    onFinish,
    onCancel,
    isDisplayDetail = false,
    extra,
    contactEmail,
    contactPersonName
  } = props;
  const companyId = useSelector((state) => state?.authentication?.user?.companyId);

  return (
    <div className={'job-position-form disable-form'}>
      <Card
        title={'Job position detail'}
        extra={
          <div className={'extra'}>
            {extra}
            <a onClick={onCancel} key={'cancel'}>
              <FontAwesomeIcon icon={faX} size={'2x'} color={'black'} />
            </a>
          </div>
        }>
        <Form onFinish={onFinish} form={form} {...formItemLayout} layout='vertical' labelCol={21} wrapperCol={21}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              label={<Text strong>Job title</Text>}
              name='title'
              required
              rules={JobPositionValidation.title}
              style={{ width: '23.5%' }}>
              <Input placeholder='Job title' disabled={isDisplayDetail} />
            </Form.Item>
            <Form.Item
              label={<Text strong>Job level</Text>}
              required
              name='level'
              rules={JobPositionValidation.jobLevel}
              style={{ width: '23%' }}>
              <Select
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={isDisplayDetail}>
                {JobLevelConst.map((item) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={<Text strong>Job type</Text>}
              required
              rules={JobPositionValidation.jobType}
              name='jobType'
              style={{ width: '23.5%', marginLeft: '2rem' }}>
              <Select
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={isDisplayDetail}>
                {JobTypeConst.map((item) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={<Text strong>Prefer language</Text>}
              name={'preferredLanguage'}
              required
              rules={JobPositionValidation.language}
              style={{ width: '23.5%' }}>
              <Select
                showSearch
                placeholder='Search to Select'
                optionFilterProp='children'
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                disabled={isDisplayDetail}>
                {LanguageConst.map((item) => (
                  <Option value={item.value}>{item.value}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              label={<Text strong>Skill tags</Text>}
              required
              rules={JobPositionValidation.skillTags}
              name='skillTagIds'
              style={{
                width: '47%'
              }}>
              <Select
                mode='multiple'
                onChange={(value) => {
                  //value is a array
                  if (value.length > NUM_OF_SKILL_TAGS) value.pop();

                  setTotalSkillTags(value.length);
                }}
                filterOption={(input, option) => option.children?.toLowerCase().includes(input?.toLowerCase())}
                dropdownRender={(menu) => (
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
                disabled={isDisplayDetail}>
                {SkillTagsConst.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={<Text strong>Category tag</Text>}
              required
              rules={JobPositionValidation.jobCategory}
              name='subCategoryIds'
              style={{
                width: '47%'
              }}>
              <Select
                mode='multiple'
                onChange={(value) => {
                  //value is a array
                  if (value.length > NUM_OF_SIZE_MAXIMUM) value.pop();
                  setTotalSelect(value.length);
                }}
                filterOption={(input, option) => option.children?.toLowerCase().includes(input?.toLowerCase())}
                showSearch
                dropdownRender={(menu) => (
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
                disabled={isDisplayDetail}>
                {CategoriesConst.map((category) => (
                  <OptGroup label={category.label}>
                    {SubCategories.filter((item) => item.category_id === category.value).map((item) => (
                      <Option value={item.value}>{item.label}</Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              label={<Text strong>Contact person</Text>}
              required
              rules={JobPositionValidation.contactPerson}
              name='contactPersonName'
              style={{
                width: '47%'
              }}>
              <SuggestedContactNameContainer
                defaultValue={contactPersonName}
                companyId={companyId}
                onChange={(value) => {
                  form.setFieldsValue({ contactPersonName: value });
                }}
                disabled={isDisplayDetail}
              />
            </Form.Item>
            <Form.Item
              label={<Text strong>Email for applications</Text>}
              required
              rules={JobPositionValidation.email}
              name='contactEmail'
              style={{
                width: '47%'
              }}>
              <SuggestedContactEmailContainer
                defaultValue={contactEmail}
                companyId={companyId}
                onChange={(value) => {
                  form.setFieldsValue({ contactEmail: value });
                }}
                disabled={isDisplayDetail}
              />
            </Form.Item>
          </div>

          {/*TODO: implement location later*/}
          {/*<Form.Item*/}
          {/*  label='Location for applications'*/}
          {/*  required*/}
          {/*  rules={JobPositionValidation.contactPerson}*/}
          {/*  name='locationId'*/}
          {/*  style={{*/}
          {/*    display: 'inline-block',*/}
          {/*    width: '96%',*/}
          {/*    marginLeft: '1rem',*/}
          {/*    marginRight: '1rem'*/}
          {/*  }}>*/}
          {/*  <Input placeholder='Location' />*/}
          {/*</Form.Item>*/}
          <Form.Item
            label={<Text strong>Description</Text>}
            required
            rules={JobPositionValidation.description}
            name='description'>
            <TextArea
              placeholder='Description'
              showCount={!isDisplayDetail}
              maxLength={3000}
              autoSize={{ minRows: 5 }}
              disabled={isDisplayDetail}
            />
          </Form.Item>
          <Form.Item
            label={<Text strong>Requirements</Text>}
            required
            rules={JobPositionValidation.requirements}
            name='requirements'>
            <TextArea
              placeholder='Requirements'
              showCount={!isDisplayDetail}
              maxLength={3000}
              autoSize={{ minRows: 5 }}
              disabled={isDisplayDetail}
            />
          </Form.Item>
          {isDisplayDetail ? null : (
            <Form.Item>
              <Space size={20} style={{ display: 'flex', justifyContent: 'end' }}>
                {formItemButtons.map((button) => button)}
              </Space>
            </Form.Item>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default JobPositionFormComponent;
