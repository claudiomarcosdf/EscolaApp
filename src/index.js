import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import store from './store';

// core components
// import Admin from 'layouts/Admin.js';
import AuthOrApp from './AuthOrApp.jsx';
//import RTL from 'layouts/RTL.js';

import 'assets/css/material-dashboard-react.css?v=1.9.0';
import SignIn from 'views/Auth/SignIn';
import SignUp from 'views/Auth/SignUp';

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={AuthOrApp} />
        {/* <Route path="/SignIn" component={SignIn} /> */}
        {/* <Route path="/SignUp" component={SignUp} /> */}
        {/* <Route path="/rtl" component={RTL} /> */}
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
      </Switch>
    </Router>
  </Provider>,

  document.getElementById('root')
);
