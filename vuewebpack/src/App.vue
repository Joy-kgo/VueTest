<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <Login/> -->
    <!-- <HelloWorld/> -->
    <router-view></router-view>
    <!-- 路由器替代 -->
  </div>
</template>

<script>
import Login from './components/pages/Login'
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    Login
    // HelloWorld
  }

}
</script>


<style scoped>

</style>
