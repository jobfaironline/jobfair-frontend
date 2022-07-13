import { useLocation, useParams } from 'react-router-dom';
import AttendantAttemptTestContainer from '../../containers/AttendantAttemptTest/AttendantAttemptTest.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const AttendantAttemptTestPage = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const fromUrl = location.state?.from;

  return (
    <PageLayoutWrapper className='page padding-bottom-page'>
      <AttendantAttemptTestContainer quizId={quizId} fromUrl={fromUrl} />
    </PageLayoutWrapper>
  );
};

export default AttendantAttemptTestPage;
