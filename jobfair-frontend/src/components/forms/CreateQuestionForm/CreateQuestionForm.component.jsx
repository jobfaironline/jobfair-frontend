import { Button, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

const { TextArea } = Input;
const CreateQuestionFormComponent = ({ form, onFinish }) => (
  <div>
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark='required'
      autoComplete='off'
      scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
      <Form.List name='questions' label='Questions'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Form.Item
                    {...restField}
                    label='Câu hỏi'
                    name={[name, 'name']}
                    hasFeedback
                    rules={[]}
                    style={{ width: 250 }}>
                    <TextArea placeholder='Nhập câu hỏi' />
                  </Form.Item>
                  <Form.List name={[name.answer, 'answerList']}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...field }) => (
                          <div key={`${name.answer}-${key}`} style={{ display: 'flex', flexDirection: 'row' }}>
                            <Form.Item
                              {...field}
                              label={'a'}
                              name={[name, 'name']}
                              hasFeedback
                              rules={[]}
                              style={{ width: 250 }}>
                              <TextArea placeholder={'Nhập đáp án...'} />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => {
                                remove(name);
                              }}
                            />
                          </div>
                        ))}
                        <Form.Item>
                          <Button
                            type='dashed'
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            style={{ width: '15%' }}>
                            Add new answer
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '15%' }}>
                Add new question
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  </div>
);

export default CreateQuestionFormComponent;
