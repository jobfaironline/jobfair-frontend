import { BoothAssignmentDetail } from '../../components/customized-components/BoothAssigmentDetail/BoothAssignmentDetail.component';
import { Divider, List, Modal } from 'antd';
import { getAssigmentByJobFairBoothId } from '../../services/jobhub-api/AssignmentControllerService';
import { getJobFairBoothByJobFairId } from '../../services/jobhub-api/JobFairBoothControllerService';
import React, { useEffect, useState } from 'react';

export const AssignEmployeeDetailModalContainer = (props) => {
  const { visible, onClose, jobFairId } = props;
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = await getJobFairBoothByJobFairId(jobFairId).then((response) => response.data);

    data = data.sort((booth1, booth2) => booth1.booth.name.localeCompare(booth2.booth.name));

    const assignmentPromises = [];
    for (const booth of data) {
      const promise = getAssigmentByJobFairBoothId(booth.id).then((response) => response.data);
      assignmentPromises.push(promise);
    }
    const assignments = await Promise.all(assignmentPromises);
    assignments.forEach((assignment, index) => {
      data[index].assignments = assignment === '' ? [] : assignment;
    });

    data = data.filter((booth) => booth.assignments.length > 0);
    setData(data);
  };

  return (
    <Modal title={'Assign employee list'} visible={visible} centered onOk={onClose} onCancel={onClose}>
      <List
        itemLayout='vertical'
        size='large'
        dataSource={data}
        renderItem={(item, index) => (
          <div key={item.id}>
            <BoothAssignmentDetail data={item} />
            {index !== data.length - 1 ? <Divider /> : null}
          </div>
        )}
      />
    </Modal>
  );
};
