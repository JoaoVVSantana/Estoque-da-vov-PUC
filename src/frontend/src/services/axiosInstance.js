import axios from 'axios';

export const axiosInstanceEstoque = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://estoque-da-vovo-backend.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  //withCredentials: true, // Permite envio de cookies e credenciais
});