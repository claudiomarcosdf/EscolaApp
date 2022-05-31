import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Admin from 'layouts/Admin.js';
import SignIn from './views/Auth/SignIn';
import { validateToken } from './views/Auth/authActions';

// eslint-disable-next-line no-unused-vars
export default function AuthOrApp({ children }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(validateToken(auth.user.token));
    }
  }, [auth.user, dispatch]);

  const config = () => {
    axios.defaults.headers.common['authorization'] = auth.user.token;
  };

  return auth.user && auth.validToken ? (
    <>
      {config()}
      <Switch>
        <Redirect to="/admin/dashboard" />
      </Switch>
      <Admin />
    </>
  ) : !auth.user && !auth.validToken ? (
    <>
      <Switch>
        <Redirect to="/" />
      </Switch>
      {<SignIn />}
    </>
  ) : (
    <></>
  );
}
