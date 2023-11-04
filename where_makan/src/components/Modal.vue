<template>
  <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <!--Login Page-->
        <div class="modal-container" id = "loginAccount">
          <div class="modal-header">
            <h5 class="modal-title">{{ activeForm === 'login' ? 'Login' : 'Register' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form v-if="activeForm === 'login'" @submit.prevent="login">
                <div class="container"> 
                  <label for="emailLogin">Email address</label>
                  <input id="emailLogin" class="form-control" type="email" placeholder="" v-model="name"/>

                  <br>

                  <label for="pwdLogin">Password</label>
                  <input id="pwdLogin" class="form-control" type="password" placeholder="" v-model="password"/>

                  <br>

                  <button type="button" class="btn btn-success " >Login</button>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                      <div class="texxt-center">
                        <p>No Where Makan Account Yet?</p>
                        <button type="button" @click="switchForm('register')">Switch to Register</button>
                      </div>
                    </slot>
                </div>
              </form>
              <form v-else @submit.prevent="register">
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
                <div class="modal-footer">
                  <slot name="footer">
                    <div class="text-center">
                      <p>Already have a Where Makan account?</p>
                      <button type="button" @click="switchForm('login')">Switch to Login</button>
                    </div>
                  </slot>
                </div>
              </form> 
            </slot>
          </div>
        </div>    
      </div>

  </Transition>
</template>

<script>
export default {
  data() {
    return {
      activeForm: 'login',
    };
  },
  props: {
        show: {
            type: Boolean,
            required: true
        },
        stallId: Number,
        consumerId: Number,
    },
  methods: {
    switchForm(form) {
      this.activeForm = form;
    },
    login() {
      // Handle login logic
    },
    register() {
      // Handle registration logic
    },
    closeModal() {
        this.$emit('close');
    },
  },
};

</script>


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