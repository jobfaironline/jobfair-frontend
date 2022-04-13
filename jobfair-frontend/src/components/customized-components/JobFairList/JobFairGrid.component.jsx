import { Card, List, Typography } from 'antd';
import { convertToDateString } from '../../../utils/common';
import React from 'react';

const { Text } = Typography;
const JobFairGridComponent = (props) => {
  const { data, onClick } = props;
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
            style={{ width: 300 }}
            cover={<img src={item.thumbnailUrl} alt={item.name} onClick={() => onClick(item.id)} />}>
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
