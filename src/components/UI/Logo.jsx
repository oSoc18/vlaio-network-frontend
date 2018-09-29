import React from 'react';
import '../../assets/styles/UI/logo.css';

const img = require('./../../assets/img/logo-vlaanderen.png');

const Logo = () => (
  <img className="logo" src={img} alt="Logo Vlaanderen" />
);

export default Logo;
