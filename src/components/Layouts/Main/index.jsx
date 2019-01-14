import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../../constants';
import Tabs from './Tabs';
import SideBar from '../../SideBar';
import CompanySidebar from '../../CompanySidebar';
import Header from '../../Header';
import User from '../../../models/User';
import Company from '../../../models/Company';

class MainLayout extends Component {
  state = {
    activeCompany: null,
    activeFilters: null,
    typesOfInteraction: [],
    companies: []
  };

  componentDidMount() {
    api.interaction.getTypes().then((types) => {
      this.setState({ typesOfInteraction: types });
    });
    api.company.get().then((companyRes) => {
      const companies = companyRes.map(o => new Company(o)) || [];
      this.setState({ companies });
    });
  }

  applyFilters = (filters) => {
    this.setState({ activeFilters: filters });
  }

  resetFilters = () => {
    if (this.sidebar) this.sidebar.resetFilters();
  }

  selectCompany = (company) => {
    this.setState({ activeCompany: company });
  }

  render() {
    const { component: Comp, currentUser, ...rest } = this.props;
    const {
      activeFilters, typesOfInteraction, companies, activeCompany
    } = this.state;

    return (
      <div className="main-layout">
        <Header user={currentUser || undefined} />
        <Tabs {...rest} />
        <div className="main-content">
          { typesOfInteraction.length > 0
            && (rest.location.pathname === '/bedrijven')
            ? <CompanySidebar selectCompany={this.selectCompany} companies={companies} />
            : (
              <SideBar
                ref={(c) => { this.sidebar = c; }}
                typesOfInteraction={typesOfInteraction}
                applyFilters={this.applyFilters}
              />
            )
          }
          <Comp
            companies={companies || undefined}
            activeFilters={activeFilters || undefined}
            activeCompany={activeCompany || undefined}
            resetFilters={this.resetFilters}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  component: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(User).isRequired
};

export default MainLayout;
