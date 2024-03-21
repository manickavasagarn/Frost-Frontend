import axios from 'axios';

// request interceptor
axios.interceptors.request.use(
  config => {
    config.headers['authToken'] = (localStorage.getItem('authToken') !== null) ? localStorage.getItem("authToken") : undefined
    return config;
  }, 
  error => {
    return Promise.reject(error);
  });


// response interceptor
axios.interceptors.response.use(response => {
    return response;
  }, 
  error => {
    if(error.response.status ==401){
      localStorage.removeItem('authToken');
      window.location.href="/"
    }
    return Promise.reject(error);
  });

export default axios;