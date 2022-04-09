import { Select } from 'antd';
import { SkyType } from './Sky.component';
import React from 'react';

const { Option } = Select;

export const SkyTypeSelect = (props) => {
  const { onChange } = props;
  return (
    <Select
      labelInValue
      defaultValue={{ value: 'Sunset' }}
      style={{ width: 120, position: 'absolute', zIndex: 10 }}
      onChange={onChange}>
      <Option value={SkyType.Sunset}>Sunset</Option>
      <Option value={SkyType.Morning}>Morning</Option>
      <Option value={SkyType.Night}>Night</Option>
    </Select>
  );
};
