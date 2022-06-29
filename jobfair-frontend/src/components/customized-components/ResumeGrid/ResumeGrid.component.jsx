import { Card, List, Tooltip, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const ResumeGridComponent = (props) => {
  const { data, onAddCv, handleViewCvDetail, handleDeleteCv, handleEditCv } = props;

  const defaultImage = '/miku.jpg';
  return (
    <div className={'job-fair-grid'}>
      <List
        grid={{ gutter: 20, xs: 1, sm: 3, md: 3, lg: 5, xl: 5, xxl: 5 }}
        dataSource={data}
        renderItem={(item) => {
          if (item.isFirst) {
            return (
              <Card className={'card add-card'} hoverable={true} onClick={onAddCv}>
                <FontAwesomeIcon icon={faPlus} size={'xl'} />
              </Card>
            );
          }
          return (
            <Card
              hoverable={true}
              className={'card'}
              cover={
                <img src={item.thumbnailUrl ? item.thumbnailUrl : defaultImage} alt={item.name} className={'cover'} />
              }
              onClick={() => handleViewCvDetail(item.id)}>
              <div style={{ display: 'flex' }}>
                <Card.Meta
                  title={
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography.Text>{item.name}</Typography.Text>
                      <div style={{ marginLeft: '0.5rem' }} onClick={() => handleEditCv(item.id)}>
                        <Tooltip title={'Edit cv'}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Tooltip>
                      </div>
                    </div>
                  }
                  description={<Typography.Text>Latest update time: ...</Typography.Text>}
                />
                <div className={'card-footer'}>
                  <div className={'card-footer-item'} onClick={() => handleDeleteCv(item.id)}>
                    <Tooltip title={'Delete this cv'}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
};

export default ResumeGridComponent;
