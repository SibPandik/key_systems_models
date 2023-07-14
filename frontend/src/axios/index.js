import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
  baseURL: "http://pandikk.pythonanywhere.com",
});

const token = localStorage.getItem('token');
const header = 'token ' + token;

instance.defaults.headers.common['Authorization'] = header


Vue.prototype.$ajax = instance;

export default instance;