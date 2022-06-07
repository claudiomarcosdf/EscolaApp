import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function getWatchers() {
  let response;
  response = await axios.get(`${BASE_URL}/observadores`);

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

async function createWatcher(watcher) {
  const response = await axios.post(`${BASE_URL}/observadores`, watcher);

  if (response.status !== 201) {
    throw Error(response.Error);
  }

  return response;
}

async function updateWatcher(id, watcher) {
  const response = await axios.put(`${BASE_URL}/observadores/${id}`, watcher);

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

export { getWatchers, createWatcher, updateWatcher };
