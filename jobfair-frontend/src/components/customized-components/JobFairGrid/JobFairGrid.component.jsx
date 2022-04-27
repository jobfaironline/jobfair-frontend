import './JobFairGrid.styles.scss';
import { Card, List, Typography } from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertToDateString } from '../../../utils/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Text } = Typography;

const handleCardContent = (role, jobFair) => {
  switch (role) {
    case 'COMPANY_MANAGER':
      return (
        <>
          <div>
            <Card.Meta title={jobFair?.name} />
            <Text>{convertToDateString(jobFair?.createTime)}</Text>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Text>{jobFair?.status}</Text>
          </div>
        </>
      );
    case 'ATTENDANT':
      return (
        <>
          <Card.Meta title={jobFair?.name} description={jobFair?.companyName} />
          <div className={'card-footer'}>
            <div className={'card-footer-item'}>
              <HeartOutlined />
              <Text>{jobFair?.hearts}</Text>
            </div>
            <div className={'card-footer-item'}>
              <EyeOutlined />
              <Text>{jobFair?.eyes}</Text>
            </div>
          </div>
        </>
      );
  }
};
const JobFairGridComponent = (props) => {
  const { data, onClick, role, onAddJobFair } = props;
  const defaultImage = 'https://d3polnwtp0nqe6.cloudfront.net/General/jobhub.png';
  return (
    <div className={'job-fair-grid'}>
      <List
        grid={{ gutter: 20, xs: 1, sm: 3, md: 3, lg: 5, xl: 5, xxl: 5 }}
        dataSource={data}
        renderItem={(item) => {
          if (item.isFirst) {
            return (
              <Card className={'card add-card'} hoverable={true} onClick={onAddJobFair}>
                <FontAwesomeIcon icon={faPlus} size={'xl'} />
              </Card>
            );
          }
          return (
            <Card
              hoverable={true}
              className={'card'}
              cover={
                <img
                  src={item.thumbnailUrl ? item.thumbnailUrl : defaultImage}
                  alt={item.name}
                  onClick={() => onClick(item.id)}
                  className={'cover'}
                />
              }>
              <div style={{ display: 'flex' }}>{handleCardContent(role, item)}</div>
            </Card>
          );
        }}
      />
    </div>
  );
};

export default JobFairGridComponent;
