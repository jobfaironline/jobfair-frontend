import './TestCountDown.styles.scss';
import { Card, Typography } from 'antd';
import { QUIZ_SAVE_INTERVAL_IN_SECOND } from '../../../constants/QuizConstant';
import Countdown from 'react-countdown';
import React, { useMemo, useRef } from 'react';

const { Title } = Typography;
const TestCountDownComponent = (props) => {
  const { data, isConfirm, handleFinish, handleSubmit, handleSave } = props;
  const { questions, endTime } = data;
  const minuteInterval = useRef(0);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      handleSubmit();
      return <Title level={3}>Out of time!!!</Title>;
    } else {
      return (
        <Title level={3}>
          Time left: {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </Title>
      );
    }
  };

  const countDown = useMemo(
    () => (
      <Countdown
        date={endTime}
        renderer={renderer}
        onTick={() => {
          if (minuteInterval.current === QUIZ_SAVE_INTERVAL_IN_SECOND) {
            handleSave();
            minuteInterval.current = 0;
            return;
          }
          minuteInterval.current += 1;
        }}
      />
    ),
    [endTime]
  );

  const actions = isConfirm
    ? [
        <Title level={4} onClick={handleSubmit}>
          Submit
        </Title>
      ]
    : [
        <Title level={4} onClick={handleFinish}>
          Finish
        </Title>
      ];

  return (
    <div className={'test-count-down'}>
      <Card className={'count-down-card'} actions={actions}>
        {countDown}
        <div className={'question-grid'}>
          {questions.map((question, index) => {
            let className = 'question-box';
            if (question.selected.length > 0) className += ' answered';
            return (
              <div
                key={question.id}
                className={className}
                onClick={() => {
                  document.getElementById(question.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}>
                {index + 1}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default TestCountDownComponent;
