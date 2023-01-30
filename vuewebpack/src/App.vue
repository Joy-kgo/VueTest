<template>
  <div id="app">
    <div>
      <loading :active.sync="isLoading"></loading>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <router-link class="nav-link" :to="{ name: '首頁' }">Home </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/page">Page </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <header-component></header-component>
    <my-component></my-component>

    <!-- 同個路徑載入兩個頁面元件 -->
    <router-view name="menu"> </router-view>
    <div class="container">
      <!-- 路由器替代 -->
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
import Search from './components/pages/Search';
import Main from './components/pages/Main';


export default {
  name: 'App',
  components: {
    'header-component':Search,
    'my-component':Main
  },
  computed:{
        isLoading(){
            return this.$store.state.isLoading;
        }
    },
}
</script>


<style>

</style>
