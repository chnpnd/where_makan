

<template>

<div>

  <div class="container-fluid pl-0 pr-0">
  <nav class="navbar navbar-expand-lg">
  <router-link :to="{name: 'Home'}" class="navbar-brand">
    <img src="@/assets/where_makan_logo.png" alt="Logo" class="navbar-logo" width="30" height="40">
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarcoll" aria-controls="navbarcoll" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarcoll">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <router-link :to="{name: 'Login'}" class="nav-link">Login</router-link>
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
</style>