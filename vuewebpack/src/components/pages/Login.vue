<template>
    <div class="text-center">
        <h5>搜尋國家:
            <input type="text" placeholder="請輸入" @keyup="toSearch()" v-model="search"/>
        </h5>

        <table class="table mt-4">
            <thead>
                <tr>
                    <th class="table-info">國家旗幟</th>
                    <th class="table-info">國家名稱</th>
                    <th class="table-info">國家別稱</th>
                    <th class="table-info">
                        <button @click="sortArray(toggle, $event)" class="btn btn-success">▼倒序</button>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, key) in displayCount" :key="item.id">
                    <td><img v-bind:src="item.flags.png" alt="Error Image" :style="{ width: '150px' }" /></td>
                    <td class="align-middle">{{ item.name }}</td>
                    <td class="align-middle">{{ item.altSpellings }}</td>
                    <td class="align-middle">
                        <button @click="getPerCountry(item.capital)" class="btn btn-info">查看更多</button>
                    </td>
                </tr>
            </tbody>

        </table>
        <!-- Modal -->
        <div class="modal fade" id="countryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-warning">
                        <h5 class="modal-title " id="exampleModalLabel">
                            {{ perCountry.name }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h5 :style="styleObject">國家簡稱: {{ perCountry.altSpellings }}</h5>
                        <h5 :style="[styleObject, styleObject2]">首都: {{ perCountry.capital }}</h5>
                        <h5>時區: {{ perCountry.timezones }}</h5>
                        <!-- 暫時抓不到資料 -->
                        <!-- <div>貨幣名稱: {{ perCountry.currencies.name }}</div>
                        <div> 貨幣符號: {{ perCountry.currencies.symbol }}</div> -->

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分頁套件 -->
        <div class="pagination justify-content-center">
            <pagination :records="filterCountry.length" v-model="page" :per-page="perPage" @paginate="pageCount">
            </pagination>
        </div>
    </div>


</template>

<script>
import $ from 'jquery';

export default {
    data() {
        return {
            // country: [],
            // perCountry: [],
            // search: "",
            // filterCountry: [],
            // perPage: 10,
            // page: 1,
            // displayCount: [],
            // toggle: "",
            styleObject: {
                backgroundColor: 'gray',
            },
            styleObject2: {
                color: 'yellow',
            },

        };
    },
    methods: {
        getCountry() {
            this.$store.dispatch('getCountry');
        },
        getPerCountry(capital) {
            this.$store.dispatch('getPerCountry', capital);
            $('#countryModal').modal('show');
        },
        toSearch(search) {
            this.$store.dispatch('toSearch',search);
        },
        sortArray(toggle, e) {
            if (toggle === "ASC") {
                this.$store.dispatch('sortArray',toggle);
                e.target.innerText = "▼倒序";
            } else {
                this.$store.dispatch('sortArray',toggle);
                e.target.innerText = "▲正序";
             }

        },
        asc() {
            this.$store.dispatch('asc');
        },
        desc() {
            this.$store.dispatch('desc');
        },
        pageCount(page) {
            this.$store.dispatch('pageCount', page);
        },
    },
    computed: {
        country() {
            return this.$store.state.country;
        },
        filterCountry() {
            return this.$store.state.filterCountry;
        },
        displayCount() {
            return this.$store.state.displayCount;
        },
        page: {
            get() {
                return this.$store.state.page;
            },
            set(clickPage) {
                //vue報錯不可在外面附值，暫把嚴謹模式關掉
                this.$store.state.page= clickPage;
            }
        },
        perPage() {
            return this.$store.state.perPage;
        },
        perCountry() {
            return this.$store.state.perCountry;
        },
        search: {
            get() {
                return this.$store.state.search;
            },
            set(toSearch) {
                //vue報錯不可在外面附值，暫把嚴謹模式關掉
                this.$store.state.search= toSearch;
            }
        },
        toggle(){
            return this.$store.state.toggle;
        }
    },
    created() {
        this.getCountry();
    }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
