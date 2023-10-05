<template>
  <router-view :showModal="showModal" />
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <!-- Navigation links at the top left -->
    <router-link to="/" class="navbar-logo-link">
      <img src="@/assets/where_makan_logo.png" alt="Logo" class="navbar-logo">
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="navbar-nav">
          <router-link class="nav-link" to="/" exact active-class="active">Home</router-link>
          <router-link class="nav-link" to="/about" exact active-class="active">About</router-link>
          <router-link class="nav-link" to="/restaurant" exact active-class="active">Restaurants</router-link>
          <router-link class="nav-link" to="/login" exact active-class="active">Login</router-link>
          <router-link class="nav-link" to="/analytics" exact active-class="active">Analytics</router-link>
          <router-link class="nav-link" to="/recommendations" exact active-class="active">Recommendations</router-link>
      </div>
    </div>

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
</template>

<script setup>
  import Modal from '@/components/Modal.vue'
  import { ref } from 'vue'
  const showModal = ref(false)
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
  .active {
    background-color: #42b983; /* Set the background color for the active link */
    color: #fff; /* Set the text color for the active link */
  }
  .navbar-logo-link {
    margin-left: 20px; /* Adjust the value as needed to control the space */
  }

  .navbar-logo {
    max-width: 60px; /* Set the width as needed */
    height: auto; /* Maintain the aspect ratio */
    margin-right: 10px; /* Add spacing if needed */
  }
</style>
