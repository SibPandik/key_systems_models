import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../components/MainPage.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainPage },
  { path: '/login', component: Login }
];

const router = new VueRouter({
  routes
});

export default router;