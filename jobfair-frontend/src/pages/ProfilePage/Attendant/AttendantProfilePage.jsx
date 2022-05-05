import { Button } from 'antd';
import { PATH_ATTENDANT } from '../../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import AttendantProfileFormContainer from '../../../containers/forms/AttendantProfileForm/AttendantProfileForm.container';
import React from 'react';

const AttendantProfile = () => {
  const history = useHistory();

  return (
    <div className='page'>
      <Button
        onClick={() => {
          const url = generatePath(PATH_ATTENDANT.ATTEMPT_TEST_PAGE, {
            quizId: `38b4ed45-a092-4585-8a94-b6cf7a8cc688`
          });
          history.push(url);
        }}>
        Attempt test
      </Button>
      <AttendantProfileFormContainer />
    </div>
  );
};

AttendantProfile.propTypes = {};

export default AttendantProfile;
