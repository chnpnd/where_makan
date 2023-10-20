<template>
    <div class = "container">
        <div class="row">
            <div class = "col-2"></div>

            <div class="col p-5 userProfile">
                <div class="card" style="width: 50em;"> 
                    <div class="card-body"> 
                        <h2 class="card-title text-center">
                            Rodger Mok
                            <router-link to="/editprofile" class="btn btn-outline-primary btn-lg">Edit Profile</router-link>
                        </h2>
                    </div> 
                    <div class="card-body text-center"> 
                        <router-link to="/reviews" class="btn btn-outline-primary btn-lg">Check Reviews</router-link>
                        &nbsp;
                        <router-link to="/analytics" class="btn btn-outline-primary btn-lg">View Online Sales Analytics</router-link>
                    </div> 
                </div> 
            </div>

            <div class = "col-2"></div>  
        </div>

        <div class="row">
            <div class = "col-2"></div>

            <div class="col p-5 userProfile">
                <div class="card" style="width: 50em;"> 
                    <div class="card-body"> 
                        <h2 class="card-title text-center">
                            Alice Low
                            <router-link to="/editprofile" class="btn btn-outline-primary btn-lg">Edit Profile</router-link>
                        </h2> 
                    </div> 

                    <div class="card-body text-center"> 
                        <h3>Reward Points: 125</h3>
                        <router-link to="/myrewards" class="btn btn-outline-primary btn-lg">My Rewards</router-link>
                        &nbsp;
                        <router-link to="/exchangerewards" class="btn btn-outline-primary btn-lg">Exchange Points for Rewards</router-link>
                        &nbsp;
                        <router-link to="/favouritedstalls" class="btn btn-outline-primary btn-lg">My Favourite Stalls</router-link>
                    </div> 
                </div> 
            </div>

            <div class = "col-2"></div>

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

h1 {
    text-align: center;
}

</style>