<template>
  <div class="bg-color">
    <div>
      <Navbar />
      <div>
        <GeolocationTracker />
      </div>
    </div>
<<<<<<< HEAD
=======

    <!-- Login button at the top right -->
    <button
      id="show-modal"
      @click="showModal = true"
      class="btn btn-primary ml-auto login-button"
    >
      Login
    </button>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :show="showModal" @close="showModal = false">
        <template #header>
          <h3>custom header</h3>
        </template>
      </modal>
  </Teleport>
  </nav>
  <div class="bg-color">
    <div>
      <Navbar />
      <div>
        <GeolocationTracker />
      </div>
    </div>
>>>>>>> parent of 2195c49 (reverse commit)
  </div>
  <router-view/>
</template>

<script setup>
  import 'bootstrap/dist/css/bootstrap.css';
</script>

<style scoped>
  /* Define a custom class for the "Login" button */
  .login-button {
    font-size: 16px; /* Adjust the font size as needed */
    max-width: 200px; /* Limit the maximum width of the button */
    position: absolute; /* Position the button absolutely */
    top: 30px; /* Adjust the top position as needed */
    right: 75px; /* Adjust the right position as needed */
  }
  #app{
    font-family: Avenir, Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>