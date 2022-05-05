import { useLocation } from 'react-router-dom';
import AttendantAttemptTestContainer from '../../containers/AttendantAttemptTest/AttendantAttemptTest.container';
import React from 'react';

const AttendantAttemptTestPage = () => {
  const location = useLocation();
  const testId = location.state?.testId;
  return (
    <div className='page padding-bottom-page'>
      <AttendantAttemptTestContainer testId={testId} />
    </div>
  );
};

export default AttendantAttemptTestPage;
