<template>
    <div>
      <!-- Section: Design Block -->
      <section class="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5 mt-auto">
          <div class="row gx-lg-5 align-items-center mb-5">
            <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
              <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
                Where Makan <br />
              </h1>
              <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
              </p>
            </div>
  
            <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
              <!-- <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div> -->
<!-- 
              <img id="radius-shape-1" src="@/assets/rojak.png" alt="Image 1" class="position-absolute rounded-circle shadow-5-strong">
            <img id="radius-shape-2" src="@/assets/chendol.png" alt="Image 2" class="position-absolute shadow-5-strong"> -->

            <img
              id="radius-shape-1"
              src="@/assets/rojak.png"
              alt="Image 1"
              class="position-absolute  animate-image"
            />
            <img
              id="radius-shape-2"
              src="@/assets/chendol.png"
              alt="Image 2"
              class="position-absolute  animate-image"
            />


              <div class="card bg-glass">

                <!-- login footer -->
                <div class="login d-flex flex-column align-items-center"> <!-- Add a flex container -->
                <img src="@/assets/where_makan_logo.png" alt="where_makan_logo" class="my-3"/>
                <h2 class="text-center">Log in to Where Makan</h2>
                </div>


                <div class="card-header border-bottom-0 bg-transparent">
                  <ul class="nav nav-tabs justify-content-center pt-4" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active text-primary" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Customer</a>
                    </li>
  
                    <li class="nav-item">
                      <a class="nav-link text-primary" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Hawker Owner</a>
                    </li>
                  </ul>
                </div>

                
                <div class="card-body px-4 py-5 px-md-5">

                      <!-- <div class="options"> -->
                <div class="d-grid gap-2 col-10 mx-auto my-3">
                    <button class="btn google button" type="button">Google</button>
                    <button class="btn facebook button" type="button">Facebook</button>
                    <button class="btn twitter button" type="button">Twitter</button>
                </div>

                    <h3 class="text-center">OR</h3>


                    <!-- login options -->
                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                      <form>
                        <!-- 2 column grid layout with text inputs for the first and last names -->
                        <div class="form-outline mb-4">
                          <input type="email" class="form-control" />
                          <label class="form-label" for="form3Example3">Username</label>
                        </div>
  
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                          <input type="email" class="form-control" />
                          <label class="form-label" for="form3Example3">Email address</label>
                        </div>
  
                        <!-- Password input -->
                        <div class="form-outline mb-4">
                          <input type="password" class="form-control" />
                          <label class="form-label" for="form3Example4">Password</label>
                        </div>

                        <!-- Login button -->
                        <button type="submit" class="btn btn-primary btn-block mb-4">
                          Login
                        </button>
                      </form>
                    </div>
  
                    <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                        <form>
                        <!-- 2 column grid layout with text inputs for the first and last names -->
                        <div class="form-outline mb-4">
                          <input type="email" class="form-control" />
                          <label class="form-label" for="form3Example3">Business Name</label>
                        </div>
  
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                          <input type="email" class="form-control" />
                          <label class="form-label" for="form3Example3">Email address</label>
                        </div>
  
                        <!-- Password input -->
                        <div class="form-outline mb-4">
                          <input type="password" class="form-control" />
                          <label class="form-label" for="form3Example4">Password</label>
                        </div>

                        <!-- Login button -->
                        <button type="submit" class="btn btn-primary btn-block mb-4">
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Section: Design Block -->
    </div>
  </template>
  

<script>
import { ref } from 'vue'

export default {
    // data(){
    //     username = '',
    //     password = ''
    // },
    // methods:{
    //     submitForm()
    //     {
    //         console.log(`Form submitted! Username is ${this.username}`)
    //         console.log(`Form submitted! Password is ${pthis.password}`)
    //     }
    // }
}
</script>

<style lang="scss" scoped>


  .button {
  color: #fff;
  padding: 10px;
  font-weight: 600;
  user-select: none;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-size: 3rem; 
  background-position: 1rem center; 
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google{
    background-color: rgb(230, 103, 103) ;
    background-image: url('../assets/google.webp');
}

.google:hover {
  background-color: rgb(172, 14, 14); /* Add a hover effect if desired */
}

.facebook{
    background-color: #2974ec;
    background-image: url('../assets/facebook.svg');
}

.facebook:hover{
    background-color: #0845a7;
}

.twitter{
    color: black;
    background-color: white;
    background-image: url('../assets/twitter.svg');
}

.twitter:hover{
    background-color: rgb(71, 72, 76);
}

.background-radial-gradient {
    height: 100vh;
    background-color: hsl(33, 100%, 24%);
    background-image: radial-gradient(650px circle at 0% 0%,
        hsl(36, 48%, 64%) 15%, /* Adjust hue to 36 for a warm vintage look */
        hsl(36, 58%, 58%) 35%,
        hsl(36, 50%, 45%) 75%,
        hsl(35, 99%, 27%) 80%,
        transparent 100%),
    radial-gradient(1250px circle at 100% 100%,
        hsl(36, 48%, 64%) 15%, /* Adjust hue to 36 for a warm vintage look */
        hsl(36, 58%, 58%) 35%,
        hsl(36, 50%, 45%) 75%,
        hsl(35, 99%, 27%) 80%,
        transparent 100%);
}

#radius-shape-1, #radius-shape-2 {
  width: 400px;
  height: 400px;
  border-radius: 50%; /* If you want a circular shape */
  /* Add any other styling you need for your images */
}

#radius-shape-1 {
    top: -60px;
    left: -300px;
    overflow: hidden;
}

#radius-shape-2 {
    border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
    bottom: -60px;
    right: -200px;
    overflow: hidden;
}

.bg-glass {
    background-color: hsla(0, 0%, 100%, 0.9) !important;
    backdrop-filter: saturate(200%) blur(25px);
}

@keyframes radiusAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

#radius-shape-1, #radius-shape-2 {
  animation: radiusAnimation 4s ease infinite;
}


</style>
