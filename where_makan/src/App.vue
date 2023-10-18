<template>
  <div class="bg-color">
    <Navbar />
  <div id="nav">
    <router-view :showModal="showModal" /> 
  </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const showModal = ref(false)
  import Navbar from '@/components/Navbar.vue';
  import 'bootstrap/dist/css/bootstrap.css';
</script>

<style scoped>
 
</style>