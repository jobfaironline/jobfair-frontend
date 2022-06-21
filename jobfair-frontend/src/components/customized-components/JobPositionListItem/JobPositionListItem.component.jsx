import { List } from 'antd';
import JobPositionDetailModalComponent from '../JobPositionDetailModal/JobPositionDetailModal.component';
import React from 'react';

export const JobPositionComponent = (props) => {
  const { data, onClick, onDragOver, onDragLeave, onDrop, companyInfo } = props;
  return (
    <List.Item
      className={'companyJobPositionTab'}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}>
      <JobPositionDetailModalComponent data={data} companyInfo={companyInfo} />
    </List.Item>
  );
};
