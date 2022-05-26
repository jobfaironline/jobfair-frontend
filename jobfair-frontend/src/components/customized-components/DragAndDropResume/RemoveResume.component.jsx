import { Descriptions, Divider, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertEnumToString } from '../../../utils/common';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Text } = Typography;

export const RemoveResumeComponent = (props) => {
  const { selectedResume, onRemoveResume } = props;
  return (
    <>
      <Divider style={{ margin: '1rem 0' }} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <Descriptions title='CV detail' bordered={false} column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            <Descriptions.Item label={<Text strong>Name </Text>}>{selectedResume?.name}</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Email </Text>}>{selectedResume?.email}</Descriptions.Item>
            <Descriptions.Item label={<Text strong>Job level </Text>}>
              {convertEnumToString(selectedResume?.jobLevel)}
            </Descriptions.Item>
            <Descriptions.Item label={<Text strong>Job title </Text>}>{selectedResume?.jobTitle}</Descriptions.Item>
          </Descriptions>
        </div>
        <div
          className={'remove-resume'}
          style={{
            marginLeft: '3rem',
            display: 'flex',
            alignItems: 'center'
          }}>
          <FontAwesomeIcon icon={faTrash} size={'2x'} style={{ display: 'block' }} onClick={onRemoveResume} />
        </div>
      </div>
      <Divider style={{ margin: '1rem 0' }} />
    </>
  );
};
