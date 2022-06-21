import './BoothJobPositionTab.component.scss';
import { JobPositionComponent } from '../../JobPositionListItem/JobPositionListItem.component';
import { List } from 'antd';
import React from 'react';

export const CompanyJobPositionTab = (props) => {
  const { jobPositions, onClick } = props;
  return (
    <List
      dataSource={jobPositions}
      style={{
        overflowY: 'scroll',
        overFlowX: 'auto'
      }}
      renderItem={(item) => (
        <JobPositionComponent
          key={item.id}
          data={item}
          onClick={() => {
            onClick(item);
          }}
        />
      )}
    />
  );
};
