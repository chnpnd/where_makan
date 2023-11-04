<script setup>
const props = defineProps({
  show: Boolean
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
        <!--Login Page-->

        <div class="modal-container" id = "loginAccount">
          <div class="modal-header">
            <slot name="header">Enter your email and password</slot>
            <h3 class="text-center">Log in to your Where Makan account</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          
          </div>

          <div class="modal-body">
            <!-- <slot name="body">
              <form> 
                <div class="container"> 
                  <label for="emailLogin">Email address</label>
                  <input id="emailLogin" class="form-control" type="email" placeholder="" v-model="name"/>

                  <br>

                  <label for="pwdLogin">Password</label>
                  <input id="pwdLogin" class="form-control" type="password" placeholder="" v-model="password"/>

                  <br>

                  <button type="button" class="btn btn-success " >Login</button>
                </div>
              </form> 
            </slot> -->
            <section class="h-100 gradient-form" style="background-color: #eee;">
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-10">
                  <div class="card rounded-3 text-black">
                    <div class="row g-0">
                      <div class="col-lg-6">
                        <div class="card-body p-md-5 mx-md-4">

                          <div class="text-center">
                            <img src="@/assets/where_makan_logo.png"
                              style="width: 185px;" alt="logo">
                            <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                          </div>

                          <form>
                            <p>Please login to your account</p>

                            <div class="form-outline mb-4">
                              <input type="email" id="form2Example11" class="form-control"
                                placeholder="Phone number or email address" />
                              <label class="form-label" for="form2Example11">Username</label>
                            </div>

                            <div class="form-outline mb-4">
                              <input type="password" id="form2Example22" class="form-control" />
                              <label class="form-label" for="form2Example22">Password</label>
                            </div>

                            <div class="text-center pt-1 mb-5 pb-1">
                              <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Log
                                in</button>
                              <a class="text-muted" href="#!">Forgot password?</a>
                            </div>

                            <div class="d-flex align-items-center justify-content-center pb-4">
                              <p class="mb-0 me-2">Don't have an account?</p>
                              <button type="button" class="btn btn-outline-danger">Create new</button>
                            </div>

                          </form>

                        </div>
                      </div>
                      <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                        <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                          <h4 class="mb-4">We are more than just a company</h4>
                          <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="texxt-center">
                <p>No Where Makan Account Yet?</p>
                <button type="button" data-bs-target = "#registerAccount" data-bs-toggle="modal" data-bs-dismiss="modal" class="btn btn-outline-primary">
                  Click here to Register
                </button>
              </div>
            </slot>
          </div>
        </div>

        <!--Register Page-->

        <div class="modal-container" id = "registerAccount">
          <div class="modal-header">
            <slot name="header">Sign Up for your Where Makan Account</slot>
            <h3 class="text-center">Sign Up for your Where Makan Account</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          
          </div>

          <div class="modal-body">
            <slot name="body">
              <form> 
                <div class="container"> 
                  <label for="f_name">First Name</label>
                  <input id="f_name" class="form-control" type="text" placeholder="">

                  <label for="L_name">Last Name</label>
                  <input id="L_name" class="form-control" type="text" placeholder="">
          
                  <label for="su_email">Email address</label>
                  <input id="su_email" class="form-control" type="email" placeholder="">

                  <label for="confirm_email">Confirm Email address</label>
                  <input id="confirm_email" class="form-control" type="email" placeholder="">

                  <label for="su_pwd">Password</label>
                  <input id="su_pwd" class="form-control" type="password" placeholder="">

                  <label for="cfm_pwd">Confirm Password</label>
                  <input id="cfm_pwd" class="form-control" type="password" placeholder="">

                  <button type="button" class="btn btn-success " >Sign Up</button>

                  <br>

                  </div>
   
              </form> 
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="text-center">
                <p>Already have a Where Makan account?</p>
                <button type="button" data-bs-target = "#loginAccount" data-bs-toggle="modal" data-bs-dismiss="modal" class="btn btn-outline-primary">
                  Click here to Login
                </button>
              </div>
            </slot>
          </div>
        </div>
      </div>
  </Transition>
 
</template>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>