<template>
    <div class="container mt-4 bg-white">
        <div class="container mt-4">
            <backButton />
            <!-- Food Stall Information -->
            <div v-if="foodStall" class="stall-container d-flex mb-5">
                <div class="row">
                    <div class="col-6">
                        <div class="stall-details">
                            <h1 class="display-4 text-left fw-bold">{{ foodStall.name }}</h1>
                            <ul class="list-unstyled pl-1">
                                <li><strong>Phone Number:</strong> {{ foodStall.phone_number }}</li>
                                <li><strong>Address:</strong> {{ foodStall.address }}</li>
                                <li><strong>Opening Hours:</strong> {{ foodStall.opening_hours }}</li>
                                <li><strong>Rest Day:</strong> {{ foodStall.rest_day }}</li>
                                <li><strong>Signature Item:</strong> {{ foodStall.signature_item }}</li>
                                <li><strong>Cuisine Type:</strong> {{ cuisine }}</li>
                            </ul>
                            <a :href="foodStall.source_url" target="_blank" class="btn btn-primary stall-link">Read More</a>
                            <button v-if="showReviewBtn" @click="toggleReviewForm" class="btn btn-secondary ml-3 review-button">Review</button>
                        </div>
                    </div>

                    <div class="col-6 stall-image-container">
                        <img :src="foodStall.store_url" alt="Stall Image" class="stall-image img-thumbnail" />
                    </div>

                </div>

                <div class="row">
                    
                </div>
                
            </div>
                <!-- Food Menu -->
                <div class="container">
                    <h1 class="display-4 text-left mb-4 pl-2">Menu </h1>
                    <div v-if="foodList && foodList.length > 0" class='row justify-content-left'>
                        <div v-for="food in foodList" :key="food.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div class="card h-100 w-500">
                                <router-link :to="{ name: 'food-details', params: { foodId: food.id } }" class="text-black text-decoration-none">
                                    <div class="row">
                                        <div class = "col-4">
                                            <img :src="food.url" class="card-img-top" alt="Food Image">
                                        </div>

                                        <div class = "col-8">
                                            <h4 class="card-title">{{ food.name }}</h4>
                                            <h5 class="card-title">${{ food.price }}</h5>
                                        </div>
                                    </div>
                                </router-link>
                                <button @click="openFoodOrderModal(food)">Order</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h1 class="display-4 text-center text-muted">No food is available </h1>
                    </div>
            </div>
    </div>        
        <FoodOrder :showOrder="showFoodOrderModal" :selectedFood="selectedFoodItem" @close-modal="showFoodOrderModal = false"/>

        <!-- Review Form Modal -->
        <!-- Consumer ID is HARDCODED -->
        <LeaveReview :showModal="showReview" :consumerId = "10" :stallId="stallId" @close="toggleReviewForm" @review-submitted="handleReviewSubmitted"/>
        <EditReviewModal v-if="showEditModal" :showEditModal="showEditModal" :review="selectedReview" @close="toggleEditReviewForm" @review-submitted="handleReviewSubmitted"/>

        <!-- Reviews Section -->
        <h1 class="display-4 mt-5 text-center">Reviews </h1>
        <div v-if="reviews && reviews.length > 0">
            <div class="review-grid mt-4">
                <div v-for="review in reviews" :key="review.id" class="review-card card mb-4 p-3" :class="{ 'user-own-review': review.consumer_name === loggedInUsername }">
                    <div class="card-body d-flex">
                        <!-- Left side with image and consumer name -->
                        <div class="left-side mr-4">
                            <img v-bind:src="review.imageBase64" alt="Consumer Image" class="consumer-image"/>
                            <div class="mt-2">
                                <strong class="highlighted-name">{{ review.consumer_name }}</strong>
                            </div>
                            <div v-if="review.consumer_name === loggedInUsername" class="mt-2">
                                <button @click="editReview(review)" class="btn btn-outline-primary btn-sm">Edit</button>
                                <button @click="deleteReview(review)" class="btn btn-outline-danger btn-sm ml-2">Remove</button>
                                    
                            </div>
                        </div>
                        <!-- Right side with ratings and comment -->
                        <div class="right-side flex-grow-1">
                            <div class="star-rating static-star mb-2">{{ displayStars(review.rating) }}</div>
                            <p class="mb-2">{{ formatDate(review.date) }}</p>
                            <p class="mb-2">{{ truncatedComments[reviews.indexOf(review)] }}</p>
                            <span v-if="review.comment.length > maxCommentLength" class="text-primary" @click="toggleCommentExpand(review)">
                                {{ review.expanded ? 'Show Less' : 'Read More' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="text-muted text-center mt-5">No reviews yet</p>
    </div>
</template>

<script>

import { Icon } from '@iconify/vue';
import LeaveReview from '@/components/LeaveReview.vue';
import EditReviewModal from '@/components/EditReviewModal.vue';
import backButton from '@/components/BackButton/backButton.vue';
import FoodOrder from '@/components/FoodOrder.vue';

export default {
    component:{
        LeaveReview,
        EditReviewModal,
        FoodOrder,
        backButton,
        Icon,
        FoodOrder
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
            showReviewBtn: true,
            showEditModal: false,
            selectedReview: {},
            showDeleteConfirmation: false,
            showFoodOrderModal: false,
            selectedFoodItem: null
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
        openFoodOrderModal(foodItem) {
            this.selectedFoodItem = foodItem;
            this.showFoodOrderModal = true;
        },
        async fetchFoodsInStallDetails() {
            try {
            const response = await fetch(            
               `https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/hawkerstall/${this.foodStall.id}/food`
            );
            if (response.ok) {
                this.foodList = await response.json();
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
                            // Check if logged in user has responded
                            if(this.loggedInUsername == this.reviews[i].consumer_name)
                            {
                                this.showReviewBtn = false;
                            }
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
        editReview(review)
        {
            this.selectedReview = review;
            this.toggleEditReviewForm();
        },
        toggleEditReviewForm()
        {
            this.showEditModal = !this.showEditModal;
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
        // Add a new method to delete the review
        async deleteReview(review) {
            // Display a confirmation dialog for deletion
            const confirmDeletion = confirm('Are you sure you want to delete this review?');
            if (confirmDeletion) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                try {
                    const response = await fetch(
                    `https://stingray-app-4wa63.ondigitalocean.app/Review/api/delete/review/${review.hawker_stall_id}/user/${review.consumer_id}`,
                    requestOptions
                    );
                    if (response.ok) {
                        alert('Review deleted successfully!');
                        this.reviews = await response.json();
                        this.$emit('review-deleted');
                    } else {
                        console.error('Failed to delete the review:', response.statusText);
                    }
                    this.showReviewBtn = true;
                } catch (error) {
                    console.error('An error occurred while deleting the review:', error);
                }
            } 
                
            else {
                // User canceled the deletion
                this.showDeleteConfirmation = false;
            }
        }
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
@import 'stall.css';

body {
    font-family: 'Arial', sans-serif;
    background-color: #f7f7f7;
}

.container {
    max-width: 1300px;
}

.stall-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
}

.food-container {
    background-color: #ffffff;
    width: auto;
    height: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
}



.stall-image {
    width: auto;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
    
}

.stall-details ul {
    padding-left: 0;
    margin-bottom: 20px;
}

.stall-details li {
    margin-bottom: 10px;
}

.stall-link,
.review-button {
    margin-top: 15px;
}

.card {
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.review-card {
    border: 1px solid #e7e7e7;
}

.consumer-image {
    object-fit: cover;
}

.static-star {
    color: #ffcc00; /* golden color for stars */
    font-size: 36px;
}

/* Hover effects */

.card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.stall-link:hover,
.review-button:hover {
    text-decoration: none;
}

/* User's own review special styling */

.user-own-review {
    border: 2px solid #007BFF; /* using bootstrap's primary color */
}

/* Responsive adjustments */

@media (max-width: 768px) {
    .stall-container {
        flex-direction: column;
        align-items: center;
    }
}

@media (max-width: 576px) {
    .stall-details ul {
        text-align: center;
    }
}
</style>