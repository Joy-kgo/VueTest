<template>
    <div class="text-center">

        <h5>搜尋國家:
            <input type="text" placeholder="請輸入" @keyup="toSearch()" v-model="search" />
        </h5>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th class="table-info">國家旗幟</th>
                    <th class="table-info">國家名稱</th>
                    <th class="table-info">國家別稱</th>
                    <th class="table-info">
                        <button @click="sortArray(toggle,$event)" class="btn btn-success" >v倒序</button>
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
            country: [],
            perCountry: [],
            search: "",
            filterCountry: [],
            totalPages: [],
            countryNum: [],
            perPage: 10,
            page: 1,
            displayCount: [],
            toggle:"up",
            styleObject: {
                backgroundColor: 'gray',
            },
            styleObject2: {
                color: 'yellow',
            }
           
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
                // this.sortArray();

            }).then(() => {
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
            vm.page = 1;
            vm.pageCount(vm.page);

        },
        sortArray(prop,e) {
            //預設toggle=ASC
            this.toggle="ASC";
            //切換toggle名稱，ASC=正序，DESC=倒序
            if(prop === "ASC"){
                this.filterCountry.sort(this.asc('altSpellings'));
                console.log("改成倒序排列");
                e.target.innerText="v倒序";
                this.displayCount=this.filterCountry;
                this.toggle="DESC";
                this.pageCount(this.page);
            }else {
                this.filterCountry.sort(this.desc('altSpellings'));
                console.log("改成正序排列");
                e.target.innerText="^正序";
                this.displayCount=this.filterCountry;
                this.toggle="ASC";
                this.pageCount(this.page);
            }
            
        },
        asc(property) {
            return function (object1, object2) {
                let val1 = object1[property]
                let val2 = object2[property]
                //正序
                if (val1 > val2) {
                    return 1
                } else if (val1 < val2) {
                    return -1
                } else {
                    return 0
                }
            }
        },
        desc(property) {
            return function (object1, object2) {
                let val1 = object1[property]
                let val2 = object2[property]
                //倒序
                if (val1 > val2) {
                    return -1
                } else if (val1 < val2) {
                    return 1
                } else {
                    return 0
                }
            }
        },
        pageCount: function (page) {
            const vm = this;
            //1.傳入當下頁碼，計算第一筆跟最後一筆
            const startIndex = this.perPage * (page - 1) + 1;//第一筆
            const endIndex = startIndex + this.perPage - 1;//最後一筆
            //2.計算country對應當下頁碼所需顯示的資料
            if (this.filterCountry.length > 1) {
                this.displayCount = this.filterCountry.slice(startIndex, endIndex + 1);
            } else {
                this.displayCount = this.filterCountry;
            }
            // console.log(startIndex, endIndex);
        },
    },
    created() {
        this.getCountry();
    }

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
