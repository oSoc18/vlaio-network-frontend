import React from 'react';
import '../assets/styles/header.css';
import { Link } from 'react-router-dom';


const Header = () => (
  <header className="vlaio-header">
    <Link to="/sunburst">Interactienetwerk</Link>
    Vlaio Header
  </header>
);

export default Header;
