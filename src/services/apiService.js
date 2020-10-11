import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function getStudents(filter) {
  let response;
  let textToFilter = '';
  if (!filter) {
    textToFilter = '#';
  } else {
    textToFilter = filter;
  }
  const regex = `?nome__regex=/^${textToFilter}/i`;
  response = await axios.get(`${BASE_URL}/alunos${regex}`);

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

async function createStudent(student) {
  const response = await axios.post(`${BASE_URL}/alunos`, student);

  if (response.status !== 201) {
    throw Error(response.Error);
  }

  return response;
}

async function updateStudent(id, student) {
  //Por causa da validação nos Updates no backend, tenho que enviar sem a matrícula
  //RESOLVIDO COM O USO DA BIBLIOTECA: mongoose-beautiful-unique-validation
  //delete student.matricula;
  const response = await axios.put(`${BASE_URL}/alunos/${id}`, student);

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

//total students
async function getCountStudents() {
  const response = await axios.get(`${BASE_URL}/alunos/count`);

  if (response.status != 200) {
    throw Error(response.Error);
  }

  return response;
}

//resume occurrences per day, month and year
async function getResumeOccurrences() {
  const response = await axios.get(`${BASE_URL}/alunos/resumeocorrencias`);

  if (response.status != 200) {
    throw Error(response.Error);
  }

  return response;
}

//total occurrence to period
async function getCountOccurrence(startDate, endDate) {
  const uri = `countocorrencias?initialDate=${
    startDate ? startDate : ''
  }&finalDate=${endDate}`;
  const response = await axios.get(`${BASE_URL}/alunos/${uri}`);

  if (response.status != 200) {
    throw Error(response.Error);
  }

  return response;
}

//get comportamentos dos alunos
async function getBehaviorStudents() {
  const response = await axios.get(`${BASE_URL}/alunos/comportamento`);

  if (response.status != 200) {
    throw Error(response.Error);
  }

  return response;
}

export {
  getStudents,
  createStudent,
  updateStudent,
  getCountStudents,
  getCountOccurrence,
  getResumeOccurrences,
  getBehaviorStudents,
};
