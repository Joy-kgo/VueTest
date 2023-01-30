<template>
    <div class="text-center">
        <h5>搜尋國家:
            <input type="text" placeholder="請輸入" @keyup="toSearch()" v-model="search" />
        </h5>

    </div>


</template>

<script>
export default {
    data() {
        return {
            search: ""
            }
    },
    methods: {
        toSearch() {
            this.$store.state.filterCountry = this.$store.state.country.filter((item) => {
                //模糊搜尋
                if (item.name.toLowerCase().includes(this.search.toLowerCase())) {
                    this.$store.state.filterCountry = item.name;
                    return this.$store.state.filterCountry;
                    //如果是空的，回傳全部國家。
                } else if (this.search == '') {
                    return this.$store.state.country;
                }
            });
            this.$store.dispatch('pageCount');

        },
    },
}

</script>
