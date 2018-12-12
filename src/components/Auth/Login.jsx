import React, { Component } from 'react';
import { api, cookies } from '../../constants';

import '../../assets/styles/login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false
  };

  login = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    api.user.login(username, password).then((res) => {
      if (!res.token) {
        this.setState({ error: true });
        throw new Error('Email of wachtwoord incorrect');
      }
      cookies.set('auth', res.token);
      delete res.token;
      cookies.set('user', res);
      window.location.href = '/';
    }).catch(() => {

    });
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.target.value });
  }

  render() {
    const { password, username } = this.state;
    const errorCredentials = <p className="login__error">E-mailadres of wachtwoord is incorrect.</p>;
    return (
      <main className="login">
        <h2 className="login__title">Inloggen</h2>
        {this.state.error ? errorCredentials : <div /> }
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
    );
  }
}

export default Login;
