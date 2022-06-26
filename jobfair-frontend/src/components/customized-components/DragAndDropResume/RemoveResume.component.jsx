import { Descriptions, Divider, Tag, Typography } from 'antd';
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
          <Text strong style={{ fontSize: '1.2rem' }}>
            CV detail
          </Text>
          <Descriptions bordered={false} column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            <Descriptions.Item
              label={
                <Text strong style={{ fontSize: '1rem' }}>
                  Name{' '}
                </Text>
              }>
              {selectedResume?.name}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Text strong style={{ fontSize: '1rem' }}>
                  Skills{' '}
                </Text>
              }>
              {selectedResume?.skills.map((item) => (
                <Tag color='green' style={{ fontSize: '0.9rem', padding: '1px 5px' }}>
                  {item.name}
                </Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Text strong style={{ fontSize: '1rem' }}>
                  Job level{' '}
                </Text>
              }>
              <Tag color='purple' style={{ fontSize: '0.9rem', padding: '1px 5px' }}>
                {convertEnumToString(selectedResume?.jobLevel)}
              </Tag>
            </Descriptions.Item>
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
