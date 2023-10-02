<template>
  <router-view :showModal="showModal" />
  <div id="nav">
    <router-link to="/">Home</router-link> | 
    <router-link to="/about">About</router-link> | 
    <router-link to="/restaurant">Restaurants</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/analytics">Analytics</router-link>
  </div>

  <button id="show-modal" @click="showModal = true" class="login-button">Login</button>

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
  import Modal from '@/components/Modal.vue'
  import { ref } from 'vue'
  const showModal = ref(false)
</script>

<style scoped>
  /* Define a custom class for the "Login" button */
  .login-button {
    font-size: 16px; /* Adjust the font size as needed */
    padding: 10px 20px; /* Adjust the padding as needed */
    max-width: 200px; /* Limit the maximum width of the button */
    width: 100%; /* Make sure the button takes the full available width */
    box-sizing: border-box; /* Include padding in width calculation */
  }
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
