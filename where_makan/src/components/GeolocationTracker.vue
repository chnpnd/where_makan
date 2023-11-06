<template>
  <div class="container-fluid h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-12 text-center">
        <p v-if="errorMessage">{{ errorMessage }}</p>
         <!--NEW EDITS - the whole file-->
         <button class="btn btn-outline-dark text-dark" @click="getLocation"> Recommend Hawker Stalls Near Me </button>
       
        <div>
          <Carousel class="carousel hawker-card" :modelValue="currentSlide" :items-to-show="slickOptions.slidesToShow" :arrows="slickOptions.arrows">
          <Slide  v-for="hawkerCenter in filteredCenters" :key="hawkerCenter.id">
              <v-card class="hawker-card">
                  <router-link :to="{ name: 'center-details', params: { centerId: hawkerCenter.id } }" class="text-black text-decoration-none">
                      <v-img :src="hawkerCenter.photo_url" cover></v-img>
                      <v-card-title>{{ hawkerCenter.name }}</v-card-title>
                      <v-card-text>{{ hawkerCenter.address }}</v-card-text>
                  </router-link>
              </v-card>
          </Slide>
          </Carousel>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import HawkerCard from '@/components/Home/HawkerCentreCards.vue';

export default {
  components: {
      Carousel,
      Slide,
      HawkerCard
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
      console.log('getLocation method called');
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.filteredCenters = [];
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
    },
    async getAllData() {
          const fetchFromAPI = async (url) => {
              try {
                  const response = await fetch(url);
                  if (!response.ok) throw new Error("Failed to fetch data");
                  return await response.json();
              } catch (error) {
                  console.error("An error occurred while fetching data:", error);
              }
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
        }
    }
    

  },
  computed: {
        filteredResults() {
            const filterBySearchValue = (item) => item.name.toLowerCase().includes(this.searchValue.toLowerCase());
            
            return {
                hawkerCenters: this.hawkerCenters.filter(center => 
                    filterBySearchValue(center) || center.address.toLowerCase().includes(this.searchValue.toLowerCase())
                )
            };
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
@import './HawkerCards.css';
</style>
