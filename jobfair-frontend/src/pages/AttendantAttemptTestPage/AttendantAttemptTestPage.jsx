import { useParams } from 'react-router-dom';
import AttendantAttemptTestContainer from '../../containers/AttendantAttemptTest/AttendantAttemptTest.container';
import React from 'react';

const AttendantAttemptTestPage = () => {
  const { quizId } = useParams();
  return (
    <div className='page padding-bottom-page'>
      <AttendantAttemptTestContainer quizId={quizId} />
    </div>
  );
};

export default AttendantAttemptTestPage;
