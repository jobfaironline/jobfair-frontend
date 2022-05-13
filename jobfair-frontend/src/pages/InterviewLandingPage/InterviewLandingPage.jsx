import { Button } from 'antd';
import { PATH_ATTENDANT } from '../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import React from 'react';

const InterviewLandingPage = () => {
  const history = useHistory();
  return (
    <div className='page'>
      <Button
        onClick={() => {
          const url = generatePath(PATH_ATTENDANT.INTERVIEW_ROOM_PAGE, {
            roomId: '123123abc'
          });
          history.push(url);
        }}>
        Join the interview meeting now
      </Button>
    </div>
  );
};

export default InterviewLandingPage;
