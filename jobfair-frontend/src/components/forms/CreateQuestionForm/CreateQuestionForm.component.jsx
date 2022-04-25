import { Button, Checkbox, Form } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { handleAlphabeticalOrder } from '../../../utils/questionUtil';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';

const CreateQuestionFormComponent = (key, name, restField) => (
  <>
    <Form.Item
      {...restField}
      label={`${key + 1}. Câu hỏi`}
      name={[name, 'content']}
      hasFeedback
      rules={[]}
      style={{ width: 400, marginBottom: '1rem' }}>
      <TextArea placeholder='Nhập câu hỏi' autoSize={{ minRows: 1 }} className={'text-area'} />
    </Form.Item>
    <Form.List name={[name, 'choicesList']}>
      {(answers, { add, remove }) => (
        <>
          {answers.map(({ key, name, ...field }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item {...field} name={[name, 'isCorrect']} style={{ display: 'inline-block' }}>
                <Checkbox defaultChecked={true} />
              </Form.Item>
              <Form.Item
                {...field}
                label={handleAlphabeticalOrder(key + 1)}
                name={[name, 'content']}
                hasFeedback
                rules={[]}
                style={{ width: 370, marginLeft: '1rem' }}>
                <TextArea placeholder={'Nhập đáp án...'} autoSize={{ minRows: 1 }} className={'text-area'} />
              </Form.Item>
              <div className={'minus-div'}>
                <Button
                  size='small'
                  className={'minus-button'}
                  onClick={() => {
                    remove(name);
                  }}>
                  <MinusOutlined />
                </Button>
              </div>
            </div>
          ))}
          <Form.Item>
            <Button
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
              style={{ width: '400px', borderRadius: '10px', backgroundColor: '#C4C4C4' }}
            />
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default CreateQuestionFormComponent;
