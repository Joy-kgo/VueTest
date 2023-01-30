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
                if (item.name.toLowerCase().includes(this.search.toLowerCase())) {
                    this.$store.state.filterCountry = item.name;
                    return this.$store.state.filterCountry;
                } else if (this.search == '') {
                    return this.$store.state.country;
                }
            });
            this.$store.dispatch('pageCount');

        }
    }
}

</script>
