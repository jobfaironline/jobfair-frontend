//This routing rule allows the current user to have this role "ATTENDANT"
import { ATTENDANT } from "../Constants/RoleType";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { contains } from "../utils/common";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const AttendantRouter = ({ component: Component, ...rest }) => {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const resultComponent = (props) => {
    var listRole = user.roles?.map((x) => x.name);
    if (isAuthUser && contains([ATTENDANT], listRole)) {
      //check if current role are "ATTENDANT" allow to access current component
      return <Component {...props} />;
    }
    if (isAuthUser && !contains([ATTENDANT], listRole)) {
      //check if current role not in "ATTENDANT" deny to access current component and show 403 Error Page
      return <ErrorPage code={403} />;
    }

    if (!isAuthUser) {
      //check if current user not login send back to login Page
      return <Redirect to="/auth/signin" />;
    }
  };
  return <Route {...rest} render={(props) => resultComponent(props)} />;
};
export default AttendantRouter;
