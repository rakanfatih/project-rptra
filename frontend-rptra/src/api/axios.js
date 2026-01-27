// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Sesuaikan dengan port Laravel Anda
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json' // Penting agar Laravel merespon JSON, bukan HTML saat error
  }
});

// INTERCEPTOR: Pasang Token Otomatis ke Setiap Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ambil token dari penyimpanan browser
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Tempel token di header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;