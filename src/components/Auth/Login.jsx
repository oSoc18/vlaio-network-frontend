import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import '../../assets/styles/login.css';

const Login = () => (
  <div className="main-layout">
    <Header />
    <main className="page login">
      <div>Login</div>
    </main>
    <Footer />
  </div>
);

export default Login;
