import { Button } from 'antd';
import { PATH_ATTENDANT } from '../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const InterviewLandingPage = () => {
  const history = useHistory();
  return (
    <PageLayoutWrapper className='page'>
      <Button
        onClick={() => {
          const url = generatePath(PATH_ATTENDANT.INTERVIEW_ROOM_PAGE, {
            roomId: '123123abc'
          });
          history.push(url);
        }}>
        Join the interview meeting now
      </Button>
    </PageLayoutWrapper>
  );
};

export default InterviewLandingPage;
