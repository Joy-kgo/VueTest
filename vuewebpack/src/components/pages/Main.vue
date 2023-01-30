<template>
    <div class="text-center">
        <table class="table mt-4">
            <thead>
                <tr>
                    <th class="table-info">國家旗幟</th>
                    <th class="table-info">國家名稱</th>
                    <th class="table-info">國家別稱</th>
                    <th class="table-info">
                        <button @click="sortArray(toggle, $event)" class="btn btn-success">▲正序</button>
                    </th>
                </tr>
            </thead>

            <country-component></country-component>
        </table>
        <detail-component></detail-component>
    </div>

</template>

<script>
import Detail from '@/components/pages/Detail';
import Countries from '@/components/pages/Countries';


export default {
    components: {
        'detail-component': Detail,
        'country-component': Countries
    },
    methods: {
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
    },
    computed: {
        toggle() {
            return this.$store.state.toggle;
        }
    }
}

</script>
