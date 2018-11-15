import React from 'react';
import PropTypes from 'prop-types';
import Company from '../../models/Company';

import '../../assets/styles/companies.css';

const Companies = ({ companies, activeCompany }) => (
  <div className="company-details">
    {activeCompany && (
      <table>
        <thead>
          <tr>
            <th colSpan="2">{activeCompany.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BTW-nummer</td>
            <td>{activeCompany.VAT}</td>
          </tr>
          <tr>
            <td>Naam</td>
            <td>{activeCompany.name}</td>
          </tr>
          <tr>
            <td>Aantal werknemers</td>
            <td>{activeCompany.employeeAmount}</td>
          </tr>
          <tr>
            <td>Winst</td>
            <td>{activeCompany.profit}</td>
          </tr>
        </tbody>
      </table>
    )}
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
