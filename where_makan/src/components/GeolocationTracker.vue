<template>
    <div>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p v-else-if="location">{{ location }}</p>
      <button @click="getLocation">Get Location</button>
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
  /* Add your component-specific styles here */
  </style>
