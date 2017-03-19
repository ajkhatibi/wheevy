import React from 'react';
import { render } from 'react-dom';
import { createHashHistory, useBasename } from 'history';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import "./common/styles/app.less";
import NProgress from 'nprogress';

import Login from './components/pages/Login';
import HomePage from './components/layouts/Dashboard';
import Dashboard from './components/layouts/Dashboard';
import Overview from './components/pages/dashboard/Overview/Overview';
import Reports from './components/pages/dashboard/Reports/Reports';
import Register from './components/pages/Register';

NProgress.configure({ showSpinner: false });

const getRoutes = function() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="/register" component={Register}/>
      <Route path="/dashboard" component={HomePage}>
        <IndexRoute component={Overview} />
        <Route path="overview" components={Overview} />
        <Route path="reports" components={Reports} />
      </Route>
    </Router>
  );
}

render(
  getRoutes(),
  document.getElementById('app')
)
