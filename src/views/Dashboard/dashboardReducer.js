import {
  COUNT_STUDENT_REQUEST,
  COUNT_STUDENT_SUCCESS,
  COUNT_STUDENT_FAILURE,
  RESUME_OCCURRENCES_REQUEST,
  RESUME_OCCURRENCES_SUCCESS,
  RESUME_OCCURRENCES_FAILURE,
  RESUME_BEHAVIOR_REQUEST,
  RESUME_BEHAVIOR_SUCCESS,
  RESUME_BEHAVIOR_FAILURE,
} from './dashboardTypes';

const initialState = {
  loading: false,
  countStudents: 0,
  resumeOccurrences: {},
  resumeBehaviors: {},
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COUNT_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        countStudents: action.payload,
        errors: [],
      };

    case COUNT_STUDENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case RESUME_OCCURRENCES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RESUME_OCCURRENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        resumeOccurrences: action.payload,
        errors: [],
      };

    case RESUME_OCCURRENCES_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case RESUME_BEHAVIOR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RESUME_BEHAVIOR_SUCCESS:
      return {
        ...state,
        loading: false,
        resumeBehaviors: action.payload,
        errors: [],
      };

    case RESUME_BEHAVIOR_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
