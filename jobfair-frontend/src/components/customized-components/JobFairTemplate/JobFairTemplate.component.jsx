import '../JobFairGrid/JobFairGrid.styles.scss';
import { Card, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const JobFairTemplateComponent = ({ data, handleViewDetail, onAddClick }) => (
  <div style={{ minHeight: '60vh' }} className={'job-fair-grid'}>
    <List
      grid={{ gutter: 10, xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 }}
      dataSource={data}
      renderItem={(item) => {
        if (item.isFirst) {
          return (
            <List.Item>
              <Card
                className={'card add-card'}
                onClick={onAddClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  border: '1px solid #dddddd'
                }}
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
              className={'card'}
              style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
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
  </div>
);

export default JobFairTemplateComponent;
