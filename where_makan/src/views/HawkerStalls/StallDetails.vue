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
        <LeaveReview :showModal="showReview" :consumerId = "11" :stallId="stallId" @close="toggleReviewForm" @review-submitted="handleReviewSubmitted"/>


        <h1 class="display-4 mt-5 text-center">Reviews </h1>
        <div v-if="reviews && reviews.length > 0">
            <div class="review-grid">
                <!-- Consumer Name is HARDCODED  -->
                <div v-for="review in reviews" :key="review.id" :class="{ 'review-card': true, 'user-own-review': review.consumer_name === loggedInUsername }">
                    <div class="review-row">
                        <!-- Left side with image and consumer name -->
                        <div class="left-side">
                            <img :src="getConsumerImageURL(review.imageBase64)" alt="Consumer Image" class="consumer-image" />
                            <strong class="highlighted-name">{{ review.consumer_name }}</strong>
                            <div class="review-actions" v-if="review.consumer_name === loggedInUsername">
                                <button @click="editComment(review)">Edit</button>
                                <button @click="removeComment(review)">Remove</button>
                            </div>
                        </div>
                        <!-- Right side with ratings and comment (with show more button) -->
                        <div class="right-side" :style="{'height': review.expanded ? 'auto' : '240px'}">
                            <div class="star-rating static-star">{{ displayStars(review.rating) }}</div>
                            <div class="comment-container">
                                <div class="comment" :class="{ 'expanded': review.expanded }">
                                    {{ truncatedComments[reviews.indexOf(review)] }}
                                    <span v-if="review.comment.length > maxCommentLength" @click="toggleCommentExpand(review)">
                                    <div>{{ review.expanded ? 'Show Less' : 'Read More' }}</div>
                                    </span>
                                </div>
                            </div>
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
            // Username is HARDCODED
            loggedInUsername: 'consumer1',
            foodStall: {},
            foodList: {},
            cuisine: {},
            maxCommentLength: 600,
            reviews: { consumer_id: '', hawker_stall_id: '', rating: '', comment: '', imageBase64: '', date: '', consumer_name: ''},
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
        getConsumerImageURL(base64String) {
            if (base64String) {
                return `data:image/png;base64,${base64String}`;
            }
            return '';
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
            this.fetchReviews();
        },
        toggleCommentExpand(review) {
            review.expanded = !review.expanded;
            this.$forceUpdate(); // Force Vue to update the DOM
        },
        displayLimitedComment(fullComment) {
            return fullComment.length > this.maxCommentLength
            ? fullComment.slice(0, this.maxCommentLength) + '...'
            : fullComment;
        },
        editComment(review) {
            // Show a modal or dialog for editing the comment.
            // Pass the review object to the modal to pre-fill the comment.
            // Update the comment after editing.
        },
        
        removeComment(review) {
            // Show a confirmation dialog to confirm comment removal.
            // If confirmed, remove the review from the list.
        },
    },
    computed: {
        truncatedComments() {
            return this.reviews.map((review) => {
                if (review.comment.length > this.maxCommentLength && !review.expanded) {
                    return review.comment.substring(0, this.maxCommentLength) + '...';
                }
                return review.comment;
            });
        },
    },
    components:{
        Icon,
    }
};  

</script>

<style scoped>
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
    margin-top: 20px;
}

.review-button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
}

.review-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.review-button:active {
  transform: translateY(0);
}

.review-grid{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.review-card {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    max-width: 100%;
}
.review-row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.user-own-review {
    background-color: #FFFFCC;
}

.left-side {
    display: flex;
    align-items: center;
    margin-right: 400px;
}

.right-side {
    flex: 1;
    flex-direction: column;
}

.static-star {
    font-size: 36px;
    color: #FFD700;
}

.consumer-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
}

.highlighted-name {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
}

.comment-container {
    max-width: 100%; /* Ensure it doesn't exceed its parent's width */
    word-wrap: break-word; /* Allow long words to wrap to the next line */
}

.comment.expanded {
    max-width: 100%; /* Set to 100% to allow full width */
    word-wrap: normal; /* Allow long words to overflow container */
}
</style>