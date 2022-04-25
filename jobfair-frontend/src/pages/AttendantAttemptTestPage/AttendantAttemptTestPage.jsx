import { useLocation } from 'react-router-dom';
import AttendantAttemptTestContainer from '../../containers/forms/AttendantAttemptTest/AttendantAttemptTest.container';
import React from 'react';

const AttendantAttemptTestPage = () => {
  const location = useLocation();
  const testId = location.state?.testId;
  return (
    <div className='page'>
      <AttendantAttemptTestContainer testId={testId} />
    </div>
  );
};

export default AttendantAttemptTestPage;
