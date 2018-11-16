import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import User from '../models/User';

import '../assets/styles/header.css';

const img = require('./../assets/img/logo-vlaanderen.png');

const capitalizeFirst = name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const Header = ({ user }) => (
  <header className="vlaio-header">
    <div className="vlaio-header__top">
      <div className="vlaio-header__top__logo">
        <img src={img} alt="Logo Vlaanderen" />
      </div>
      <div className="vlaio-header__top__titles">
        <h1>Vlaanderen</h1>
        <h2>Agentschap innoveren &amp; ondernemen</h2>
      </div>
      <div className="vlaio-header__top__contact">
        { user
          && <div>Welkom, {capitalizeFirst(user.firstName)} {capitalizeFirst(user.lastName)}</div>
        }
      </div>
    </div>
    <nav className="vlaio-header__bottom">
      <ul>
        <li><Link to="/">Visualisaties</Link></li>
        { user && (
          <Fragment>
            { user.isAdmin && (
              <Fragment>
                <li><Link to="/beheer-data">Databeheer</Link></li>
                <li><Link to="/admin">Gebruikersbeheer</Link></li>
              </Fragment>
            )}
            <li><Link to="/logout">Uitloggen</Link></li>
          </Fragment>
        )}
      </ul>
    </nav>
  </header>
);

Header.defaultProps = {
  user: null
};

Header.propTypes = {
  user: PropTypes.instanceOf(User)
};

export default Header;
