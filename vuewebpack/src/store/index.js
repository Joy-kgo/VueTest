import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    // strict:true,//嚴謹模式，若不符合Vuex規範會跳錯

    /*state是模組內的區域變數
         actions,mutations,getters 是屬於全域變數*/
    state: {
        isLoading: false,
        country: [],
        filterCountry: [],
        displayCount: [],
        perCountry: [],
        page: 1,
        perPage: 10
    },
    //非同步行為
    actions: {
        updateLoading(context, status) {
            setTimeout(() => {
                context.commit('LOADING', status);
            }, 300);
        },
        getCountry(context) {
            const api = `${process.env.APIPATH}/all`;
            axios.get(api).then((response) => {
                context.commit('COUNTRY', response.data);
                context.commit('FILTERCOUNTRY', response.data);

            }).then(() => {
                    context.dispatch('pageCount');
                });
        },
        getPerCountry(context, name) {
            const url = `${process.env.APIPATH}/name/${name}`;
            axios.get(url).then((response) => {
                context.commit('PERCOUNTRY', response.data[0]);
            })
        },
        pageCount(context, page) {
            if (page == undefined) {
                context.commit('PAGE', 1);
            } else {
                context.commit('PAGE', page);
            }
            context.commit('PERPAGE', 10);
            context.commit('DISPLAYCOUNT');

        },
    },
    //操作資料狀態，同步行為
    mutations: {
        LOADING(state, status) {
            state.isLoading = status;
        },
        COUNTRY(state, payload) {
            state.country = payload;
        },
        FILTERCOUNTRY(state, payload) {
            state.filterCountry = payload;
        },
        PAGE(state, payload) {
            state.page = payload;
        },
        PERPAGE(state, payload) {
            state.perPage = payload;
        },
        PERCOUNTRY(state, payload) {
            state.perCountry = payload;
        },
        DISPLAYCOUNT(state) {
            const startIndex = state.perPage * (state.page - 1) + 1;
            const endIndex = startIndex + state.perPage - 1;

            if (state.filterCountry.length > 1) {
                state.displayCount = state.filterCountry.slice(startIndex, endIndex + 1);
            } else {
                state.displayCount = state.filterCountry;
            }
        }
    }
});