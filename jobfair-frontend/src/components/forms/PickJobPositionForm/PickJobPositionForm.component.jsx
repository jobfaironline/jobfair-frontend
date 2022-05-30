import './PickJobPositionForm.styles.scss';
import { Button, Card, Checkbox, Form, Input, InputNumber, Popconfirm, Typography } from 'antd';
import { JobPositionFormModal } from '../JobPositionForm/JobPositionFormModal.component';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const { Title, Text } = Typography;

const PickJobPositionForm = (props) => {
  const { handlePickJobPosition, form, handleRemove, onChangeHaveTest, arrKey, onFinish } = props;

  const finishModal = async () => {
    try {
      await form.validateFields();
      setJobPositionModalData((prevState) => ({ ...prevState, visible: false }));
    } catch (e) {
      //ignore
    }
  };

  const [jobPositionModalData, setJobPositionModalData] = useState({
    visible: false,
    data: undefined
  });

  return (
    <>
      <JobPositionFormModal
        jobPositionData={jobPositionModalData.data}
        form={form}
        onChangeHaveTest={onChangeHaveTest}
        arrKey={arrKey}
        isVisible={jobPositionModalData.visible}
        onCancel={finishModal}
        onFinish={finishModal}
      />
      <Title level={3}>Booth's job position</Title>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        requiredMark='required'
        autoComplete='off'
        scrollToFirstError
        initialValues={{ description: undefined, jobPositions: [] }} //will go
        className={'pick-job-position-form'}>
        <Form.Item>
          <Button className={'add-job-button'} onClick={() => handlePickJobPosition()} block icon={<PlusOutlined />}>
            Add job
          </Button>
        </Form.Item>
        <Form.List name='jobPositions' rules={[]}>
          {(fields, { remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                const id = form.getFieldsValue(true).jobPositions
                  ? form.getFieldsValue(true).jobPositions[name]?.id
                  : undefined;
                const item = form.getFieldsValue(true).jobPositions ? form.getFieldsValue(true).jobPositions[name] : {};
                return (
                  <Card
                    className={'job-position-container'}
                    actions={[
                      <Text
                        onClick={() => {
                          setJobPositionModalData((prevState) => ({ ...prevState, visible: true, data: item }));
                        }}>
                        Job position's detail
                      </Text>
                    ]}>
                    <div id={id} key={key} style={{ width: '100%', display: 'flex' }}>
                      <div className='job-position-input-container '>
                        <div className='job-position-row-container'>
                          <Form.Item {...restField} name={[name, 'title']}>
                            <Input disabled className={'disable-input disable-input-title'} />
                          </Form.Item>
                          <div className={'job-position-information-container'}>
                            <div className={'job-position-information'}>
                              <Text className={'label'}>Min salary:</Text>
                              <Form.Item {...restField} name={[name, 'minSalary']}>
                                <InputNumber
                                  disabled
                                  className={'disable-input'}
                                  placeholder={'Not enter'}
                                  formatter={(value) => {
                                    if (value === undefined || value === null || value === '') return 'Not enter';
                                    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                  }}
                                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                />
                              </Form.Item>
                            </div>
                            <div className={'job-position-information'}>
                              <Text className={'label'}>Is have test: </Text>
                              <Form.Item {...restField} name={[name, 'isHaveTest']} valuePropName='checked'>
                                <Checkbox disabled className={'disable-input'} />
                              </Form.Item>
                            </div>
                            <div className={'job-position-information'}>
                              <Text className={'label'}>Max salary: </Text>
                              <Form.Item {...restField} name={[name, 'maxSalary']}>
                                <InputNumber
                                  disabled
                                  className={'disable-input'}
                                  placeholder={'Not enter'}
                                  formatter={(value) => {
                                    if (value === undefined || value === null || value === '') return 'Not enter';
                                    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                  }}
                                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                />
                              </Form.Item>
                            </div>
                            <div className={'job-position-information'}>
                              <Text className={'label'}>Number of position: </Text>
                              <Form.Item {...restField} name={[name, 'numOfPosition']}>
                                <InputNumber
                                  disabled
                                  className={'disable-input'}
                                  placeholder={'Not enter'}
                                  formatter={(value) => {
                                    if (value === undefined || value === null || value === '') return 'Not enter';
                                    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                  }}
                                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                />
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
                  </Card>
                );
              })}
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default PickJobPositionForm;
