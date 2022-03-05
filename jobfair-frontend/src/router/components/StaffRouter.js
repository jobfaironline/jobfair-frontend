//This routing rule allows the current user to have this role "STAFF"
import { STAFF } from '../../constants/RoleType'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import { PATH } from '../../constants/Paths/Path'
const StaffRouter = ({ component: Component, ...rest }) => {
  const { user, isAuthUser } = useSelector(state => state.authentication)
  const resultComponent = props => {
    var listRole = user ? Array.of(user.roles) : []
    if (isAuthUser && listRole.includes(STAFF)) {
      //check if current role are "STAFF" allow to access current component
      return <Component {...props} />
    }
    if (isAuthUser && !listRole.includes(STAFF)) {
      //check if current role not in "STAFF" deny to access current component and show 403 Error Page
      return <ErrorPage code={403} />
    }

    if (!isAuthUser) {
      //check if current user not login send back to login Page
      return <Redirect to={PATH.LOGIN_PAGE} />
    }
  }
  return <Route {...rest} render={props => resultComponent(props)} />
}
export default StaffRouter