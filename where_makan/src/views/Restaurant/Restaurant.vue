<template>
    <h1>Restaurants</h1>
        <div>
            <!-- Search input -->
            <input type="text" v-model="searchValue" placeholder="Search restaurants">
            
            <!-- Restaurant list -->
            <ul>
                <li v-for="store in filteredResults" :key="store.id">
                    {{ store.name }} - {{ store.address }}
                </li>
            </ul>
        </div>
    
        <div>

            <!-- {{result}} -->
            <!-- <ul v-for="store in result">
                <li>{{ store.name }}</li>
                <img :src="store.photo_url" alt="Store Photo" />
                <GMapMap
                    :center="storePosition(store)"
                    :zoom="17"
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
            </ul> -->

        </div>
</template>

<script>

export default {
    data() {
        return{
            searchValue: '', // Stores the user's search input
            result: {
            },
        }
    },
    created() {
        // Use the created lifecycle hook to fetch data when the component is created
        this.GetAllHawkerCentres();
    },
    methods: {
        async GetAllHawkerCentres() {
            try {
                const url = `https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    // Store the fetched data in the result array
                    this.result = data;
                } 
                else {
                // Handle any errors here
                console.error("Failed to fetch data");
                }
            } 
            catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        },
        storePosition(store) {
            return { lat: store.lat, lng: store.long };
        },
    },
    
    computed: {
        filteredResults() {
            if (!this.searchValue) {
            // Return an empty array if searchValue is empty
            return [];
            }

            return this.result.filter((store) =>
                store.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                store.address.toLowerCase().includes(this.searchValue.toLowerCase())
            );
        }
    },
  };

</script>

<style>

</style>
