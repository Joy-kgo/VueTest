// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'; //主要Ajax套件
import VueAxios from 'vue-axios'; //將它轉回Vue套件
import Loading from 'vue-loading-overlay';//^3.0
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import Pagination from 'vue-pagination-2';
import App from './App';
import router from './router';
import store from './store';

Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(Loading);
Vue.component('pagination', Pagination);
Vue.component('loading', Loading );
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
})
