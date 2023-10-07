
<template>
    <div class="container mt-6">
        <router-link to="/hawkerstall" class="btn btn-primary">Back to Restaurant List</router-link>
        <h1 class="display-4">{{ store1.name }}</h1>
        <p class="lead">{{ store1.address }}</p>
        <hr>

        <!-- Display store photo -->
        <div class="mb-4">
            <img :src="store1.store_url" alt="Store Photo" class="img-fluid" />
        </div>

        <div class="mb-4">
            <p>{{ store1.description }}</p>
        </div>

        <!-- Display Google Map -->
        <div class="mb-4">
            <h4>How to Get There</h4>
            <GMapMap :center="storePosition(store1)" :zoom="17" map-type-id="terrain" style="height: 300px;">
                <GMapCluster>
                <GMapMarker
                    :key="index"
                    :position="storePosition(store1)"
                    :clickable="true"
                    :draggable="true"
                    @click="center = storePosition(store1)"
                />
                </GMapCluster>
            </GMapMap>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['storeId'], // This prop is automatically passed by Vue Router
    data() {
      return {
        store1: null, // Initialize store as null
      };
    },
    created() {
      // Fetch store details based on the storeId prop
      this.fetchStoreDetails();
    },
    methods: {
        async fetchStoreDetails() {
            try {
            const response = await fetch(
                `https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkerstore/`
            );
            if (response.ok) {
                const data = await response.json();
    
                // Find the store with the matching storeId in the data array
                const storeId = parseInt(this.storeId); // Convert storeId to a number
                const matchingStore = data.find((store1) => store1.id === storeId);
    
                if (matchingStore) {
                // If a matching store is found, set it to the store data property
                this.store = matchingStore;
                } else {
                console.error('Store not found');
                }
            } else {
                console.error('Failed to fetch store details:', response.statusText);
            }
            } catch (error) {
            console.error('An error occurred while fetching store details:', error);
            }
        },
        storePosition(store1) {
            return { lat: store1.lat, lng: store1.long };
        },
    },
  };
  </script>
