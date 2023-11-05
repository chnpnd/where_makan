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
          <h5 class="my-3">{{userData.full_name}}</h5>
          <p class="text-muted mb-1">Full Stack Developer</p>
          <p class="text-muted mb-4">{{userData.address}}</p>
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
              <p class="text-muted mb-0">{{userData.username}}</p>
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
              <p class="text-muted mb-0">{{userData.phone_number}}</p>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">City</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">Singapore</p>
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
              <div class="progress rounded progress-custom-height">
                <div
                  class="progress-bar progress-bar-custom"
                  role="progressbar"
                  :style="progressBarStyle"
                  :aria-valuenow="userData.user_reward"
                  aria-valuemin="0"
                  aria-valuemax="1000"
                ></div>
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
              <div class="my-6 text-center" style="height:200px; background-color: #eeeeee;">
                <div v-if="!FavouritedStalls && userData">
                    <div class="container-fluid h-200 scrollable-container">
                        <FavouritedStalls :consumerId="userData.id"/>
                    </div>
                </div> 
                <div v-else>
                  <h5 class="d-flex align-items-center justify-content-center text-muted" style="height: 100%;" >No favourited stalls</h5>
                </div>
                </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4 mb-md-0" style="height:300px;">
            <div class="card-body">
              <h4 class="text-center">Your Rewards</h4>
              <div class="my-6 text-center " style="height:200px; background-color: #dad6d6;">
                  <div v-if="!Rewards> 0 && userData">
                    <div class="container-fluid h-200 scrollable-container">
                      <Rewards :consumerId="userData.id"/>
                    </div>
                  </div>
                  <div v-else>
                    <h5 class="d-flex align-items-center justify-content-center text-muted" style="height: 100%;">No rewards available</h5>
                  </div>
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
import auth from '../../auth';
import FavouritedStalls from './FavouritedStalls.vue';
import Rewards from './Rewards.vue';

export default {

  components: {
    FavouritedStalls,
    Rewards
  },
  data() {
    return {
      userData: null
    };
  },
  computed: {
    progressBarStyle() {
      const percentage = this.userData.user_reward / 10; // Since the max is 1000, dividing by 10 gives the percentage.
      return { width: percentage + '%' };
    }
  },
  async created() {
    try{
        const userInfo = await this.fetchUserData();
        this.userData = userInfo;
    }
    catch(error){
      console.error('An error occurred:', error)
    }
  },
  methods: {
    async fetchUserData() {
        try {
          return await auth.getUser(); // Assuming this returns a Promise with the user data
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    },
  }    
};
</script>


<style>

h1 {
  text-align: center;
}

.scrollable-container {
height: 200px;
overflow: auto;
padding-top:1px;
padding-left: 12px;
padding-right: 12px;
scrollbar-width: thin; /* For Firefox */
-ms-overflow-style: none; /* For Internet Explorer and Edge */
}

.scrollable-container::-webkit-scrollbar {
width: 0rem; /* Set the width of the scrollbar (change as needed) */
}

.scrollable-container::-webkit-scrollbar-thumb {
background-color: #888; /* Set the color of the scrollbar thumb (change as needed) */
}

.scrollable-container::-webkit-scrollbar-track {
background-color: #f1f1f1; /* Set the color of the scrollbar track (change as needed) */
}

/* Hide the scrollbar track for webkit browsers */
.scrollable-container::-webkit-scrollbar-track {
display: none;
}

</style>