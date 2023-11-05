<template>
  <div class="container mt-4 bg-white">
    
      <FoodOrder :showOrder="showFoodOrderModal" :selectedFood="selectedFoodItem" @close-modal="showFoodOrderModal = false"/>
      <div class="container mt-4">
        <div>
            <backButton />
        </div>
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
                <a :href="foodStall.source_url" target="_blank" class="btn btn-danger stall-link">Visit My Website</a>
                <button v-if="userData && showReviewBtn" @click="toggleReviewForm" class="btn btn-secondary ml-3 review-button"> Leave a Review</button>
              </div>
            </div>
  
            <div class="col-6 stall-image-container">
              <span v-if="userData" class="favorite-icon" @click="toggleFavorite">{{ isFavorite ? '♥' : '♡' }}</span>
              <img :src="foodStall.store_url" alt="Stall Image" class="stall-image img-thumbnail" />
            </div>
          </div>
        </div>
        <!-- Review Form Modal -->
        <LeaveReview v-if="userData" :showModal="showReview" :consumerId="userData.id" :stallId="stallId" @close="toggleReviewForm" @review-submitted="handleReviewSubmitted" />
        <EditReviewModal v-if="showEditModal" :showEditModal="showEditModal" :review="selectedReview" @close="toggleEditReviewForm" @review-submitted="handleReviewSubmitted" />
        <FoodDetails :food="selectedFood" :showModal="showFoodDetails" @close="toggleFoodDetails(this.food)" />

        <b-tabs content-class="mt-3">
          <b-tab title="Food Menu" active>
            <!-- Food Menu -->
            <div class="container">
              <h1 class="display-4 text-center mb-4 pl-2">Menu</h1>
              <div v-if="foodList && foodList.length > 0" class="row justify-content-center">
                <div v-for="food in foodList" :key="food.id" class="col-lg-6 col-md-4 col-sm-6 mb-4">
                  <div class="card mb-3 p-0 justify-content-between mx-11" style="width: 500px; border-radius: 0; box-shadow:0px 3px 15px rgba(0, 0, 0, 0.1);">
                        <div class="row g-0 p-0" >
                        <div class="col-md-4 ml-0">
                          <img :src="food.url" class="card-img-top img-fluid" alt="Food Image" style="height: 200px; width: 100%; object-fit: cover;border-radius: 0;">
                        </div>
                        <div class="col-md-8" >
                            <div class="card-body w-10">
                            <h4 class="card-title mb-6">{{ food.name }}</h4>
                            <h5 class="card-text">${{ food.price }}</h5>
                            <div class="position-absolute bottom-0 end-0 p-3" >
                                <button @click="openFoodOrderModal(food)" class="btn btn-sm py-2 px-2 to-order" style="border-radius: 50%;background-color: rgb(124, 0, 0) ;">
                                <Icon icon="iconamoon:sign-plus-bold" style="font-size: 24px;color: white;"></Icon>
                                </button>
                            </div>
                            <div class="position-absolute bottom-0 end-0 " style="background-color: rgba(255, 255, 255, 0.8); margin-right: 80px;">
                                <button class="btn btn-sm py-2 px-2 to-order" style="border-radius: 50%; background-color: rgb(124, 0, 0);" @click="toggleFoodDetails(food)">
                                    <!-- <HealthInfo :showModal="showModal" /> -->
                                <Icon icon="openmoji:green-salad" style="font-size: 24px;"></Icon>
                                </button>
                            </div>
                        </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <h1 class="display-4 text-center text-muted">No food is available</h1>
              </div>
            </div>
          </b-tab>
          <b-tab title="Reviews">
            <!-- Reviews Section -->
            <h1 class="display-4 mt-5 text-center">Reviews</h1>
            <div v-if="reviews && reviews.length > 0">
              <div class="review-grid mt-4">
                <div v-for="review in reviews" :key="review.id" class="review-card card mb-4 p-3" :class="{ 'user-own-review': review.consumer_name === loggedInUsername }">
                  <div class="card-body d-flex">
                    <!-- Left side with image and consumer name -->
                    <div class="left-side mr-4">
                      <img :src="review.imageBase64" alt="Consumer Image" class="consumer-image" />
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
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </template>
  
<script>
import auth from '../../auth';
import { Icon } from '@iconify/vue';
import LeaveReview from '@/components/LeaveReview.vue';
import EditReviewModal from '@/components/EditReviewModal.vue';
import backButton from '@/components/BackButton/backButton.vue';
import FoodDetails from '@/views/Food/FoodDetails.vue'; 
import FoodOrder from '@/components/FoodOrder.vue';
// import HealthInfo from '@/views/Food/FoodDetail.vue'; 

export default {
    
    components:{
        LeaveReview,
        EditReviewModal,
        backButton,
        Icon,
        FoodDetails,
        FoodOrder
        // HealthInfo,
    },
    data() {
        return {
            loggedInUsername: "",
            userData: null,
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
            showFoodDetails: false,
            selectedFood: null,
            showFoodOrderModal: false,
            selectedFoodItem: null,
            isFavorite: false,
        }
    },
    props: ['stallId'],
    async created() {

        try{
          const userInfo = await this.fetchUserData();
          this.userData = userInfo;
          if (userInfo) {
              this.loggedInUsername = userInfo.username;
          } else {
              this.loggedInUsername = '';
          }
          const stallRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/stall/${this.stallId}`);
          if (stallRes.ok) {
              this.foodStall = await stallRes.json();
              const cuisineRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Cuisine/api/get/cuisine/${this.foodStall.cuisine_type}`);
              if (cuisineRes.ok) {
                  this.cuisine = await cuisineRes.text();
              }
              this.fetchFoodsInStallDetails();
              this.fetchReviews();
              this.fetchFavoriteStatus();
          }
        }catch(error){
          console.error('An error occurred:', error)
        }
        
    },
    methods: {
      openFoodOrderModal(foodItem) {
        this.selectedFoodItem = foodItem;
        this.showFoodOrderModal = true;
        console.log(this.showFoodOrderModal);
        },
          async fetchUserData() {
            try {
              return await auth.getUser(); // Assuming this returns a Promise with the user data
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
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
                }
            } else {
                console.error('Failed to fetch reviews:', response.statusText);
            }
            } catch (error) {
            console.error('An error occurred while fetching reviews:', error);
            }
        },
        async fetchFavoriteStatus(){
          try {
            const response = await fetch(
                `https://stingray-app-4wa63.ondigitalocean.app/Favourite/api/get/favourite/${this.userData.id}`
            );
            if (response.ok) {
              this.favoriteStalls = await response.json();
              console.log(this.favoriteStalls)
                for(let i = 0; i < this.favoriteStalls.length; ++i)
                {
                    if(this.favoriteStalls[i].hawker_stall_id == this.foodStall.id)
                    {
                      this.isFavorite = true;
                    }
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
        },
        toggleFoodDetails(food){
          this.selectedFood = food;
          this.showFoodDetails = !this.showFoodDetails;
        },
        async toggleFavorite() {
          if(this.isFavorite){
              const reviewData = {
                id: this.userData.id,
                hawkerId: this.foodStall, 
              };
              const requestOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
              };
              
              try {
                const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Favourite/api/delete/favourite/${this.userData.id}/stall/${this.foodStall.id}`, requestOptions);
                if (response.ok) {
                  this.isFavorite = false;
                } else {
                  console.error('Failed to submit the review:', response.statusText);
                }
              } 
              catch (error) {
                console.error('An error occurred while submitting the review:', error);
              }
          }
          else{
            const reviewData = {
                consumer_id: this.userData.id,
                hawker_stall_id: this.foodStall.id, 
              };
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
              };
              try {
                const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Favourite/api/create/favourite`, requestOptions);
                if (response.ok) {
                  this.isFavorite = true;
                } else {
                  console.error('Failed to submit the review:', response.statusText);
                }
              } 
              catch (error) {
                console.error('An error occurred while submitting the review:', error);
              }
              
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
</style>