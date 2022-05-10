import { Button, Space } from 'antd';
import React from 'react';

export const ControlButtonGroup = (props) => {
  const { addMoreComponentHandle, saveHandle, reviewHandle, onNext } = props;

  return (
    <div style={{ position: 'absolute', top: '136px', right: '10px' }}>
      <Space>
        <Button type='primary' onClick={addMoreComponentHandle}>
          Add more component
        </Button>
        <Button onClick={saveHandle} type='primary'>
          Save
        </Button>
        <Button type='primary' onClick={reviewHandle}>
          Review
        </Button>
        <Button type='primary' onClick={onNext}>
          Start description
        </Button>
      </Space>
    </div>
  );
};
