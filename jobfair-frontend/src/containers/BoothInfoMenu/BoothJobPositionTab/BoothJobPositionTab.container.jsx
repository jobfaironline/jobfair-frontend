import React, { useState } from 'react';

import './BoothJobPositionTab.styles.scss';
import { CompanyJobPositionTab } from '../../../components/customized-components/BoothInfoMenu/BoothJobPositionTab/BoothJobPositionTab.component';
import { Modal } from 'antd';
import { SubmitResumeModalComponent } from '../../../components/forms/SubmitResumeForm/SubmitResumeModal.component';
import { useSelector } from 'react-redux';

export const BoothJobPositionTabContainer = (props) => {
  const { jobPositions, openInventory } = props;
  const inventory = useSelector((state) => state.inventory.data);
  const [selectedJobPosition, setSelectedJobPosition] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onClick = (item) => {
    openInventory(true);
    setSelectedJobPosition(item);
    setIsModalVisible(true);
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
        zIndex={2}
        okText={'Apply'}
        visible={isModalVisible}
        wrapClassName={'company-job-position-tab-modal'}>
        <SubmitResumeModalComponent jobPosition={selectedJobPosition} inventory={inventory} closeModal={closeModal} />
      </Modal>
    </>
  );
};
