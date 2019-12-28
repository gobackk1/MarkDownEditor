<template>
  <div class="toolbar">
    <!-- <div class="toolbar__category">{{ }} &gt; {{  }}</div> -->
    <button class="toolbar__btn--fav" :class="{ 'js-fav': fetchData.currentItem.memo_is_fav == true }" type="button" @click="onClickFav(fetchData.currentItem.id)">
      <i class="fas fa-star fa-lg" v-show="fetchData.currentItem.memo_is_fav == true"></i>
      <i class="far fa-star fa-lg" v-show="fetchData.currentItem.memo_is_fav == false"></i>
    </button>
    <button class="toolbar__btn--del" type="button" @click="deleteConfirm(fetchData.currentItem.id)">
      <i class="fas fa-trash-alt fa-lg"></i>
    </button>
    <button class="toolbar__btn--edit" type="button" @click="onClickEdit(fetchData.currentItem.id)">
      <i class="fas fa-pen fa-lg"></i>
    </button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data(){
      return {
        fetchData:[],
        confirmText:'このメモをゴミ箱へ移動しますか？',
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    methods:{
      deleteConfirm(id){
        if(confirm(this.confirmText)){
          this.deleteItem(id)
        }
      },
      onClickEdit(id){
        this.toggle('editor')
        this.editItem(id)
      },
      onClickFav(id){
        const item = this.getItemById(id)
        item.memo_is_fav = !item.memo_is_fav
        this.updateItem(item)
      },
      editItem(id){
        const item = this.getItemById(id)
        this.updateItem(item)
      },
      getItemById(id){
        const item = this.$store.getters['memodata/getItemById'](id)
        return item
      },
      ...mapActions('memodata', [
        'updateItem',
        'deleteItem',
        'toggle'
      ])
    }
  }
</script>

<style scoped lang="scss">
  %toolbar__btn--cmn{
    float:right;
    cursor:pointer;
    border:none;
    padding: 10px;
    margin-left: 10px;
    box-sizing:border-box;
    &:hover{
      background: #ccc;
    }
  }
  .toolbar{
    padding: 0 30px;
    margin-bottom: 30px;
    &::after{
      content:'';
      display: block;
      clear:both;
    }
    &__category{
      float:left;
    }
    &__btn{
      &--fav{
        @extend %toolbar__btn--cmn;
      }
      &--del{
        @extend %toolbar__btn--cmn;
      }
      &--edit{
        @extend %toolbar__btn--cmn;
      }
    }
  }
  .js-fav{
    color :#ffdf3b;
  }
</style>
