import React from 'react';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import SideBar from './SideBar';
import Header from './Header';
import Footer from './Footer';
import MainLayoutTabs from './MainLayoutTabs';

const MainLayout = ({ component: Component, ...rest }) => (
  <PrivateRoute
    {...rest}
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

MainLayout.propTypes = {
  component: PropTypes.func.isRequired
};

export default MainLayout;
