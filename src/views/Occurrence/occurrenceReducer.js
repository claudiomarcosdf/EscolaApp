import {
  ADD_OCCURRENCE_REQUEST,
  ADD_OCCURRENCE_SUCCESS,
  ADD_OCCURRENCE_FAILURE,
  DELETE_OCCURRENCE_REQUEST,
  DELETE_OCCURRENCE_SUCCESS,
  DELETE_OCCURRENCE_FAILURE,
} from './occurrenceTypes';

const initialState = {
  occurrences: [{}],
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OCCURRENCE_REQUEST:
      return {
        ...state,
        errors: [],
      };
    case ADD_OCCURRENCE_SUCCESS:
      return {
        ...state,
        occurrences: action.payload,
        errors: [],
      };
    case ADD_OCCURRENCE_FAILURE:
      return {
        ...state,
        occurrences: [],
        errors: action.payload,
      };
    case DELETE_OCCURRENCE_REQUEST:
      return {
        ...state,
        errors: [],
      };
    case DELETE_OCCURRENCE_SUCCESS:
      return {
        ...state,
        occurrences: action.payload,
        errors: [],
      };
    case DELETE_OCCURRENCE_FAILURE:
      return {
        ...state,
        occurrences: [],
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
