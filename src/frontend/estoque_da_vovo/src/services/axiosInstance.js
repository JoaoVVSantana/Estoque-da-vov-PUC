import axios from 'axios'

export const axiosInstanceEstoque = axios.create({
  baseURL: 'http://localhost:5000/api/',
});