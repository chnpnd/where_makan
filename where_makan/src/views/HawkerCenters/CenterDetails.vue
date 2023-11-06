<template>

    <div v-if="center" class="container mt-6 bg-white w-10" style="height: 100vh;">
        <div>
            <backButton/>
        </div>
            <div class="row">
            <div class = "col-8">
                <div class = "mb-4">
                    <h1 class="display-4 text-left fw-bold">{{ center.name }}</h1>
                    <p class="lead">{{ center.address }}</p>
                </div>

                <div class="mb-4">
                    <p>{{ center.description }}</p>
                </div>
            </div>

            <div class = "col-4">
                 <!-- Display center photo -->
                <div class="mb-4 rounded mx-auto">
                    <img :src="center.photo_url" alt="Center Photo" class="img-fluid" />
                </div>
            </div>
        </div>
        <b-tabs content-class="mt-3">
            <b-tab title="Hawker Stalls" active>  
                <h4 class="text-center">Available Stalls: </h4>
                <div class="card-container">
                <div v-if="foodStall" class="row justify-content-center">
                    <div class="card mb-3 p-0 mx-4 stallCard" v-for="(stall,index) in foodStall" :key="stall.id" style="max-width: 540px; border-radius: 0; box-shadow:0px 3px 15px rgba(0, 0, 0, 0.1);">
                        <router-link class="text-decoration-none text-black" :to="{ name: 'stall-details', params: { stallId: stall.id } }">
                        <div class="row g-0 p-0" >
                        <div class="col-md-4 ml-0">
                            <img :src="stall.store_url" class="card-img-top img-fluid rounded-start" alt="..." style="height: 150px; width: 100%; object-fit: cover;border-radius: 0;">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title">{{ stall.name }}</h5>
                            <p class="card-text">{{ stall.address }}</p>
                            
                            <!-- replace for review -->
                            <p> {{ filterReview[index] }}</p>
                        </div>
                        </div>
                        </div>
                    </router-link>
                    
                    </div>
                </div>
                <div v-else>
                    <h1>No food is available</h1>
                </div>
                </div>
            </b-tab>
            <b-tab title="Directions">
                <!-- Display Google Map -->
                <div class="mb-4">
                    <GMapMap :center="centerPosition(center)" :zoom="17" map-type-id="terrain" style="height: 300px;">
                        <GMapCluster>
                        <GMapMarker
                            :key="index"
                            :position="centerPosition(center)"
                            :clickable="true"
                            :draggable="true"
                            @click="center = centerPosition(center)"
                        />
                        </GMapCluster>
                    </GMapMap>
                </div>
            </b-tab>
        </b-tabs>        
    </div>
  </template>
  
  <script>
     import { Icon } from '@iconify/vue';
    import backButton from '@/components/BackButton/backButton.vue';

  export default {
    props: ['centerId'], // This prop is automatically passed by Vue Router
    components: {
    backButton,
    Icon,
    },
    data() {
      return {
        center: null, // Initialize center as null
        foodStall: {},
        reviews: {}, //all reviews
        filterReview: [] // list of filtered reviews
      };
    },
    created() {
      // Fetch center details based on the centerId prop
      this.fetchCenterDetails();
      this.fetchReviews();

    },
    methods: {
        async fetchStallsInCenterDetails() {
            console.log("here")
            try {
            const response = await fetch(
                `https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/hawker/${this.center.id}/stall`
            );
            if (response.ok) {
                this.foodStall = await response.json();
                console.log(this.foodStall);
            } else {
                console.error('Failed to fetch all stall details:', response.statusText);
            }
            } catch (error) {
            console.error('An error occurred while fetching all stall details:', error);
            }
        },
        async fetchCenterDetails() {
            try {
            const response = await fetch(
                `https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`
            );
            if (response.ok) {
                const data = await response.json();
    
                // Find the center with the matching centerId in the data array
                const centerId = parseInt(this.centerId); // Convert centerId to a number
                const matchingCenter = data.find((center) => center.id === centerId);
    
                if (matchingCenter) {
                // If a matching center is found, set it to the center data property
                this.center = matchingCenter;
                this.fetchStallsInCenterDetails();
                } else {
                console.error('Center not found');
                }
            } else {
                console.error('Failed to fetch center details:', response.statusText);
            }
            } catch (error) {
            console.error('An error occurred while fetching center details:', error);
            }
        },
        async fetchReviews() {
                console.log("here")
                try {
                const response = await fetch(
                    `https://stingray-app-4wa63.ondigitalocean.app/Review/api/get/all/review`
                );
                if (response.ok) {
                    this.reviews = await response.json();
                } else {
                    console.error('Failed to fetch all review details:', response.statusText);
                }
                } catch (error) {
                console.error('An error occurred while fetching all review details:', error);
                }
                this.filterRe();

            },
     

        centerPosition(center) {
            return { lat: center.lat, lng: center.long };
        },
        toggleHeart(stallId) {
            this.foodStall[stallId].heart = !this.foodStall[stallId].heart;   
      },

        filterRe() {
            for (let i=0; i<this.foodStall.length; i++){
                var stall = this.foodStall[i];
                var totalStars = 0;
                var totalReview = 0;
                var average = 0;
                
                for (let x=0; x<this.reviews.length; x++){
                    var review = this.reviews[x];
                    if (review.hawker_stall_id == stall.id){
                        totalStars += review.rating;
                        totalReview += 1;
                    }
                }
                average = totalStars / totalReview;
                console.log("average " + average);
                this.filterReview.push(average + "*");

            }
        
    }, 

    },
  };
  </script>

  <style>
    .card-img-wrapper {
    position: relative;
    overflow: hidden;
  }

  .card-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .stallCard:hover{
    transform: translateY(-10px);
  }


</style>
