import React, {useState} from "react";

import {Modal, notification, Typography} from "antd";
import {CompanyJobPositionTab} from "../../components/AttendantJobFair/SideBar/CompanyJobPositionTab.component";
import JobPositionSubmodalDetailComponent from "../../components/JobPositionModal/JobPositionSubmodalDetail.component";
import "./CompanyJobPositionTab.styles.scss"
import {useSelector} from "react-redux";


const {Text} = Typography

export const CompanyJobPositionTabContainer = (props) => {
  const {jobPositions} = props;
  const [hoverJobPosition, setHoverJobPosition] = useState();
  const [visible, setVisible] = useState(false)
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
    Modal.info({
      title: "Are you sure?",
      onOk: () => {
        notification['success']({
          message: `Add cv ${cv.id} successfully to ${jobPosition.title}`,
        })
      }
    })
    setHoverJobPosition(undefined)
  }

  const componentProps = {jobPositions, hoverListItem: hoverJobPosition, onClick, onDragOver, onDragLeave, onDrop};


  return <CompanyJobPositionTab {...componentProps}/>
}