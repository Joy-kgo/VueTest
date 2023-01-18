import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    strict:true,//嚴謹模式，若不符合Vuex規範會跳錯
    state:{
        // isLoading:true, //loading配置有問題
    },
    //非同步行為
    actions:{

    },
    //同步行為
    mutations:{

    }
});