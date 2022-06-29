import AttendantProfileFormContainer from '../../../containers/forms/AttendantProfileForm/AttendantProfileForm.container';
import React from 'react';
import PageLayoutWrapper from '../../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const AttendantProfile = () => (
  <PageLayoutWrapper className='page'>
    <AttendantProfileFormContainer />
  </PageLayoutWrapper>
);

AttendantProfile.propTypes = {};

export default AttendantProfile;
