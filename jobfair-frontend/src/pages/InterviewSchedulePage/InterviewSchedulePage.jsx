import InterviewScheduleContainer from '../../containers/InterviewScheduleCalendar/InterviewSchedule.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const InterviewSchedulePage = () => (
  <PageLayoutWrapper className='page padding-bottom-page'>
    <InterviewScheduleContainer />
  </PageLayoutWrapper>
);

export default InterviewSchedulePage;
