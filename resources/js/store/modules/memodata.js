import axios from 'axios'

const test1 = index =>{
  state.category[index].category_has_memo = () => {
    const id = state.category[index].id
    const items = state.memo.filter(i => i.category_id == id)
    return items.length
  }
}

const state = {
  category:{},
  memo:{},
  currentItem:{},
  // currentCategory:1,
  toggle:{
    editor:false,
    nav:true,
  },
  test:'test'
}

const getters = {
  getItemById: state => id => state.memo.find(i => i.id === id),
}

const mutations = {
  fetchItems(state,res){
    state.memo = res.memo
    state.category = res.category
    state.currentItem = res.memo[0]
    console.log('category')
    console.log(res.category)
    console.log('memo')
    console.log(res.memo)

    for(let i = 0; state.category.length > i; i++){
      test1(i)
    }
  },
  setCurrentItem(state, item){
    state.currentItem = item
  },
  setCurrentCategory(state,categoryId){
    state.currentCategory = categoryId
  },
  storeCategory(state,data){
    // data.category_has_memo = () => {
    //   const id = data.id
    //   const items = state.memo.filter(i => i.category_id == id)
    //   return items.length
    // }
    state.category.push(data)
    const index = state.category.findIndex(i => i.id === data.id)
    test1(index)
    // state.category[index].category_has_memo = () => {
    //   const id = state.category[index].id
    //   const items = state.memo.filter(i => i.category_id == id)
    //   return items.length
    // }
  },
  updateCategory({ category }, item){
    const index = category.findIndex(i => i.id === item.id)
    category[index] = item
    test1(index)
    // state.category[index].category_has_memo = () => {
    //   const id = state.category[index].id
    //   const items = state.memo.filter(i => i.category_id == id)
    //   return items.length
    // }
  },
  deleteCategory(state, { id }){
    const index = state.category.findIndex(i => i.id === id)
    state.category.splice(index, 1)
    const items = state.memo.filter( entry => entry.category_id != id)
    state.memo = items
  },
  storeItem(state, data){
    state.memo.push(data)
    const index = state.category.findIndex(i => i.id == data.category_id)
  },
  updateItem({ memo, currentItem }, item){
    const index = memo.findIndex(i => i.id === item.id)
    memo[index], currentItem = item
  },
  deleteItem(state, { id }){
    const index = state.memo.findIndex(i => i.id === id)
    state.memo.splice(index, 1)
  },
  toggle(state, key){
    state.toggle[key] = !state.toggle[key]
    console.log(state.toggle[key])

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
  setCategory({ commit },categoryName){
    const req = {
      categoryName: categoryName
    }
    axios.post('/api/create/category',req)
      .then((res)=>{
        commit('storeCategory', res.data)
        console.log(res.data)
      })
      .catch((e)=>{
        alert(e)
      })
  },
  updateCategory({ commit }, item){
    axios.post('/api/update/category', item)
      .then( res => commit('updateCategory', res.data))
      .catch( e => alert(e))
  },
  deleteCategory({ commit }, category){
    axios.post('/api/delete/category', category)
      .then( res => commit('deleteCategory', res.data))
      .catch( e => alert(e))
  },
  createItem({ commit }, item){
    axios.post('/api/create/memo', item)
      .then((res)=>{
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
  toggle({ commit }, key){
    commit('toggle', key)
  },
}

const memodata = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default memodata;
