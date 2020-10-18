import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import studentReducer from './views/Student/studentReducer';
import modalReducer from './views/Modal/modalReducer';
import occurrenceReducer from './views/Occurrence/occurrenceReducer';
import dashboardReducer from './views/Dashboard/dashboardReducer';
import tablesReducer from './views/TableList/tableListReducer';

const rootReducers = combineReducers({
  student: studentReducer,
  modal: modalReducer,
  occurrence: occurrenceReducer,
  toastr: toastrReducer,
  dashboard: dashboardReducer,
  table: tablesReducer,
});

export default rootReducers;
