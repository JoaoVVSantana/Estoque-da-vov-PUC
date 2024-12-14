import axios from 'axios';

export const axiosInstanceEstoque = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  //withCredentials: true, // Permite envio de cookies e credenciais
});