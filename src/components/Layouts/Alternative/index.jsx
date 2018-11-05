import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Header';
import Footer from '../../Footer';
import User from '../../../models/User';

const AlternativeLayout = ({ component: Component, currentUser, ...rest }) => (
  <div className="main-layout">
    <Header user={currentUser} />
    <div className="page-alternative">
      <Component {...rest} />
    </div>
    <Footer />
  </div>
);

AlternativeLayout.propTypes = {
  component: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(User).isRequired
};

export default AlternativeLayout;
