import React from "react";
import "./SelectInput.module.scss";
const SelectInput = ({ register, options, name, ...rest }) => {
  return (
    <select {...register(name)} {...rest} className="SelectInput">
      {options.map((value) => (
        <option value={value} className="optionInput">
          {value}
        </option>
      ))}
    </select>
  );
};
export default SelectInput;
