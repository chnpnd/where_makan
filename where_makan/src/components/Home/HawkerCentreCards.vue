<template>
    <div>
        <div class="card-container">
        <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
        <div class='container-fluid'>
            <div class='row justify-content-center'>
                    <v-card v-for="hawkerCenter in hawkerCenters" :key="hawkerCenter.id" max-width="300" max-height="400" style="margin:10px;">
                        <v-img :src="hawkerCenter.photo_url" cover max-height="100"></v-img>
                        <v-card-title>{{ hawkerCenter.name }}</v-card-title>
                        <v-card-text>{{ hawkerCenter.address }}</v-card-text>
                        <v-card-actions>
                            <!--    NEED HELP ON WHY IT NEEDS TO CLICK ON 2 CARDS BEFORE SWITCHING-->
                            <v-btn><router-link :to="{ name: 'center-details', params: { centerId: hawkerCenter.id } }">Click me</router-link></v-btn>
                        </v-card-actions>
                    </v-card>
                </div> <!-- col -->
            </div> <!-- row -->
        </div> <!-- container -->
        
        
    </div>
</template>

<script>
 export default {
    data() {
        return{
            searchValue: '', // Stores the user's search input
            foods: [],
            foodStalls: [],
            hawkerCenters: [],
            result: {
            },
        }
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

<style scoped>
.v-card v-img {
  max-width: 100%;
}
</style>