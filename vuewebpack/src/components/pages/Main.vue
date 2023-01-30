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
    data() {
        return {
            toggle: "ASC"
            }
    },
    methods: {
        sortArray(prop, e) {
            if (prop === "ASC") {
                this.$store.state.filterCountry.sort(this.asc('name'));
                console.log("改成倒序排列");
                e.target.innerText = "▼倒序";
                this.$store.state.displayCount = this.$store.state.filterCountry;
                this.toggle = "DESC";
                this.$store.dispatch('pageCount');

            } else {
                this.$store.state.filterCountry.sort(this.desc('name'));
                console.log("改成正序排列");
                e.target.innerText = "▲正序";
                this.$store.state.displayCount = this.$store.state.filterCountry;
                this.toggle = "ASC";
                this.$store.dispatch('pageCount');
            }

        },
        asc(property) {
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
        desc(property) {
            return function (object1, object2) {
                let val1 = object1[property]
                let val2 = object2[property]
                if (val1 > val2) {
                    return -1
                } else if (val1 < val2) {
                    return 1
                } else {
                    return 0
                }
            }
        }
    }
}

</script>
