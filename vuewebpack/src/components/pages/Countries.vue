<template>

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

</template>

<script>
import $ from 'jquery';

export default {
    methods: {
        getCountry() {
            this.$store.dispatch('getCountry');
        },
        getPerCountry(name) {
            this.$store.dispatch('getPerCountry', name);
            $('#countryModal').modal('show');
        }
    },
    computed: {
        displayCount() {
            return this.$store.state.displayCount;
        }
    },
    created() {
        this.getCountry();
    }
}

</script>
