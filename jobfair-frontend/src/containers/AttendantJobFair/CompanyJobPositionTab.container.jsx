import React, {useState} from "react";

import {Modal, Typography} from "antd";
import {CompanyJobPositionTab} from "../../components/AttendantJobFair/SideBar/CompanyJobPositionTab.component";
import JobPositionSubmodalDetailComponent from "../../components/JobPositionModal/JobPositionSubmodalDetail.component";
import "./CompanyJobPositionTab.styles.scss"
import {useSelector} from "react-redux";
import ConfirmSubmitResumeComponent from "../../components/AttendantJobFair/SubmitCV/ConfirmSubmitCV.component";



export const CompanyJobPositionTabContainer = (props) => {
  const {jobPositions} = props;
  const [hoverJobPosition, setHoverJobPosition] = useState();
  const inventory = useSelector(state => state.inventory.data)

  const onClick = (item) => {
    Modal.info({
      title: "Job detail",
      width: '70rem',
      closable: true,
      maskClosable: true,
      wrapClassName: 'company-job-position-tab-modal',
      onOk: () => {

      },
      content: <JobPositionSubmodalDetailComponent data={item}/>
    })
  }

  const onDragOver = (event, jobPosition) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move";
    if (jobPosition.id !== hoverJobPosition) {
      setHoverJobPosition(jobPosition)
    }
  }

  const onDragLeave = (event) => {
    event.preventDefault();
    setHoverJobPosition(undefined);
  }


  const onDrop = (event, jobPosition) => {
    const dragId = event.dataTransfer.getData("text/plain");
    const cv = inventory[dragId];
    const closeModal = () => {
      modal.destroy();
    }
    const modal = Modal.info({
      title: "Confirm last time before submit your resume",
      width: '45rem',
      closable: true,
      maskClosable: true,
      wrapClassName: 'confirm-submit-resume',
      footer: null,

      content: <ConfirmSubmitResumeComponent dragId={dragId} cv={cv} jobPosition={jobPosition} closeModal={closeModal}/>
    })
    setHoverJobPosition(undefined)
  }

  const componentProps = {jobPositions, hoverListItem: hoverJobPosition, onClick, onDragOver, onDragLeave, onDrop};


  return <CompanyJobPositionTab {...componentProps}/>
}