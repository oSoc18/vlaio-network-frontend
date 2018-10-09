import React from 'react';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import SideBar from './SideBar';
import Header from './Header';
import Footer from './Footer';
import MainLayoutTabs from './MainLayoutTabs';
import User from '../models/User';

const MainLayout = ({ component: Component, user, ...rest }) => {
  const isAuthenticated = !!user;
  return (
    <PrivateRoute
      {...rest}
      isAuthenticated={isAuthenticated}
      component={routeProps => (
        <div className="main-layout">
          <Header />
          <MainLayoutTabs {...routeProps} />
          <div className="main-content">
            <SideBar />
            <Component {...routeProps} />
          </div>
          <Footer />
        </div>
      )}
    />
  );
};

MainLayout.defaultProps = {
  user: null
};

MainLayout.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User)
};

export default MainLayout;
