import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useSelector} from "react-redux";
import HomePage from "../pages/HomePage";
import JobFairParkPage from "../pages/JobFairParkPage/JobFairParkPage";
import AttendantJobFairPage from "../pages/AttendantJobFairPage/AttendantJobFairPage";
import JobfairRegistrationPage from "../pages/JobfairRegistrationPage/JobfairRegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage";
import FAQPage from "../pages/FAQPage/FAQPage";
import UserPage from "../pages/UserPage/UserPage";
import ContractsPage from "../pages/ContractsPage/ContractsPage";
import JobFairsPage from "../pages/JobFairsPage/JobFairsPage";
import JobFairListPage from "../pages/JobFairListPage/JobFairList.page";
import AttendantRouter from "./AttendantRouter";
import CompanyManagerRouter from "./CompanyManagerRouter";
import AppliedJobPage from "../pages/AppliedJobPage/AppliedJobPage";
import EmployeeManagementPage from "../pages/EmployeeManagementPage/EmployeeManagementPage";
import EmployeeRegisterPage from "../pages/EmployeeRegisterPage/EmployeeRegisterPage";
import RegisterJobFairForm from "../components/register-job-fair-form/RegisterJobFairForm";
import AttendantProfile from "../pages/ProfilePage/Attendant/AttendantProfilePage";
import CompanyEmployeeRouter from "./CompanyEmployeeRouter";
import CompanyProfile from "../pages/ProfilePage/Company/CompanyProfilePage";
import ApprovalRegistrationPage from "../pages/ApprovalRegistrationPage/ApprovalRegistration.page";
import AdminRouter from "./AdminRouter";
import StaffRouter from "./StaffRouter";
import {ChooseBoothPage} from "../pages/ChooseBoothPage/ChooseBoothPage";
import {ResultSuccessPage} from "../pages/ResultPage/ResultSuccessPage";
import DecorateBoothPage from "../pages/DecorateBoothPage/DecorateBoothPage";
import ResultFailedPage from "../pages/ResultPage/ResultFailedPage";
import NavigationBar from "../components/Navbar/Navbar";
import JobPositionPage from "../pages/JobPositionPage/JobPositionPage";


const AppRouter = () => {
    const role = useSelector(state => state.authentication?.user?.roles)

    return (
        <>
            <NavigationBar/>
            <Switch>
                {/*init home page*/}
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/map/:jobFairId" exact>
                    <JobFairParkPage/>
                </Route>
                <Route path="/jobfair/attendant/:companyBoothId" exact>
                    <AttendantJobFairPage/>
                </Route>

                {/* TODO: refactor later*/}
                <Route path="/company-register-jobfair/:jobfairId" exact>
                    <JobfairRegistrationPage/>
                </Route>
                <Route path="/company-register-jobfair/" exact>
                    <JobfairRegistrationPage/>
                </Route>

                <Route path="/auth/login" exact>
                    {/*if user has already login, avoid them to login again*/}
                    {!role ? <LoginPage/> : <Redirect to="/"/>}
                </Route>
                <Route path="/auth/register" exact>
                    {!role ? <RegisterPage/> : <Redirect to="/"/>}
                </Route>
                <Route path="/accounts/changepassword" exact>
                    {role ? <ChangePasswordPage/> : <Redirect to="/auth/login"/>}
                </Route>
                <Route path="/proceed-success" exact>
                    <ResultSuccessPage/>
                </Route>
                <Route path="/proceed-fail" exact>
                    <ResultFailedPage/>
                </Route>

                <Route path="/faq" exact>
                    <FAQPage/>
                </Route>
                <Route path="/decorate-booth/:companyBoothId/:jobFairId" exact>
                    <DecorateBoothPage/>
                </Route>
                <Route path="/user" exact>
                    <UserPage/>
                </Route>
                <Route path="/contacts" exact>
                    <ContractsPage/>
                </Route>
                <Route path="/jobfair-list" exact>
                    <JobFairsPage/>
                </Route>
                <Route path="/job-fair" exact>
                    <JobFairListPage/>
                </Route>
                <Route path='/choose-booth/:jobFairId' exact>
                    <ChooseBoothPage/>
                </Route>
                <Route path="/proceed-success" exact>
                    <ResultSuccessPage/>
                </Route>

                <AttendantRouter key="/applied-job" component={<AppliedJobPage/>} path="/applied-job" exact/>
                <CompanyManagerRouter
                    key="/company/employee-management"
                    component={() => <EmployeeManagementPage/>}
                    path="/company/employee-management"
                    exact
                />
                <CompanyManagerRouter
                    key="/company/employee-register"
                    component={() => <EmployeeRegisterPage/>}
                    path="/company/employee-register"
                    exact
                />
                <CompanyManagerRouter
                    key="/company/register-job-fair"
                    component={() => <RegisterJobFairForm/>}
                    path="/company/register-job-fair"
                    exact
                />
                <CompanyManagerRouter
                    key="/company/job-position-management"
                    component={() => <JobPositionPage/>}
                    path="/company/job-position-management"
                    exact
                />
                <AttendantRouter
                    key="/attendant/profile"
                    component={() => <AttendantProfile/>}
                    path="/attendant/profile"
                    exact
                />
                <CompanyEmployeeRouter
                    key="/company/profile"
                    component={() => <CompanyProfile/>}
                    path="/employee/company-profile"
                    exact
                />
                <CompanyManagerRouter
                    key="/company/profile"
                    component={() => <CompanyProfile/>}
                    path="/manager/company-profile"
                    exact
                />
                <AdminRouter
                    key="" component={() => (<ApprovalRegistrationPage/>)}
                    path="/approval-registration/:jobFairId"
                    exact
                />
                <StaffRouter
                    key="" component={() => (<ApprovalRegistrationPage/>)}
                    path="/approval-registration/:jobFairId"
                    exact
                />
            </Switch>
        </>
    )

}
export default AppRouter
