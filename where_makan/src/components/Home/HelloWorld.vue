<template>
  <div>
    <header class="container">
      <div class='container-fluid'>
        <div class='row'>
          <div class='col-md-12'>
            <div id="carouselExampleCaptions" class="carousel slide carousel-container">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item image-overlay active">
                  <img src="../../../img/homebkgimg/hawker1.webp" class="d-block w-100 carousel-img overlay-dark" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </div>
                <div class="carousel-item image-overlay">
                  <img src="../../../img/homebkgimg/hawker2.webp" class="d-block w-100 carousel-img overlay-dark" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </div>
                <div class="carousel-item image-overlay">
                  <img src="../../../img/homebkgimg/hawker3.jpg" class="d-block w-100 carousel-img overlay-dark" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                </div>
                </div>
              </div>
              <div class="carousel-caption static-text text-center ">
                <div class="row">
                  <div class="col-md-12 mx-auto"> <!--ADJUST RESPONSIVENESS FOR THIS-->
                    <h1 class="intro-text mt-3 " ref="introText">Hawker Heaven</h1>
                    <!-- INPUT THE NAVBAR HERE -->
                    <div class="">
                        <router-link :to="{name: 'Home'}" class="btn custom-button btn-outline-light text-light btn-sm btn-min-block mx-2 my-4">Explore Me!</router-link> 
                        <!-- DO I INPUT MAP PAGE? -->
                        <router-link :to="{name: 'Home'}" class="btn custom-button btn-outline-light text-light btn-sm btn-min-block mx-2">Surprise Me!</router-link>
                    </div>
                    <Searchbar/>
                </div>
            </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            </div>
          </div> <!--col-->
        </div> <!-- row -->
      </div> <!-- container -->
    </header>
  </div>
</template>

<script>

  import animationJS from '@/components/Home/homeAnimation.js';
  import Searchbar from '@/components/Searchbar.vue';

export default {
  mounted() {
    // Use functions from the imported external JavaScript file
    animationJS.scrollTrigger('.intro-text');
  },
  methods: {
    // custom methods, if any
  },
  components:{
    Searchbar
  }

  
};
</script>

<style scoped>
  @import '@/components/Home/home.css';

  .carousel-container {
  height: 100vh; /* Set the carousel container's height to 100% of the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>

