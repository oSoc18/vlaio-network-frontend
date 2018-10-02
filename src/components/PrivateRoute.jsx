import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component }, ...rest) => (
  <Route
    {...rest}
    render={props => (
      // TODO check auth status
      true
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
