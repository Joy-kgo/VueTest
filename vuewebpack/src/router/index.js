import Vue from 'vue';
import VueRouter from  'vue-router';
import Home from '@/components/pages/Login';
Vue.use(VueRouter);

export default new VueRouter({
    routes:[
      {
        name:'首頁',//元件呈現的名稱
        path:'/index',//對應的虛擬路徑
        component: Home,//對應元件
      }
    ]
  })