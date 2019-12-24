<template>
  <header @click.right.prevent="test()">
    <h1>MDEditor</h1>
  </header>
</template>
<style scoped lang="scss">
  header{
    background:#222222;
    color:#fff;
    padding: 10px 20px;
    font-weight: bold;
    border-bottom:1px solid #000;
  }
</style>
