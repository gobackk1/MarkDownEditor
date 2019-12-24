<template>
  <div id="MemoList">
    <nav>
      <h2>MemoList</h2>
      <button type="button" class="create-memo" @click="onClickBtn()"><i class="fas fa-plus fa-lg"></i></i></button>
        <ul>
          <li
            v-for="memo in fetchData.memo"
            :key="memo.id"
            v-if="memo.category_id == $route.query.id"
            @click="onClickItem(memo)"
            :class="{ 'js-active': fetchData.currentItem.id === memo.id}"
            tabindex="0"
          >{{ memo.memo_title }}</li>
        </ul>
      <!-- <ul v-else>
        <li
          v-for="memo in fetchData.memo"
          :key="memo.id"
          v-if="memo.memo_trash == true"
          @click="setCurrentMemo(memo.id)"
          :class="{ 'js-active': fetchData.currentItem === memo.id}"
          tabindex="0"
        >{{ memo.memo_title }}</li>
      </ul> -->
    </nav>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    data(){
      return {
        fetchData: [],
        currentItem: {},
      }
    },
    mounted(){
      this.initItem()
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    methods:{
      initItem(){
        // this.$store.state.memodata.currentItem = this.$store.state.memodata.memo[0]
      },
      onClickItem(item){
        this.setCurrentItem(item)
      },
      onClickBtn(){
        const memoTitle = prompt('タイトルを入力して下さい。')
        const memo = {
          memoTitle: memoTitle,
          categoryId: this.$route.query.id,
        }
        if(memoTitle){
          this.createItem(memo)
        }
      },
      ...mapActions('memodata',[
        'setCurrentItem',
        'createItem'
      ])
    }
  }
</script>
<style scoped lang="scss">
  h2{
    font-weight: bold;
    margin-bottom: 10px;
  }
  nav{
    position:relative;
    box-sizing:border-box;
    background: #FAFAFA;
    padding:10px;
    height: calc(100vh - 36px);
    border-right:1px solid #eaeaea;
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
