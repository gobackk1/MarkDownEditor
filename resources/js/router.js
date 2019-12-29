import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

import Editor from './components/pages/EditorView/Editor'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    component:Editor
  },
  {
    path:'/category/:id',
    name:'Category',
    component:Editor
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
