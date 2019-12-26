<template>
  <div class="content">
    <nav>
      <div>全てのメモ：{{fetchData.memo.length}}</div>
      <h2>CategoryList</h2>
      <button type="button" class="create-category" @click="createCategory()"><i class="fas fa-plus-square fa-2x"></i></button>
      <ul @click.right.prevent="onClickList">
        <li v-for="category in fetchData.category" :key="category.id" @click="setCurrentCategory(category.id)">
          <RouterLink
            :data-category-id="category.id"
            :to="{ path:'category', query: {id: category.id}}"
            :class="{ 'js-active': fetchData.currentCategory === category.id}"
          >{{ category.category_name }}<span class="num-of-memo">{{ getNumOfMemo(category.id) }}</span></RouterLink>
        </li>
        <!-- <li><RouterLink :to="{ path:'category', query: {id: 'trash'} }">ゴミ箱</RouterLink></li> -->
      </ul>
    </nav>
    <RouterView @updated="test" />
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data(){
      return {
        fetchData:{}
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    computed:{
      getNumOfMemo(){
        return id => {
          try {
            const index = this.fetchData.category.findIndex(i => i.id === id)
            const sum = this.fetchData.category[index].category_has_memo
            return sum
          } catch(e) {
            console.log('wait');
          }
        }
      }
    },
    updated(){
      console.log('親のアップデート呼び出し')
    },
    methods:{
      test(){
        console.log('updated router')
        console.log(this.fetchData = this.$store.state.memodata);

        this.fetchData = this.$store.state.memodata
      },
      createCategory(){
        const categoryName = prompt('カテゴリー名を入力して下さい。')
        if(categoryName){
          this.$store.dispatch('memodata/createCategory', categoryName)
        }
      },
      setCurrentCategory(id){
        this.$store.dispatch('memodata/setCurrentCategory', id)
      },
      deleteCategory(id){
        if(confirm('カテゴリーを削除しても良いですか？カテゴリーに属すメモも同時に削除されます。（ゴミ箱に残りません）')){
          this.$store.dispatch('memodata/deleteCategory', id)
        }
      },
      onClickList(e){
        const id = e.target.dataset.categoryId
        console.log(id);

        this.deleteCategory(id)
      }
    }
  }
</script>

<style scoped lang="scss">
  .content{
    display:flex;
  }
  h2{
    margin-bottom: 10px;
    font-weight: bold;
  }
  nav{
    position:relative;
    box-sizing:border-box;
    background:#232628;
    color:#fff;
    padding:10px;
    height: calc(100vh - 36px);
    width: 200px;
  }
  li{
    display: block;
    a{
      display:block;
      padding: 10px 10px 10px 20px;
      position: relative;
      &::before{
        font-family: "Font Awesome 5 free";
        content: '\f07b';
        font-weight: 400;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0px;
        margin:auto;
        height: 16px;
      }
      &:not(.router-link-exact-active):hover{
        background:#224e4b;
        color:#47cec5;
      }
    }
  }
  .router-link-exact-active{
    color:#35f5e8;
    background:#4a8682;
  }
  button{
    background:none;
    border:none;
    color:inherit;
    position: absolute;
    top: 6px;
    right: 6px;
    transition:.3s;
    cursor:pointer;
    &:hover{
      transform:scale(1.2);
    }
  }
  .num-of-memo{
    position: absolute;
    right: 0;
  }
</style>
