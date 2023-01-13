<template>
    <div class="text-center">

        <table class="table mt-4">
            <thead>
                <tr>搜尋國家:
                    <input type="text" placeholder="請輸入" @keyup="toSearch()" v-model="search" />
                </tr>
                <tr>
                    <th>國家旗幟</th>
                    <th>國家名稱</th>
                    <th>國家別稱</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, key) in displayCount" :key="item.id">
                    <td><img v-bind:src="item.flags.png" alt="Error Image" style="width:100px" /></td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.altSpellings }}</td>
                    <td><button @click="getPerCountry(item.capital)">查看更多</button></td>

                </tr>
            </tbody>

        </table>
        <!-- Modal -->
        <div class="modal fade" id="countryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{ perCountry.name }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>國家簡稱: {{ perCountry.altSpellings }}</div>
                        <div>首都: {{ perCountry.capital }}</div>
                        <div>時區: {{ perCountry.timezones }}</div>
                        <!-- 暫時抓不到資料 -->
                        <!-- <div>貨幣名稱: {{ perCountry.currencies.name }}</div>
                        <div> 貨幣符號: {{ perCountry.currencies.symbol }}</div> -->

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分頁套件 -->
        <pagination :records="filterCountry.length" v-model="page" :per-page="perPage" 
            @paginate="pageCount"></pagination>
    </div>
</template>

<script>
import $ from 'jquery';

export default {

    data() {
        return {
            country: [],
            perCountry: [],
            search: "",
            filterCountry: [],
            totalPages: [],
            countryNum: [],
            perPage: 10,
            page: 1,
            displayCount:[]
        };
    },
    methods: {
        getCountry() {
            const api = `${process.env.APIPATH}/all`;
            const vm = this;

            this.$http.get(api).then((response) => {

                vm.country = response.data;
                vm.filterCountry = response.data;
                //呼叫排序
                this.sortArray();

            }).then(()=>{
                //分頁計算
                vm.pageCount(vm.page);
            });
        },
        getPerCountry(capital) {
            const url = `${process.env.APIPATH}/capital/${capital}`;
            const vm = this;
            this.$http.get(url).then((response) => {
                vm.perCountry = response.data[0];
                $('#countryModal').modal('show');
            })
        },
        toSearch() {
            const vm = this;
            vm.filterCountry = vm.country.filter((item) => {
                //模糊搜尋
                if (item.name.toLowerCase().includes(this.search.toLowerCase())) {
                    this.filterCountry = item.name;
                    return this.filterCountry;
                //如果是空的，回傳全部國家。
                } else if (this.search == '') {
                    return vm.country;
                }
            });
            //重新將頁數指定到第一頁
            vm.page=1;
            vm.pageCount(vm.page);

        },
        //排序方法
        sortArray() {
            this.filterCountry.sort(this.compara('altSpellings'))
        },
        compara(property) {
            return function (object1, object2) {
                let val1 = object1[property]
                let val2 = object2[property]
                if (val1 > val2) {
                    return 1
                } else if (val1 < val2) {
                    return -1
                } else {
                    return 0
                }
            }
        },
        pageCount:function(page) {
            const vm = this;
            //1.傳入當下頁碼，計算第一筆跟最後一筆
            const startIndex = this.perPage * (page - 1) + 1;//第一筆
            const endIndex = startIndex + this.perPage - 1;//最後一筆
            //2.計算country對應當下頁碼所需顯示的資料
            if(this.filterCountry.length >1){
                this.displayCount = this.filterCountry.slice(startIndex,endIndex+1);
            }else{
                this.displayCount = this.filterCountry;
            }
            //3.回傳顯示到頁面上
            console.log(startIndex,endIndex);
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
