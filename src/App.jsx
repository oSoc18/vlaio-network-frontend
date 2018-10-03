import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Overview from './components/Overview';
import SunburstChart from './components/SunburstChart';
import Companies from './components/Companies';
import NotFound from './components/404';

import 'normalize.css';
import './assets/styles/index.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <MainLayout exact path="/:path(|index|home|overlap)" component={Overview} />
      <MainLayout path="/interacties" component={SunburstChart} />
      <MainLayout path="/bedrijven" component={Companies} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
