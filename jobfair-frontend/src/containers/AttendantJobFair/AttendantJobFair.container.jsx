import React, {useState} from "react";
import styles from "../../pages/AttendantJobFairPage/AttendantJobFairPage.module.scss";
import {SideBarContainer} from "../../components/AttendantJobFair/SideBar/SideBar.container";
import {ControlTipsModalContainer} from "./ControlTipsModal.container";
import {AttendantJobFairBoothContainer} from "./AttendantJobFairBooth.container";

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

  return (
    <div className={styles.container}>
      <SideBarContainer companyBoothId={companyBoothId} isShow={tabState.isShow} activeKey={tabState.activeKey}
                        handleOpenDetail={handleOpenDetail}/>
      <div className={styles.booth}>
        <ControlTipsModalContainer/>
        <AttendantJobFairBoothContainer companyBoothId={companyBoothId} handleOpenDetail={handleOpenDetail} geckoClientRef={geckoClientRef}/>
      </div>
      {/*<div>
              <ChatBox {...communicationProps} />
            </div>*/}
    </div>
  )
}