import Vue from 'vue';
import VueRouter from  'vue-router';
import Home from '@/App';
import page from '@/components/pages/page';
import child from '@/components/pages/child';
import child2 from '@/components/pages/child2';
import child3 from '@/components/pages/child3';
import Menu from '@/components/pages/menu';


Vue.use(VueRouter);

export default new VueRouter({
    //自定義 class 類名
    linkActiveClass:"activeOLO",
    routes:[
      {
        name:'首頁',//元件呈現的名稱
        path:'/',//對應的虛擬路徑
        component: Home,//對應元件
      },
      {
        // name:'分頁',//元件呈現的名稱
        path:'/page',//對應的虛擬路徑
        // component: Page,//對應元件
        components:{
            default:page,
            menu:Menu
        },
        //巢狀路徑
        children:[
            {
                name:'卡片1',//元件呈現的名稱，因沒設定會吃掉上層的name，故把上層name關掉
                path:'',//沒寫表示預設帶入此頁
                component: child,//對應元件
              },
              {
                name:'卡片2',//元件呈現的名稱
                path:'child2',//對應的虛擬路徑
                component: child2,//對應元件
              },
              {
                name:'卡片3',//元件呈現的名稱
                path:'child/:id',//動態路由
                component: child3,//對應元件
              },
        ],
      }
    ]
  })