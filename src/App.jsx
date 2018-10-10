import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { cookies } from './constants';
import User from './models/User';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/MainLayout';
import Overview from './components/Overview';
import SunburstChart from './components/SunburstChart';
import Companies from './components/Companies';
import NotFound from './components/404';
import Login from './components/Auth/Login';
import Manage from './components/Admin/Manage';

import 'normalize.css';
import './assets/styles/index.css';
import './assets/styles/UI/button.css';
import './assets/styles/UI/input.css';

class App extends Component {
  constructor() {
    super();
    const user = cookies.get('user');
    this.state = {
      user: user ? new User(user) : null
    };
    cookies.addChangeListener(this.authStateChanged);
  }

  authStateChanged = (cookie) => {
    if (cookie.name === 'user') {
      const user = JSON.parse(cookie.value);
      this.setState({ user: user ? new User(user) : null });
    }
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
          <PrivateRoute exact path="/:path(|index|home|overlap)" component={Overview} layout={MainLayout} currentUser={user} />
          <PrivateRoute path="/interacties" component={SunburstChart} layout={MainLayout} currentUser={user} />
          <PrivateRoute path="/bedrijven" component={Companies} layout={MainLayout} currentUser={user} />
          <Route path="/login" component={Login} />
          { user && user.isAdmin
            && <PrivateRoute path="/admin" component={Manage} currentUser={user} />
          }
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
