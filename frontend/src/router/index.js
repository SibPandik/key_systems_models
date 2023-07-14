import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from '../pages/MainPage.vue'
import LoginPage from '../pages/LoginPage.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('token')
  if (to.meta.requiresAuth && !auth) {
    next({
      path: '/login',
    })
  } else {
    next()
  }
})

export default router;