import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AttendantRouter from "./AttendantRouter";
import StaffRouter from "./StaffRouter";
import AdminRouter from "./AdminRouter";
import CompanyEmployeeRouter from "./CompanyEmployeeRouter";
import CompanyManagerRouter from "./CompanyManagerRouter";
//init Page
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import FAQPage from "../pages/FAQPage/FAQPage";
import JobFairPackPage from "../pages/JobFairPackPage/JobFairPackPage";
import UserPage from "../pages/UserPage/UserPage";
import ContractsPage from "../pages/ContractsPage/ContractsPage";
import HomePage from "../pages/HomePage";
import NavigationBar from "../components/navbar/Navbar";
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage";
import AttendantProfile from "../pages/ProfilePage/AttendantProfilePage";
const AppRouter = () => {
  return (
    <>
      <NavigationBar />
      <Switch>
        {/*init home page*/}
        <Route path="/" exact>
          <HomePage />
        </Route>
        {/*handle public Page*/}
        <Route path="/auth/login" exact>
          <LoginPage />
        </Route>
        <Route path="/auth/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/faq" exact>
          <FAQPage />
        </Route>
        <Route path="/JobFairPack" exact>
          <JobFairPackPage />
        </Route>
        <Route path="/user" exact>
          <UserPage />
        </Route>
        <Route path="/contracts" exact>
          <ContractsPage />
        </Route>
        {/*handle Role Attendant Pages*/}
        {/*handle Role Company Employee Pages*/}
        {/*handle Role Company Manager Pages*/}
        {/*handle Role Admin Pages*/}
        <Route path="/attendant/profile" exact>
          <AttendantProfile/>
        </Route>
        <Route path="/accounts/changepassword" exact>
          <ChangePasswordPage />
        </Route>
      </Switch>
    </>
  );
};
export default AppRouter;
