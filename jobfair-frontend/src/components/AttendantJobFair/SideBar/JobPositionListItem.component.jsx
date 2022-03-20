import {List, Tag, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder, faFolderOpen, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {convertEnumToString} from "../../../utils/common";
import React from "react";

export const JobPositionComponent = (props) => {
  const {data, hoverListItem, onClick, onDragOver, onDragLeave, onDrop} = props;
  return (
    <List.Item className={"companyJobPositionTab"}
               onDragOver={onDragOver}
               onDragLeave={onDragLeave}
               onDrop={onDrop}
               onClick={onClick}
    >
      <div className={"jobInformation"}>
        <Typography.Title level={4} className={"title"}>{data.title}</Typography.Title>
        <div>
          {data.subCategoryDTOs.map(category => <Tag color="blue" className={"tagContainer"}>
            {category.name}
          </Tag>)}
        </div>
        <div style={{display: "flex"}}>
          <div style={{marginRight: "0.3rem"}}>
            <FontAwesomeIcon icon={faLocationDot}/>
          </div>
          <Typography.Text>{data.locationId ?? "Ho chi minh"}</Typography.Text>
        </div>
      </div>

      <div className={"jobType"}>
        <Tag color="blue" className={"tagContainer"}>
          {convertEnumToString(data.jobType)}
        </Tag>
        <Tag color="blue" className={"tagContainer"}>
          {convertEnumToString(data.jobLevel)}
        </Tag>
      </div>
      <div className={"folderIcon"}>
        {hoverListItem?.id === data.id ? <FontAwesomeIcon icon={faFolderOpen} size={"2x"}/> :
          <FontAwesomeIcon icon={faFolder} size={"2x"}/>}
      </div>

    </List.Item>
  )
}