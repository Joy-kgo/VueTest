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
                    <th>國家簡稱</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, key) in filterCountry" :key="item.id">
                    <td><img v-bind:src="item.flags.png" alt="Error Image" /></td>
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

        <nav aria-label="Page navigation example">
            <!--分頁-->
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" v-for="(page, key) in pages" :key="page.id">
                    <a class="page-link" href="#" >{{ page }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
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
            pages:[]
        };
    },
    methods: {
        getCountry() {
            const api = `${process.env.APIPATH}/all`;
            const vm = this;

            this.$http.get(api).then((response) => {

                vm.country = response.data;
                vm.filterCountry = response.data;
                // console.log("QQ" + response.data);
                //呼叫排序
                this.sortArray();
                this.pageCount();
            })
        },
        getPerCountry(capital) {
            const url = `${process.env.APIPATH}/capital/${capital}`;
            const vm = this;
            this.$http.get(url).then((response) => {
                vm.perCountry = response.data[0];
                $('#countryModal').modal('show');
                // console.log("~~"+response.data[0]);
            })
        },
        toSearch() {
            const vm = this;
            vm.filterCountry = vm.country.filter((item) => {
                //模糊搜尋
                if (item.name.includes(this.search)) {
                    this.filterCountry = item.name;
                    // console.log("OLO", this.filterCountry);
                    return this.filterCountry;
                    //如果是空的，回傳全部國家。
                } else if (this.search == '') {
                    return vm.country;
                }
            });
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
        pageCount() {
            let total = this.filterCountry.length;
            let pp = total / 10;
            for(let i =1;i<= pp;i++){
                this.pages.push(i);
            }
            console.log( this.pages);//計算總頁數=250,25


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
