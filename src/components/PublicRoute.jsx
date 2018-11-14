import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import User from '../models/User';

const PublicRoute = ({ layout: Layout, component: Component, currentUser }, ...rest) => {
  const Content = Layout || Component;
  return (
    <Route
      {...rest}
      render={routeProps => (
        currentUser
          ? <Content component={Component} currentUser={currentUser} {...routeProps} />
          : <Content component={Component} {...routeProps} />
      )}
    />
  );
};

PublicRoute.defaultProps = {
  currentUser: null
};

PublicRoute.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.instanceOf(User), PropTypes.object]),
  component: PropTypes.func.isRequired
};

export default PublicRoute;
