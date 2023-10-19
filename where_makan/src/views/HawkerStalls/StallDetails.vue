<template>
    <div>
    <div v-if="foodStall" class="stall-container d-flex">
        <div class="stall-image-container mr-4">
            <img :src="foodStall.store_url" alt="Stall Image" class="stall-image"/>
        </div>
        <div class="stall-details">
            <h1>{{ foodStall.name }}</h1>
            <p><strong>Phone Number:</strong> {{ foodStall.phone_number }}</p>
            <p><strong>Address:</strong> {{ foodStall.address }}</p>
            <p><strong>Opening Hours:</strong> {{ foodStall.opening_hours }}</p>
            <p><strong>Rest Day:</strong> {{ foodStall.rest_day }}</p>
            <p><strong>Signature Item:</strong> {{ foodStall.signature_item }}</p>
            <p><strong>Cuisine Type:</strong> {{ cuisine }}</p>
            <a :href="foodStall.source_url" target="_blank" class="stall-link">Read More</a>
        </div>
    </div>
        
          <!-- food that this stall has -->
        <h1 class="display-4 text-center">Menu: </h1>
        <div class="card-container">
        <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
            <div v-if="foodList && foodList.length > 0" class='row justify-content-center'>
                    <v-card v-for="food in foodList" :key="food.id" max-width="300" max-height="400" style="margin:10px;">
                        <v-img :src="food.url" cover max-height="100"></v-img>
                        <v-card-title>{{ food.name }}</v-card-title>
                        <v-card-actions> 
                            <!--    NEED HELP ON WHY IT NEEDS TO CLICK ON 2 CARDS BEFORE SWITCHING(duplicated function)--> 
                             <v-btn><router-link :to="{ name: 'food-details', params: { foodId: food.id } }">View food</router-link></v-btn> 
                             <!-- add to shopping cart for order -->
                             <v-btn><router-link :to="{ name: 'order'}"> Add to cart<span><Icon icon="material-symbols:shopping-cart" /></span></router-link>
                             </v-btn> 
                        </v-card-actions>
                    </v-card>
            </div> 
            <div v-else><h1 class="display-4 text-center">No food is available </h1></div>
            </div>


    </div> 
</template>

<script>

import { Icon } from '@iconify/vue';


export default {
    data() {
        return {
            foodStall: {},
            foodList: {},
            cuisine: {}
        }
    },
    props: ['stallId'],
    async created() {
        const stallRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/stall/${this.stallId}`);
        if (stallRes.ok) {
            this.foodStall = await stallRes.json();
            const cuisineRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Cuisine/api/get/cuisine/${this.foodStall.cuisine_type}`);
            if (cuisineRes.ok) {
                this.cuisine = await cuisineRes.text();
            }
            this.fetchFoodsInStallDetails();
        }
    },
    methods: {
        async fetchFoodsInStallDetails() {
            console.log(this.foodStall.id);
            try {
            const response = await fetch(            
               `https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/hawkerstall/${this.foodStall.id}/food`
            );
            if (response.ok) {
                this.foodList = await response.json();
                console.log(this.foodList);
            } else {
                console.error('Failed to fetch all stall details:', response.statusText);
            }
            } catch (error) {
            console.error('An error occurred while fetching all stall details:', error);
            }
        },
    },
    components:{
        Icon,
    }
};  

</script>

<style>
.stall-container {
    max-width: 800px;
    margin: 50px auto;
    background-color: #f5e8d7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-family: 'Georgia', serif;
}

.stall-image-container {
    flex-basis: 40%;
}

.stall-image {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.stall-details {
    flex-basis: 60%;
    color: #5a4134;
}

.stall-details h1 {
    font-size: 24px;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #5a4134;
    padding-bottom: 10px;
}

.stall-link {
    display: inline-block;
    padding: 8px 15px;
    margin-top: 20px;
    border: 1px solid #5a4134;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    color: #f5e8d7;
    background-color: #5a4134;
    transition: background-color 0.3s, color 0.3s;
}

.stall-link:hover {
    background-color: #f5e8d7;
    color: #5a4134;
    text-decoration: underline;
}

</style>