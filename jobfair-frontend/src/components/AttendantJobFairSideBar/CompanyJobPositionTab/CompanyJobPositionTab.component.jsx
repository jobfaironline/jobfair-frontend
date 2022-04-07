/* eslint-disable no-unused-vars */
import './CompanyJobPositionTab.component.scss';
import { JobPositionComponent } from '../JobPositionListItem/JobPositionListItem.component';
import { List } from 'antd';
import React from 'react';

export const CompanyJobPositionTab = (props) => {
  const { jobPositions, onClick } = props;
  return (
    <div style={{ padding: '0 20px 30px 0' }}>
      <List
        dataSource={jobPositions}
        renderItem={(item) => (
          <JobPositionComponent
            key={item.id}
            data={item}
            onClick={(_) => {
              onClick(item);
            }}
          />
        )}
      />
    </div>
  );
};
