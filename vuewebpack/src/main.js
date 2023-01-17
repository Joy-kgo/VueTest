// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios'; //主要Ajax套件
import VueAxios from 'vue-axios'; //將它轉回Vue套件
import App from './App';
import 'bootstrap';
import Pagination from 'vue-pagination-2';
import router from './router';

Vue.use(VueAxios, axios)
Vue.component('pagination', Pagination);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
