import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Overview from './components/Overview';
import NotFound from './components/404';
import SunburstChart from './components/SunburstChart';

import 'normalize.css';
import './assets/styles/index.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:path(|index|home)" component={Overview} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
