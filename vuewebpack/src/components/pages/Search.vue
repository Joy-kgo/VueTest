<template>
    <div class="text-center">
        <h5>搜尋國家:
            <input type="text" placeholder="請輸入" @keyup="toSearch()" v-model="search" />
        </h5>

    </div>


</template>

<script>
export default {

    methods: {
        toSearch(search) {
            this.$store.dispatch('toSearch', search);
        }
    },
    computed: {
        search: {
            get() {
                return this.$store.state.search;
            },
            set(toSearch) {
                //vue報錯不可在外面附值，暫把嚴謹模式關掉
                this.$store.state.search = toSearch;
            }
        },
    }

}

</script>
