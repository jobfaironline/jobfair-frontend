import { Card, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const JobFairThumbnailComponent = (props) => {
  const { urlImage } = props;
  return (
    <div>
      <Card style={{ width: 500, height: 300 }} cover={<img src={urlImage} />} bordered={false}>
        <Card.Meta
          title={
            <Space size='middle'>
              <div>
                <FontAwesomeIcon icon={faHeart} />
                123
              </div>
              <div>
                <FontAwesomeIcon icon={faEye} />
                123
              </div>
              <div>
                <FontAwesomeIcon icon={faShare} />
                123
              </div>
            </Space>
          }
        />
      </Card>
    </div>
  );
};
export default JobFairThumbnailComponent;
