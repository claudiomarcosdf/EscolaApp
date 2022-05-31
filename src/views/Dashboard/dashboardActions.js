import * as api from '../../services/apiStudentService';

import {
  COUNT_STUDENT_REQUEST,
  COUNT_STUDENT_SUCCESS,
  COUNT_STUDENT_FAILURE,
  RESUME_OCCURRENCES_REQUEST,
  RESUME_OCCURRENCES_SUCCESS,
  RESUME_OCCURRENCES_FAILURE,
  RESUME_BEHAVIOR_REQUEST,
  RESUME_BEHAVIOR_SUCCESS,
  RESUME_BEHAVIOR_FAILURE
} from './dashboardTypes';

export const countStudentRequest = () => {
  return {
    type: COUNT_STUDENT_REQUEST
  };
};

export const countStudentSuccess = (count) => {
  return {
    type: COUNT_STUDENT_SUCCESS,
    payload: count
  };
};

export const countStudentFailure = (errors) => {
  return {
    type: COUNT_STUDENT_FAILURE,
    payload: errors
  };
};

export const resumeOccurrencesRequest = () => {
  return {
    type: RESUME_OCCURRENCES_REQUEST
  };
};

export const resumeOccurrencesSuccess = (resume) => {
  return {
    type: RESUME_OCCURRENCES_SUCCESS,
    payload: resume
  };
};

export const resumeOccurrencesFailure = (errors) => {
  return {
    type: RESUME_OCCURRENCES_FAILURE,
    payload: errors
  };
};

export const resumeBehaviorRequest = () => {
  return {
    type: RESUME_BEHAVIOR_REQUEST
  };
};

export const resumeBehaviorSuccess = (resume) => {
  return {
    type: RESUME_BEHAVIOR_SUCCESS,
    payload: resume
  };
};

export const resumeBehaviorFailure = (errors) => {
  return {
    type: RESUME_BEHAVIOR_FAILURE,
    payload: errors
  };
};

export const fetchCountStudents = () => {
  return (dispatch) => {
    dispatch(countStudentRequest);

    api
      .getCountStudents()
      .then((response) => {
        const count = response.data.value;

        dispatch(countStudentSuccess(count));
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');

        dispatch(countStudentFailure(errors));
      });
  };
};

export const fetchResumeOccurrences = () => {
  return (dispatch) => {
    dispatch(resumeOccurrencesRequest);

    api
      .getResumeOccurrences()
      .then((response) => {
        const resume = response.data;
        console.log(resume);
        dispatch(resumeOccurrencesSuccess(resume));
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');

        dispatch(resumeOccurrencesFailure(errors));
      });
  };
};

export const fetchResumeBehaviors = () => {
  return (dispatch) => {
    dispatch(resumeBehaviorRequest);

    api
      .getBehaviorStudents()
      .then((response) => {
        const resume = response.data;

        const resumeTotals = {
          totalExcepcional: 0,
          totalOtimo: 0,
          totalBom: 0,
          totalRegular: 0,
          totalInsuficiente: 0,
          totalMau: 0
        };

        resume.forEach(({ comportamento }) => {
          switch (comportamento.status) {
            case 'Excepcional':
              return (resumeTotals.totalExcepcional += 1);
            case 'Otimo':
              return (resumeTotals.totalOtimo += 1);
            case 'Bom':
              return (resumeTotals.totalBom += 1);
            case 'Regular':
              return (resumeTotals.totalRegular += 1);
            case 'Insuficiente':
              return (resumeTotals.totalInsuficiente += 1);
            case 'Mau':
              return (resumeTotals.totalMau += 1);
            default:
              break;
          }
        });

        dispatch(resumeBehaviorSuccess(resumeTotals));
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');

        dispatch(resumeBehaviorFailure(errors));
      });
  };
};
