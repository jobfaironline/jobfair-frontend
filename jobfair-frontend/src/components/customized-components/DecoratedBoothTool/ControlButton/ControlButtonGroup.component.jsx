import { Button, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFloppyDisk, faHistory, faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const ControlButtonGroup = (props) => {
  const { addMoreComponentHandle, saveHandle, reviewHandle, openBoothModal, saveIntoMyBoothLayout } = props;

  return (
    <div style={{ position: 'absolute', top: '136px', right: '10px' }}>
      <Space direction='vertical'>
        <Button type='primary' onClick={addMoreComponentHandle} icon={<FontAwesomeIcon icon={faPlus} />}>
          Add more component
        </Button>
        <Button onClick={saveHandle} type='primary' icon={<FontAwesomeIcon icon={faFloppyDisk} />}>
          Set current layout
        </Button>
        <Button type='primary' onClick={saveIntoMyBoothLayout} icon={<FontAwesomeIcon icon={faFloppyDisk} />}>
          Save this booth version
        </Button>
        <Button type='primary' onClick={reviewHandle} icon={<FontAwesomeIcon icon={faEye} />}>
          Review on map
        </Button>
        <Button type='primary' onClick={openBoothModal} icon={<FontAwesomeIcon icon={faHistory} />}>
          Layout gallery
        </Button>
      </Space>
    </div>
  );
};
