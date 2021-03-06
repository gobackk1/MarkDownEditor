import Vue from 'vue'
import router from './router'
import store from './store/store'
import App from './components/App.vue'

export const eventBus = new Vue()

window.vm = new Vue ({
  el:'#app',
  router,
  store,
  render: h => h(App),
  created(){
    this.$store.dispatch('memodata/fetchItems')
  },
})
