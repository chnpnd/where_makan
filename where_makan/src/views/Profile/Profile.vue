<template>
     <div class="container bg-white">
        <div class="row">
            <div class="col-4">
                <div class="container">
                    <div class="row">
                        <button class="btn btn-outline-primary btn-lg" data-toggle="button">View Profile</button>
                    </div>

                    <div class="row">
                        <router-link to="/analytics" class="btn btn-outline-primary btn-lg">View Online Sales Analytics</router-link>                    </div>
                    </div>

                    <div class="row">
                        <router-link to="/reviews" class="btn btn-outline-primary btn-lg">Check Stall Page</router-link>                    
                </div>

            </div>

            <div class="col">
                <div class="row">
                    <div class="col">
                        <img class="img-thumbnail w-100 h-100" src="src/assets/profile_img.jpeg">
                    </div>

                    <div class="col text-center pt-10">
                        <h3>Rodger Mok</h3>
                        <router-link to="/editprofile" class="btn btn-outline-primary btn-lg">Edit Profile</router-link>
                    </div>

                    <hr>
                </div>
               
            </div>
        </div>
      </div>

      <div> <hr> </div>

    <div class="container bg-white">
        <div class="row">
            <div class="col-4">
                <div class="container">
                    <div class="row">
                        <button class="btn btn-outline-primary btn-lg" data-toggle="button">View Profile</button>
                    </div>

                    <div class="row">
                        <router-link to="/myrewards" class="btn btn-outline-primary btn-lg">My Rewards</router-link>
                    </div>

                    <div class="row">
                        <router-link to="/exchangerewards" class="btn btn-outline-primary btn-lg">Exchange Points for Rewards</router-link>
                    </div>

                    <div class="row">
                        <router-link to="/favouritedstalls" class="btn btn-outline-primary btn-lg">My Favourite Stalls</router-link>
                    </div>

                    <div class="row">
                        <router-link to="/pastactivity" class="btn btn-outline-primary btn-lg">View Past Activity</router-link>
                    </div>
                    
                </div>

            </div>

            <div class="col">
                <div class="row">
                    <div class="col">
                        <img class="img-thumbnail w-100 h-100" src="src/assets/profile_img.jpeg">
                    </div>

                    <div class="col text-center pt-10">
                        <h3>Alice Low</h3>
                        <router-link to="/editprofile" class="btn btn-outline-primary btn-lg">Edit Profile</router-link>
                    </div>

                    <hr>
                </div>
               
            </div>
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