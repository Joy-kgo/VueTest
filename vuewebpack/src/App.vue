<template>
  <div id="app">
    <div>
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- 同個路徑載入兩個頁面元件 -->
    <nav-component></nav-component>
    <router-view name="menu"> </router-view>
    <header-component></header-component>
    <my-component></my-component>
    <bottom-component></bottom-component>

  </div>
</template>

<script>
import NavBar from './components/pages/NavBar';
import Search from './components/pages/Search';
import Main from './components/pages/Main';
import Paging from './components/pages/Paging';

export default {
  name: 'App',
  components: {
    'nav-component': NavBar,
    'header-component': Search,
    'my-component': Main,
    'bottom-component': Paging
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
}
</script>

