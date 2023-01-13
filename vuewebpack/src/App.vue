<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Login/>
    
  </div>
</template>

<script>
import Login from './components/pages/Login'

export default {
  name: 'App',
  components: {
    Login
  }
  // created(){
  //   this.$http.get('https://randomuser.me/api/')
  //   .then((response)=>{
  //     console.log(response.data)
  //   })
  // }
}
</script>


<style scoped>
    /* img {
        width:"50px";
    } */
</style>
