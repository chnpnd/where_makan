
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
        <h1 class="text-center">All hawker centres:</h1>
        <div class="card-container mx-4 ">
            <div class="row ml-6 justify-content-center">
                <div class="card col-md-2 hawker-card p-0 mx-2 my-2" v-for="hawkerCenter in hawkerCenters" :key="hawkerCenter.id" style="border-radius:0;">
                    <router-link :to="{ name: 'center-details', params: { centerId: hawkerCenter.id } }" class="text-black text-decoration-none" >
                        <div class="image-container">
                            <img :src="hawkerCenter.photo_url" class="d-block w-100 h-50"  alt="hawker images" >
                        </div>
                    <div class="card-body">
                    <h5 class="card-title">{{ hawkerCenter.name }}</h5>
                    <p class="card-text">{{ hawkerCenter.address }}</p>
                    <p>${{ filteredPrice[hawkerCenter.id]}}</p>
                    </div>
                </router-link>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>  

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
            filteredPrice: {},
            result: {
            },
            }
        },
        components: {
            
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
                    this.filterStall();
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        },

        filterStall() {
            for (let y = 0; y<this.hawkerCenters.length; y++){
                var center = this.hawkerCenters[y];
                var total_price = 0;
                var total_food = 0;
                var avg_price = 0;
                for (let i =0; i<this.foodStalls.length; i++){
                    var stall = this.foodStalls[i];

                    for (let x=0;x<this.foods.length; x++){
                        var food = this.foods[x];
                        if (food.hawker_stall_id === stall.id && center.id === stall.hawker_id){
                            total_food += 1;
                            total_price += food.price;}
                        }
                avg_price = total_price / total_food;
                this.filteredPrice[center.id] = Math.ceil(avg_price * 100) / 100;
                    }
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
