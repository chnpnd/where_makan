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
            <slot name="body">
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
            </slot>
          </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button
              class="modal-default-button"
              @click="$emit('close')"
            >OK</button>
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