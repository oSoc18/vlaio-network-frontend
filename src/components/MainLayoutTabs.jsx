import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tab from './UI/Tab';
import '../assets/styles/mainlayouttabs.css';

const MainLayoutTabs = props => (
  <div className="main-layout-tabs">
    <Link to="/index">
      <Tab
        name="Overzicht"
        selected={props.location.pathname === '/index' || props.location.pathname === '/'}
      />
    </Link>
    <Link to="/sunburst"><Tab name="Interacties" selected={props.location.pathname === '/sunburst'} /></Link>
    <Link to="/bedrijven"><Tab name="Bedrijven" selected={props.location.pathname === '/bedrijven'} /></Link>
  </div>
);

MainLayoutTabs.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default MainLayoutTabs;
