<template>
  <div class="memo-area">
    <div class="memo-area__list">
      <MemoList />
    </div>
    <div class="memo-area__stage">
      <MemoStage />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .memo-area{
    display: flex;
    justify-content: space-between;
    &__list{
      width: 200px;
    }
    &__stage{
      flex:auto;
    }
  }
</style>

<script>
import MemoList from './MemoList.vue'
import MemoStage from './MemoStage.vue'

export default {
  components:{
    MemoList,
    MemoStage
  }
}

</script>
