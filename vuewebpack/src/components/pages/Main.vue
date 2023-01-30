<template>
    <div class="text-center">
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
                    <td class="align-middle" v-if="item.altSpellings">{{ item.altSpellings[0] }}</td>
                    <td class="align-middle" v-else="">無國家簡稱</td>
                    <td class="align-middle">
                        <button @click="getPerCountry(item.name)" class="btn btn-info">查看更多</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <detail-component></detail-component>
        
        <!-- 分頁套件 -->
        <div class="pagination justify-content-center">
            <pagination :records="filterCountry.length" v-model="page" :per-page="perPage" @paginate="pageCount">
            </pagination>
        </div>
    </div>

</template>

<script>
import $ from 'jquery';
import Detail from '@/components/pages/Detail';

export default {
    components: {
    'detail-component':Detail,
  },
    methods: {
        getCountry() {
            this.$store.dispatch('getCountry');
        },
        getPerCountry(name) {
            this.$store.dispatch('getPerCountry', name);
            $('#countryModal').modal('show');
        },
        toSearch(search) {
            this.$store.dispatch('toSearch', search);
        },
        sortArray(toggle, e) {
            if (toggle === "ASC") {
                this.$store.dispatch('sortArray', toggle);
                e.target.innerText = "▼倒序";
            } else {
                this.$store.dispatch('sortArray', toggle);
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
                this.$store.state.page = clickPage;
            }
        },
        perPage() {
            return this.$store.state.perPage;
        },
        perCountry() {
            return this.$store.state.perCountry;
        },
        toggle() {
            return this.$store.state.toggle;
        }
    },
    created() {
        this.getCountry();
    }
}

</script>
