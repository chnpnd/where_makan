<template>
    <div class="container mt-6">
        <router-link to="/hawkerstall" class="btn btn-primary">Back to Hawker Stall</router-link>
        <h1 class="display-4">{{ store.name }}</h1>
        <p class="lead">{{ store.address }}</p>
        <p>Phone Number: {{ store.phone_number }}</p>
        <p>Price: ${{ store.price }}</p>
        <hr>

        <!-- Display store photo -->
        <div class="mb-4">
            <img :src="store.store_url" alt="Store Photo" class="img-fluid" />
        </div>

        <div class="mb-4">
            <p>{{ store.description }}</p>
        </div>

          <!-- Display Signature Item -->
        <div class="mb-4">
            <h3>Signature Item</h3>
            <p>{{ store.signature_item }}</p>
        </div>
        
        <!-- Display Opening Hours-->
        <div class="mb-4">
            <h3>Open From:</h3>
            <p>{{ store.opening_hours }}</p>
            <h3>Rest Day(s):</h3>
            <p>{{ store.rest_day }}</p>
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
      // Fetch store details based on the storeIdStall prop
      this.fetchStoreDetails();
    },
    methods: {
        async fetchStoreDetails() {
            try {
            const response = await fetch(
                `https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/all/hawkerstore/`
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // Find the store with the matching storeId in the data array
                const storeId = parseInt(this.storeId); // Convert storeId to a number
                console.log(storeId);
                const matchingStore = data.find((store) => store.owner_id === storeId);
    
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
