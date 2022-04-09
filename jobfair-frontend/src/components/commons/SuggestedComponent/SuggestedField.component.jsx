import { AutoComplete, Input } from 'antd';
import React from 'react';

const SuggestedComponent = (props) => {
  const { data, onSearch, placeholder } = props;
  return (
    <AutoComplete onSearch={onSearch}>
      {data?.map((name) => (
        <AutoComplete.Option key={name} value={name}>
          {name}
        </AutoComplete.Option>
      ))}
      <Input placeholder={placeholder} />
    </AutoComplete>
  );
};

export default SuggestedComponent;
