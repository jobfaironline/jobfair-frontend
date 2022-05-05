import './TestCountDown.styles.scss';
import { Card, Typography } from 'antd';
import Countdown from 'react-countdown';
import React, { useMemo, useRef } from 'react';

const { Title } = Typography;
const TestCountDownComponent = (props) => {
  const { data, isConfirm, handleFinish, handleSubmit } = props;
  const { duration, questions } = data;
  const clockRef = useRef();

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      //TODO: call API when count down is complete
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
    () => <Countdown date={Date.now() + duration * 60000} renderer={renderer} ref={clockRef} />,
    [duration]
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
