// src/components/api.js
import axios from 'axios';

const BASE_URL = "https://backend.cicowp-ca.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
