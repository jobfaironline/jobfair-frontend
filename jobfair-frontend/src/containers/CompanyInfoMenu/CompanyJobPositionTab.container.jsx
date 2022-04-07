import React from 'react';

import './CompanyJobPositionTab.styles.scss';
import { CompanyJobPositionTab } from '../../components/customized-components/BoothInfoMenu/CompanyJobPositionTab/CompanyJobPositionTab.component';
import { Modal } from 'antd';
import { SubmitResumeModalComponent } from '../../components/forms/SubmitResumeForm/SubmitResumeModal.component';
import { useSelector } from 'react-redux';

export const CompanyJobPositionTabContainer = (props) => {
  const { jobPositions, openInventory } = props;
  const inventory = useSelector((state) => state.inventory.data);

  const onClick = (item) => {
    openInventory(true);
    const closeModal = () => {
      modal.destroy();
    };
    const modal = Modal.info({
      title: 'Apply to job position',
      width: '70rem',
      closable: true,
      maskClosable: true,
      mask: false,
      wrapClassName: 'company-job-position-tab-modal',
      zIndex: 2,
      okText: 'Apply',
      // eslint-disable-next-line no-empty-function
      onOk: () => {},
      content: <SubmitResumeModalComponent jobPosition={item} inventory={inventory} closeModal={closeModal} />
    });
  };

  const componentProps = { jobPositions, onClick };

  return <CompanyJobPositionTab {...componentProps} />;
};
