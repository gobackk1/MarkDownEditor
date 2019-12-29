<template>
  <div class="editor">
    <div class="editor__list">
      <input type="text" class="editor__search" @input="onChangeSearchInput" placeholder="検索">
      <nav>
        <h2>MemoList</h2>
        <button type="button" class="create-memo" @click="onClickBtn()"><i class="fas fa-plus fa-lg"></i></i></button>
        <ul id="memo-list">
          <li
            v-for="memo in activeData"
            :key="memo.id"
            @click="onClickItem(memo)"
            :class="{ 'js-active': fetchData.currentItem.id === memo.id}"
            tabindex="0"
          >{{ memo.memo_title }}</li>
        </ul>
      </nav>
    </div>
    <div class="editor__stage">
      <Stage :active-data="activeData" />
    </div>
  </div>
</template>

<script>
import Stage from './Stage.vue'
import { mapActions } from 'vuex'
import { eventBus } from '../../../app'

export default {
  data(){
    return {
      fetchData: [],
      activeData: [],
    }
  },
  watch:{
    '$route' (to, from){
      this.setActiveDataByKey(this.$route.params.id)
    }
  },
  created(){
    this.fetchData = this.$store.state.memodata
  },
  mounted(){
    eventBus.$on('init', ev => {
      console.log(ev)
      this.setActiveDataByKey(this.$route.params.id, ev)
    })
    eventBus.$on('item', ev => {
      this.setActiveDataByKey(this.$route.params.id, ev)
    })
  },
  methods:{
    setActiveDataByKey(key, ev){
      let items
      if(key === 'fav' || key === 'trash'){
        const k = `memo_is_${key}`
        items = this.fetchData.memo.filter(i => i[k] == true)
      } else if(key === 'all') {
        items = this.fetchData.memo.filter(i => i.memo_is_trash == false)
      } else {
        items = this.fetchData.memo.filter(i => i.category_id == key && i.memo_is_trash == false)
      }
      if(items){
        if(ev === 'deleted' || ev === 'cleared'){
          this.setCurrentItem(items[0])
        }
        this.activeData = items
      }
    },
    onClickItem(item){
      this.setCurrentItem(item)
    },
    onClickBtn(){
      const memoTitle = prompt('タイトルを入力して下さい。')
      const memo = {
        memoTitle: memoTitle,
        categoryId: this.$route.params.id,
      }
      if(memoTitle){
        this.createItem(memo)
      }
    },
    onChangeSearchInput(e){
      const val = e.target.value
      const items = this.fetchData.memo.filter(i =>
        i.memo_body.indexOf(val) !== -1
        && i.category_id == this.$route.params.id
        && i.memo_is_trash === "0"
      )
      this.setCurrentItem(items[0])
      this.activeData = items
    },
    ...mapActions('memodata',[
      'setCurrentItem',
      'createItem'
    ]),
  },
  components:{
    Stage
  }
}

</script>

<style scoped lang="scss">
  .editor{
    display: flex;
    justify-content: space-between;
    flex:auto;
    &__list{
      width: 250px;
      background: #FAFAFA;
      padding:10px;
      height: calc(100vh - 36px);
      border-right:1px solid #eaeaea;
      resize: horizontal;
      overflow:hidden;
      position:relative;
      box-sizing:border-box;
    }
    &__stage{
      flex:auto;
    }
  }
  h2{
    font-weight: bold;
    margin-bottom: 10px;
  }
  li{
    display: block;
    padding: 10px 10px 10px 20px;
    position: relative;
    border-bottom: 1px solid #ccc;
    cursor:pointer;
    &::before{
      // display:none;
      font-family: "Font Awesome 5 free";
      content: '\f15c';
      font-weight: 400;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0px;
      margin:auto;
      height: 16px;
    }
    &:not(.js-active):hover{
      background:#e8e8e8;
    }
  }
  .js-active{
    background:#cacaca;
  }
  button{
    background:none;
    border:none;
    color:inherit;
    position: absolute;
    top: 10px;
    right: 10px;
    transition:.3s;
    cursor:pointer;

    &:hover{
      transform:scale(1.2);
    }
  }
</style>
