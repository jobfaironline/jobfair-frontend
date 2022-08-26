import './AttendantAttempTestContainer.styles.scss';
import { Card, Typography, notification } from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { getInProgressQuiz, saveQuiz, submitQuiz } from '../../services/jobhub-api/QuizControllerService';
import { useHistory } from 'react-router-dom';
import ConfirmTestComponent from '../../components/customized-components/ConfirmTest/ConfirmTest.component';
import DoTestComponent from '../../components/customized-components/DoTest/DoTest.component';
import React, { useEffect, useState } from 'react';
import TestCountDownComponent from '../../components/customized-components/TestCountDown/TestCountDown.component';

const { Title } = Typography;
const { Meta } = Card;

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
          <Meta
            style={{ marginTop: '2rem', fontSize: 13 }}
            description={`*You have ${testData.duration} minutes to attempt this test`}
          />
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
        <ConfirmTestComponent testData={testData} handleReturn={handleReturn} handleSubmit={handleSubmit} />
      ) : (
        <DoTestComponent handleSelect={handleSelect} testData={testData} handleFinish={handleFinish} />
      )}
    </div>
  );
};

export default AttendantAttemptTestContainer;
