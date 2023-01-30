<template>
    <div class="text-center">
        <div class="pagination justify-content-center">
            <pagination :records="filterCountry.length" v-model="page" :per-page="perPage" @paginate="pageCount">
            </pagination>
        </div>
    </div>

</template>

<script>

export default {
    methods: {

        pageCount(page) {
            this.$store.dispatch('pageCount', page);
        }
    },
    computed: {
        filterCountry() {
            return this.$store.state.filterCountry;
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
    },
}

</script>
