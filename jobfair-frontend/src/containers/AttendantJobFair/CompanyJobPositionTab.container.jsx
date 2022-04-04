import React from "react";

import {Modal} from "antd";
import {CompanyJobPositionTab} from "../../components/AttendantJobFair/SideBar/CompanyJobPositionTab.component";
import "./CompanyJobPositionTab.styles.scss"
import {useSelector} from "react-redux";
import {SubmitResumeModalComponent} from "../../components/AttendantJobFair/SubmitResume/SubmitResumeModal.component";


export const CompanyJobPositionTabContainer = (props) => {
  const {jobPositions, openInventory} = props;
  const inventory = useSelector(state => state.inventory.data)



  const onClick = (item) => {
    openInventory(true)
    const closeModal = () => {
      modal.destroy();
    }
    const modal = Modal.info({
      title: "Apply to job position",
      width: '70rem',
      closable: true,
      maskClosable: true,
      mask: false,
      wrapClassName: 'company-job-position-tab-modal',
      zIndex: 2,
      okText: "Apply",
      onOk: () => {

      },
      content: <SubmitResumeModalComponent jobPosition={item} inventory={inventory} closeModal={closeModal}/>
    })
  }

  const componentProps = {jobPositions, onClick};


  return <CompanyJobPositionTab {...componentProps}/>
}