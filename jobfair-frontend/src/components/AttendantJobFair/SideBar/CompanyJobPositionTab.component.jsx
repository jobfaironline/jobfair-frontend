import {List} from "antd";
import React from "react";
import "./CompanyJobPositionTab.component.scss"
import {JobPositionComponent} from "./JobPositionListItem.component";


export const CompanyJobPositionTab = (props) => {
  const {jobPositions, hoverListItem, onClick, onDragOver, onDragLeave, onDrop} = props;
  return (
    <div style={{padding: "0 20px 10px 0"}}>
      <List
        dataSource={jobPositions}
        renderItem={item => (
          <JobPositionComponent
            key={item.id}
            hoverListItem={hoverListItem}
            data={item}
            onClick={_ => {
              onClick(item)
            }}
            onDragOver={(e) => {
              onDragOver(e, item)
            }}
            onDragLeave={(e) => onDragLeave(e)}
            onDrop={(e) => onDrop(e, item)}
          />
        )}
      />
    </div>

  )
}