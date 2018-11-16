import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tab from '../../UI/Tab';

const Tabs = ({ location }) => {
  const section = location.pathname;
  return (
    <div className="main-layout-tabs">
      <Link to="/">
        <Tab
          name="Overzicht"
          selected={section === '/index' || section === '/'}
        />
      </Link>
      <Link to="/interacties"><Tab name="Interacties" selected={section === '/interacties'} /></Link>
      <Link to="/bedrijven"><Tab name="Bedrijven" selected={section === '/bedrijven'} /></Link>
    </div>
  );
};

Tabs.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default Tabs;
