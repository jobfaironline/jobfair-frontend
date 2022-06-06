import { useParams } from 'react-router-dom';
import PickJobPositionFormContainer from '../../containers/forms/PickJobPositionForm/PickJobPositionForm.container';
import React from 'react';

const BoothDescriptionPage = () => {
  const { assignmentId } = useParams();
  return (
    <div className='page'>
      <PickJobPositionFormContainer assignmentId={assignmentId} />
    </div>
  );
};

export default BoothDescriptionPage;
