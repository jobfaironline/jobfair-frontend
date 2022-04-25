import { Button } from 'antd';
import { PATH_ATTENDANT } from '../../../constants/Paths/Path';
import { useHistory } from 'react-router-dom';
import AttendantProfileFormContainer from '../../../containers/forms/AttendantProfileForm/AttendantProfileForm.container';
import React from 'react';

const AttendantProfile = () => {
  const history = useHistory();

  return (
    <div className='page'>
      <Button onClick={() => history.push(PATH_ATTENDANT.ATTEMPT_TEST_PAGE, { testId: 'acb123xyz' })}>
        Attempt test
      </Button>
      <AttendantProfileFormContainer />
    </div>
  );
};

AttendantProfile.propTypes = {};

export default AttendantProfile;
