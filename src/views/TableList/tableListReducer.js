import {
  FETCH_MEASURES_REQUEST,
  FETCH_MEASURES_SUCCESS,
  FETCH_MEASURES_FAILURE,
  FETCH_BEHAVIORS_REQUEST,
  FETCH_BEHAVIORS_SUCCESS,
  FETCH_BEHAVIORS_FAILURE,
  FETCH_TRANSGRESSIONS_REQUEST,
  FETCH_TRANSGRESSIONS_SUCCESS,
  FETCH_TRANSGRESSIONS_FAILURE,
} from './tableListTypes';

const initialState = {
  loading: false,
  tableMeasures: [],
  tableBehaviors: [],
  tableTransgressions: [],
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEASURES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MEASURES_SUCCESS:
      return {
        ...state,
        loading: false,
        tableMeasures: action.payload,
      };
    case FETCH_MEASURES_FAILURE:
      return {
        ...state,
        loading: false,
        tableMeasures: [],
        errors: action.payload,
      };

    case FETCH_BEHAVIORS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BEHAVIORS_SUCCESS:
      return {
        ...state,
        loading: false,
        tableBehaviors: action.payload,
      };
    case FETCH_BEHAVIORS_FAILURE:
      return {
        ...state,
        loading: false,
        tableBehaviors: [],
        errors: action.payload,
      };

    case FETCH_TRANSGRESSIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TRANSGRESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        tableTransgressions: action.payload,
      };
    case FETCH_TRANSGRESSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        tableTransgressions: [],
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
