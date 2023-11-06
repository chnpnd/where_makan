<template>
    <div class="container mt-5">
        <div class="searchContainer">
            <!-- Search input -->
            <input 
                type="text" 
                v-model="searchValue" 
                placeholder="Search food centre or locations"
                class="input input--biggest input--noborder input--shadow-large input--rounded searchbar">
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
/* Base and Layout styles */
    .container {
        display: flex;           
        justify-content: center; 
        align-items: center;     
        flex-direction: column;
        width: 100%;
    }

    .listContainer {
        width: 95%;
        max-height: 20rem;
        overflow-y: auto;
        margin: 0 2rem;
    }

    .list-group-item-action {
        display: flex;
        align-items: center;
        transition: background-color 0.3s ease;
    }

    .list-group-item-action:hover {
        background-color: lightgray;
    }

    .searchContainer {
        width: 95%;
        margin: 0 auto;
    }

    /* Search Input styles */
    .input {
        width: 100%;
        padding: 1rem 1.5rem;
        border: none;
        border-radius: 1.5rem;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
        font-size: 1rem;
        outline: none;
        transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
        background-color: white;
    }

    .input:focus {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .input::placeholder {
        font-style: italic;
        color: #bbb;
    }

    /* Label styles */
    .label {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        margin-right: 0.75rem;
        color: white;
    }

    .destination-label { background-color: #007BFF; }
    .food-label { background-color: #28A745; }
    .stall-label { background-color: #FFA500; }

    /* Image styling within list items */
    .list-group-item-action img {
        margin-right: 1rem;
    }

@media (max-width: 768px), (max-width:992), (max-width:1200) {
    .searchbar{
        height: 40px;
        width: 80%;
    }
}



</style>
