import React, {useState} from "react";
import JobPositionSubmodalDetailComponent from "../../JobPositionModal/JobPositionSubmodalDetail.component";
import {Divider, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmSubmitResumeComponent from "./ConfirmSubmitResume.component";


const {Text} = Typography

export const SubmitResumeModalComponent = props => {
  const {jobPosition, inventory, closeModal} = props;
  const [selectedResume, setSelectedResume] = useState();

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move";
  }


  const onDrop = (event) => {
    const dragId = event.dataTransfer.getData("text/plain");
    const resume = inventory[dragId];
    setSelectedResume(resume);
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <JobPositionSubmodalDetailComponent data={jobPosition}/>
      {selectedResume === undefined ?
        <div style={{
          width: "100%",
          padding: "20px",
          background: '#fafafa',
          border: '1px dashed #d9d9d9',
          textAlign: "center"
        }}
             onDragOver={onDragOver}
             onDrop={onDrop}
        >
          Drag your cv here
        </div> :
        <>
          <Divider style={{margin: "1rem 0"}}/>
          <div style={{display: "flex", flexDirection: "row"}}>
            <div>
              <Text strong style={{fontSize: '1.5rem'}}> {`CV: ${selectedResume.name} `}</Text>
            </div>
            <div className={"remove-resume"} style={{marginLeft: "3rem", display: "flex", alignItems: "center"}}>
              <FontAwesomeIcon icon={faTrash} size={"2x"} style={{display: "block"}} onClick={e => {
                setSelectedResume(undefined)
              }}/>
            </div>
          </div>
          <Divider style={{margin: "1rem 0"}}/>
          <ConfirmSubmitResumeComponent jobPosition={jobPosition} resume={selectedResume} closeModal={closeModal}/>
        </>
      }
    </div>
  )
}