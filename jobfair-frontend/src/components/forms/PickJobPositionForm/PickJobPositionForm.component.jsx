import './PickJobPositionForm.styles.scss';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Typography
} from 'antd';
import {
  MAXIMUM_MARK,
  MAXIMUM_NUM_OF_POSITION,
  MAXIMUM_QUESTION,
  MAXIMUM_TEST_DURATION,
  MINIMUM_MARK,
  MINIMUM_NUM_OF_POSITION,
  MINIMUM_QUESTION,
  MINIMUM_TEST_DURATION
} from '../../../constants/CreateTestConst';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PickJobPositionFormValidation } from '../../../validate/PickJobPositionForm';
import JobPositionDetailCollapseComponent from '../../customized-components/JobPositionDetailCollapse/JobPositionDetailCollapse.component';
import React from 'react';

const { TextArea } = Input;
const { Meta } = Card;

const PickJobPositionForm = (props) => {
  const {
    handlePickJobPosition,
    form,
    handleRemove,
    onChangeHaveTest,
    arrKey,
    onFinish,
    jobFair,
    handleView3DBooth,
    handleViewJobFairMap
  } = props;

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
        <Row wrap={false}>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Space>
              <div>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  //TODO: chua co boothThumbnail
                  cover={<img alt='example' src={jobFair?.thumbnailUrl} />}>
                  <Meta title='Booth for designer' description={<a onClick={handleView3DBooth}>View 3D Booth</a>} />
                </Card>
              </div>
              <div>
                <Card hoverable style={{ width: 240 }} cover={<img alt='example' src={jobFair?.thumbnailUrl} />}>
                  <Meta title='Job fair name' description={<a onClick={handleViewJobFairMap}>View job fair map</a>} />
                </Card>
              </div>
            </Space>
            <Form.Item
              label='Booth name'
              required
              tooltip='This is the name of the booth'
              rules={PickJobPositionFormValidation.description}
              name='name'>
              <Input placeholder="Booth's name" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item
              label='Booth description'
              required
              tooltip='This description will be shown during the job fair'
              rules={PickJobPositionFormValidation.description}
              name='description'>
              <TextArea autoSize={{ minRows: 5 }} showCount maxLength={3000} placeholder='Description' />
            </Form.Item>
          </Col>
          <Col xs={20} sm={16} md={12} lg={8} xl={4}></Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            <Form.List name='jobPositions' rules={[]}>
              {(fields, { remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const id = form.getFieldsValue(true).jobPositions
                      ? form.getFieldsValue(true).jobPositions[key]?.id
                      : undefined;
                    const item = form.getFieldsValue(true).jobPositions
                      ? form.getFieldsValue(true).jobPositions[key]
                      : {};

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
                            <JobPositionDetailCollapseComponent jobPosition={item} />
                            <div className='job-position-row-container '>
                              <Form.Item
                                label='Number of position'
                                {...restField}
                                name={[name, 'numOfPosition']}
                                rules={PickJobPositionFormValidation.numberOfPosition}
                                style={{ maxWidth: '14rem', width: '14rem' }}>
                                <InputNumber
                                  placeholder='Number of position'
                                  style={{ width: '12rem' }}
                                  max={MAXIMUM_NUM_OF_POSITION}
                                  min={MINIMUM_NUM_OF_POSITION}
                                />
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
                                  <Checkbox.Group>
                                    <Checkbox onChange={(e) => onChangeHaveTest(e, key)} value={true}>
                                      Have test
                                    </Checkbox>
                                  </Checkbox.Group>
                                </Form.Item>
                                <div style={arrKey.includes(key) ? {} : { display: 'none' }}>
                                  <Form.Item
                                    label='Test duration'
                                    required
                                    tooltip='Hour:Minute'
                                    rules={arrKey.includes(key) ? PickJobPositionFormValidation.testLength : null}
                                    name={[name, 'testLength']}>
                                    <InputNumber
                                      placeholder='Test duration'
                                      style={{ width: '20rem' }}
                                      max={MAXIMUM_TEST_DURATION}
                                      min={MINIMUM_TEST_DURATION}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label='Number of questions'
                                    required
                                    tooltip='The number of the questions'
                                    rules={arrKey.includes(key) ? PickJobPositionFormValidation.numberOfQuestion : null}
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
                                    rules={arrKey.includes(key) ? PickJobPositionFormValidation.passMark : null}
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
                                    tooltip='A small description about the test'
                                    rules={arrKey.includes(key) ? PickJobPositionFormValidation.note : null}
                                    name={[name, 'note']}>
                                    <TextArea showCount maxLength={100} />
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
          </Col>
        </Row>
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
