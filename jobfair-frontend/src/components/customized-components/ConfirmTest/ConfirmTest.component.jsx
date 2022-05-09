import { Button, Card, Checkbox, List, Typography } from 'antd';
import React from 'react';

const ConfirmTestComponent = (props) => {
  const { testData, handleSubmit, handleReturn } = props;
  return (
    <div>
      <List
        grid={{
          gutter: 20,
          column: 1
        }}
        dataSource={testData.questions}
        renderItem={(item) => {
          const { order, title, id: questionId, selected } = item;
          return (
            <List.Item>
              <Card key={questionId} id={item.id} className={'test-question-component'}>
                <div style={{ display: 'flex' }}>
                  <Typography.Title level={4}>{`${order}. ${title}`}</Typography.Title>
                  <Checkbox style={{ marginLeft: 'auto', minWidth: '150px' }} checked={selected.length > 0}>
                    Has answered
                  </Checkbox>
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
      <div className={'button-container'}>
        <Button className={'button submit'} onClick={handleReturn}>
          Return to test
        </Button>
        <Button className={'button submit'} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ConfirmTestComponent;
