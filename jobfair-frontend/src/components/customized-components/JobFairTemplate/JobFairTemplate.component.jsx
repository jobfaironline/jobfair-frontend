import { Card, List, Typography } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import React from 'react';

const { Text } = Typography;
const JobFairTemplateComponent = ({ data, handleViewDetail }) => (
  <List
    grid={{
      gutter: 20
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card
          hoverable={true}
          style={{ width: 300 }}
          cover={<img src={item.thumbnailUrl} alt={item.name} />}
          extra={
            <a onClick={() => handleViewDetail(item.id)}>
              <MoreOutlined />
            </a>
          }>
          <div style={{ display: 'flex' }}>
            <div>
              <Card.Meta title={item.name} />
              <Text>{item.name}</Text>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Text>{item.description}</Text>
            </div>
          </div>
        </Card>
      </List.Item>
    )}
  />
);

export default JobFairTemplateComponent;
