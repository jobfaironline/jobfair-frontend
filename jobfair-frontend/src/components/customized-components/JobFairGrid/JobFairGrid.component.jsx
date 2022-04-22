import './JobFairGrid.styles.scss';
import { Card, List, Typography } from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { convertToDateString } from '../../../utils/common';
import React from 'react';

const { Text } = Typography;
//TODO: remove later
const fakeJobFairForAttendant = [
  {
    thumbnailUrl: 'https://d3polnwtp0nqe6.cloudfront.net/General/jobhub.png',
    name: 'fake job fair',
    companyName: 'Apple dai de',
    hearts: 101,
    eyes: 1000
  },
  {
    thumbnailUrl: 'https://d3polnwtp0nqe6.cloudfront.net/General/jobhub.png',
    name: 'fake job fair',
    companyName: 'Apple dai de',
    hearts: 102,
    eyes: 2000
  },
  {
    thumbnailUrl: 'https://d3polnwtp0nqe6.cloudfront.net/General/jobhub.png',
    name: 'fake job fair',
    companyName: 'Apple dai de',
    hearts: 103,
    eyes: 3000
  }
];

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
  const { data, onClick, role } = props;
  const defaultImage = 'https://d3polnwtp0nqe6.cloudfront.net/General/jobhub.png';
  return (
    <List
      grid={{
        gutter: 20
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable={true}
            style={{ width: 300, height: 260 }}
            cover={
              <img
                src={item.thumbnailUrl ? item.thumbnailUrl : defaultImage}
                alt={item.name}
                onClick={() => onClick(item.id)}
                style={{ width: 300, height: 157 }}
              />
            }>
            <div style={{ display: 'flex' }}>{handleCardContent(role, item)}</div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default JobFairGridComponent;
