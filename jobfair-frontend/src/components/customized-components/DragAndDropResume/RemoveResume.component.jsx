import { Divider, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <Text strong style={{ fontSize: '1.5rem' }}>
            {' '}
            {`CV: ${selectedResume.name} `}
          </Text>
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
