import { useParams } from 'react-router-dom';
import AssignTaskContainer from '../../containers/AssignTask/AssignTask.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const AssignTaskPage = () => {
  const { boothId } = useParams();
  return (
    <PageLayoutWrapper className='page'>
      <AssignTaskContainer boothId={boothId} />
    </PageLayoutWrapper>
  );
};

export default AssignTaskPage;
