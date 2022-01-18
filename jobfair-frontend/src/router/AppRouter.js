import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AttendantRouter from "./AttendantRouter";
import StaffRouter from "./StaffRouter";
import AdminRouter from "./AdminRouter";
import CompanyEmployeeRouter from "./CompanyEmployee";
import CompanyManagerRouter from "./CompanyManagerRouter";
export default function AppRouter() {
  return (
    <Switch>
      //handle public Page //handle Role Attendant Pages //handle Role Company
      Employee Pages //handle Role Company Manager Pages //handle Role Admin
      Pages
    </Switch>
  );
}
