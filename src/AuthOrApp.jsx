import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import _ from 'lodash';
import Admin from 'layouts/Admin.js';
import SignIn from './views/Auth/SignIn';
import { validateToken } from './views/Auth/authActions';
import { configs } from 'eslint-plugin-prettier';

export default function AuthOrApp({ children }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(validateToken(auth.user.token));
    }
  }, []);

  const config = () => {
    axios.defaults.headers.common['authorization'] = auth.user.token;
  };

  return auth.user && auth.validToken ? (
    <>
      {config()}
      <Admin />
    </>
  ) : !auth.user && !auth.validToken ? (
    <>
      <SignIn />
    </>
  ) : (
    <></>
  );
}
