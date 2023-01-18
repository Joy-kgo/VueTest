<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->

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
    <!-- <img src="./assets/logo.png"> -->
    <!-- <Login/> -->
    <!-- <HelloWorld/> -->
    <!-- 同個路徑載入兩個頁面元件 -->
    <router-view name="menu"> </router-view>
    <div class="container">
      <!-- 路由器替代 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Login from './components/pages/Login';
import HelloWorld from './components/HelloWorld';


export default {
  name: 'App',
  components: {
    Login
    // HelloWorld
  },
}
</script>


<style>

</style>
