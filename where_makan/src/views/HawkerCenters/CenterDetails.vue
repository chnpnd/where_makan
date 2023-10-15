<template>
    <div class="container mt-6">
        <router-link to="/hawkerCenters" class="btn btn-primary">Back</router-link>
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
    </div>
  </template>
  
  <script>
  export default {
    props: ['centerId'], // This prop is automatically passed by Vue Router
    data() {
      return {
        center: null, // Initialize center as null
      };
    },
    created() {
      // Fetch center details based on the centerId prop
      this.fetchCenterDetails();
    },
    methods: {
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