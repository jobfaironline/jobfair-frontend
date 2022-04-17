import { Card, List, Typography } from 'antd';
import { convertToDateString } from '../../../utils/common';
import React from 'react';

const { Text } = Typography;
const JobFairGridComponent = (props) => {
  const { data, onClick } = props;
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
            <div style={{ display: 'flex' }}>
              <div>
                <Card.Meta title={item.name} />
                <Text>{convertToDateString(item.createTime)}</Text>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Text>{item.status}</Text>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default JobFairGridComponent;
