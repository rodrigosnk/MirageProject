import axios from 'axios';

//const BASE_URL = 'https://mirageserver.onrender.com';
const BASE_URL = 'http://localhost:8080';

const api = axios.create({ baseURL: BASE_URL });

// Token helpers
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      localStorage.setItem('tilapia_token', token);
    } catch {
      // ignore
    }
    try {
      window.dispatchEvent(new Event('tilapia-auth-changed'));
    } catch {
      // ignore (non-browser env)
    }
  } else {
    delete api.defaults.headers.common['Authorization'];
    try {
      localStorage.removeItem('tilapia_token');
    } catch {
      // ignore
    }
    try {
      window.dispatchEvent(new Event('tilapia-auth-changed'));
    } catch {
      // ignore
    }
  }
}

export function getStoredToken() {
  try {
    return localStorage.getItem('tilapia_token');
  } catch {
    return null;
  }
}

const _initToken = getStoredToken();
if (_initToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${_initToken}`;
}

// Promise-based API functions
export async function loginApi(email, password) {
  const resp = await api.post('/auth/login', { email, password });
  return resp.data;
}

export async function registerApi(name, email, password) {
  const resp = await api.post('/auth/register', { name, email, password });
  return resp.data;
}

// Protected endpoints
export async function getProfile() {
  const resp = await api.get('/auth/me');
  return resp.data;
}

export async function getFavorites() {
  const resp = await api.get('/movies/favorites');
  return resp.data;
}

export async function addFavorite(movieId) {
  const resp = await api.post('/movies/favorites', { movieId });
  return resp.data;
}

export async function removeFavorite(movieId) {
  const resp = await api.delete(`/movies/favorites/${movieId}`);
  return resp.data;
}

// Watch-later management
export async function addWatchLater(movieId) {
  const resp = await api.post('/movies/watch-later', { movieId });
  return resp.data;
}

export async function getWatchLater() {
  const resp = await api.get('/movies/watch-later');
  return resp.data;
}

export async function removeWatchLater(movieId) {
  const resp = await api.delete(`/movies/watch-later/${movieId}`);
  return resp.data;
}

// Top10 management
export async function addTop10(movieId) {
  const resp = await api.post('/movies/top-10', { movieId });
  return resp.data;
}

export async function getTop10() {
  const resp = await api.get('/movies/top-10');
  return resp.data;
}
export async function removeTop10(movieId) {
  const resp = await api.delete(`/movies/top-10/${movieId}`);
  return resp.data;
}

export async function logout() {
  const resp = await api.post('/auth/logout');
  return resp.data;
}

/* move mandando as inforções no body */
export function moveTop10Position(movieId, position) {
 
  const resp = api.put(`/movies/top-10/position`, { movieId, position });
  console.log(resp)
  return resp;
}

export async function deletList(listName) {
  return await api.delete(`/movies/${ listName }`);
}

export default {
  loginApi,
  registerApi,
  setAuthToken,
  getStoredToken,
  getProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
  addWatchLater,
  getWatchLater,
  removeWatchLater,
  addTop10,
  getTop10,
  removeTop10,
  moveTop10Position,
  deletList,
};