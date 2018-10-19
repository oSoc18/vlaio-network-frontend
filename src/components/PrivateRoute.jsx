import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import User from '../models/User';

const PrivateRoute = ({ layout: Layout, component: Component, currentUser }, ...rest) => {
  const Content = Layout || Component;
  return (
    <Route
      {...rest}
      render={routeProps => (
        currentUser
          ? <Content component={Component} currentUser={currentUser} {...routeProps} />
          : <Redirect to="/login" />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.instanceOf(User), PropTypes.object]).isRequired,
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
