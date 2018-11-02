import React from 'react';

import '../assets/styles/footer.css';

const img = require('./../assets/img/logo-full.png');

const Footer = () => (
  <footer className="vlaio-footer">
    <div className="vlaio-footer__left">
      <img src={img} alt="Logo Vlaanderen" />
      <a>over ons</a>
      <a>contact</a>
    </div>
    <div className="vlaio-footer__privacy">
      <a>privacybeleid</a>
    </div>
  </footer>
);

export default Footer;
