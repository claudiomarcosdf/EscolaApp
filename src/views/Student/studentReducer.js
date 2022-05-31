import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  CURRENT_STUDENT,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  EDIT_STUDENT_REQUEST,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE,
  ADD_STUDENT_AVATAR_REQUEST,
  ADD_STUDENT_AVATAR_SUCCESS,
  ADD_STUDENT_AVATAR_FAILURE
} from './studentTypes';

const initialState = {
  loading: false,
  student: {},
  students: [],
  errors: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,
        errors: []
      };

    case FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        students: [],
        errors: action.payload
      };

    case CURRENT_STUDENT:
      return {
        ...state,
        loading: false,
        student: action.payload,
        students: []
      };

    case ADD_STUDENT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.payload,
        errors: []
      };

    case ADD_STUDENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case EDIT_STUDENT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.payload,
        errors: []
      };

    case EDIT_STUDENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case ADD_STUDENT_AVATAR_REQUEST:
      return {
        ...state,
        loading: true
      };

    case ADD_STUDENT_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.payload,
        errors: []
      };

    case ADD_STUDENT_AVATAR_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
