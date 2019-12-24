import Vue from 'vue'
import router from './router'
import store from './store/store'
import App from './App.vue'

const vm = new Vue ({
  el:'#app',
  router,
  store,
  render: h => h(App)
})

window.vm = vm
