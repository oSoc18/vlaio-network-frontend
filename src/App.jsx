import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { cookies } from './constants';
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
    const token = cookies.get('auth');
    const user = cookies.get('user');
    cookies.addChangeListener(this.authStateChanged);
    this.state = {
      token,
      user
    };
  }

  componentDidMount() {

  }

  authStateChanged = (cookieName, cookieValue) => {
    if (cookieName === 'auth') {
      this.setState({ token: cookieValue });
    }
    if (cookieName === 'user') {
      this.setState({ user: cookieValue });
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
          <MainLayout exact path="/:path(|index|home|overlap)" component={Overview} />
          <MainLayout path="/interacties" component={SunburstChart} />
          <MainLayout path="/bedrijven" component={Companies} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
