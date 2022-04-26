import { getEmployeesAPI } from '../../services/jobhub-api/CompanyEmployeeControllerService';
import { handleCreateListEmailFromListAccount } from '../../utils/common';
import React, { useEffect, useState } from 'react';
import SuggestedItemContainer from './SuggestedItem.container';

const SuggestedContactEmailContainer = ({ companyId, onChange, disabled }) => {
  const [suggestionList, setSuggestionList] = useState([]);
  useEffect(() => {
    getEmployeesAPI({ companyId })
      .then((res) => {
        setSuggestionList(handleCreateListEmailFromListAccount(res.data.content));
      })
      .catch(() => {
        //
      });
  }, []);
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
  return <SuggestedItemContainer handleSearch={handleContactNameSearch} onChange={onChange} disabled={disabled} />;
};

export default SuggestedContactEmailContainer;
