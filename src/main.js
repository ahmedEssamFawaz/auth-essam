import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axiosConfig from './plugins/axiosConfig'
Vue.config.productionTip = false

Vue.prototype.$axios = axiosConfig


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
