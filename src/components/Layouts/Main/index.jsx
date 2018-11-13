import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from './Tabs';
import SideBar from '../../SideBar';
import Header from '../../Header';
import Footer from '../../Footer';
import User from '../../../models/User';

class MainLayout extends Component {
  state = {
    activeFilters: null
  };

  applyFilters = (filters) => {
    this.setState({ activeFilters: filters });
  }

  render() {
    const { component: Comp, currentUser, ...rest } = this.props;
    const { activeFilters } = this.state;
    return (
      <div className="main-layout">
        <Header user={currentUser || undefined} />
        <Tabs {...rest} />
        <div className="main-content">
          <SideBar applyFilters={this.applyFilters} />
          <Comp activeFilters={activeFilters || undefined} {...rest} />
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
