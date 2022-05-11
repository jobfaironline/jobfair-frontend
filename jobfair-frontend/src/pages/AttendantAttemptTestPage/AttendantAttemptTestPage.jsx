import { useLocation, useParams } from 'react-router-dom';
import AttendantAttemptTestContainer from '../../containers/AttendantAttemptTest/AttendantAttemptTest.container';
import React from 'react';

const AttendantAttemptTestPage = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const fromUrl = location.state?.from;

  return (
    <div className='page padding-bottom-page'>
      <AttendantAttemptTestContainer quizId={quizId} fromUrl={fromUrl} />
    </div>
  );
};

export default AttendantAttemptTestPage;
