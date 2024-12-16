import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const axiosInstanceEstoque = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  //withCredentials: true, // Permite envio de cookies e credenciais
});