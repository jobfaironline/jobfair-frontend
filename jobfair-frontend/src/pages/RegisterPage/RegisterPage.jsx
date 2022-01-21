import { Tabs } from "antd";
import React from "react";
import { companySchema } from "../../schema/register.company.schema";
import { attendantSchema } from "../../schema/register.attendant.schema";
import Form from "../../components/react-hook-form/form/Form";
import TextInput from "../../components/react-hook-form/input/TextInput/TextInput";
const RegisterPage = () => {
  const { TabPane } = Tabs;
  const handelOnSubmit = (data) => console.log(data);
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="ATTENDANT" key="1">
        <Form onSubmit={handelOnSubmit} schema={attendantSchema}>
          <TextInput name="attendantName" label="Attendant's Name" />
          <TextInput name="email" label="Email" />
          <TextInput name="password" type="password" label="Password" />
          <TextInput
            name="confirmPassword"
            type="password"
            label="Re-Password"
          />
          <br></br>
          <button>Submit</button>
        </Form>
      </TabPane>
      <TabPane tab="COMPANY" key="2">
        <Form onSubmit={handelOnSubmit} schema={companySchema}>
          <TextInput name="companyName" label="Company Name" />
          <TextInput name="email" label="Email" />
          <TextInput name="password" type="password" label="Password" />
          <TextInput
            name="confirmPassword"
            type="password"
            label="Re-Password"
          />
          <br></br>
          <button>Submit</button>
        </Form>
      </TabPane>
    </Tabs>
  );
};

export default RegisterPage;
