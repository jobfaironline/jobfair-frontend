import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
//init Page
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import FAQPage from '../pages/FAQPage/FAQPage'
import JobFairPackPage from '../pages/JobFairPackPage/JobFairPackPage'
import UserPage from '../pages/UserPage/UserPage'
import ContractsPage from '../pages/ContractsPage/ContractsPage'
import HomePage from '../pages/HomePage'
import NavigationBar from '../components/navbar/Navbar'
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage'

//TODO: Remove later
import EmployeeManagementPage from '../pages/EmployeeManagementPage/EmployeeManagementPage'
import EmployeeRegisterPage from '../pages/EmployeeRegisterPage/EmployeeRegisterPage'

import CompanyProfile from '../pages/ProfilePage/Company'
import RegisterJobFairForm from '../components/register-job-fair-form/RegisterJobFairForm'
import AttendantProfile from '../pages/ProfilePage/AttendantProfilePage'
import AppliedJobPage from '../pages/AppliedJobPage/AppliedJobPage'
import {useSelector} from "react-redux";
import AttendantRouter from "./AttendantRouter";
import CompanyEmployeeRouter from "./CompanyEmployeeRouter";
import CompanyManagerRouter from "./CompanyManagerRouter";

const AppRouter = () => {
    const role = useSelector(state => state.authentication?.user?.roles);


    return (
        <>
            <NavigationBar/>
            <Switch>
                {/*init home page*/}
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/auth/login" exact>
                    {/*if user has already login, avoid them to login again*/}
                    {!role ? <LoginPage/> : <Redirect to='/'/>}
                </Route>
                <Route path="/auth/register" exact>
                    {!role ? <RegisterPage/> : <Redirect to='/'/>}
                </Route>
                <Route path="/accounts/changepassword" exact>
                    {
                        role ? <ChangePasswordPage/> : <Redirect to="/auth/login"/>
                    }
                </Route>
                <Route path="/faq" exact>
                    <FAQPage/>
                </Route>
                <Route path="/JobFairPack" exact>
                    <JobFairPackPage/>
                </Route>
                <Route path="/user" exact>
                    <UserPage/>
                </Route>
                <Route path="/contracts" exact>
                    <ContractsPage/>
                </Route>
                <AttendantRouter key="/applied-job" component={(<AppliedJobPage/>)} path="/applied-job" exact/>
                <CompanyManagerRouter key="/company/employee-management" component={() => (<EmployeeManagementPage/>)} path="/company/employee-management" exact/>
                <CompanyManagerRouter key="/company/employee-register" component={(<EmployeeRegisterPage/>)} path="/company/employee-register" exact/>
                <CompanyManagerRouter key="/company/register-job-fair" component={(<RegisterJobFairForm/>)} path="/company/register-job-fair" exact/>
                <AttendantRouter key="/attendant/profile" component={() => (<AttendantProfile/>)} path="/attendant/profile" exact/>
                <CompanyEmployeeRouter key="/company/profile" component={() => (<CompanyProfile/>)} path="/employee/company-profile" exact/>
                <CompanyManagerRouter key="/company/profile" component={() => (<CompanyProfile/>)} path="/manager/company-profile" exact/>
            </Switch>
        </>
    )
}
export default AppRouter
