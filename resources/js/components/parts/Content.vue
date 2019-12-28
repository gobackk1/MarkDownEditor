<template>
  <div class="content" :aria-expanded="fetchData.toggle.nav ? 'true' : 'false'" id="content">
    <nav class="nav">
      <div>全てのメモ：{{fetchData.memo.length}}</div>
      <h2 class="nav__ttl">CategoryList</h2>
      <button type="button" class="create-category" @click="createCategory()"><i class="fas fa-plus-square fa-2x"></i></button>
      <ul>
        <CategoryListItem
          v-for="category in fetchData.category"
          :key="category.id"
          :category="category"
        ></CategoryListItem>
      </ul>
      <button class="nav__toggle" type="button" @click="toggleNav" aria-controls="content"></button>
    </nav>
    <RouterView />
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import CategoryListItem from '../pages/EditorView/CategoryListItem'

  export default {
    data(){
      return {
        fetchData:{}
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    updated(){

      console.log('親のアップデート呼び出し')
    },
    methods:{
      createCategory(){
        const categoryName = prompt('カテゴリー名を入力して下さい。')
        if(categoryName){
          this.setCategory(categoryName)
        }
      },
      // setCurrentCategory(id){
      //   this.$store.dispatch('memodata/setCurrentCategory', id)
      // },
      toggleNav(){
        this.toggle('nav')
      },
      ...mapActions('memodata',[
        'setCategory',
        'deleteCategory',
        'toggle'
      ])
    },
    components:{
      CategoryListItem
    }
  }
</script>

<style scoped lang="scss">

  .content{
    display:flex;
    transition:transform .3s ease;
    &[aria-expanded="false"]{
      transform: translateX(-200px);
      margin-right: -200px;
    }
    &[aria-expanded="true"]{
      transform: translateX(-0px);
      margin-right: 0px;
    }
  }

  .nav{
    position:relative;
    box-sizing:border-box;
    background:#232628;
    color:#fff;
    padding:10px;
    height: calc(100vh - 36px);
    width: 250px;
    &__ttl{
      margin-bottom: 10px;
      font-weight: bold;
    }
    &__toggle{
      position: absolute;
      bottom: 10px;
      right: 6px;
      width: 20px;
      height: 20px;
      background: #fff;
    }
  }

  .create-category{
    position: absolute;
    top: 6px;
    right: 6px;
  }
</style>
