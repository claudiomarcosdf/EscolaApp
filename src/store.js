import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './rootReducers';

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk, multi))
);

export default store;
