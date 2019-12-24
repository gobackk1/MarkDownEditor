<template>
  <div>
    <Header />
    <main class="l-main">
      <div class="l-main__category-list">
        <CategoryList />
      </div>
      <div class="l-main__memo-area">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
  .l-main{
    display:flex;
    justify-content: space-between;
    &__category-list{
      width: 200px;
    }
    &__memo-area{
      flex:auto;
    }
  }
</style>

<script>
  import Header from './components/Header.vue'
  import CategoryList from './components/CategoryList.vue'
  import 'github-markdown-css'

  export default {
    created(){
      this.$store.dispatch('memodata/fetchItems')
    },
    components: {
      Header,
      CategoryList
    }
  }

</script>
