import { Button, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faHistory, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const ReviewDecorateControlButtonGroup = (props) => {
  const { openBoothModal, saveIntoMyBoothLayout, onClose, display } = props;

  return (
    <div style={{ position: 'absolute', top: '180px', right: '10px', zIndex: 10, display: display ? 'block' : 'none' }}>
      <Space direction='vertical' align='end'>
        <Button
          style={{ width: '12rem' }}
          type='primary'
          onClick={saveIntoMyBoothLayout}
          icon={<FontAwesomeIcon icon={faFloppyDisk} style={{ paddingRight: '0.5rem' }} />}>
          Save to gallery
        </Button>
        <Button
          style={{ width: '12rem' }}
          type='primary'
          onClick={openBoothModal}
          icon={<FontAwesomeIcon icon={faHistory} style={{ paddingRight: '0.5rem' }} />}>
          Layout gallery
        </Button>
        <Button
          style={{ width: '12rem' }}
          type='primary'
          onClick={onClose}
          icon={<FontAwesomeIcon icon={faRightFromBracket} style={{ paddingRight: '0.5rem' }} />}>
          Close
        </Button>
      </Space>
    </div>
  );
};
