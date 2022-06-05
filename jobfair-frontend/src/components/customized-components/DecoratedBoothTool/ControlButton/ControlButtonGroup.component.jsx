import { Button, Space } from 'antd';
import React from 'react';

export const ControlButtonGroup = (props) => {
  const { addMoreComponentHandle, saveHandle, reviewHandle, openBoothModal, saveIntoMyBoothLayout } = props;

  return (
    <div style={{ position: 'absolute', top: '136px', right: '10px' }}>
      <Space>
        <Button type='primary' onClick={addMoreComponentHandle}>
          Add more component
        </Button>
        <Button onClick={saveHandle} type='primary'>
          Save
        </Button>
        <Button type='primary' onClick={saveIntoMyBoothLayout}>
          Save this version to my booth layout
        </Button>
        <Button type='primary' onClick={reviewHandle}>
          Review
        </Button>
        <Button type='primary' onClick={openBoothModal}>
          My Booth layout
        </Button>
      </Space>
    </div>
  );
};
