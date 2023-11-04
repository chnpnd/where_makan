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
<<<<<<< HEAD
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  components: {
      Carousel,
      Slide
  },
  data() {
    return {
          currentSlide: 0,  // Track the current slide index
          slickOptions: 
          {
              slidesToShow: 4,
              arrows: true
          },
      errorMessage: null,
      longitude: null,
      latitude: null, 
      hawkerCenters: [],
      filteredCenters: [],
    };
  },
  created() {
      this.getAllData();
  },
  methods: {
    getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.filteredDistance();
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
=======
  </template>
  
  <script>
  export default {
    data() {
      return {
        errorMessage: null,
        location: null,
      };
>>>>>>> bd20821f5fca645148d214ebeb1cc067a148d797
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
<<<<<<< HEAD
          };

          this.hawkerCenters = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`);
      },

    filteredDistance() {
        for (let i =0; i<this.hawkerCenters.length; i++){
          var center = this.hawkerCenters[i];
          var lat1 = center.lat * Math.PI / 180;
          var long1 = center.long * Math.PI / 180;
          var lat2 = this.latitude * Math.PI / 180;
          var long2 = this.longitude * Math.PI / 180;

          //calculate with Haversine formula
          let dlong = long2 - long1;
          let dlat = lat2 - lat1;
          let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong / 2),2);
          let c = 2 * Math.asin(Math.sqrt(a));
          // radius of earth in kilometers

          let r = 6371

          let result = (c * r);

          if (result <= 3){
            this.filteredCenters.push(this.hawkerCenters[i])
          }
=======
            }
          );
        } else {
          this.errorMessage = "Geolocation is not supported by this browser.";
>>>>>>> bd20821f5fca645148d214ebeb1cc067a148d797
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
</style>
