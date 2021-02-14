import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';

import Notifications from './components/Notification/Notification';

import './styles/main.scss';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' render={() => <Redirect to="/leagues" />} exact />
      {routes.map((props, id) => <Route key={id} {...props} exact />)}
      <Redirect from="*" to="/404" />
    </Switch>
    <Notifications />
  </BrowserRouter>
);

export default App;