import { Button, List } from 'antd';
import React from 'react';
import TestQuestionComponent from '../TestQuestion/TestQuestion.component';

const DoTestComponent = (props) => {
  const { handleSelect, testData, handleFinish } = props;
  return (
    <div>
      <List
        grid={{
          gutter: 20,
          column: 1
        }}
        dataSource={testData.questions}
        renderItem={(item) => (
          <List.Item>
            <TestQuestionComponent data={item} handleSelect={handleSelect} />
          </List.Item>
        )}
      />
      <div className={'button-container'}>
        <Button className={'button submit'} onClick={handleFinish}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default DoTestComponent;
