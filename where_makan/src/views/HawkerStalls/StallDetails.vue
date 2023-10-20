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
            <div class="center-button">   
                <button @click="toggleReviewForm" class="review-button">Review</button>
            </div>
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

        <!-- Review Form Modal -->
        <!-- Consumer ID is HARDCODED -->
        <LeaveReview :showModal="showReview" :consumerId = "10" :stallId="stallId" @close="toggleReviewForm" @review-submitted="handleReviewSubmitted"/>


        <h1 class="display-4 mt-5 text-center">Reviews </h1>
        <div v-if="reviews && reviews.length > 0">
            <div class="review-grid">
                <div v-for="review in reviews" :key="review.id" class="review-card">
                    <div class="review-card">
                        <div class="user-profile">
                            <strong>{{ review.consumer_name }}</strong>
                        </div>
                        <div class="review-content">
                            <p><strong>Ratings:</strong> {{ displayStars(review.rating) }}</p>
                            <p><strong>Review:</strong> {{ review.comment }}</p>
                            <p><strong>Reviewed</strong> {{ formatDate(review.date) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="no-reviews">No reviews yet</p>
    </div> 
</template>

<script>

import { Icon } from '@iconify/vue';
import LeaveReview from '@/components/LeaveReview.vue';

export default {
    component:{
        LeaveReview
    },
    data() {
        return {
            foodStall: {},
            foodList: {},
            cuisine: {},
            reviews: { consumer_id: '', hawker_stall_id: '', rating: '', comment: '', date: '', consumer_name: ''},
            showReview: false,
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
            this.fetchReviews();
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
        async fetchReviews() {
            try {
            const response = await fetch(
                `https://stingray-app-4wa63.ondigitalocean.app/Review/api/get/hawker/${this.foodStall.id}/review`
            );
            if (response.ok) {
                this.reviews = await response.json();
                for(let i = 0; i < this.reviews.length; ++i)
                {
                    try {
                        const response = await fetch(
                            `https://stingray-app-4wa63.ondigitalocean.app/User/api/get/user/${this.reviews[i].consumer_id}/name`
                        );
                        if (response.ok) {
                            this.reviews[i].consumer_name = await response.text();
                        } else {
                            console.error('Failed to fetch consumer:', response.statusText);
                        }
                    } catch (error) {
                        console.error('An error occurred while fetching consumer:', error);
                    }
                    console.log(this.reviews[i].consumer_name);
                }
            } else {
                console.error('Failed to fetch reviews:', response.statusText);
            }
            } catch (error) {
            console.error('An error occurred while fetching reviews:', error);
            }
        },
        toggleReviewForm() {
            this.showReview = !this.showReview; // Set to true to show the modal
        },
        displayStars(rating) 
        {
            const filledStars = rating;
            const emptyStars = 5 - rating;

            const filledStar = '★';
            const emptyStar = '☆';

            const stars = filledStar.repeat(filledStars) + emptyStar.repeat(emptyStars);

            return stars;
        },
        formatDate(dateString) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        handleReviewSubmitted() {
        // Update the reviews by fetching them again from the API or any other method you use to update reviews
        this.fetchReviews();
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

.center-button {
    padding-left: 16px;
    display: inline;
    justify-content: center;
    margin-top: 20px; /* Adjust margin as needed */
}

.review-button {
    background-color: #007BFF; /* Choose a professional color */
    color: #fff; /* Text color */
    padding: 10px 20px; /* Adjust padding as needed */
    border: none;
    border-radius: 5px; /* Add rounded corners */
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
}

.review-button:hover {
  background-color: #0056b3; /* Change color on hover */
  transform: translateY(-2px); /* Add a subtle lift on hover */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a box shadow */
}

.review-button:active {
  transform: translateY(0);
}

.review-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    max-width: 1200px; /* Adjust the width as needed */
    margin: 0 auto;
}


.review-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.review-card {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.row {
  margin: 0;
}

.user-profile {
  display: flex;
  align-items: center;
}

.no-reviews {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100px; /* Set the height as needed */
  background-color: #f5e8d7; /* Choose a background color */
  border: 1px solid #ddd; /* Add a border for a professional look */
  border-radius: 5px; /* Add rounded corners */
  font-size: 36px; /* Adjust the font size */
  color: #888; /* Choose a professional text color */
}
</style>