<template>
  <div class="content" :class="fetchData.toggle.nav ? '_tgl-nav-true' : '_tgl-nav-false'">
    <nav class="nav">
      <ul class="nav__head nav-total">
        <li class="nav-total__item">
          <RouterLink :to="{name: 'Category', params:{id: 'all'}}">
            すべてのメモ:<div class="nav-total__num">{{ numberOfAll }}</div>
          </RouterLink>
        </li>
        <li class="nav-total__item">
          <RouterLink :to="{name: 'Category', params:{id: 'fav'}}">
            お気に入り:<div class="nav-total__num">{{ numberOfFav }}</div>
          </RouterLink>
        </li>
        <li class="nav-total__item" @click.right.prevent="onRightClickTrash">
          <RouterLink :to="{name: 'Category', params:{id: 'trash'}}">
            ゴミ箱:<div class="nav-total__num">{{ numberOfTrash }}</div>
          </RouterLink>
        </li>
      </ul>
      <div class="nav__body">
        <h2 class="nav__ttl">CategoryList</h2>
        <button type="button" class="create-category" @click="createCategory()"><i class="fas fa-plus-square fa-2x"></i></button>
        <ul>
          <CategoryListItem
            v-for="category in fetchData.category"
            :key="category.id"
            :category="category"
          ></CategoryListItem>
        </ul>
      </div>
      <button class="nav__toggle" type="button" @click="toggleNav"></button>
    </nav>
    <RouterView />
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import CategoryListItem from '../pages/editor/CategoryListItem'

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
    computed:{
      numberOfAll(){
        return this.getTotalNumberByKey('all')
      },
      numberOfFav(){
        return this.getTotalNumberByKey('memo_is_fav')
      },
      numberOfTrash(){
        return this.getTotalNumberByKey('memo_is_trash')
      },
    },
    methods:{
      createCategory(){
        const categoryName = prompt('カテゴリー名を入力して下さい。')
        if(categoryName){
          this.setCategory(categoryName)
        }
      },
      getTotalNumberByKey(key){
        try{
          let counter = 0
          let k = ''
          let cond = true
          if(key === 'all'){
            k = 'memo_is_trash'
            cond = false
          } else {
            k = key
          }
          this.fetchData.memo.forEach(i => {
            if(i[k] == cond){
              counter++
            }
          })
          return counter
        } catch(e) {
          console.log('非同期通信中')//APIからのデータがdataに格納される前に算出しようとしたら
        }
      },
      toggleNav(){
        this.toggle('nav')
      },
      onRightClickTrash(){
        if(confirm('ゴミ箱のメモを全て削除してよろしいですか？')){
          const clearItems = this.fetchData.memo.filter(i => i.memo_is_trash == true)
          this.clearTrash(clearItems)
        }
      },
      ...mapActions('memodata',[
        'setCategory',
        'deleteCategory',
        'clearTrash',
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
    height: calc(100vh - 37px);
    display:flex;
    transition:transform .3s ease;
    &._tgl-nav-true{
      transform: translateX(-200px);
      margin-right: -200px;
    }
    &._tgl-nav-false{
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
    &__head{

    }
    &__body{
      position:relative;
      height: 100%;
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

  .nav-total{
    &__item{
      position:relative;
    }
    &__num{
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin:auto;
      display: inline-block;
    }
  }

  .create-category{
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
