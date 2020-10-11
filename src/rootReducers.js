import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import studentReducer from './views/Student/studentReducer';
import modalReducer from './views/Student/Modal/modalReducer';
import dashboardReducer from './views/Dashboard/dashboardReducer';

const rootReducers = combineReducers({
  student: studentReducer,
  modal: modalReducer,
  toastr: toastrReducer,
  dashboard: dashboardReducer,
});

export default rootReducers;
