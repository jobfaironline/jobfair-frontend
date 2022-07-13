import { useParams } from 'react-router-dom';
import AssignTaskContainer from '../../containers/AssignTask/AssignTask.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const AssignTaskPage = () => {
  const { boothId } = useParams();
  return (
    <PageLayoutWrapper className='page'>
      <AssignTaskContainer boothId={boothId} />
    </PageLayoutWrapper>
  );
};

export default AssignTaskPage;
