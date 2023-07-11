import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import components from '@/components/UI'

Vue.config.productionTip = false

components.forEach(component => Vue.component(component.name, component))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
