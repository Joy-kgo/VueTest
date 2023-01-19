import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    // strict:true,//嚴謹模式，若不符合Vuex規範會跳錯

    /*state是模組內的區域變數
         actions,mutations,getters 是屬於全域變數*/
    state:{
        isLoading:false,
        country:[],
        filterCountry:[],
        displayCount: [],
        perCountry: [],
        page: 1,
        perPage: 10,
        search: "",

    },
    //非同步行為
    actions:{
        //payload 載荷
        updateLoading(context,status){
            //對應下方的LOADING
            setTimeout(()=>{
                context.commit('LOADING',status);
            },300);
        },
        getCountry(context) {
            const api = `${process.env.APIPATH}/all`;
            axios.get(api).then((response) => {
                context.commit('COUNTRY',response.data);
                context.commit('FILTERCOUNTRY',response.data);
                
            })
            .then(() => {
                //分頁計算
                context.dispatch('pageCount');
            });
        },
        getPerCountry(context,capital) {
            console.log("111",context,capital);
            const url = `${process.env.APIPATH}/capital/${capital}`;
            axios.get(url).then((response) => {
                context.commit('PERCOUNTRY',response.data[0]);

            })
        },
        pageCount(context,page) {
            // console.log("pageCount",page);
            if(page == undefined){
            context.commit('PAGE',1);
            }else{
            context.commit('PAGE',page);

            }
            context.commit('PERPAGE',10);
            context.commit('DISPLAYCOUNT');
        },
        toSearch(context,search) { 
            context.commit('SEARCH',search);
            context.dispatch('pageCount');
        },
    },
    //同步行為
    mutations:{
        //對應上方的'state:'
        LOADING(state,status){
            state.isLoading = status;
        },
        COUNTRY(state,payload){
            state.country=payload;
        },
        FILTERCOUNTRY(state,payload){
            state.filterCountry=payload;
            // console.log("FC",payload);

        },
        PAGE(state,payload){
            state.page=payload;
            // console.log("PAGE",payload);

        },
        PERPAGE(state,payload){
            state.perPage=payload;
            // console.log("PER",payload);
        },
        PERCOUNTRY(state,payload){
            state.perCountry=payload;
            // console.log("PERC",payload);
        },
        SEARCH(state){
            state.filterCountry = state.country.filter((item) => {
                //模糊搜尋
                if (item.name.toLowerCase().includes(state.search.toLowerCase())) {
                    state.filterCountry = item.name;
                    return state.filterCountry;
                    //如果是空的，回傳全部國家。
                } else if (state.search == '') {
                    return state.country;
                }
            });
        },
        DISPLAYCOUNT(state){
            console.log(state.perPage,state.page);
            const startIndex = state.perPage * (state.page - 1) + 1;
            const endIndex = startIndex + state.perPage - 1;

            if (state.filterCountry.length > 1) {
                state.displayCount =state.filterCountry.slice(startIndex, endIndex + 1);

            } else {
                state.displayCount = state.filterCountry;
            }
        }
    }
});