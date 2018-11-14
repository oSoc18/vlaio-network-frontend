import React from 'react';
import PropTypes from 'prop-types';
import Company from '../models/Company';

import '../assets/styles/sidebar.css';

const CompanySidebar = ({ companies }) => {
  const alphabeticalCompanies = companies.reduce((collection, company) => {
    const letter = company.name.trim().charAt(0);
    if (!collection[letter]) collection[letter] = [];
    collection[letter].push(company);
    return collection;
  }, {});

  const renderCompany = company => (
    <li>{company.name}</li>
  );

  const renderLetterGroup = letter => (
    <div className="company-list__companies__collection">
      <header>{letter}</header>
      <ul>
        {alphabeticalCompanies[letter].map(renderCompany)}
      </ul>
    </div>
  );

  return (
    <div className="side-nav side-nav--companies">
      <fieldset>
        <legend className="main-legend">Zoeken naar bedrijven</legend>
        <input type="search" className="input" />
      </fieldset>

      <fieldset className="company-list">
        <legend className="main-legend">Bedrijven</legend>
        <div className="company-list__companies">
          {
            Object.keys(alphabeticalCompanies)
              .sort()
              .map(renderLetterGroup)
          }
        </div>
      </fieldset>
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
