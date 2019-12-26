<template>
  <div>
    <Toolbar />
    <div
      v-for="memo in fetchData.memo"
      :key="memo.id"
      v-if="memo.category_id == $route.query.id"
      v-show="fetchData.currentItem.id === memo.id"
      class="memo"
    >
      <textarea name="body" v-model="memo.memo_body" v-show="fetchData.editor"></textarea>
      <MarkDownBody :content="memo.memo_body" v-show="!fetchData.editor"></MarkDownBody>
    </div>
  </div>
</template>

<script>
  import MarkDownBody from './MarkDownBody'
  import Toolbar from './Toolbar'

  export default {
    data(){
      return {
        fetchData:[],
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    components:{
      MarkDownBody,
      Toolbar
    },
  }
</script>

<style scoped lang="scss">
  .memo{
    height: calc(100vh - 36px);
    padding: 20px 30px 0;
    box-sizing:border-box;
    overflow-y:auto;
    word-break:break-all;
  }
  textarea{
    width: 100%;
    height: 90%;
    box-sizing:border-box;
    font-size: 110%;
  }
</style>
