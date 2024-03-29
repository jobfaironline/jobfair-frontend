import { getEmployeesAPI } from '../../services/jobhub-api/CompanyEmployeeControllerService';
import { handleCreateListNameFromListAccount } from '../../utils/common';
import React, { useEffect, useState } from 'react';
import SuggestedItemContainer from './SuggestedItem.container';

const SuggestedContactNameContainer = ({ companyId, onChange, disabled, defaultValue }) => {
  const [suggestionList, setSuggestionList] = useState([]);
  useEffect(() => {
    getEmployeesAPI({ companyId })
      .then((res) => {
        setSuggestionList(handleCreateListNameFromListAccount(res.data.content));
      })
      .catch(() => {
        //
      });
  }, []);
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

  return (
    <SuggestedItemContainer
      handleSearch={handleContactNameSearch}
      onChange={onChange}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  );
};

export default SuggestedContactNameContainer;
