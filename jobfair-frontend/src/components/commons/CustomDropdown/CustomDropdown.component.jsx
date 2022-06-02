import { Divider, Input, Select, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const { Option } = Select;
let index = 0;

const CustomDropdownComponent = ({ itemList }) => {
  const [items, setItems] = useState(itemList);
  const [name, setName] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
  };

  return (
    <Select
      style={{
        width: '5rem'
      }}
      placeholder='domain...'
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0'
            }}
          />
          <Space align='center'>
            <Input value={name} onChange={onNameChange} placeholder='Input here...' />
            <Typography.Link
              onClick={addItem}
              style={{
                whiteSpace: 'nowrap'
              }}>
              <PlusOutlined />
            </Typography.Link>
          </Space>
        </>
      )}>
      {items.map((item) => (
        <Option key={item}>{item}</Option>
      ))}
    </Select>
  );
};

export default CustomDropdownComponent;
