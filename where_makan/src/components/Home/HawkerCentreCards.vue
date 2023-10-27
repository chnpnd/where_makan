<template>
    <div class="card-container">
        <Carousel class="carousel" :modelValue="currentSlide" :items-to-show="slickOptions.slidesToShow" :arrows="slickOptions.arrows">
            <Slide v-for="hawkerCenter in hawkerCenters" :key="hawkerCenter.id">
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
</template>



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
            currentSlide: 0,  // Track the current slide index
            slickOptions: 
            {
                slidesToShow: 4,
                arrows: true
            },
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
        }
    },
};
</script>

<style scoped>
.card-container {
    width: 100%;
    padding: 2rem 0; /* Add padding to top and bottom of container */
    display: flex;
    justify-content: center;
}

.carousel {
    display: flex;
    overflow: hidden;
    width: 80%; /* Set max-width for better alignment and spacing */
    margin: 0 auto; 
}

.hawker-card {
    width: 280px; 
    height: 380px;
    margin: 1rem auto;
    border-radius: 12px; /* Rounded corners for card */
    overflow: hidden; /* Ensures the image and any overflowing content is clipped */
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1); /* Default shadow for cards */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smoother transition */
}

.hawker-card:hover {
    transform: translateY(-10px); /* More pronounced hover effect */
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15); /* Darker shadow on hover */
}

/* Image styling */
.v-img {
    transition: transform 0.3s ease; /* Smooth transition for image hover effect */
}

.v-img:hover {
    transform: scale(1.05); /* Slightly enlarge the image on hover */
}

/* Button styling */
v-btn {
    background-color: #f44336; /* Button color */
    color: #fff; /* Text color */
    transition: background-color 0.3s ease; /* Smooth transition for button hover effect */
    border-radius: 8px; /* Rounded corners for the button */
}

v-btn:hover {
    background-color: #d32f2f; /* Darken the button color on hover */
}

/* Title styling */
.v-card-title {
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 0.5rem; /* Add some space to the top */
}

/* Text styling */
.v-card-text {
    color: #555; /* Make the text a bit darker for better readability */
    margin-bottom: 1rem; /* Add some space to the bottom */
}
</style>

