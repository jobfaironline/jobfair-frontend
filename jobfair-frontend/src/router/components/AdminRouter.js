//This routing rule allows the current user to have this role "ADMIN"
import { ADMIN } from '../../constants/RoleType';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import React from 'react';

const AdminRouter = ({ component: Component, ...rest }) => {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const resultComponent = (props) => {
    const listRole = user ? Array.of(user.roles) : [];
    if (isAuthUser && listRole.includes(ADMIN)) {
      //check if current role are "ADMIN" allow to access current component
      return <Component {...props} />;
    }
    if (isAuthUser && !listRole.includes(ADMIN)) {
      //check if current role not in "ADMIN" deny to access current component and show 403 Error Page
      return <ErrorPage code={403} />;
    }

    if (!isAuthUser) {
      //check if current user not login send back to login Page
      return <ErrorPage code={403} />;
    }
  };
  return <Route {...rest} render={(props) => resultComponent(props)} />;
};
export default AdminRouter;
