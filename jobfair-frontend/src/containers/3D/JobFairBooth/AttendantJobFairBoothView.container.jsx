import './AttendantJobFairBoothView.styles.scss';
import { BoothInfoMenuContainer } from '../../BoothInfoMenu/BoothInfoMenu.container';
import { ControlTipsModalContainer } from '../../ControlTipModal/ControlTipsModal.container';
import { InventoryContainer } from '../../Inventory/Inventory.container';
import { JobFairBoothContainer } from './JobFairBooth.container';
import { SideBarComponent } from '../../../components/commons/SideBar/SideBar.component';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatBoxContainer from '../../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useState } from 'react';

export const AttendantJobFairBoothViewContainer = (props) => {
  const { companyBoothId, geckoClientRef, communicationProps } = props;
  const location = useLocation();
  const { applicationId } = location.state ?? {};
  const { activeKey } = useSelector((state) => state.boothTab);
  const [tabState, setTabState] = useState({
    isShow: false,
    activeKey
  });
  const handleOpenDetail = (status, tabIndex) => {
    setTabState((prevState) => ({ ...prevState, isShow: status, activeKey: tabIndex }));
  };

  const [inventoryVisible, setInventoryVisible] = useState(false);

  useEffect(() => {
    if (applicationId) handleOpenDetail(true, '0');
  }, []);

  const openInventory = (status) => {
    if (status !== undefined) setInventoryVisible(status);
    else setInventoryVisible((prevState) => !prevState);
  };

  return (
    <SideBarComponent
      rightSide={
        <div className={'booth'}>
          <InventoryContainer onClick={openInventory} inventoryVisible={inventoryVisible} />
          <ControlTipsModalContainer>
            <>
              <p>Movement controls:</p>
              <p>W/S: Translate Forward/Backward</p>
              <p>A/D: Rotate Left/Right</p>
            </>
          </ControlTipsModalContainer>
          <JobFairBoothContainer
            companyBoothId={companyBoothId}
            handleOpenDetail={handleOpenDetail}
            geckoClientRef={geckoClientRef}
          />
        </div>
      }
      leftSide={
        <BoothInfoMenuContainer
          companyBoothId={companyBoothId}
          isShow={tabState.isShow}
          handleOpenDetail={handleOpenDetail}
          openInventory={openInventory}
          chatBoxContainer={() => <ChatBoxContainer {...communicationProps} />}
        />
      }
      ratio={tabState.isShow ? 1.5 / 4 : 0.5 / 5}
      isOrganizeJobFair={false}
    />
  );
};
