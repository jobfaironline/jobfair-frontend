import { AutoComplete } from 'antd';
import React from 'react';

const SuggestedComponent = (props) => {
  const { data, onSearch, placeholder, onChange } = props;
  return (
    <AutoComplete onSearch={onSearch} placeholder={placeholder} onChange={onChange}>
      {data?.map((name) => (
        <AutoComplete.Option key={name} value={name}>
          {name}
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  );
};

export default SuggestedComponent;
