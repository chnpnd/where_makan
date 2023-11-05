<template>
  <div>
    <header class="carousel-container">
      <div id="carouselExampleCaptions" class="carousel slide h-100">
        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        
        <!-- Carousel Items -->
        <div class="carousel-inner">
          <div class="carousel-item image-overlay active">
            <img src="../../../img/homebkgimg/hawker1.webp" class="d-block w-100 carousel-img overlay-dark" alt="...">
          </div>
          <div class="carousel-item image-overlay">
            <img src="../../../img/homebkgimg/hawker2.webp" class="d-block w-100 carousel-img overlay-dark" alt="...">
          </div>
          <div class="carousel-item image-overlay">
            <img src="../../../img/homebkgimg/hawker3.jpg" class="d-block w-100 carousel-img overlay-dark" alt="...">
          </div>
        </div>
        
        <!-- Title and Actions -->
        <div class="carousel-caption d-flex flex-column justify-content-center align-items-center">
          <h1 class="intro-text my-3" ref="introText">Hawker Heaven</h1>
          <div class="action-buttons mb-3">
            <router-link :to="{name: 'Home'}" class="btn custom-button btn-outline-light text-light btn-sm mx-2">Surprise Me!</router-link>
          </div>
          <Searchbar />
        </div>
        
        <!-- Carousel Controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </header>
  </div>
</template>

<script>
  import animationJS from '@/components/Home/homeAnimation.js';
  import Searchbar from '@/components/Searchbar.vue';

  export default {
    mounted() {
      animationJS.scrollTrigger('.intro-text');
    },
    components:{
      Searchbar
    }
  };
</script>

<style scoped>
  @import 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap';

  :root {
    --font-poppins: 'Poppins', sans-serif;
    --transition-standard: 0.3s;
  }

  ::before{
    left:0;
  }

  .carousel-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .carousel-inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .carousel-caption {

    position: sticky; 
    top: auto; 
    bottom: auto; 
    padding-top:20%;
  }

  .carousel-img {
    object-fit: cover;
    height: 45%;
  }

  .carousel-control-prev, .carousel-control-next {
    transition: 0.3s;
    width: 5%;
  }

  .carousel-control-prev:hover, .carousel-control-next:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  h1.intro-text {
    font-family: var(--font-poppins);
    font-weight: 600;
    font-size: 128px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    color: white;
  }

  .btn.custom-button {
    font-family: var(--font-poppins);
    font-weight: 400;
    padding: 12px 20px;
    transition: var(--transition-standard);
  }

  .btn.custom-button:hover {
    transform: scale(1.05);
  }
</style>
