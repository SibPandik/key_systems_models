import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
  baseURL: "http://pandikk.pythonanywhere.com",
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