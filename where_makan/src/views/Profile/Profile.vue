<template>
    <div>
        <section style="background-color: #eee;">
  <div class="container py-5">
    <div class="row">
      <div class="col">
        <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">User</a></li>
            <li class="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src="src/assets/profile_img.jpeg" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;">
            <h5 class="my-3">John Smith</h5>
            <p class="text-muted mb-1">Full Stack Developer</p>
            <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
            <!--<div class="d-flex justify-content-center mb-2">
              <button type="button" class="btn btn-danger">Follow</button>
              <button type="button" class="btn btn-outline-danger ms-1">Message</button>
            </div>-->
          </div>
        </div>
        <div class="card mb-4 mb-lg-0">
          <div class="card-body p-0 " style="height: 390px;" >
                <h4 class="my-4 text-center">Your Recent Activity</h4>
                <div class="mx-5 text-center" style="height: 300px;background-color: #dad6d6;">
                    <h5 class="d-flex align-items-center justify-content-center text-muted" style="height: 100%;">No recent activity</h5>
                </div>
            </div>
            </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Username</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">Alice Low</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">example@example.com</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone (optional)</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">(097) 234-5678</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">City</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-danger font-italic me-1">Exchange points</span> Total points
                </p>
                <p class="mb-1" style="font-size: .77rem;">Points left </p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 80%;background-color: brown; " aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0" style="height:300px;">
              <div class="card-body">
                <h4 class="text-center">Favourited Stalls</h4>
                <div class="my-6 text-center " style="height:200px; background-color: #dad6d6;">
                  <FavouritedStalls />
                    <h5 class="d-flex align-items-center justify-content-center text-muted" style="height: 100%;" >No favourited stalls</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0" style="height:300px;">
              <div class="card-body">
                <h4 class="text-center">Your Rewards</h4>
                <div class="my-6 text-center " style="height:200px; background-color: #dad6d6;">
                    <h5 class="d-flex align-items-center justify-content-center text-muted" style="height: 100%;" >No rewards available</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
     
</template>
  
  <script>
  import FavouritedStalls from './FavouritedStalls.vue';
  export default {

    props: ['accId'], // This prop is automatically passed by Vue Router
    components: {
      FavouritedStalls
    },
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