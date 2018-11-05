import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import '../../assets/styles/login.css';

const Import = () => (
  <div className="main-layout">
    <Header />
    <div className="page-alternative">
      <main className="import">
        Import page
      </main>
    </div>
    <Footer />
  </div>
);

export default Import;
