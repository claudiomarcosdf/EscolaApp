import * as api from '../../services/apiService';
import { toastr } from 'react-redux-toastr';
import { visibleModal } from './Modal/modalActions';
import { fetchCountStudents } from '../Dashboard/dashboardActions';

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
} from './studentTypes';

export const fetchStudentsRequest = () => {
  return {
    type: FETCH_STUDENTS_REQUEST,
  };
};

export const fetchStudentsSuccess = (students) => {
  return {
    type: FETCH_STUDENTS_SUCCESS,
    payload: students,
  };
};

export const fetchStudentsFailure = (errors) => {
  return {
    type: FETCH_STUDENTS_FAILURE,
    payload: errors,
  };
};

export const currentStudent = (student) => {
  return {
    type: CURRENT_STUDENT,
    payload: student,
  };
};

export const addStudentRequest = () => {
  return {
    type: ADD_STUDENT_REQUEST,
  };
};

export const addStudentSuccess = (student) => {
  return {
    type: ADD_STUDENT_SUCCESS,
    payload: student,
  };
};

export const addStudentFailure = (errors) => {
  return {
    type: ADD_STUDENT_FAILURE,
    payload: errors,
  };
};

export const editStudentRequest = () => {
  return {
    type: EDIT_STUDENT_REQUEST,
  };
};

export const editStudentSuccess = (student) => {
  return {
    type: EDIT_STUDENT_SUCCESS,
    payload: student,
  };
};

export const editStudentFailure = (errors) => {
  return {
    type: EDIT_STUDENT_FAILURE,
    payload: errors,
  };
};

//####### Above Async Actions ########

export const fetchStudents = (filter) => {
  return (dispatch) => {
    dispatch(fetchStudentsRequest);

    api
      .getStudents(filter)
      .then((response) => {
        const students = response.data;

        dispatch(fetchStudentsSuccess(students));
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');

        dispatch(fetchStudentsFailure(errors));
      });
  };
};

export const addStudent = (newStudent) => {
  return (dispatch) => {
    dispatch(addStudentRequest);

    api
      .createStudent(newStudent)
      .then((response) => {
        const student = response.data;
        dispatch([
          addStudentSuccess(student),
          visibleModal(false),
          fetchCountStudents,
        ]);
        toastr.success('Sucesso', 'Cadastro realizado com sucesso.');
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        dispatch([addStudentFailure(errors), visibleModal(true)]);
        errors.forEach((error) => toastr.error('Erro', error));
      });
  };
};

export const editStudent = (studentToUpdate) => {
  const { _id } = studentToUpdate;
  return async (dispatch) => {
    dispatch(editStudentRequest);

    try {
      const response = await api.updateStudent(_id, studentToUpdate);
      const student = response.data;

      dispatch([editStudentSuccess(student), visibleModal(false)]);
      toastr.success('Sucesso', 'Atualização realizada com sucesso.');
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch([editStudentFailure(errors), visibleModal(true)]);
      errors.forEach((error) => toastr.error('Erro', error));
    }
  };
};
