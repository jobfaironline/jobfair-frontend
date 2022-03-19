import React, {useMemo, useRef, useState} from "react";
import styles from "../../pages/AttendantJobFairPage/AttendantJobFairPage.module.scss";
import {SideBarContainer} from "../../components/AttendantJobFair/SideBar/SideBar.container";
import {ControlTipsModalContainer} from "./ControlTipsModal.container";
import {AttendantJobFairBoothContainer} from "./AttendantJobFairBooth.container";

export const AttendantJobFairContainer = (props) => {
  const {companyBoothId} = props;
  const [tabState, setTabState] = useState({
    isShow: false,
    activeKey: "0",
  })
  const handleOpenDetail = (status, tabIndex) => {
    setTabState(prevState => {
      return {...prevState, isShow: status, activeKey: tabIndex}
    })
  }

  const boothContainer = useMemo(() => {
    return  <AttendantJobFairBoothContainer companyBoothId={companyBoothId} handleOpenDetail={handleOpenDetail}/>
  }, []);

  return (
    <div className={styles.container}>
      <SideBarContainer companyBoothId={companyBoothId} isShow={tabState.isShow} activeKey={tabState.activeKey} handleOpenDetail={handleOpenDetail}/>
      <div className={styles.booth}>
        <ControlTipsModalContainer/>
        <AttendantJobFairBoothContainer companyBoothId={companyBoothId} handleOpenDetail={handleOpenDetail}/>
      </div>
      {/*<div>
              <ChatBox {...communicationProps} />
            </div>*/}
    </div>
  )
}