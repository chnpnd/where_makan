<template>

  <div id="nav">
    <router-link to="/">Home</router-link> | 
    <router-link to="/about">About</router-link> | 
    <router-link to="/restaurant">Restaurants</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/analytics">Analytics</router-link>
    <router-view :showModal="showModal" />
  </div>

  <button id="show-modal" @click="showModal = true">Login</button>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
  </Teleport>
</template>

<script setup>
  import Modal from './views/Modal.vue'
  import { ref } from 'vue'
  const showModal = ref(false)
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

  #nav a.router-link-exact-active
  {
    color: #42b983;
  }
</style>
