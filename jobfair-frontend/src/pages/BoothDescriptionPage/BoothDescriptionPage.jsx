import { useParams } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import PickJobPositionFormContainer from '../../containers/forms/PickJobPositionForm/PickJobPositionForm.container';
import React from 'react';

const BoothDescriptionPage = () => {
  const { assignmentId } = useParams();
  return (
    <PageLayoutWrapper className='page'>
      <PickJobPositionFormContainer assignmentId={assignmentId} />
    </PageLayoutWrapper>
  );
};

export default BoothDescriptionPage;
