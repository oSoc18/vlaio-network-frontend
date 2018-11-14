import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Company from '../models/Company';

import '../assets/styles/sidebar.css';

class CompanySidebar extends Component {
  groupAlphabetically = companies => companies.reduce((collection, company) => {
    const letter = company.name.trim().charAt(0);
    if (!collection[letter]) collection[letter] = [];
    collection[letter].push(company);
    return collection;
  }, {});

  renderCompany = company => <li>{company.name}</li>;

  renderGroup = (group, companies) => (
    <div className="company-list__companies__collection">
      <header>{group}</header>
      <ul>
        {companies[group].map(this.renderCompany)}
      </ul>
    </div>
  );

  render() {
    const alphabeticalCompanies = this.groupAlphabetically(this.props.companies);
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
                .map(letter => this.renderGroup(letter, alphabeticalCompanies))
            }
          </div>
        </fieldset>
      </div>
    );
  }
}

CompanySidebar.defaultProps = {
  companies: []
};

CompanySidebar.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.instanceOf(Company))
};

export default CompanySidebar;
