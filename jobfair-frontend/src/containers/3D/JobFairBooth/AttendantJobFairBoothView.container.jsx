import './AttendantJobFairBoothView.styles.scss';
import { BoothInfoMenuContainer } from '../../BoothInfoMenu/BoothInfoMenu.container';
import { ControlTipsModalContainer } from '../../ControlTipModal/ControlTipsModal.container';
import { InventoryContainer } from '../../Inventory/Inventory.container';
import { JobFairBoothContainer } from './JobFairBooth.container';
import { boothTabAction } from '../../../redux-flow/boothInfoTab/boothInfoTab-slice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const AttendantJobFairBoothViewContainer = (props) => {
  const { companyBoothId, geckoClientRef, communicationProps } = props;
  const location = useLocation();
  const { applicationId } = location.state ?? {};
  const dispatch = useDispatch();

  const [inventoryVisible, setInventoryVisible] = useState(false);

  useEffect(() => {
    if (applicationId) dispatch(boothTabAction.reset());
  }, []);

  const openInventory = (status) => {
    if (status !== undefined) setInventoryVisible(status);
    else setInventoryVisible((prevState) => !prevState);
  };

  return (
    <div>
      <BoothInfoMenuContainer
        companyBoothId={companyBoothId}
        openInventory={openInventory}
        communicationProps={communicationProps}
      />
      <div className={'booth'}>
        <InventoryContainer onClick={openInventory} inventoryVisible={inventoryVisible} />
        <ControlTipsModalContainer>
          <>
            <p>Movement controls:</p>
            <p>W/S: Translate Forward/Backward</p>
            <p>A/D: Rotate Left/Right</p>
          </>
        </ControlTipsModalContainer>
        <JobFairBoothContainer companyBoothId={companyBoothId} geckoClientRef={geckoClientRef} />
      </div>
    </div>
  );
};
