import React, {useState} from "react";
import {Col, Modal, notification, Row, Space, Tag, Typography} from "antd";
import {CompanyJobPositionTab} from "../../components/AttendantJobFair/SideBar/CompanyJobPositionTab.component";
import JobPositionDetailComponent from "../../components/JobPositionDetail/JobPositionDetail.component";
import JobPositionSubmodalContainer from "../JobPositionModal/JobPositionSubmodal.container";
import JobPositionSubmodal from "../../components/JobPositionModal/JobPositionSubmodal.component";
import {convertEnumToString} from "../../utils/common";
import JobPositionSubmodalDetailComponent from "../../components/JobPositionModal/JobPositionSubmodalDetail.component";

const {Text} = Typography

export const CompanyJobPositionTabContainer = (props) => {
  const {jobPositions} = props;
  const [hoverJobPosition, setHoverJobPosition] = useState();
  const [visible, setVisible] = useState(false)

  const onClick = (item) => {
    Modal.info({
      title: "Job detail",
      width: '70rem',
      closable: true,
      maskClosable: true,
      onOk: () => {

      },
      content: <JobPositionSubmodalDetailComponent data={item}/>
    })
  }

  const handleVisibleModal = () => {
    setVisible(true)
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
    Modal.info({
      title: "Are you sure?",
      onOk: () => {
        notification['success']({
          message: `Add cv ${dragId} successfully to ${jobPosition.title}`,
        })
      }
    })
    setHoverJobPosition(undefined)
  }

  const componentProps = {jobPositions, hoverListItem: hoverJobPosition, onClick, onDragOver, onDragLeave, onDrop};


  return <CompanyJobPositionTab {...componentProps}/>
}