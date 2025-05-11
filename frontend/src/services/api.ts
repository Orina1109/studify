import axios from 'axios';

// Create a default axios instance with baseUrl set to the current origin
const api = axios.create({
  baseURL: 'http://localhost:8080',  // Empty string makes requests relative to the current origin
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Add request interceptor for logging or token handling if needed
api.interceptors.request.use(
  (config) => {
    // Get auth token from cookies
    const cookies = document.cookie.split(';');
    const authTokenCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));

    if (authTokenCookie) {
      const token = authTokenCookie.split('=')[1];
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
