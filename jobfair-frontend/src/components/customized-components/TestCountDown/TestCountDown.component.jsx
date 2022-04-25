import './TestCountDown.styles.scss';
import { Button, Card, Typography } from 'antd';
import Countdown from 'react-countdown';
import React, { useRef } from 'react';

const { Text } = Typography;
const TestCountDownComponent = (props) => {
  const { duration, totalQuestion } = props;
  const clockRef = useRef();
  const handleStart = () => clockRef.current.start();
  const handlePause = () =>
    //TODO: call API when want to finish early;
    clockRef.current.pause();
  const handleStop = () => clockRef.current.stop();
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      //TODO: call API when count down is complete
      return <Text>Out of time!!!</Text>;
    } else {
      return (
        <span>
          Time left: {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </span>
      );
    }
  };
  const renderQuestionBox = (totalQuestion) =>
    [...Array(totalQuestion)].map((e, i) => (
      <div key={i} className={'question-box'}>
        {i}
      </div>
    ));
  return (
    <div>
      <Card
        title={<Countdown date={Date.now() + duration * 60000} renderer={renderer} ref={clockRef} />}
        className={'count-down-card'}>
        {renderQuestionBox(totalQuestion)}
        <Button onClick={handleStart}>Continue</Button>
        <Button onClick={handlePause}>Pause</Button>
        <Button onClick={handleStop}>Restart</Button>
      </Card>
    </div>
  );
};

export default TestCountDownComponent;
