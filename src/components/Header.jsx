import React from 'react';
import Logo from './UI/Logo';
import '../assets/styles/header.css';

const Header = () => (
  <header className="vlaio-header">
    <div className="top-header-bar">
      <Logo /> \ VLAANDEREN \ AGENTSCHAP INNOVEREN & ONDERNEMEN \ VLAIO-NETWERK \ CONTACTEER ONS</div>
    <div className="top-header-bar">ONDERSTEUND DOOR AGENTSCHAP INNOVEREN & ONDERENEMEN  \  WELKOM, VOORNAAM NAAM</div>
    {/* <Link to="/index"><div className="demo-button">Algemeen overzicht</div></Link>
    <Link to="/sunburst"><div className="demo-button">Netwerk interacties</div></Link>
    Vlaio Header */}
  </header>
);

export default Header;
