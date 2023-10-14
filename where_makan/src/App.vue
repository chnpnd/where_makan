<template>

  <div class="bg-color">
    <Navbar />
    <div>
      <GeolocationTracker />
    </div>
    <router-view/> 
  </div>
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
  .active {
    background-color: #42b983; /* Set the background color for the active link */
    color: #fff; /* Set the text color for the active link */
  }
  .navbar-logo-link {
    margin-left: 20px; /* Adjust the value as needed to control the space */
  }


  #nav a{
    font-weight: bold;
    color: #2c3e50
  }

  .navbar-logo {
    max-width: 60px; /* Set the width as needed */
    height: auto; /* Maintain the aspect ratio */
    margin-right: 10px; /* Add spacing if needed */
  }
</style>