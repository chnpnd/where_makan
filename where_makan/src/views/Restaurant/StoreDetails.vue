<template>
    <div class="container mt-5">
        <router-link to="/restaurant" class="btn btn-primary">Back to Restaurant List</router-link>
        <h1 class="display-4">{{ store.name }}</h1>
        <p class="lead">{{ store.address }}</p>
        <hr>

        <!-- Display store photo -->
        <div class="mb-4">
            <img :src="store.photo_url" alt="Store Photo" class="img-fluid" />
        </div>

        <div class="mb-4">
            <p>{{ store.description }}</p>
        </div>

        <!-- Display Google Map -->
        <div class="mb-4">
            <h4>How to Get There</h4>
            <GMapMap :center="storePosition(store)" :zoom="17" map-type-id="terrain" style="height: 300px;">
                <GMapCluster>
                <GMapMarker
                    :key="index"
                    :position="storePosition(store)"
                    :clickable="true"
                    :draggable="true"
                    @click="center = storePosition(store)"
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
        store: null, // Initialize store as null
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
                `https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`
            );
            if (response.ok) {
                const data = await response.json();
    
                // Find the store with the matching storeId in the data array
                const storeId = parseInt(this.storeId); // Convert storeId to a number
                const matchingStore = data.find((store) => store.id === storeId);
    
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
        storePosition(store) {
            return { lat: store.lat, lng: store.long };
        },
    },
  };
  </script>