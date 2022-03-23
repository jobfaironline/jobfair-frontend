import React, {useState} from "react";
import styles from "../../pages/AttendantJobFairPage/AttendantJobFairPage.module.scss";
import {SideBarContainer} from "../../components/AttendantJobFair/SideBar/SideBar.container";
import {ControlTipsModalContainer} from "./ControlTipsModal.container";
import {AttendantJobFairBoothContainer} from "./AttendantJobFairBooth.container";
import {InventoryContainer} from "../../components/AttendantJobFair/Inventory/Inventory.container";

export const AttendantJobFairContainer = (props) => {
  const {companyBoothId, geckoClientRef} = props;
  const [tabState, setTabState] = useState({
    isShow: false,
    activeKey: "0",
  })
  const handleOpenDetail = (status, tabIndex) => {
    setTabState(prevState => {
      return {...prevState, isShow: status, activeKey: tabIndex}
    })
  }

  const [inventoryVisible, setInventoryVisible] = useState(false);
  const openInventory = (status) => {
    if (status !== undefined){
      setInventoryVisible(status)
    } else {
      setInventoryVisible(prevState => !prevState);
    }
  }

  return (
    <div className={styles.container}>
      <SideBarContainer companyBoothId={companyBoothId} isShow={tabState.isShow} activeKey={tabState.activeKey}
                        handleOpenDetail={handleOpenDetail} openInventory={openInventory}/>
      <div className={styles.booth}>
        <InventoryContainer onClick={openInventory} inventoryVisible={inventoryVisible}/>
        <ControlTipsModalContainer/>
        <AttendantJobFairBoothContainer companyBoothId={companyBoothId} handleOpenDetail={handleOpenDetail} geckoClientRef={geckoClientRef}/>
      </div>
      {/*<div>
              <ChatBox {...communicationProps} />
            </div>*/}
    </div>
  )
}