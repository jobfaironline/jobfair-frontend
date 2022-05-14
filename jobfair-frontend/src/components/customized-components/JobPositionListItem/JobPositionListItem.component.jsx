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
      onClick={onClick}
      style={{ width: 'max-content', marginBottom: '2rem' }}>
      <JobPositionDetailModalComponent data={data} companyInfo={companyInfo} />
      {/*//TODO: the code below is display job position as list, you can roll back to it anytime.*/}
      {/*<div className={'jobInformation'}>*/}
      {/*  <Typography.Title level={4} className={'title'}>*/}
      {/*    {data.title}*/}
      {/*  </Typography.Title>*/}
      {/*  <div>*/}
      {/*    {data.subCategoryDTOs.map((category) => (*/}
      {/*      <Tag color='blue' className={'tagContainer'}>*/}
      {/*        {category.name}*/}
      {/*      </Tag>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*  <div style={{ display: 'flex' }}>*/}
      {/*    <div style={{ marginRight: '0.3rem' }}>*/}
      {/*      <FontAwesomeIcon icon={faLocationDot} />*/}
      {/*    </div>*/}
      {/*    <Typography.Text>{data.locationId ?? 'Ho chi minh'}</Typography.Text>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={'jobType'}>*/}
      {/*  <Tag color='blue' className={'tagContainer'}>*/}
      {/*    {convertEnumToString(data.jobType)}*/}
      {/*  </Tag>*/}
      {/*  <Tag color='blue' className={'tagContainer'}>*/}
      {/*    {convertEnumToString(data.jobLevel)}*/}
      {/*  </Tag>*/}
      {/*</div>*/}
    </List.Item>
  );
};
