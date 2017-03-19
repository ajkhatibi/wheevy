import React from 'react';
import { render } from 'react-dom';
import { createHashHistory, useBasename } from 'history';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import "./common/styles/app.less";
import NProgress from 'nprogress';

import Login from './components/pages/Login';
import HomePage from './components/layouts/Dashboard';
import Dashboard from './components/layouts/Dashboard';
import Findfriend from './components/pages/dashboard/Findfriend/Findfriend';
import Chat from './components/pages/dashboard/Chat/Chat';
import Register from './components/pages/Register';

NProgress.configure({ showSpinner: false });

const getRoutes = function() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="/register" component={Register}/>
      <Route path="/dashboard" component={HomePage}>
        <IndexRoute component={Findfriend} />
        <Route path="overview" components={Findfriend} />
        <Route path="reports" components={Chat} />
      </Route>
    </Router>
  );
}

render(
  getRoutes(),
  document.getElementById('app')
)
