import './TestQuestionComponent.styles.scss';
import { Card, Typography } from 'antd';
import { QuestionType } from '../../../constants/QuizConstant';
import MultipleChoiceListComponent from '../MultipleAnswerChoiceList/MultipleChoiceList.component';
import React from 'react';
import SingleAnswerChoiceListComponent from '../SingleAnswerChoiceList/SingleAnswerChoiceList.component';

const { Title } = Typography;
const TestQuestionComponent = (props) => {
  const { data, handleSelect } = props;
  const { order, title, choicesList, id: questionId, type, selected } = data;

  return (
    <Card id={questionId} className={'test-question-component'}>
      <Title level={4}>{`${order}. ${title}`}</Title>
      {type === QuestionType.ONE_CHOICE ? 'Choose 1 answer' : 'Choose multiple answers'}
      {type === QuestionType.ONE_CHOICE ? (
        <SingleAnswerChoiceListComponent
          choicesList={choicesList}
          handleSelect={handleSelect}
          questionId={questionId}
          selected={selected}
        />
      ) : (
        <MultipleChoiceListComponent
          choicesList={choicesList}
          selected={selected}
          handleSelect={handleSelect}
          questionId={questionId}
        />
      )}
    </Card>
  );
};

export default TestQuestionComponent;
