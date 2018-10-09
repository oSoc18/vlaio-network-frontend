import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { cookies } from './constants';
import User from './models/User';
import MainLayout from './components/MainLayout';
import Overview from './components/Overview';
import SunburstChart from './components/SunburstChart';
import Companies from './components/Companies';
import NotFound from './components/404';
import Login from './components/Auth/Login';

import 'normalize.css';
import './assets/styles/index.css';

class App extends Component {
  constructor() {
    super();
    const user = cookies.get('user');
    this.state = {
      user: new User(user) || null
    };
    cookies.addChangeListener(this.authStateChanged);
  }

  authStateChanged = (cookie) => {
    if (cookie.name === 'user') this.setState({ user: new User(cookie.value) });
  }

  logout = () => {
    cookies.remove('auth');
    cookies.remove('user');
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <MainLayout exact path="/:path(|index|home|overlap)" component={Overview} user={user} />
          <MainLayout path="/interacties" component={SunburstChart} user={user} />
          <MainLayout path="/bedrijven" component={Companies} user={user} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
