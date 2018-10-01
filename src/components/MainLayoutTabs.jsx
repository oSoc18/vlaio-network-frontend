import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tab from './UI/Tab';
import '../assets/styles/mainlayouttabs.css';

const MainLayoutTabs = ({ location }) => {
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

MainLayoutTabs.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default MainLayoutTabs;
