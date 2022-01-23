import React from "react";
import Form from "../../components/react-hook-form/form/Form";
import TextInput from "../../components/react-hook-form/input/TextInput/TextInput";
import { schema } from "../../schema/login.schema";
const LoginPage = () => {
  const handelOnSubmit = (data) => console.log(data);
  return (
    <Form onSubmit={handelOnSubmit} schema={schema}>
      <TextInput name="username" />
      <TextInput name="password" type="password" />
      <button>Login</button>
    </Form>
  );
};

export default LoginPage;
