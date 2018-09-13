import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Overview from './components/Overview';
import NotFound from './components/404';
import SunburstChart from './components/SunburstChart';

import 'normalize.css';
import './assets/index.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:path(|index|home)" component={Overview} />
      <Route path="/sunburst" component={SunburstChart} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
