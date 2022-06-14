import { useParams } from 'react-router-dom';
import AssignTaskContainer from '../../containers/AssignTask/AssignTask.container';
import React from 'react';

const AssignTaskPage = () => {
  const { boothId } = useParams();
  return (
    <div className='page'>
      <AssignTaskContainer boothId={boothId} />
    </div>
  );
};

export default AssignTaskPage;
