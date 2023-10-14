
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
                ]
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