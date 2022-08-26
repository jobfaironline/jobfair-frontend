import { TargetAttendants } from '../../constants/JobFairConst';
import React from 'react';
import SuggestedItemContainer from './SuggestedItem.container';

export const SuggestedTargetAttendantContainer = ({ onChange, disabled, defaultValue }) => {
  const handleContactNameSearch = (value) => {
    if (!value) return [];
    return TargetAttendants.filter((target) => target.name.toLowerCase().includes(value.toLowerCase())).map(
      (target) => target.name
    );
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
