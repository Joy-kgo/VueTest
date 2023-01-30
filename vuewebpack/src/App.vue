<template>
  <div id="app">
    <div>
      <loading :active.sync="isLoading"></loading>
    </div>
    <nav-component></nav-component>
    <router-view name="menu"> </router-view>
    <search-component></search-component>
    <main-component></main-component>
    <paging-component></paging-component>

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
    'search-component': Search,
    'main-component': Main,
    'paging-component': Paging
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
}
</script>

