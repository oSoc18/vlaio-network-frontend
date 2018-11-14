import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../../constants';
import Tabs from './Tabs';
import SideBar from '../../SideBar';
import CompanySidebar from '../../CompanySidebar';
import Header from '../../Header';
import Footer from '../../Footer';
import User from '../../../models/User';
import Company from '../../../models/Company';

class MainLayout extends Component {
  state = {
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

  render() {
    const { component: Comp, currentUser, ...rest } = this.props;
    const { activeFilters, typesOfInteraction, companies } = this.state;

    return (
      <div className="main-layout">
        <Header user={currentUser || undefined} />
        <Tabs {...rest} />
        <div className="main-content">
          { typesOfInteraction.length > 0
            && (rest.location.pathname === '/bedrijven')
            ? <CompanySidebar companies={companies} />
            : <SideBar typesOfInteraction={typesOfInteraction} applyFilters={this.applyFilters} />
          }
          <Comp
            companies={companies || undefined}
            activeFilters={activeFilters || undefined}
            {...rest}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

MainLayout.propTypes = {
  component: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(User).isRequired
};

export default MainLayout;
