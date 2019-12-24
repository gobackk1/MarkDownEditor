import Vue from 'vue'
import Vuex from 'vuex'
import memodata from './modules/memodata'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memodata
  }
})
export default store
