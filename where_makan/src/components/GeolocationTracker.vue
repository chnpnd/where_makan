<template>
    <div class="container-fluid h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-12 text-center">
          <p v-if="errorMessage">{{ errorMessage }}</p>
          <p v-else-if="location">{{ location }}</p>
          <button @click="getLocation" class="btn btn-custom"> <!-- Use a custom class -->
            Recommend Hawker Stalls Near Me
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        errorMessage: null,
        location: null,
      };
    },
    methods: {
      getLocation() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              this.location = `Latitude: ${latitude}, Longitude: ${longitude}`;
            },
            (error) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  this.errorMessage = "User denied the request for geolocation.";
                  break;
                case error.POSITION_UNAVAILABLE:
                  this.errorMessage = "Location information is unavailable.";
                  break;
                case error.TIMEOUT:
                  this.errorMessage = "The request to get user location timed out.";
                  break;
                case error.UNKNOWN_ERROR:
                  this.errorMessage = "An unknown error occurred.";
                  break;
                default:
                  this.errorMessage = "An error occurred while getting location.";
              }
            }
          );
        } else {
          this.errorMessage = "Geolocation is not supported by this browser.";
        }
      },
    },
  };
  </script>
  


  <style scoped>
  .container-fluid {
    height: 100vh;
    background-color: #f8f9fa;
  }

  .btn-custom {
    font-size: 20px;
    padding: 10px 20px; /* Adjust padding as needed */
    border-radius: 5px; /* Rounded corners */
    background-color: #3498db; /* Custom background color */
    color: #fff; /* Text color */
    border: none; /* Remove border */
    transition: background-color 0.3s; /* Smooth transition */
  }

  .btn-custom:hover {
    background-color: #2980b9; /* Change color on hover */
  }
