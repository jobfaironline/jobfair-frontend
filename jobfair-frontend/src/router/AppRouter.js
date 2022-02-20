import React from "react";
import {Route, Switch} from "react-router-dom";
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
import CompanyProfile from "../pages/ProfilePage/Company";

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
        <Route path="/accounts/changepassword" exact>
          <ChangePasswordPage />
        </Route>
        <Route path="/company/profile" exact>
          <CompanyProfile/>
        </Route>
        <Route path="/attendant/profile" exact>
          <AttendantProfile/>
        </Route>
      </Switch>
    </>
  );
};
export default AppRouter;
