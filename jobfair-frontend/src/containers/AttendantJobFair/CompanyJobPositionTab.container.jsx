import React, {useState} from "react";
import {Modal, notification} from "antd";
import {CompanyJobPositionTab} from "../../components/AttendantJobFair/SideBar/CompanyJobPositionTab.component";

export const CompanyJobPositionTabContainer = (props) => {
  const {jobPositions} = props;
  const [hoverJobPosition, setHoverJobPosition] = useState();

  const onClick = (item) => {
    Modal.info({
      title: "Job detail",
      onOk: () => {

      }
    });
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

  const componentProps = {jobPositions, hoverListItem: hoverJobPosition, onClick, onDragOver, onDragLeave, onDrop };


  return <CompanyJobPositionTab {...componentProps}/>
}