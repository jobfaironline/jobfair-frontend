import { PATH } from '../../constants/Paths/Path';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

const PublicRouter = ({ component: Component, ...rest }) => {
  const { isAuthUser } = useSelector((state) => state.authentication);
  const resultComponent = (props) => {
    if (isAuthUser) return <Redirect to={PATH.INDEX} />;

    if (!isAuthUser) return <Component {...props} />;
  };
  return <Route {...rest} render={(props) => resultComponent(props)} />;
};
export default PublicRouter;
