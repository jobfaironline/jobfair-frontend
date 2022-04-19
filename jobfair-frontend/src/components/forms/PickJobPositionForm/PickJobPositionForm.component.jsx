/* eslint-disable no-unused-vars */
import './PickJobPositionForm.styles.scss';
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Tag,
  TimePicker,
  Typography
} from 'antd';
import { MAXIMUM_MARK, MAXIMUM_QUESTION, MINIMUM_MARK, MINIMUM_QUESTION } from '../../../constants/CreateTestConst';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { MinuteFormat } from '../../../constants/ApplicationConst';
import { PickJobPositionFormValidation } from '../../../validate/PickJobPositionForm';
import { convertEnumToString } from '../../../utils/common';
import React from 'react';

const { Panel } = Collapse;
const { Text } = Typography;
const { TextArea } = Input;

const PickJobPositionForm = (props) => {
  const { handlePickJobPosition, form, handleRemove, onChangeHaveTest, arrKey, onFinish } = props;

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        requiredMark='required'
        autoComplete='off'
        scrollToFirstError
        initialValues={{ description: undefined, jobPositions: [] }} //will go
        className={'pick-job-position-form'}>
        <Form.Item
          label='Booth description'
          required
          tooltip='This description will be shown during the job fair'
          rules={PickJobPositionFormValidation.description}
          name='description'>
          <TextArea autoSize={{ minRows: 5 }} showCount maxLength={3000} placeholder='Description' />
        </Form.Item>
        <Form.List name='jobPositions' rules={[]}>
          {(fields, { remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                const id = form.getFieldsValue().jobPositions ? form.getFieldsValue().jobPositions[key]?.id : undefined;
                const item = form.getFieldsValue().jobPositions ? form.getFieldsValue().jobPositions[key] : {};

                return (
                  <div>
                    <Divider />
                    <div id={id} key={key} style={{ width: '100%', display: 'flex' }}>
                      <div className='job-position-input-container '>
                        <div className='job-position-row-container'>
                          <Typography style={{ fontSize: '1.5rem' }}>Job position: </Typography>
                          <Form.Item {...restField} name={[name, 'title']}>
                            <Input
                              disabled
                              style={{
                                border: 'none',
                                background: 'white',
                                color: 'black',
                                fontSize: '1.5rem',
                                padding: '0 0 0 0.2rem'
                              }}
                            />
                          </Form.Item>
                        </div>
                        <Collapse bordered={false} defaultActiveKey={['1']} style={{ marginBottom: '1rem' }}>
                          <Panel
                            key={item?.id}
                            header={
                              <Text strong style={{ fontSize: '1rem' }}>
                                General information
                              </Text>
                            }>
                            <Col style={{ marginLeft: '1rem' }}>
                              <Row>
                                <div key='title'>
                                  <Space>
                                    <Text strong>Job title: </Text>
                                    <Text>{item?.title}</Text>
                                  </Space>
                                </div>
                              </Row>
                              <div key='language'>
                                <Space>
                                  <Text strong>Prefer language: </Text>
                                  <Text>{item?.language}</Text>
                                </Space>
                              </div>
                              <Row gutter={[100, 0]}>
                                <Col span={8} key='level'>
                                  <Space>
                                    <Text strong>Job level: </Text>
                                    <Text>{convertEnumToString(item?.level)}</Text>
                                  </Space>
                                </Col>
                                <Col span={12} key='type'>
                                  <Space>
                                    <Text strong>Job type: </Text>
                                    <Text>{convertEnumToString(item?.jobType)}</Text>
                                  </Space>
                                </Col>
                              </Row>
                              <Row gutter={[100, 0]}>
                                <Col span={8}>
                                  <div key='contact-name'>
                                    <Space>
                                      <Text strong>Contact Person:</Text>
                                      <Text>{item?.contactPersonName}</Text>
                                    </Space>
                                  </div>
                                </Col>
                                <Col span={12}>
                                  <div key='contact-email'>
                                    <Space>
                                      <Text strong>Contact Email:</Text>
                                      <Text>{item?.contactEmail}</Text>
                                    </Space>
                                  </div>
                                </Col>
                                <Col>
                                  <div key='skills'>
                                    <Space>
                                      <Text strong>Required skills: </Text>
                                      {item?.skillTagDTOS.map((skill) => (
                                        <Tag
                                          color='blue'
                                          style={{
                                            fontSize: '0.9rem',
                                            padding: '0.1rem 0.3rem'
                                          }}>
                                          {skill.name}
                                        </Tag>
                                      ))}
                                    </Space>
                                  </div>
                                  <div key='category'>
                                    <Space>
                                      <Text strong>Category: </Text>
                                      {item?.subCategoryDTOs.map((category) => (
                                        <Tag
                                          color='blue'
                                          style={{
                                            fontSize: '0.9rem',
                                            padding: '0.1rem 0.3rem'
                                          }}>
                                          {category.name}
                                        </Tag>
                                      ))}
                                    </Space>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div>
                                    <div key='description'>
                                      <Space align='start' direction='vertical' size={0}>
                                        <Text strong>Job description: </Text>
                                        <Text>{item?.description}</Text>
                                      </Space>
                                    </div>
                                    <div key='requirement'>
                                      <Space align='start' direction='vertical' size={0}>
                                        <Text strong>Job requirements: </Text>
                                        <Text>{item?.requirements}</Text>
                                      </Space>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Panel>
                        </Collapse>
                        <div className='job-position-row-container '>
                          <Form.Item
                            label='Number of position'
                            {...restField}
                            name={[name, 'numOfPosition']}
                            rules={PickJobPositionFormValidation.numberOfPosition}
                            style={{ maxWidth: '14rem', width: '14rem' }}>
                            <Input placeholder='Number of position' style={{ width: '12rem' }} />
                          </Form.Item>
                          <div style={{ width: 'fit-content', flex: 'none' }}>
                            <Input.Group compact>
                              <Form.Item
                                label='Min salary'
                                {...restField}
                                name={[name, 'minSalary']}
                                rules={PickJobPositionFormValidation.minSalary(name)}>
                                <Input prefix='$' placeholder='Min salary' />
                              </Form.Item>
                              <Form.Item label=' '>
                                <Input
                                  className='site-input-split'
                                  placeholder='~'
                                  disabled
                                  style={{ width: '2rem' }}
                                />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                label='Max salary'
                                name={[name, 'maxSalary']}
                                rules={PickJobPositionFormValidation.maxSalary(name)}>
                                <Input prefix='$' className='site-input-right' placeholder='Max salary' />
                              </Form.Item>
                            </Input.Group>
                            <Form.Item name={[name, 'isHaveTest']} {...restField}>
                              <Checkbox onChange={(e) => onChangeHaveTest(e, key)}>Have test</Checkbox>
                            </Form.Item>
                            <div style={arrKey.includes(key) ? {} : { display: 'none' }}>
                              <Form.Item
                                label='Test duration'
                                required
                                tooltip='The length of the test'
                                rules={[]}
                                name={[name, 'testLength']}>
                                <TimePicker format={MinuteFormat} style={{ width: '20rem' }} />
                              </Form.Item>
                              <Form.Item
                                label='Number of questions'
                                required
                                tooltip='The number of the questions'
                                rules={[]}
                                name={[name, 'testNumOfQuestion']}>
                                <InputNumber
                                  style={{ width: '25rem' }}
                                  type='number'
                                  min={MINIMUM_QUESTION}
                                  max={MAXIMUM_QUESTION}
                                />
                              </Form.Item>
                              <Form.Item
                                label='Pass mark'
                                required
                                tooltip='The minimum mark to pass'
                                rules={[]}
                                name={[name, 'passMark']}>
                                <InputNumber
                                  style={{ width: '25rem' }}
                                  type='number'
                                  min={MINIMUM_MARK}
                                  max={MAXIMUM_MARK}
                                />
                              </Form.Item>
                              <Form.Item
                                label='Note'
                                required
                                tooltip='A small description about the test'
                                rules={[]}
                                name={[name, 'note']}>
                                <TextArea showCount maxLength={300} />
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Popconfirm
                        placement='rightTop'
                        title='Are you sure to remove this job position?'
                        onConfirm={() => handleRemove(name, remove)}
                        okText='Yes'
                        cancelText='No'>
                        <MinusCircleOutlined />
                      </Popconfirm>
                    </div>
                  </div>
                );
              })}
              <Form.Item>
                <Button type='dashed' onClick={() => handlePickJobPosition()} block icon={<PlusOutlined />}>
                  Add job
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PickJobPositionForm;
