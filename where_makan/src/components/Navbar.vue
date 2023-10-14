

<template>

<div>

  <div class="container-fluid pl-0 pr-0">
  <nav class="navbar navbar-expand-lg">
    <router-link to="/" class="navbar-logo-link">
    <img src="@/assets/where_makan_logo.png" alt="Logo" class="navbar-logo">
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarcoll" aria-controls="navbarcoll" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarcoll">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <button
            id="show-modal"
            class="nav-link"
            @click="showModal = true"
          >
            Login
        </button>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Restaurant'}" class="nav-link">Restaurants</router-link> 
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Explore'}" class="nav-link">Explore</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Analytics'}" class="nav-link">Analytics</router-link>
      </li>
    </ul>
    </div>
  </nav>
  </div>
  <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false">
          <template #header>
            <h3>custom header</h3>
          </template>
        </modal>
    </Teleport>
</div>

</template>

<style lang="scss" scoped>
  .navbar-nav .nav-item .nav-link:hover {
    color: #D40000; 
    background: none;
  }
  .navbar-nav .nav-item .nav-link {
    color: black; /* Set the text color to black */
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

<script setup>
  import { ref } from 'vue'
  const showModal = ref(false)
</script>