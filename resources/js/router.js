import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

import MemoArea from './components/MemoArea.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    component:MemoArea
  },
  {
    path:'/category',
    name:'Category',
    component:MemoArea
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

router.afterEach((to,from)=>{
  // store.dispatch('memodata/initCurrentItem')
});

export default router
