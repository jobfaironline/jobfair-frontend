import React from 'react';
import SuggestedItemContainer from './SuggestedItem.container';

const SuggestedContactEmailContainer = ({ suggestionList }) => {
  const handleContactNameSearch = (value) => {
    let res = [];
    if (!value || value.indexOf('@') >= 0) res = [];
    else {
      suggestionList.map((email) => {
        if (email.toLowerCase().includes(value.toLowerCase())) res.push(email);
      });
    }
    return res;
  };
  return <SuggestedItemContainer handleSearch={handleContactNameSearch} />;
};

export default SuggestedContactEmailContainer;
