import { Card, Checkbox, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;
const TestContentFormComponent = (props) => {
  const { title, mark, choicesList, handleSelect, id } = props;
  return (
    <Card title={`${title} - ${mark} points`}>
      {choicesList.map((choice, key) => (
        <div key={key}>
          <Checkbox defaultChecked={false} onChange={(e) => handleSelect(e, id)} />
          <Text strong>{choice.content}</Text>
        </div>
      ))}
      {/*<Form.List name={'choicesList'}>*/}
      {/*  {(fields) => (*/}
      {/*    <div>*/}
      {/*      {fields.map((field, fieldKey) => (*/}
      {/*        <>*/}
      {/*          <Form.Item name={[field.name, 'choice']}>*/}
      {/*            <Checkbox defaultChecked={false} />*/}
      {/*          </Form.Item>*/}
      {/*          <Form.Item name={[field.name, 'content']}>*/}
      {/*            <TextArea key={fieldKey} disabled />*/}
      {/*          </Form.Item>*/}
      {/*        </>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</Form.List>*/}
    </Card>
  );
};

export default TestContentFormComponent;
