
<template>
    <div class="map-container">
        <!-- The div element for the map -->
        <GMapMap
            :center="center"
            :zoom="7"
            map-type-id="terrain"
            class="google-map"
        >
            <GMapCluster>
                <GMapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center=m.position"
                />
            </GMapCluster>
        </GMapMap>
        <v-divider></v-divider>
        <h1 class="text-center">All hawker centres:</h1>
        <div class="card-container">
        <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
        <div class='container-fluid'>
            <div class='row justify-content-center'>
                    <v-card v-for="hawkerCenter in hawkerCenters" :key="hawkerCenter.id" max-width="300" max-height="400" style="margin:10px;">
                        <v-img :src="hawkerCenter.photo_url" cover max-height="100"></v-img>
                        <v-card-title>{{ hawkerCenter.name }}</v-card-title>
                        <v-card-text>{{ hawkerCenter.address }}</v-card-text>
                        <v-card-actions>
                            <!--    NEED HELP ON WHY IT NEEDS TO CLICK ON 2 CARDS BEFORE SWITCHING-->
                            <v-btn><router-link :to="{ name: 'center-details', params: { centerId: hawkerCenter.id } }">Click me</router-link></v-btn>
                        </v-card-actions>
                    </v-card>
                </div> <!-- col -->
            </div> <!-- row -->
        </div> <!-- container -->




    </div>
</template>


<style scoped>
.map-container {
    padding: 20px; /* Add some space around the map */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Adds a soft shadow around the map */
    border-radius: 8px; /* Optional: Rounded edges for a cleaner look */
}

.google-map {
    width: 100%;
    height: 500px; /* Adjust height as needed */
}

.card-container  {
    max-width: 1500px;
    margin: 30px auto;
    background-color: #D2B48C;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-family: 'Georgia', serif;
}

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


<script>
    export default {
        name: 'App',
        data() {
            return {
                center: {lat: 1.2796740690582409, lng: 103.84745013835952},
                markers: [
                    {
                        position: {
                            lat: 1.2796740690582409,
                            lng: 103.84745013835952,
                        },
                    }
                    , // Along list of clusters
                ],
            searchValue: '', // Stores the user's search input
            foods: [],
            foodStalls: [],
            hawkerCenters: [],
            result: {
            },
            }
        },
        created() {
        // Use the created lifecycle hook to fetch data when the component is created
        this.getAllData();
    },
    methods: {
        async getAllData() {
            try {
                const foodsRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/all/food`);
                const foodStallsRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/all/hawkerstore`);
                const hawkerCentersRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`);

                if (foodsRes.ok && foodStallsRes.ok && hawkerCentersRes.ok) {
                    this.foods = await foodsRes.json();
                    this.foodStalls = await foodStallsRes.json();
                    this.hawkerCenters = await hawkerCentersRes.json();
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        }
    },
    
    computed: {
        filteredResults() {
            if (!this.searchValue) {
                return {
                    foods: [],
                    foodStalls: [],
                    hawkerCenters: [],
                };
            }

            const filteredFoods = this.foods.filter(food =>
                food.name.toLowerCase().includes(this.searchValue.toLowerCase())
            );

            const filteredFoodStalls = this.foodStalls.filter(stall =>
                stall.name.toLowerCase().includes(this.searchValue.toLowerCase())
            );
            const filteredHawkerCenters = this.hawkerCenters.filter(center =>
                center.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                center.address.toLowerCase().includes(this.searchValue.toLowerCase())
            );
            return {
                foods: filteredFoods,
                foodStalls: filteredFoodStalls,
                hawkerCenters: filteredHawkerCenters
            };
        }
    },
  };
</script>




<!-- Log In trigger modal
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#LogInModal">
            Log In
        </button> -->
        <!-- Log In Modal -->
        <!-- <div class="modal fade" id="LogInModal" tabindex="-1" aria-labelledby="LogInModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fs-6 text-center" id="LogInModalLabel">Log in to your Where Makan account</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    &nbsp; -->

                    <!-- Log In By Google -->
                    <!-- <div class = "row">
                        <div class = "col"></div>
                        <div class="g-signin2 col-6" data-onsuccess="onSignIn">
                            Continue with Google
                        </div>
                        <div class = "col"></div>
                    </div> -->
                    
        
                    <!-- Log In Fields -->
                    <!-- <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <div class="col">
                                    <label for="email" class="fw-bold">Email address</label>
                                    <input id="email" class="form-control" type="email" placeholder="">
                                </div>

                                &nbsp;

                                <div class="col">
                                    <label for="pwd" class="fw-bold">Password</label>
                                    <input id="pwd" class="form-control" type="password" placeholder="">
                                </div>
                
                                <span>&nbsp;</span>
                                
                                <div class="col text-center">
                                    <button id = "log_in" type="button" class="btn btn-primary">LOG IN</button>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!-- Button to change to Sign Up Page -->
                    <!-- <div class = "row text-center">
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-target = "#SignUpModal" data-bs-toggle="modal" data-bs-dismiss="modal">Don't have a Where Makan account? Sign up here</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- Sign Up trigger modal -->
        <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#SignUpModal">
            SIGN UP
        </button> -->
        
        <!-- Sign Up Modal -->
        <!-- <div class="modal fade" id="SignUpModal" tabindex="-1" aria-labelledby="SignUpModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fs-6 text-center" id="SignUpModalLabel">Create your Where Makan account</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    &nbsp;
                -->
                    <!-- Sign Up With Google -->
                    <!-- <div class = "row">
                        <div class = "col"></div>
                        <div class="g-signin2 col-6" data-onsuccess="onSignIn">
                            Continue with Google
                        </div>
                        <div class = "col"></div>
                    </div> -->

                    <!-- Sign Up Fields -->
                    <!-- 
                    <div class="modal-body">
                        <div class = "row">
                            <div class="col">
                                <label for="f_name" class="fw-bold">First Name</label>
                                <input id="f_name" class="form-control" type="text" placeholder="">
                            </div>
                            <div class="col">
                                <label for="L_name" class="fw-bold">Last Name</label>
                                <input id="L_name" class="form-control" type="text" placeholder="">
                            </div>
                        </div>
                        
                        &nbsp;

                        <div class="col">
                            <label for="su_email" class="fw-bold">Email address</label>
                            <input id="su_email" class="form-control" type="email" placeholder="">
                        </div>

                        &nbsp;

                        <div class="col">
                            <label for="confirm_email" class="fw-bold">Confirm Email address</label>
                            <input id="confirm_email" class="form-control" type="email" placeholder="">
                        </div>

                        &nbsp;

                        <div class="col">
                            <label for="su_pwd" class="fw-bold">Password</label>
                            <input id="su_pwd" class="form-control" type="password" placeholder="">
                        </div>

                        &nbsp;

                        <div class="col">
                            <label for="cfm_pwd" class="fw-bold">Confirm Password</label>
                            <input id="cfm_pwd" class="form-control" type="password" placeholder="">
                        </div>

                        <span>&nbsp;</span>

                        <div class="col text-center">
                            <button id= "sign_up" type="button" class="btn btn-primary">SIGN UP</button>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-target = "#LogInModal" data-bs-toggle="modal" data-bs-dismiss="modal">Already have a Where Makan account? Log in here</button>
                    </div>
                </div>
            </div>
        </div> -->