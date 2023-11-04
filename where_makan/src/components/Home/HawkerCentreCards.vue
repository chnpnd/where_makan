<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3a26719def2bf5ed8277362050b9862263fe05cf
<template>
    <div>
=======
    <template>
        <div>
>>>>>>> bd20821f5fca645148d214ebeb1cc067a148d797
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" style="width: calc(300px * 5 - 100px);">
            <div class="carousel-item" style="object-fit: cover;" v-for="(group, groupIndex) in groupedHawkerCenters" :key="groupIndex" :class="{ active: groupIndex === 0 }">
                <div class="row ml-6">
                    <button @click="filterStall" class="btn btn-custom">
                        Check Avg Price
                    </button>
                    <div class="card col-md-2 hawker-card p-0" v-for="hawkerCenter in group" :key="hawkerCenter.id">
                    <router-link :to="{ name: 'center-details', params: { centerId: hawkerCenter.id } }" class="text-black text-decoration-none" >
                        <div class="image-container">
                            <img :src="hawkerCenter.photo_url" class="d-block w-100 h-50 "  alt="hawker images" >
                        </div>
                    <div class="card-body">
                    <h5 class="card-title">{{ hawkerCenter.name }}</h5>
                    <p class="card-text">{{ hawkerCenter.address }}</p>
                    
                    <p>${{ filteredPrice[hawkerCenter.id]}}</p>
                    </div>
                </router-link>
                </div>
                
                </div>
            </div>
            </div>
            <div class="d-flex justify-content-between">
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
        </div>
        <div class="font-weight-light text-center more"><router-link :to="{name: 'Explore'}" class="nav-link"><h5>View More Hawkers</h5></router-link></div>


<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3a26719def2bf5ed8277362050b9862263fe05cf
    </div>
=======
        </div>
    </template>
  

>>>>>>> bd20821f5fca645148d214ebeb1cc067a148d797


<script>

// import { Carousel, Slide } from 'vue3-carousel';
// import 'vue-carousel3/dist/carousel.css';

export default {
    components: {
        // Carousel,
        // Slide
    },
    data() {
        return {

            searchValue: '',
            foods: [],
            foodStalls: [],
            hawkerCenters: [],
        };
    },
    created() {
        this.getAllData();
    },
    methods: {
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

            this.foods = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/all/food`);
            this.foodStalls = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/all/hawkerstore`);
            this.hawkerCenters = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`);
<<<<<<< HEAD
            this.filterStall;
        },

        filterStall() {
            for (let y = 0; y<this.hawkerCenters.length; y++){
                var center = this.hawkerCenters[y];
                var total_price = 0;
                var total_food = 0;
                var avg_price = 0;
                var num_of_$ = 0;
                var price_sign = "$";
                for (let i =0; i<this.foodStalls.length; i++){
                    var stall = this.foodStalls[i];

                    for (let x=0;x<this.foods.length; x++){
                        var food = this.foods[x];
                        if (food.hawker_stall_id === stall.id && center.id === stall.hawker_id){
                            total_food += 1;
                            total_price += food.price;}
                        }
                avg_price = total_price / total_food;
                this.filteredPrice[center.id] = Math.ceil(avg_price * 100) / 100;
                
    
=======
>>>>>>> bd20821f5fca645148d214ebeb1cc067a148d797
        }
    },
    computed: {
        filteredResults() {
            const filterBySearchValue = (item) => item.name.toLowerCase().includes(this.searchValue.toLowerCase());
            
            return {
                foods: this.foods.filter(filterBySearchValue),
                foodStalls: this.foodStalls.filter(filterBySearchValue),
                hawkerCenters: this.hawkerCenters.filter(center => 
                    filterBySearchValue(center) || center.address.toLowerCase().includes(this.searchValue.toLowerCase())
                )
            };
        },
    groupedHawkerCenters() {
      const groupSize = 5; // Number of cards to display in each group
      const grouped = [];
      for (let i = 0; i < this.hawkerCenters.length; i += groupSize) {
        grouped.push(this.hawkerCenters.slice(i, i + groupSize));
      }
      return grouped;
    },
    },
};
</script>

<style scoped>
@import './HawkerCards.css';

.carousel-control-prev,
  .carousel-control-next {
    top: 50%; 
    width: 30px; 
    height: 30px; 
    border-radius: 50%; 
    color: #000; 
  }

  .more:hover{
  text-decoration: underline;
  text-decoration-color: #8a6d5b;
  color: red;
}


</style>

