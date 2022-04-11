import { Card, List, Typography } from 'antd';
import { convertToDateString } from '../../../utils/common';
import React from 'react';

const { Text } = Typography;
const JobFairGridComponent = (props) => {
  const { data } = props;
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.name}>
            <img src={item.thumbnailUrl} />
            <Text>{convertToDateString(item.createTime)}</Text>
            <Text>{item.status}</Text>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default JobFairGridComponent;
