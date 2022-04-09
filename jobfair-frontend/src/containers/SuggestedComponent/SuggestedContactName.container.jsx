import React from 'react';
import SuggestedItemContainer from './SuggestedItem.container';

const SuggestedContactNameContainer = ({ suggestionList }) => {
  const handleContactNameSearch = (value) => {
    let res = [];
    if (!value) res = [];
    else {
      suggestionList.map((name) => {
        if (name.toLowerCase().includes(value.toLowerCase())) res.push(name);
      });
    }
    return res;
  };
  return <SuggestedItemContainer handleSearch={handleContactNameSearch} />;
};

export default SuggestedContactNameContainer;
