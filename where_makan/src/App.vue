<template>
  <div class="bg-color">
    <div>
    <Navbar />
  </div>
  <div id="nav">
    <router-view :showModal="showModal" /> 
  </div>
  </div>

</template>

<script setup>
  import Modal from './views/Modal.vue'
  import { ref } from 'vue'
  const showModal = ref(false)
  import Navbar from '@/components/Navbar.vue';
  import 'bootstrap/dist/css/bootstrap.css';
 

</script>

<style scoped>
  #app{
    font-family: Avenir, Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav{
    padding: 30px;
  }

  #nav a{
    font-weight: bold;
    color: #2c3e50
  }

  
</style>
