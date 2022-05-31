import './JobPositionFormModal.styles.scss';
import { Checkbox, Col, Form, Input, InputNumber, Modal, Row, Tag, Typography } from 'antd';
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
import { PickJobPositionFormValidation } from '../../../validate/PickJobPositionForm';
import React from 'react';

const { TextArea } = Input;
const { Text, Title } = Typography;

const Description = ({ label, value }) => (
  <Row className={'description'}>
    <Col span={6}>
      <Text strong>{label}</Text>
    </Col>
    <Col flex={1} className={'value'}>
      {value}
    </Col>
  </Row>
);

export const JobPositionFormModal = (props) => {
  const { jobPositionData, form, onChangeHaveTest, arrKey, isVisible, onCancel, onFinish } = props;
  if (jobPositionData === undefined) return null;
  return (
    <Modal
      visible={isVisible}
      width={'70rem'}
      onCancel={onCancel}
      onOk={onFinish}
      className={'job-position-form-modal'}
      okText={'Confirm'}>
      <div className={'container'}>
        <Row>
          <Col span={12} className={'left-side'}>
            <Description label={'Title:'} value={jobPositionData.title} />
            <Description label={'Level:'} value={jobPositionData.jobLevel} />
            <Description label={'Type:'} value={jobPositionData.jobType} />
            <Description
              label={'Category:'}
              value={
                <>
                  {jobPositionData.subCategoryDTOs.map((category) => (
                    <Tag color='blue' style={{ fontSize: '1rem', padding: '0.15rem 0.6rem' }}>
                      {category.name}
                    </Tag>
                  ))}
                </>
              }
            />
            <Description
              label={'Required skill:'}
              value={
                <>
                  {jobPositionData.skillTagDTOS.map((skill) => (
                    <Tag color='blue' style={{ fontSize: '1rem', padding: '0.15rem 0.6rem' }}>
                      {skill.name}
                    </Tag>
                  ))}
                </>
              }
            />
            <Description label={'Description:'} value={jobPositionData.description} />
            <Description label={'Requirement:'} value={jobPositionData.requirements} />
          </Col>
          <Col span={12}>
            <Title level={4}>Additional information for job position</Title>
            <Form form={form}>
              <Form.List name='jobPositions' rules={[]}>
                {(fields, {}) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      const id = form.getFieldsValue(true).jobPositions
                        ? form.getFieldsValue(true).jobPositions[key]?.id
                        : undefined;
                      const item = form.getFieldsValue(true).jobPositions
                        ? form.getFieldsValue(true).jobPositions[key]
                        : {};
                      if (item.id !== jobPositionData.id) return null;
                      return (
                        <div id={id} key={key}>
                          <div className='job-position-row-container '>
                            <Form.Item label='Note' rules={PickJobPositionFormValidation.note} name={[name, 'note']}>
                              <TextArea showCount maxLength={500} autoSize={{ minRows: 3 }} />
                            </Form.Item>
                            <Form.Item
                              label='Number of position'
                              {...restField}
                              name={[name, 'numOfPosition']}
                              rules={PickJobPositionFormValidation.numberOfPosition}>
                              <InputNumber
                                placeholder='Number of position'
                                style={{ width: '12rem' }}
                                max={MAXIMUM_NUM_OF_POSITION}
                                min={MINIMUM_NUM_OF_POSITION}
                              />
                            </Form.Item>
                            <div>
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
                            </div>
                            <div>
                              <Form.Item name={[name, 'isHaveTest']} {...restField}>
                                <Checkbox.Group>
                                  <Checkbox onChange={(e) => onChangeHaveTest(e, key)} value={true}>
                                    Have test
                                  </Checkbox>
                                </Checkbox.Group>
                              </Form.Item>
                              <div style={arrKey.includes(key) ? {} : { display: 'none' }}>
                                <Row>
                                  <Col span={12}>
                                    <Form.Item
                                      label='Test duration'
                                      labelAlign={'left'}
                                      required
                                      rules={arrKey.includes(key) ? PickJobPositionFormValidation.testLength : null}
                                      name={[name, 'testLength']}
                                      style={{ marginRight: '1rem' }}>
                                      <InputNumber
                                        style={{ width: 110 }}
                                        max={MAXIMUM_TEST_DURATION}
                                        min={MINIMUM_TEST_DURATION}
                                        addonAfter={'min'}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      label='Pass mark'
                                      labelAlign={'left'}
                                      required
                                      rules={arrKey.includes(key) ? PickJobPositionFormValidation.passMark : null}
                                      name={[name, 'passMark']}>
                                      <InputNumber
                                        type='number'
                                        min={MINIMUM_MARK}
                                        max={MAXIMUM_MARK}
                                        addonAfter={'/10'}
                                        style={{ width: 110 }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Form.Item
                                  label='Number of questions'
                                  labelAlign={'left'}
                                  required
                                  rules={arrKey.includes(key) ? PickJobPositionFormValidation.numberOfQuestion : null}
                                  name={[name, 'testNumOfQuestion']}>
                                  <InputNumber type='number' min={MINIMUM_QUESTION} max={MAXIMUM_QUESTION} />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </Form.List>
            </Form>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
