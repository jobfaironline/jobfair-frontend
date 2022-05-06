import './AttendantAttempTestContainer.styles.scss';
import { Button, Card, Checkbox, List, Typography, notification } from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { getInProgressQuiz, saveQuiz, submitQuiz } from '../../services/jobhub-api/QuizControllerService';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import TestCountDownComponent from '../../components/customized-components/TestCountDown/TestCountDown.component';
import TestQuestionComponent from '../../components/customized-components/TestQuestion/TestQuestion.component';

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

const AttendantAttemptTestContainer = (props) => {
  const { quizId, fromUrl } = props;
  const history = useHistory();
  const [testData, setTestData] = useState();
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = (await getInProgressQuiz(quizId)).data;

      const questions = data.questionList.map((question, index) => ({
        order: index + 1,
        id: question.id,
        title: question.content,
        type: question.type,
        selected: question.choiceList.filter((choice) => choice.isSelected).map((choice) => choice.id),
        choicesList: question.choiceList.map((choice, index) => ({ ...choice, order: String.fromCharCode(97 + index) }))
      }));
      const testData = {
        ...data,
        questions
      };
      Reflect.deleteProperty(testData, 'questionList');
      setTestData(testData);
    } catch (e) {
      if (e.response.data.message.includes('Quiz has been taken.')) {
        notification['error']({
          message: `${e.response.data.message}`,
          duration: 2
        });
        history.goBack();
        return;
      }
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

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
  };

  const handleSave = async () => {
    const answers = {};
    const selectedChoiceIds = testData.questions
      .map((question) => question.selected)
      .reduce((prev, current) => {
        prev.push(...current);
        return prev;
      }, []);
    selectedChoiceIds.forEach((choiceId) => {
      answers[choiceId] = true;
    });
    try {
      await saveQuiz(testData.id, { answers });
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while saving data, try again later`,
        duration: 2
      });
    }
  };

  const handleSubmit = async () => {
    const answers = {};
    const selectedChoiceIds = testData.questions
      .map((question) => question.selected)
      .reduce((prev, current) => {
        prev.push(...current);
        return prev;
      }, []);
    selectedChoiceIds.forEach((choiceId) => {
      answers[choiceId] = true;
    });
    try {
      await saveQuiz(testData.id, { answers });
      await submitQuiz(testData.id);
      notification['success']({
        message: `Submit test successfully`
      });
      if (fromUrl) {
        history.push(fromUrl, {
          from: window.location.pathname,
          applicationId: testData.applicationId,
          cvId: testData.cvId,
          boothJobPositionId: testData.boothJobPositionId,
          quizId
        });
      } else history.goBack();
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while saving data, try again later`,
        duration: 2
      });
    }
  };

  if (testData === undefined) return <LoadingComponent isWholePage={true} />;

  return (
    <div className={'attendant-attempt-test-container'}>
      <div>
        <Card className={'test-description'}>
          <Title level={3}>Test for {testData.jobPositionTitle}</Title>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>{'PRJ321 - Final exam'}</Text>
          <Meta style={{ marginTop: '2rem', fontSize: 13 }} description={'*You have 20 minutes to attempt this test'} />
        </Card>
      </div>
      <TestCountDownComponent
        data={testData}
        isConfirm={isConfirm}
        handleFinish={handleFinish}
        handleSubmit={handleSubmit}
        handleSave={handleSave}
      />
      {isConfirm ? (
        <ConfirmTest testData={testData} handleReturn={handleReturn} handleSubmit={handleSubmit} />
      ) : (
        <DoTest handleSelect={handleSelect} testData={testData} handleFinish={handleFinish} />
      )}
    </div>
  );
};

export default AttendantAttemptTestContainer;
