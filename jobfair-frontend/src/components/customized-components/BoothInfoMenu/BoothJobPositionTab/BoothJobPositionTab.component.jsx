/* eslint-disable no-unused-vars */
import './BoothJobPositionTab.component.scss';
import { JobPositionComponent } from '../../JobPositionListItem/JobPositionListItem.component';
import { List } from 'antd';
import React from 'react';

export const CompanyJobPositionTab = (props) => {
  const { jobPositions, onClick, companyInfo } = props;
  return (
    <div style={{ padding: '0 20px 30px 0' }}>
      <List
        dataSource={jobPositions}
        style={{
          overflowY: 'scroll',
          overFlowX: 'auto',
          height: '85vh'
        }}
        renderItem={(item) => (
          <JobPositionComponent
            key={item.id}
            companyInfo={companyInfo}
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
