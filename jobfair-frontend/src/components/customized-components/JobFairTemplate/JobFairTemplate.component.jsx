import { Card, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const JobFairTemplateComponent = ({ data, handleViewDetail, onAddClick }) => (
  <List
    grid={{ gutter: 20, xs: 1, sm: 3, md: 3, lg: 5, xl: 5, xxl: 5 }}
    dataSource={data}
    renderItem={(item) => {
      if (item.isFirst) {
        return (
          <List.Item>
            <Card
              onClick={onAddClick}
              style={{ width: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '260px' }}
              hoverable={true}>
              <FontAwesomeIcon icon={faPlus} size={'xl'} />
            </Card>
          </List.Item>
        );
      }
      return (
        <List.Item>
          <Card
            hoverable={true}
            style={{ width: 300, height: '260px' }}
            cover={<img src={item.thumbnailUrl} alt={item.name} />}
            onClick={() => handleViewDetail(item.id)}>
            <div>
              <Card.Meta title={item.name} description={item.description} />
            </div>
          </Card>
        </List.Item>
      );
    }}
  />
);

export default JobFairTemplateComponent;
