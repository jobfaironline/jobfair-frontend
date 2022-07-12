import AttendantProfileFormContainer from '../../../containers/forms/AttendantProfileForm/AttendantProfileForm.container';
import PageLayoutWrapper from '../../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const AttendantProfile = () => (
  <PageLayoutWrapper className='page'>
    <AttendantProfileFormContainer />
  </PageLayoutWrapper>
);

AttendantProfile.propTypes = {};

export default AttendantProfile;
