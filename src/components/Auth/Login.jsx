import React, { Component } from 'react';
import { api, cookies } from '../../constants';
import Header from '../Header';
import Footer from '../Footer';

import '../../assets/styles/login.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  login = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    api.auth.login(username, password).then((res) => {
      if (!res.token) throw new Error('Email of wachtwoord incorrect');
      cookies.set('auth', res.token);
      cookies.set('user', {
        firstName: res.first_name,
        lastName: res.last_name
      });
      window.location.href = '/';
    }).catch(() => {

    });
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.target.value });
  }

  render() {
    const { password, username } = this.state;
    return (
      <div className="main-layout">
        <Header />
        <div className="page-alternative">
          <main className="login">
            <h2 className="login__title">Inloggen</h2>
            <form className="login__form" onSubmit={this.login}>
              <label htmlFor="username">
                Email
                <input type="email" className="input" id="username" name="username" value={username} onChange={this.handleChange} />
              </label>
              <label htmlFor="password">
                Wachtwoord
                <input type="password" className="input" id="password" name="password" value={password} onChange={this.handleChange} />
              </label>
              <input type="submit" className="button" value="Inloggen" />
            </form>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
