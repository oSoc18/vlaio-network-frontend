import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Company from '../models/Company';

import '../assets/styles/sidebar.css';

class CompanySidebar extends Component {
  state = {
    searchQuery: ''
  }

  groupCompaniesAlphabetically = () => {
    const { searchQuery } = this.state;
    const { companies } = this.props;
    return companies
      .filter(company => company.name.toLowerCase().includes(searchQuery))
      .reduce((collection, company) => {
        const letter = company.name.trim().charAt(0);
        if (!collection[letter]) collection[letter] = [];
        collection[letter].push(company);
        return collection;
      }, {});
  }

  search = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
  }

  renderCompany = company => <li key={company.id}>{company.name}</li>;

  renderGroup = (group, companies) => (
    <div key={group} className="company-list__companies__collection">
      <header>{group}</header>
      <ul>
        {companies[group].map(this.renderCompany)}
      </ul>
    </div>
  );

  render() {
    const { searchQuery } = this.state;
    const groupedCompanies = this.groupCompaniesAlphabetically();
    return (
      <div className="side-nav side-nav--companies">
        <fieldset>
          <legend className="main-legend">Zoeken naar bedrijven</legend>
          <input type="search" className="input" value={searchQuery} onChange={this.search} />
        </fieldset>

        <fieldset className="company-list">
          <legend className="main-legend">Bedrijven</legend>
          <div className="company-list__companies">
            {
              Object.keys(groupedCompanies)
                .sort()
                .map(group => this.renderGroup(group, groupedCompanies))
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
