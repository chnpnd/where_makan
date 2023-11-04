
<template>
    <div class="map-container">
        <!-- The div element for the map -->
        <GMapMap
            :center="center"
            :zoom="7"
            map-type-id="terrain"
            class="google-map"
        >
            <GMapCluster>
                <GMapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center=m.position"
                />
            </GMapCluster>
        </GMapMap>
        <v-divider></v-divider>

        <GeolocationTracker />

        <v-divider></v-divider>

        <h1 class="text-center">All hawker centres:</h1>
        <div class="card-container">
        <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
            <HawkerCentres />
        </div>
    </div>
</template>

<style scoped>
.map-container {
    padding: 20px; /* Add some space around the map */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Adds a soft shadow around the map */
    border-radius: 8px; /* Optional: Rounded edges for a cleaner look */
}

.google-map {
    width: 100%;
    height: 500px; /* Adjust height as needed */
}
</style>


<script>
import HawkerCentres from './HawkerCentreCards.vue';  

    export default {
        name: 'App',
        data() {
            return {
                center: {lat: 1.2796740690582409, lng: 103.84745013835952},
                markers: [
                    {
                        position: {
                            lat: 1.2796740690582409,
                            lng: 103.84745013835952,
                        },
                    }
                    , // Along list of clusters
                ],
            searchValue: '', // Stores the user's search input
            foods: [],
            foodStalls: [],
            hawkerCenters: [],
            result: {
            },
            }
        },
        components: {
            HawkerCentres
        },
        created() {
        // Use the created lifecycle hook to fetch data when the component is created
        this.getAllData();
    },
    methods: {
        async getAllData() {
            try {
                const foodsRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/all/food`);
                const foodStallsRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/all/hawkerstore`);
                const hawkerCentersRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`);

                if (foodsRes.ok && foodStallsRes.ok && hawkerCentersRes.ok) {
                    this.foods = await foodsRes.json();
                    this.foodStalls = await foodStallsRes.json();
                    this.hawkerCenters = await hawkerCentersRes.json();
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        }
    },
    
    computed: {
        filteredResults() {
            if (!this.searchValue) {
                return {
                    foods: [],
                    foodStalls: [],
                    hawkerCenters: [],
                };
            }

            const filteredFoods = this.foods.filter(food =>
                food.name.toLowerCase().includes(this.searchValue.toLowerCase())
            );

            const filteredFoodStalls = this.foodStalls.filter(stall =>
                stall.name.toLowerCase().includes(this.searchValue.toLowerCase())
            );
            const filteredHawkerCenters = this.hawkerCenters.filter(center =>
                center.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                center.address.toLowerCase().includes(this.searchValue.toLowerCase())
            );
            return {
                foods: filteredFoods,
                foodStalls: filteredFoodStalls,
                hawkerCenters: filteredHawkerCenters
            };
        }
    },
  };
</script>