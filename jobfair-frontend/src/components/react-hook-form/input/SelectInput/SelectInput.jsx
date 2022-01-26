import React from "react";
import "./SelectInput.module.scss";
const SelectInput = ({ register, options, name, ...rest }) => {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
};
export default SelectInput;
