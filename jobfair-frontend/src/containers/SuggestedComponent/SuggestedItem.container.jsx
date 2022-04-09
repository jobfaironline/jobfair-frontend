import React, { useState } from 'react';
import SuggestedComponent from '../../components/commons/SuggestedComponent/SuggestedField.component';

const SuggestedItemContainer = ({ handleSearch }) => {
  const [suggestionData, setSuggestionData] = useState();
  const onSearch = async (value) => {
    const res = await handleSearch(value);
    setSuggestionData(res);
  };

  return <SuggestedComponent onSearch={onSearch} data={suggestionData} />;
};

export default SuggestedItemContainer;
