import React from 'react';
import PropTypes from 'prop-types';
import Company from '../models/Company';

import '../assets/styles/sidebar.css';

const CompanySidebar = ({ companies }) => {
  console.log(companies);
  return (
    <div className="side-nav">
      Stuff
    </div>
  );
};

CompanySidebar.defaultProps = {
  companies: []
};

CompanySidebar.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.instanceOf(Company))
};

export default CompanySidebar;
