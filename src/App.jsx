import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import NotFound from './components/404';

import 'normalize.css';
import './assets/index.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:path(|index|home)" component={MainLayout} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
