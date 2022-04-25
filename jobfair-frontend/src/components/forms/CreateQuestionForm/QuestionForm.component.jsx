import './CreateQuestionForm.styles.scss';
import { Button, Card, Checkbox, Form, Input, Space, Tooltip, Typography } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import CreateQuestionFormComponent from './CreateQuestionForm.component';
import React from 'react';

const { TextArea } = Input;
const { Text } = Typography;
const QuestionFormComponent = ({ form, onFinish, data, handleEdit, arrKey }) => (
  <div>
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark='required'
      autoComplete='off'
      scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
      <Form.List name='questions'>
        {(fields, { add, remove }) => (
          <>
            <div className={'create-button-div'}>
              <Form.Item>
                <Button onClick={() => add('', 0)} block icon={<PlusOutlined />} className={'create-button'} />
              </Form.Item>
            </div>
            {fields.map(({ key, name, ...restField }) => {
              const id = data.questions[key]?.id;
              return (
                <Card key={key} className={'card-question'}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {data.questions[key] !== undefined ? (
                      <Checkbox
                        className={'edit-button'}
                        onChange={(e) => {
                          handleEdit(e, id);
                        }}
                      />
                    ) : null}
                    {arrKey.includes(id) ? (
                      <CreateQuestionFormComponent key={key} name={name} {...restField} />
                    ) : (
                      <>
                        <Text>{data.questions[key]?.content}</Text>
                        {data.questions[key]?.choicesList?.map((item) => (
                          <Space>
                            <Checkbox defaultChecked={item.isCorrect} disabled />
                            <Text strong>{item.content}</Text>
                          </Space>
                        ))}
                      </>
                    )}
                  </div>
                  <Tooltip title='Remove question'>
                    <div className={'remove-button'}>
                      <CloseOutlined onClick={() => remove(name)} />
                    </div>
                  </Tooltip>
                </Card>
              );
            })}
          </>
        )}
      </Form.List>
      <div className={'submit-button'}>
        <Button className={'text-area'}>Hủy</Button>
        <Form.Item>
          <Button className={'text-area'} htmlType='submit'>
            Lưu
          </Button>
        </Form.Item>
      </div>
    </Form>
  </div>
);

export default QuestionFormComponent;
