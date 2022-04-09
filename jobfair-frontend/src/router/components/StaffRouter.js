//This routing rule allows the current user to have this role "STAFF"
import { Route } from 'react-router-dom';
import { STAFF } from '../../constants/RoleType';
import { useSelector } from 'react-redux';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import React from 'react';

const StaffRouter = ({ component: Component, ...rest }) => {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const resultComponent = (props) => {
    const listRole = user ? Array.of(user.roles) : [];
    if (isAuthUser && listRole.includes(STAFF)) {
      //check if current role are "STAFF" allow to access current component
      return <Component {...props} />;
    }
    if (isAuthUser && !listRole.includes(STAFF)) {
      //check if current role not in "STAFF" deny to access current component and show 403 Error Page
      return <ErrorPage code={403} />;
    }

    if (!isAuthUser) {
      //check if current user not login send back to login Page
      return <ErrorPage code={403} />;
    }
  };
  return <Route {...rest} render={(props) => resultComponent(props)} />;
};
export default StaffRouter;
