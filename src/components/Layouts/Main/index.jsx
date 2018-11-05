import React from 'react';
import PropTypes from 'prop-types';
import Tabs from './Tabs';
import SideBar from '../../SideBar';
import Header from '../../Header';
import Footer from '../../Footer';
import User from '../../../models/User';

const MainLayout = ({ component: Component, currentUser, ...rest }) => (
  <div className="main-layout">
    <Header user={currentUser} />
    <Tabs {...rest} />
    <div className="main-content">
      <SideBar />
      <Component {...rest} />
    </div>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  component: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(User).isRequired
};

export default MainLayout;
