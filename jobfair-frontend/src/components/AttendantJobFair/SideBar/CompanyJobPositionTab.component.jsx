import {List} from "antd";
import React from "react";
import "./CompanyJobPositionTab.component.scss"
import {JobPositionComponent} from "./JobPositionListItem.component";


export const CompanyJobPositionTab = (props) => {
  const {jobPositions, onClick} = props;
  return (
    <div style={{padding: "0 20px 30px 0"}}>
      <List
        dataSource={jobPositions}
        renderItem={item => (
          <JobPositionComponent
            key={item.id}
            data={item}
            onClick={_ => {
              onClick(item)
            }}
          />
        )}
      />
    </div>

  )
}