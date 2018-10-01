import React from 'react';

import '../assets/styles/header.css';

const img = require('./../assets/img/logo-vlaanderen.png');

const Header = () => (
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
        <div>Contacteer ons</div>
      </div>
    </div>
    <div className="vlaio-header__bottom">
      ONDERSTEUND DOOR AGENTSCHAP INNOVEREN &amp; ONDERENEMEN  \  WELKOM, VOORNAAM NAAM
    </div>
    {/* <Link to="/index"><div className="demo-button">Algemeen overzicht</div></Link>
    <Link to="/sunburst"><div className="demo-button">Netwerk interacties</div></Link>
    Vlaio Header */}
  </header>
);

export default Header;
