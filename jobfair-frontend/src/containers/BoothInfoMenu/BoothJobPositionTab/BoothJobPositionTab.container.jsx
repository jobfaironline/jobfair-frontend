import React, { useState } from 'react';

import './BoothJobPositionTab.styles.scss';
import { CompanyJobPositionTab } from '../../../components/customized-components/BoothInfoMenu/BoothJobPositionTab/BoothJobPositionTab.component';
import { Modal, notification } from 'antd';
import {
  RemoveResumeComponent,
  SubmitResumeModalComponent
} from '../../../components/forms/SubmitResumeForm/SubmitResumeModal.component';
import { draftApplication, submitApplication } from '../../../services/jobhub-api/ApplicationControllerService';
import { useSelector } from 'react-redux';
import ConfirmSubmitResumeFormComponent from '../../../components/forms/SubmitResumeForm/ConfirmSubmitResumeForm.component';
import JobPositionDetailModalComponent from '../../../components/customized-components/JobPositionDetailModal/JobPositionDetailModal.component';

export const BoothJobPositionTabContainer = (props) => {
  const { jobPositions, openInventory } = props;
  const inventory = useSelector((state) => state.inventory.data);
  const [selectedJobPosition, setSelectedJobPosition] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedResume, setSelectedResume] = useState();

  const onClick = (item) => {
    openInventory(true);
    setSelectedJobPosition(item);
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    openInventory(false);
    setSelectedJobPosition(undefined);
  };

  const onDragResumeOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDropResume = (event) => {
    const dragId = event.dataTransfer.getData('text/plain');
    const resume = inventory[dragId];
    setSelectedResume(resume);
  };
  const onRemoveResume = () => {
    setSelectedResume(undefined);
  };

  const onFinishSubmitForm = async (values) => {
    if (selectedResume === undefined) return;
    const body = {
      ...values,
      cvId: selectedResume.id,
      registrationJobPositionId: selectedJobPosition.id
    };
    try {
      const response = await draftApplication(body);
      const data = response.data;
      await submitApplication(data.id);
      notification['success']({
        message: 'Your application has been submitted'
      });
    } catch (err) {
      notification['error']({
        message: err.response.data.message
      });
    }
    setIsModalVisible(false);
    setSelectedResume(undefined);
  };

  const componentProps = { jobPositions, onClick };

  return (
    <>
      <CompanyJobPositionTab {...componentProps} />;
      <Modal
        title={'Apply to job position'}
        width={'70rem'}
        closable={true}
        maskClosable={true}
        onCancel={onModalClose}
        zIndex={2}
        okText={'Apply'}
        visible={isModalVisible}
        wrapClassName={'company-job-position-tab-modal'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <JobPositionDetailModalComponent data={selectedJobPosition} />
          {selectedResume === undefined ? (
            <>
              <SubmitResumeModalComponent onDragOver={onDragResumeOver} onDrop={onDropResume} />
            </>
          ) : (
            <>
              <RemoveResumeComponent selectedResume={selectedResume} onRemoveResume={onRemoveResume} />
              <ConfirmSubmitResumeFormComponent onFinish={onFinishSubmitForm} />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
