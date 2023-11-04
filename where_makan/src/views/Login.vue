<template>
    <div>
      <!-- Section: Design Block -->
      <section class="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5 mt-auto">
          <div class="row gx-lg-5 align-items-center mb-5">
            <div class="col-lg-6 mb-5 mb-lg-0 logintext" style="z-index: 10">
              <h1 class="my-5 display-5 fw-bold ls-tight text-black">
                Where Makan <br />
              </h1>
              <p class="mb-4 opacity-70 text-black" style="color: hsl(218, 81%, 85%)">
                On a budget? Dont worry!
                Where Makan is your to-go app to find out the where is the nearest hawker centre to makan!
              </p>
            </div>
  
            <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
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

            <img
              id="radius-shape-3"
              src="@/assets/hawkerFood.png"
              alt="Image 3"
              class="position-absolute animate-image"
            />


              <div class="card bg-glass my-10" style="height:80vh;">

                <!-- login footer -->
                <div class="login d-flex flex-column align-items-center">
                <img src="@/assets/where_makan_logo.png" alt="where_makan_logo" class="my-3"/>
                </div>


                <div class="card-header border-bottom-0 bg-transparent">
                  <ul class="nav nav-tabs justify-content-center pt-4" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active text-danger" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Customer</a>
                    </li>
  
                    <li class="nav-item">
                      <a class="nav-link text-danger" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Hawker Owner</a>
                    </li>
                  </ul>
                </div>

                
                <div class="card-body px-4 py-5 px-md-5">

                <div class="d-flex align-items-center justify-content-center pb-4">
                        <h4 class="mb-0 me-2">Don't have an account?</h4>
                        <span><button class="btn btn-outline-danger sign-up" @click="() => TogglePopup('buttonTrigger')">Create New</button></span>
                        <Popup v-if="popupTriggers.buttonTrigger">
                          <h2>testing</h2>
                        </Popup>
                </div>

                <div class="text-center">
                <div class="d-flex align-items-center">
                  <hr class="flex-grow-1">
                  <span class="text-muted mx-2">OR</span>
                  <hr class="flex-grow-1">
                </div>
              </div>


                    <!-- login options -->
                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                      <form>
                        <!-- 2 column grid layout with text inputs for the first and last names -->
  
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                          <input type="text" class="form-control" />
                          <label class="form-label" for="form3Example3">Username/Email address</label>
                        </div>
  
                        <!-- Password input -->
                        <div class="form-outline mb-4">
                          <input type="password" class="form-control" />
                          <label class="form-label" for="form3Example4">Password</label>
                        </div>

                        <!-- Login button -->
                        <button type="submit" class="btn btn-danger btn-block my-10">
                          Login
                        </button>
                      </form>

           
                    </div>
  
                    <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                        <form>
                        <!-- 2 column grid layout with text inputs for the first and last names -->
  
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                          <input type="email" class="form-control" />
                          <label class="form-label" for="form3Example3">Business Name/Email address</label>
                        </div>
  
                        <!-- Password input -->
                        <div class="form-outline mb-4">
                          <input type="password" class="form-control" />
                          <label class="form-label" for="form3Example4">Password</label>
                        </div>

                        <!-- Login button -->
                        <button type="submit" class="btn btn-danger btn-block mb-4 my-10">
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
import { ref } from 'vue';
import Popup from './../components/Login/SignUpModal.vue';

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
      setup(){
        const popupTriggers = ref({
          buttonTrigger: true,

        });

        const TogglePopup = (trigger) => {
          popupTriggers.value[trigger] = !popupTriggers.value
          [trigger]
        }

        return{
          Popup,
          popupTriggers,
          TogglePopup,
        }
      }

}
</script>

<style >
@import '@/components/Login/loginPage.css';

</style>
