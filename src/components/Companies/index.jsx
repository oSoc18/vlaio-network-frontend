import React from 'react';
import PropTypes from 'prop-types';
import Company from '../../models/Company';

import '../../assets/styles/companies.css';

const Companies = ({ companies, activeCompany }) => (
  <div>
    {activeCompany && (
      <ul>
        <li>{activeCompany.VAT}</li>
        <li>{activeCompany.name}</li>
        <li>{activeCompany.employeeAmount}</li>
        <li>{activeCompany.profit}</li>
      </ul>
    )
    }
  </div>
);

Companies.defaultProps = {
  companies: [],
  activeCompany: null
};

Companies.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.instanceOf(Company)),
  activeCompany: PropTypes.instanceOf(Company)
};


export default Companies;
