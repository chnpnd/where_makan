<template>
  <div class="background-color: #f8f8f8;">
    <Navbar />
  <!-- <div id="nav">
    <router-view :showModal="showModal" /> 
  </div> -->

  <router-view/>  
</div>
 
</template>

<script setup>

  import { ref } from 'vue'
  const showModal = ref(false)
  import Navbar from '@/components/Navbar.vue';
  import 'bootstrap/dist/css/bootstrap.css';
</script>

<style scoped>

  /* Define a custom class for the "Login" button */
  #app{
    font-family: Avenir, Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>