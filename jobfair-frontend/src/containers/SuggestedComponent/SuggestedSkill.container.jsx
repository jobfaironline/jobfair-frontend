import { SkillTagsConst } from '../../constants/JobPositionConst';
import React from 'react';
import SuggestedItemContainer from './SuggestedItem.container';

export const SuggestedSkillContainer = ({ onChange, disabled, defaultValue }) => {
  const handleContactNameSearch = (value) => {
    if (!value) return [];
    return SkillTagsConst.filter((skill) => skill.name.toLowerCase().includes(value.toLowerCase())).map(
      (skill) => skill.name
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
