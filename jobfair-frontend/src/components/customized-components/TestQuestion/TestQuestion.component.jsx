import './TestQuestionComponent.styles.scss';
import { Card, Checkbox, Radio, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;
const TestQuestionComponent = (props) => {
  const { data, handleSelect } = props;
  const { order, title, choicesList, id: questionId, type, selected } = data;

  const MultipleAnswerChoiceList = ({ choicesList }) => (
    <div>
      {choicesList.map(({ id, content, order }) => (
        <div key={id} className={'answer'}>
          <Checkbox
            checked={selected.includes(id)}
            onChange={(e) => handleSelect(questionId, e.target.value, e.target.checked, true)}
            value={id}>
            {`${order}. ${content}`}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  const OneAnswerChoiceList = ({ choicesList }) => (
    <div>
      <Radio.Group
        onChange={(e) => handleSelect(questionId, e.target.value, e.target.checked, false)}
        value={selected[0]}>
        {choicesList.map(({ id, content, order }) => (
          <div key={id} className={'answer'}>
            <Radio value={id}>{`${order}. ${content}`}</Radio>
          </div>
        ))}
      </Radio.Group>
    </div>
  );

  return (
    <Card id={questionId} className={'test-question-component'}>
      <Title level={4}>{`${order}. ${title}`}</Title>
      {type === '0' ? 'Choose 1 answer' : 'Choose multiple answers'}
      {type === '0' ? (
        <OneAnswerChoiceList choicesList={choicesList} />
      ) : (
        <MultipleAnswerChoiceList choicesList={choicesList} />
      )}
    </Card>
  );
};

export default TestQuestionComponent;
