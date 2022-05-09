import { Radio } from 'antd';
import React from 'react';

const SingleAnswerChoiceListComponent = ({ choicesList, handleSelect, questionId, selected }) => (
  <div>
    <Radio.Group
      onChange={(e) => handleSelect(questionId, e.target.value, e.target.checked, false)}
      value={selected[0]}>
      {choicesList.map(({ id, content, order }) => (
        <div key={id} className={'answer'}>
          <Radio value={id}>{`${order}. ${content}`}</Radio>
        </div>
      ))}
    </Radio.Group>
  </div>
);

export default SingleAnswerChoiceListComponent;
