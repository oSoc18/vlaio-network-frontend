import React from 'react';
import '../../assets/styles/UI/logo.css';

const img = require('./../../assets/img/logo-vlaanderen.png');

const Logo = () => (
  <div className="logo">
    <img className="logo" src={img} alt="Logo Vlaanderen" />
  </div>
);

export default Logo;
