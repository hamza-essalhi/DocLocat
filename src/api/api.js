import axios from 'axios';
import { REACT_APP_API_URL } from './api.config';
const api = axios.create({
  baseURL: REACT_APP_API_URL,
  
});

// Add a request interceptor to include the token in the headers
;

export default api;
