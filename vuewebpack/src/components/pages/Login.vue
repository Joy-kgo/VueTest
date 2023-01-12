<template>
    <div class="text-center">

        <table class="table mt-4">
            <thead>
                <tr>搜尋: 
                    <input type="text" placeholder="請輸入" 
                        @keyup.enter="toSearch()" v-model="search" />
                </tr>
                <tr>
                    <th>
                        國家旗幟
                    </th>
                    <th>
                        國家名稱
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, key) in filterCountry" :key="item.id">
                    <td><img v-bind:src="item.flags.png" alt="Error Image" /></td>
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
                    <div class="modal-header" v-if="perCountry.name != null">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{ perCountry.name.common }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>國家簡稱: {{ perCountry.altSpellings }}</div>
                        <div>首都: {{ perCountry.capital }}</div>
                        <div>時區: {{ perCountry.timezones }}</div>
                        <div v-if="perCountry.maps != null">
                            地理位置: {{ perCountry.maps.googleMaps }}</div>
                        <!-- 暫時抓不到資料 -->
                        <!-- <div>貨幣名稱: {{ perCountry.currencies.XCD.name }}
                            貨幣符號: {{ perCountry.currencies.XCD.symbol }}</div> -->

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li><!--從這開始研究分頁-->
                <!-- <li class="page-item" v-for="page in pagenation.idd" :key="page">
              <a class="page-link" href="#">{{ page }}</a>
          </li> -->
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
            filterCountry:[]
            // pagenation:{}
        };
    },
    methods: {
        getCountry() {
            const api = `${process.env.APIPATH}/all`;
            const vm = this;
            
            this.$http.get(api).then((response) => {
                console.log(response.data);
                
                //嘗試排序
                response.data.sort(
                    function (a, b) {
                        if (a < b)
                        return -1;
                        if (a > b)
                        return 1;
                        return 0;
                    }
                    )
                    vm.country = response.data;
                    vm.filterCountry=response.data;
                // vm.pagenation=response.data;//計算總頁數
            })
        },
        getPerCountry(capital) {
            const url = `${process.env.APIPATH}/capital/${capital}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.perCountry = response.data[0];
                $('#countryModal').modal('show');
                console.log(response.data[0]);
                vm.isLoading = false;

            })
        },
        toSearch() {
            console.log(1, this.search);
            const vm = this;

            //用filter顯示
            vm.filterCountry=vm.country.filter((item) => {
                //改條件成模糊搜尋
                if (item.altSpellings.includes(this.search)) {
                    //回傳搜尋結果
                    this.filterCountry=item;
                    console.log("OLO",this.filterCountry); 
                    return this.filterCountry;
                }else if(this.search == ''){
                    //如果是空的，回傳全部國家。
                    return vm.country;
                }
            });
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
