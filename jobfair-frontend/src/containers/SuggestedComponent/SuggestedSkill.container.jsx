import { SkillTagsConst } from '../../constants/JobPositionConst';
import React from 'react';
import SuggestedItemContainer from './SuggestedItem.container';

export const SuggestedSkillContainer = ({ onChange, disabled, defaultValue }) => {
  const handleContactNameSearch = (value) => {
    let res = [];
    if (!value) res = [];
    else {
      SkillTagsConst.map((skill) => {
        if (skill.name.toLowerCase().includes(value.toLowerCase())) res.push(skill.name);
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
