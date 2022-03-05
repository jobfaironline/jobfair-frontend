//This routing rule allows the current user to have this role "COMPANY_EMPLOYEE"
import { COMPANY_EMPLOYEE } from '../../constants/RoleType'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import { PATH } from '../../constants/Paths/Path'
const CompanyEmployeeRouter = ({ component: Component, ...rest }) => {
  const { user, isAuthUser } = useSelector(state => state.authentication)
  const resultComponent = props => {
    var listRole = user ? Array.of(user.roles) : []
    if (isAuthUser && listRole.includes(COMPANY_EMPLOYEE)) {
      //check if current role are "COMPANY_EMPLOYEE" allow to access current component
      return <Component {...props} />
    }
    if (isAuthUser && !listRole.includes(COMPANY_EMPLOYEE)) {
      //check if current role not in "COMPANY_EMPLOYEE" deny to access current component and show 403 Error Page
      return <ErrorPage code={403} />
    }

    if (!isAuthUser) {
      //check if current user not login send back to login Page
      return <Redirect to={PATH.LOGIN_PAGE} />
    }
  }
  return <Route {...rest} render={props => resultComponent(props)} />
}
export default CompanyEmployeeRouter