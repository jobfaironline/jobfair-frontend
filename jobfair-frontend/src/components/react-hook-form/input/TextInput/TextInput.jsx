import React from "react";
import "./TextInput.module.scss";
const TextInput = ({ register, name, label, ...rest }) => {
  return (
    <div>
      <label for={label}>{label}</label> <br></br>
      <input {...register(name)} {...rest} className="TextInput" />{" "}
    </div>
  );
};
export default TextInput;
