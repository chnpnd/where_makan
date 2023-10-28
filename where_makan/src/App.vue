<template>
<<<<<<< HEAD
 <div class="bg-color">
    <div>
      <Navbar />
      <div>
        <GeolocationTracker />
      </div>
    </div>
  </div>
  <router-view/>
=======
  <div class="bg-color">
    <Navbar />
  <!-- <div id="nav">
    <router-view :showModal="showModal" /> 
  </div> -->

  <router-view/>  
</div>
 
>>>>>>> 74c29fe8739427965edcd043a998de04afe5214b
</template>

<script setup>

  import { ref } from 'vue'
  const showModal = ref(false)
  import Navbar from '@/components/Navbar.vue';
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