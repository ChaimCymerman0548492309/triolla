// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // <--- חשוב
});

export default api;
