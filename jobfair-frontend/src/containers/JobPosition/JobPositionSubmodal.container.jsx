import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import JobPositionDetailModalComponent from '../../components/JobPositionDetailModal/JobPositionDetailModal.component';
import React, { useEffect, useState } from 'react';

const JobPositionSubmodalContainer = ({ jobPositionId, visible, handleCloseModal }) => {
  const [data, setData] = useState(null);

  const jobPositions = useSelector((state) => state?.jobPosition?.data);

  useEffect(() => {
    setData(jobPositions?.filter((item) => item.id == jobPositionId)[0]);
  }, [jobPositionId]);

  return (
    <Modal
      wrapClassName='detail-modal'
      title="Job position's details"
      visible={visible}
      onCancel={handleCloseModal}
      footer={null}
      destroyOnClose>
      <JobPositionDetailModalComponent data={data} />
    </Modal>
  );
};

export default JobPositionSubmodalContainer;
