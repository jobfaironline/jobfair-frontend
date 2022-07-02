import { Button, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFloppyDisk, faHistory, faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const ControlButtonGroup = (props) => {
  const { addMoreComponentHandle, saveHandle, reviewHandle, openBoothModal, saveIntoMyBoothLayout } = props;

  return (
    <div style={{ position: 'absolute', top: '180px', right: '10px' }}>
      <Space direction='vertical' align='end'>
        <Button
          style={{ width: '12rem' }}
          type='primary'
          onClick={addMoreComponentHandle}
          icon={<FontAwesomeIcon icon={faPlus} style={{ paddingRight: '0.5rem' }} />}>
          Add more component
        </Button>
        <Button
          style={{ width: '12rem' }}
          onClick={saveHandle}
          type='primary'
          icon={<FontAwesomeIcon icon={faFloppyDisk} style={{ paddingRight: '0.5rem' }} />}>
          Save
        </Button>
        <Button
          style={{ width: '12rem' }}
          type='primary'
          onClick={reviewHandle}
          icon={<FontAwesomeIcon icon={faEye} style={{ paddingRight: '0.5rem' }} />}>
          Review on map
        </Button>
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
      </Space>
    </div>
  );
};
