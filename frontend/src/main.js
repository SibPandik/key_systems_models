import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import './axios'
import components from '@/components/UI'

Vue.config.productionTip = false

components.forEach(component => Vue.component(component.name, component))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
