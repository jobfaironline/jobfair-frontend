import InterviewScheduleContainer from '../../containers/InterviewScheduleCalendar/InterviewSchedule.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const InterviewSchedulePage = () => (
  <PageLayoutWrapper className='page padding-bottom-page'>
    <InterviewScheduleContainer />
  </PageLayoutWrapper>
);

export default InterviewSchedulePage;
