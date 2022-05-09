import { Checkbox } from 'antd';
import React from 'react';

const MultipleChoiceListComponent = ({ choicesList, selected, handleSelect, questionId }) => (
  <div>
    {choicesList.map(({ id, content, order }) => (
      <div key={id} className={'answer'}>
        <Checkbox.Group defaultValue={selected}>
          <Checkbox
            checked={selected.includes(id)}
            onChange={(e) => handleSelect(questionId, e.target.value, e.target.checked, true)}
            value={id}>
            {`${order}. ${content}`}
          </Checkbox>
        </Checkbox.Group>
      </div>
    ))}
  </div>
);

export default MultipleChoiceListComponent;
