<template>
    <h1>Restaurants</h1>
        <div>
            <!-- {{result}} -->
            <ul v-for="store in result">
                <li>{{ store.name }}</li>
                <img :src="store.photo_url" alt="Store Photo" />
                <GMapMap
                    :center="storePosition(store)"
                    :zoom="7"
                    map-type-id="terrain"
                    style="width: 500px; height: 300px"
                >
                    <GMapCluster>
                    <GMapMarker
                        :key="index"
                        :position="storePosition(store)"
                        :clickable="true"
                        :draggable="true"
                        @click="center = storePosition(store)"
                    />
                    </GMapCluster>
                </GMapMap>
            </ul>

        </div>
</template>

<script>

export default {
    data() {
        return{
            result: {
            },
        }
    },
    mounted() {
        this.GetAllHawkerCentres()
    },
    methods: {
        async GetAllHawkerCentres() {
            const res = await fetch("https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers")
            this.result = await res.json()
          },
        storePosition(store) {
            return { lat: store.lat, lng: store.long };
        },
      },
  };

</script>

<style>

</style>
