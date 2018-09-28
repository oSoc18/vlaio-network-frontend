import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import Footer from './Footer';
import MainLayoutTabs from './MainLayoutTabs';

const MainLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => (
      <div className="main-layout">
        <Header />
        <MainLayoutTabs />
        <SideBar />
        <Component {...routeProps} />
        <Footer />
      </div>
    )}
  />
);

MainLayout.propTypes = {
  component: PropTypes.func.isRequired
};

export default MainLayout;
