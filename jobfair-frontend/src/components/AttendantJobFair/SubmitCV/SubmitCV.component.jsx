import React, {useState} from "react";
import JobPositionSubmodalDetailComponent from "../../JobPositionModal/JobPositionSubmodalDetail.component";
import {Divider, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmSubmitResumeComponent from "./ConfirmSubmitCV.component";


const {Text} = Typography

export const SubmitCVComponent = props => {
  const {jobPosition, inventory, closeModal} = props;
  const [selectedCv, setSelectedCv] = useState();

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move";
  }


  const onDrop = (event) => {
    const dragId = event.dataTransfer.getData("text/plain");
    const cv = inventory[dragId];
    setSelectedCv(cv);
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <JobPositionSubmodalDetailComponent data={jobPosition}/>
      {selectedCv === undefined ?
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
              <Text strong style={{fontSize: '1.5rem'}}> {`CV: ${selectedCv.name} `}</Text>
            </div>
            <div className={"remove-cv"} style={{marginLeft: "3rem", display: "flex", alignItems: "center"}}>
              <FontAwesomeIcon icon={faTrash} size={"2x"} style={{display: "block"}} onClick={e => {
                setSelectedCv(undefined)
              }}/>
            </div>
          </div>
          <Divider style={{margin: "1rem 0"}}/>
          <ConfirmSubmitResumeComponent jobPosition={jobPosition} cv={selectedCv} closeModal={closeModal}/>
        </>
      }
    </div>
  )
}