<template>
    <div class="container mt-5">
        <div class="searchContainer">
            <!-- Search input -->
            <input 
                type="text" 
                v-model="searchValue" 
                placeholder="Search food centre or locations"
                class="input input--biggest input--noborder input--shadow-large input--rounded">
        </div>
         <!-- Combined List -->
        <div class="list-group listContainer">
            <!-- Hawker Centers -->
            <router-link
                v-for="center in filteredResults.hawkerCenters"
                :key="'center-' + center.id"
                class="list-group-item list-group-item-action"
                :to="{ name: 'center-details', params: { centerId: center.id } }"
            >
                <span class="label destination-label">Destination</span>
                <img :src="center.photo_url" alt="Center Photo" class="mr-3" style="max-width: 50px; max-height: 50px;">
                {{ center.name }}
            </router-link>

            <!-- Foods -->
            <router-link
                v-for="food in filteredResults.foods"
                :key="'food-' + food.id"
                class="list-group-item list-group-item-action"
                :to="{ name: 'food-details', params: { foodId: food.id } }"
            >
                <span class="label food-label">Dishes</span>
                <img :src="food.url" alt="Food Photo" class="mr-3" style="max-width: 50px; max-height: 50px;">
                {{ food.name }}
            </router-link>

            <!-- Food Stalls -->
            <router-link
                v-for="stall in filteredResults.foodStalls"
                :key="'stall-' + stall.id"
                class="list-group-item list-group-item-action"
                :to="{ name: 'stall-details', params: { stallId: stall.id } }"
            >
                <span class="label stall-label">Hawker Stall</span>
                <img :src="stall.store_url" alt="Stall Photo" class="mr-3" style="max-width: 50px; max-height: 50px;">
                {{ stall.name }}
            </router-link>
        </div>

        <!-- Display Sample Youtube video -->
        <!-- <div class="video-container">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ERyJ_9IIfU8"
                frameborder="0"
                allowfullscreen
            ></iframe>
        </div> -->
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

<style>
    .listContainer {
        width: 95%;
        max-height: 256px; /* Set a maximum height for the container */
        overflow-y: auto; /* Add a vertical scrollbar when content overflows */
        margin: 0% 2.5% 0% 2.5%;
    }

    .list-group-item-action
    {
        text-align: left;
    }

    .searchContainer {
        padding-top: 125px;
    }

    /* CSS for the search input */
    .input {
        width: 100%;
        padding: 10px 20px 10px 20px;
        border: none;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-size: 18px;
        outline: none;
        transition: box-shadow 0.3s ease-in-out;
        background-color: white;
    }

    /* Add styles for various states of the input */
    .input:focus {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .input--rounded {
        border-radius: 25px; /* Adjust the value to control the roundness */
    }
    .input::placeholder {
        font-style: italic;
    }

    .label {
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 8px;
    }

    .destination-label {
        background-color: blue;
    }

    .food-label {
        background-color: green;
    }

    .stall-label {
        background-color: orange;
    }
    
    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
    }

    /* Style for the embedded iframe */
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
