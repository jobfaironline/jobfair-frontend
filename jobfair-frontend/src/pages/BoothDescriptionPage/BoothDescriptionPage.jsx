import { useParams } from 'react-router-dom';
import PickJobPositionFormContainer from '../../containers/forms/PickJobPositionForm/PickJobPositionForm.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const BoothDescriptionPage = () => {
  const { assignmentId } = useParams();
  return (
    <PageLayoutWrapper className='page'>
      <PickJobPositionFormContainer assignmentId={assignmentId} />
    </PageLayoutWrapper>
  );
};

export default BoothDescriptionPage;
