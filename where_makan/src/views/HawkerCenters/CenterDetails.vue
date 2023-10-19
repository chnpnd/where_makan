<template>
    <div v-if="center" class="container mt-6">
        <h1 class="display-4">{{ center.name }}</h1>
        <p class="lead">{{ center.address }}</p>
        <hr>

        <!-- Display center photo -->
        <div class="mb-4">
            <img :src="center.photo_url" alt="Center Photo" class="img-fluid" />
        </div>

        <div class="mb-4">
            <p>{{ center.description }}</p>
        </div>

        <!-- Display Google Map -->
        <div class="mb-4">
            <h4>How to Get There</h4>
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

        <!-- stalls that this centre has -->
        <h1 class="display-4">Stalls Available: </h1>
        <div class="card-container">
        <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
            <div v-if="foodStall" class='row justify-content-center'>
                    <v-card v-for="stall in foodStall" :key="stall.id" max-width="300" max-height="400" style="margin:10px;">
                        <v-img :src="stall.store_url" cover max-height="100"></v-img>
                        <v-card-title>{{ stall.name }}</v-card-title>
                        <v-card-text>{{ stall.address }}</v-card-text>
                        <v-card-actions> 
                            <!--    NEED HELP ON WHY IT NEEDS TO CLICK ON 2 CARDS BEFORE SWITCHING(duplicated function)--> 
                        <v-btn><router-link :to="{ name: 'stall-details', params: { stallId: stall.id } }">View Menu</router-link></v-btn> 
                        </v-card-actions>
                    </v-card>
                </div> 
                <div v-else><h1>No food is available</h1>
                </div>
            </div>



    </div>
  </template>
  
  <script>
  export default {
    props: ['centerId'], // This prop is automatically passed by Vue Router
    data() {
      return {
        center: null, // Initialize center as null
        foodStall: {},
      };
    },
    created() {
      // Fetch center details based on the centerId prop
      this.fetchCenterDetails();
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
        centerPosition(center) {
            return { lat: center.lat, lng: center.long };
        },
    },
  };
  </script>

  <style>

.card-container .v-card {
  background-color: #f5e8d7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Add any other desired styling here */
}

.card-container .v-card-title {
    font-size: 24px;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #5a4134;
    padding-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.card-container .v-card-text {
    font-size: 10px;
    margin-bottom: 15px;
    letter-spacing: 2px;
    border-bottom: 2px solid #5a4134;
    padding-bottom: 10px;
    white-space: normal;
}

.card-container .v-card-title:hover {
    white-space: normal;
    text-overflow: unset;
}


</style>
