<template>
  <header class="header">
    <h1 class="header__ttl">MDEditor</h1>
    <nav class="header__menu">
      <ul class="hdr-link">
        <li v-for="menu in headerLink" :key="menu.label">
          <RouterLink :to="{name: menu.name}" class="hdr-link__item">{{ menu.label }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
  export default {
    data(){
      return {
        headerLink:[
          {label: 'editor', name: 'Home'},
          {label: 'patch note', name: 'PatchNote'},
          {label: 'help', name: 'Help'},
          {label: 'setting', name: 'Setting'},
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .header{
    background:#222222;
    color:#fff;
    padding: 15px 30px;
    font-weight: bold;
    border-bottom:1px solid #000;
    &__ttl{
      float:left;
    }
    &__menu{
      float:right;
    }
    &::after{
      content:'';
      display:block;
      clear:both;
    }
  }
  .hdr-link{
    display:flex;
    &__item{
      padding:0px 10px;
    }
  }
</style>
