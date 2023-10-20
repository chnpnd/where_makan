<template>
    <div class="row">
        <div class="col p-5">
            <h1>Rodger Mok (Business Owner)</h1> 
            <p>Username:</p>
            <p>Password: *******</p>
            <p>Date of Birth:</p>
            <p>Address: </p>
            <p>Phone Number</p>
        </div>

        <div class="col p-5 text-center">
            <router-link to="/analytics" class="btn btn-outline-primary btn-lg">View Online Sales Analytics</router-link>
        </div>

    </div>

    <div class="row">
        <div class="col p-5">
            <h1>Alice Low (Consumer)</h1> 
            <p>Username:</p>
            <p>Password: *******</p>
            <p>Date of Birth:</p>
            <p>Address: </p>
            <p>Phone Number</p>
        </div>

        <div class="col p-5">
            <h1>Reward Points: 125</h1>
            <router-link to="/myrewards" class="btn btn-outline-primary btn-lg">My Rewards</router-link>
            <p></p>
            <router-link to="/exchangerewards" class="btn btn-outline-primary btn-lg">Exchange Points for Rewards</router-link>
        </div>

    </div>
    
</template>
  
  <script>
  export default {
    props: ['accId'], // This prop is automatically passed by Vue Router
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
                `https://stingray-app-4wa63.ondigitalocean.app/User/api/all/users/`
            );
            if (response.ok) {
                const data = await response.json();
    
                // Find the center with the matching centerId in the data array
                const id = parseInt(this.id); // Convert centerId to a number
                const matchingCenter = data.find((center) => accId.id === centerId);
    
                if (matchingCenter) {
                // If a matching center is found, set it to the center data property
                this.accId = matchingCenter;
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



</style>