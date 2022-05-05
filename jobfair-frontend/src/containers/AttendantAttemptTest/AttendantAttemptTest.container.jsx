import './AttendantAttempTestContainer.styles.scss';
import { Button, Card, Checkbox, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import TestCountDownComponent from '../../components/customized-components/TestCountDown/TestCountDown.component';
import TestQuestionComponent from '../../components/customized-components/TestQuestion/TestQuestion.component';

const fakeData = [
  {
    order: 1,
    id: 'id1',
    title: 'con bo co bao nhieu cai canh',
    type: '0',
    selected: [],
    choicesList: [
      {
        order: 'a',
        id: '123',
        content: 'mot cai'
      },
      {
        order: 'b',
        id: 'tien',
        content: '2 cai'
      },
      {
        order: 'c',
        id: 'tien1',
        content: '5  cai'
      },
      {
        order: 'd',
        id: 'tien2',
        content: '10 cai'
      }
    ]
  },
  {
    selected: [],
    order: 2,
    id: 'id2',
    title: 'con bo co bao nhieu cai canh',
    mark: 0.5,
    type: '1',
    choicesList: [
      {
        order: 'a',
        id: 'tien3',
        content: 'mot cai'
      },
      {
        order: 'b',
        id: 'tie4',
        content: '2 cai'
      },
      {
        order: 'c',
        id: 'tie3',
        content: '5  cai'
      },
      {
        order: 'd',
        id: 'tie123',
        content: '10 cai'
      }
    ]
  },
  {
    selected: [],
    order: 3,
    id: 'id3',
    title: 'con bo co bao nhieu cai canh',
    type: '0',
    choicesList: [
      {
        order: 'a',
        id: '123',
        content: 'mot cai'
      },
      {
        order: 'b',
        id: 'tien',
        content: '2 cai'
      },
      {
        order: 'c',
        id: 'tien1',
        content: '5  cai'
      },
      {
        order: 'd',
        id: 'tien2',
        content: '10 cai'
      }
    ]
  },
  {
    selected: [],
    order: 4,
    id: 'id4',
    title: 'con bo co bao nhieu cai canh',
    type: '0',
    choicesList: [
      {
        order: 'a',
        id: '123',
        content: 'mot cai'
      },
      {
        order: 'b',
        id: 'tien',
        content: '2 cai'
      },
      {
        order: 'c',
        id: 'tien1',
        content: '5  cai'
      },
      {
        order: 'd',
        id: 'tien2',
        content: '10 cai'
      }
    ]
  },
  {
    selected: [],
    order: 5,
    id: 'id5',
    title: 'con bo co bao nhieu cai canh',
    type: '0',
    choicesList: [
      {
        order: 'a',
        id: '123',
        content: 'mot cai'
      },
      {
        order: 'b',
        id: 'tien',
        content: '2 cai'
      },
      {
        order: 'c',
        id: 'tien1',
        content: '5  cai'
      },
      {
        order: 'd',
        id: 'tien2',
        content: '10 cai'
      }
    ]
  },
  {
    selected: [],
    order: 6,
    id: 'id6',
    title: 'con bo co bao nhieu cai canh',
    type: '0',
    choicesList: [
      {
        order: 'a',
        id: '123',
        content: 'mot cai'
      },
      {
        order: 'b',
        id: 'tien',
        content: '2 cai'
      },
      {
        order: 'c',
        id: 'tien1',
        content: '5  cai'
      },
      {
        order: 'd',
        id: 'tien2',
        content: '10 cai'
      }
    ]
  }
];

const quizData = {
  duration: 20,
  questions: fakeData
};

const { Text, Title } = Typography;
const { Meta } = Card;

const DoTest = (props) => {
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

const ConfirmTest = (props) => {
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
                  <Title level={4}>{`${order}. ${title}`}</Title>
                  <Checkbox style={{ marginLeft: 'auto' }} checked={selected.length > 0}>
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

const AttendantAttemptTestContainer = (props) => {
  const { testId } = props;
  const [testData, setTestData] = useState(quizData);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {}, []);

  const handleSelect = (questionId, choiceId, isChecked, isMultiple) => {
    setTestData((prevState) => {
      const question = prevState.questions.find((question) => question.id === questionId);
      if (isMultiple) {
        if (isChecked) question.selected.push(choiceId);
        else question.selected = question.selected.filter((choice) => choice === choiceId);
      } else question.selected = [choiceId];
      return { ...prevState };
    });
  };

  const handleFinish = () => {
    setIsConfirm(true);
  };

  const handleReturn = () => {
    setIsConfirm(false);
  }

  const handleSubmit = () => {

  }

  return (
    <div className={'attendant-attempt-test-container'}>
      <div>
        <Card className={'test-description'}>
          <Title level={3}>Test for {'tien tt'}</Title>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>{'PRJ321 - Final exam'}</Text>
          <Meta style={{ marginTop: '2rem', fontSize: 13 }} description={'*You have 20 minutes to attempt this test'} />
        </Card>
      </div>
      <TestCountDownComponent data={testData} isConfirm={isConfirm} handleFinish={handleFinish} handleSubmit={handleSubmit}/>
      {isConfirm ? (
        <ConfirmTest testData={testData} handleReturn={handleReturn} handleSubmit={handleSubmit} />
      ) : (
        <DoTest handleSelect={handleSelect} testData={testData} handleFinish={handleFinish} />
      )}
    </div>
  );
};

export default AttendantAttemptTestContainer;
