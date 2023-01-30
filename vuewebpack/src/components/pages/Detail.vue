<template>
    <div class="text-center">
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
                        <h5 v-if="perCountry.altSpellings">國家簡稱: {{ perCountry.altSpellings[0] }}</h5>
                        <h5 v-else="">無國家簡稱</h5>
                        <h5 v-if="perCountry.capital">首都: {{ perCountry.capital }}</h5>
                        <h5 v-else="">無首都名稱</h5>
                        <h5 v-if="perCountry.capital">國幣簡稱: {{ perCountry.currencies[0].code }}</h5>
                        <h5 v-else="">無國幣名稱</h5>
                        <h5 v-if="perCountry.currencies">國幣符號: {{ perCountry.currencies[0].symbol }}</h5>
                        <h5 v-else="">無國幣符號</h5>
                        <h5 v-if="perCountry.timezones">時區: {{ perCountry.timezones[0] }}</h5>
                        <h5 v-else="">無時區</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {

    computed: {
        perCountry() {
            return this.$store.state.perCountry;
        }
    }
}

</script>
