import * as api from '../../services/apiService';
import { toastr } from 'react-redux-toastr';
import { currentStudent } from '../Student/studentActions';
import { visibleModal } from '../Modal/modalActions';

import {
  ADD_OCCURRENCE_REQUEST,
  ADD_OCCURRENCE_SUCCESS,
  ADD_OCCURRENCE_FAILURE,
  DELETE_OCCURRENCE_REQUEST,
  DELETE_OCCURRENCE_SUCCESS,
  DELETE_OCCURRENCE_FAILURE,
} from './occurrenceTypes';

export const addOccurrenceRequest = () => {
  return {
    type: ADD_OCCURRENCE_REQUEST,
  };
};

export const addOccurrenceSuccess = (occurrences) => {
  return {
    type: ADD_OCCURRENCE_SUCCESS,
    payload: occurrences,
  };
};

export const addOccurrenceFailure = (errors) => {
  return {
    type: ADD_OCCURRENCE_FAILURE,
    payload: errors,
  };
};

export const deleteOccurrenceRequest = () => {
  return {
    type: DELETE_OCCURRENCE_REQUEST,
  };
};

export const deleteOccurrenceSuccess = (occurrences) => {
  return {
    type: DELETE_OCCURRENCE_SUCCESS,
    payload: occurrences,
  };
};

export const deleteOccurrenceFailure = (errors) => {
  return {
    type: DELETE_OCCURRENCE_FAILURE,
    payload: errors,
  };
};

export const addOccurrence = (idStudent, occurrence) => {
  return (dispatch) => {
    dispatch(addOccurrenceRequest);

    api
      .addOccurrence(idStudent, occurrence)
      .then((response) => {
        const student = response.data;
        dispatch([
          addOccurrenceSuccess(student.ocorrencias),
          currentStudent(student), //atualiza todo o obj student
          visibleModal(false),
        ]);
        toastr.success('Sucesso', 'Nova ocorrência adicionada.');
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        dispatch([addOccurrenceFailure(errors), visibleModal(true)]);
        errors.forEach((error) => toastr.error('Erro', error));
      });
  };
};

export const deleteOccurrence = (idOccurrence) => {
  return (dispatch) => {
    dispatch(deleteOccurrenceRequest);

    api
      .deleteOccurrence(idOccurrence)
      .then((response) => {
        const student = response.data;

        dispatch([
          deleteOccurrenceSuccess(student.ocorrencias),
          currentStudent(student), //atualiza student e as ocorrências
        ]);
        toastr.success('Sucesso', 'A ocorrência foi removida');
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');

        dispatch(deleteOccurrenceFailure(errors));
        toastr.error('Erro', 'Erro ao remover ocorrência');
      });
  };
};
