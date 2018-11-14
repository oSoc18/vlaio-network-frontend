import React from 'react';
import PropTypes from 'prop-types';
import Company from '../../models/Company';

import '../../assets/styles/companies.css';

const Companies = ({ companies }) => (
  <div />
);

Companies.defaultProps = {
  companies: []
};

Companies.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.instanceOf(Company))
};


export default Companies;
