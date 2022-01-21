import React from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./PasswordInput.module.scss";
const PasswordInput = ({ register, name, ...rest }) => {
  <Input.Password
    placeholder="input password"
    iconRender={(visible) =>
      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
    }
    {...register(name)}
    {...rest}
    className="InputPassword"
  />;
};
export default PasswordInput;
