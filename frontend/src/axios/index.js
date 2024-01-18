import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:8000/",
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  return {
    ...config,
    headers: {...config.headers, Authorization: `Token ${token}`}
  }
})

Vue.prototype.$ajax = instance;

export default instance;