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
    return (
      <div className="main-layout">
        <Header />
        <main className="page login">
          <form onSubmit={this.login}>
            <input type="email" name="username" placeholder="email" value={this.state.username} onChange={this.handleChange} />
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            <input type="submit" />
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Login;
