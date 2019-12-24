import axios from 'axios'

const state = {
  category:{},
  memo:{},
  currentItem:{},
  // currentCategory:1,
  editor:false,
  test:'test'
}

const getters = {
  getItemById: state => id => state.memo.find(i => i.id === id),
}

const mutations = {
  fetchItems(state,res){
    state.category = res.category
    state.memo = res.memo
    state.currentItem = res.memo[0]
    console.log('category')
    console.log(res.category)
    console.log('memo')
    console.log(res.memo)
  },
  setCurrentItem(state, item){
    state.currentItem = item
  },
  setCurrentCategory(state,categoryId){
    state.currentCategory = categoryId
  },
  storeCategory(state,data){
    state.category.push(data)
  },
  deleteCategory(state, { id }){
    const index = state.category.findIndex(i => i.id === id)
    state.category.splice(index, 1)
    const items = state.memo.filter( entry => entry.category_id != id)
    state.memo = items
  },
  storeItem(state, data){
    state.memo.push(data)
  },
  updateItem({ memo, currentItem }, item){
    const index = memo.findIndex(i => i.id === item.id)
    memo[index], currentItem = item
  },
  deleteItem(state, { id }){
    const index = state.memo.findIndex(i => i.id === id)
    state.memo.splice(index, 1)
  },
  toggleEditor(state){
    state.editor = !state.editor
  }
}

const actions = {
  fetchItems({ commit }){
    axios.get('/api/items')
    .then((res)=>{
      commit('fetchItems', res.data)
    })
    .catch((e)=>{
      alert(e)
    })
  },
  setCurrentItem({ commit },item){
    commit('setCurrentItem', item)
  },
  setCurrentCategory({ commit },id){
    commit('setCurrentCategory',id)
  },
  createCategory({ commit },categoryName){
    const req = {
      categoryName: categoryName
    }
    axios.post('/api/create/category',req)
      .then((res)=>{
        commit('storeCategory', res.data)
      })
      .catch((e)=>{
        alert(e)
      })
  },
  deleteCategory({ commit } ,id){
    const req = {
      id: id
    }
    axios.post('/api/delete/category', req)
      .then((res)=>{
        commit('deleteCategory', res.data)
      })
      .catch((e)=>{
        alert(e)
      })
  },
  createItem({ commit }, item){
    console.log(item);

    axios.post('/api/create/memo', item)
      .then((res)=>{
        console.log(res);

        commit('storeItem', res.data)
      })
      .catch((e)=>{
        alert(e)
      })
  },
  updateItem({ commit }, item){
    axios.post('/api/update/memo', item)
      .then((res)=>{
        commit('updateItem', res.data)
      })
      .catch((e)=>{
        alert(e)
      })
  },
  deleteItem({ commit }, id){
    const req = {
      id: id
    }
    axios.post('/api/delete/memo', req)
      .then((res)=>{
        commit('deleteItem', res.data)
      })
      .catch((e)=>{
        alert(e)
      })
  },
  toggleEditor({ commit }){
    commit('toggleEditor')
  }
}

const memodata = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default memodata;
