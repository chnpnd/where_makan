<template>
  <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
  <div class='container-fluid p-0'>
      <div class='row p-0'>
          <div class='col-xs-12 col-sm-12 p-0'>
            <div class="carousel-container p-0">
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

              <div class="carousel-caption d-flex flex-column justify-content-center align-items-center mb-10" >
                <h1 class="intro-text mt-0" ref="introText">Hawker Heaven</h1>
                <div class="action-buttons">
                  <router-link :to="{name: 'Explore'}" class="btn custom-button btn-outline-light text-light btn-sm mx-2">Explore Me!</router-link>
                    <button class="btn custom-button btn-outline-light text-light btn-sm mx-2n" @click="toggleQuestionnaire">Recommend Me!</button>
                    <Questionnaire :showModal="showQuestionnaire" @close="toggleQuestionnaire" />
                </div>
                <Searchbar class="searchbar"/>
              </div>

              
              <!-- Carousel Controls -->
              <div class="col-xs-12">
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
          </div>
          </div> <!-- col -->
      </div> <!-- row -->
  </div> <!-- container -->
  


  
</template>

<script>
  import animationJS from '@/components/Home/homeAnimation.js';
  import Searchbar from '@/components/Searchbar.vue';
  import Questionnaire from '@/components/Home/Questionnaire.vue'; // Moved to Home directory

  export default {
    mounted() {
      animationJS.scrollTrigger('.intro-text');
    },
    components:{
      Searchbar,
      Questionnaire,
    },
    data(){
      return{
        showQuestionnaire: false,
      }
      
    },
    methods:{
      toggleQuestionnaire() {
      this.showQuestionnaire = !this.showQuestionnaire;
    }
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
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
  }

  /* Make the Carousel full width */
  .carousel {
    width: 100%;
  }


  .carousel-inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .carousel-caption {
    position: sticky; 
    top: auto; 
    bottom: auto; 
    margin-bottom: 105px;
    padding-top:20%;
  }

  .carousel-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  /* .carousel-control-prev, .carousel-control-next {
    transition: 0.3s;
    width: 5%;
  } */

  /* .carousel-control-prev:hover, .carousel-control-next:hover {
    background-color: rgba(0, 0, 0, 0.1);
  } */

  h1.intro-text {
    padding: 0;
    font-family: var(--font-poppins);
    font-weight: 600;
    font-size: 128px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    color: white;
    @media (max-width: 768px), (max-width:992px), (max-width:1200px) {
      font-size: 30px;
    }
  }

  .btn.custom-button {
    font-family: var(--font-poppins);
    font-weight: 400;
    padding: 12px 20px;
    transition: var(--transition-standard);
    @media (max-width: 576px){
      width: 50%;
      font-size: 10px;
    }
  }

  .btn.custom-button:hover {
    transform: scale(1.05);
  }

  .action-section {
    margin: 20px 0; /* Provide space above and below the button */
    width: 100%;
    max-width: 500px; /* Adjust as necessary */
    display: flex;
    justify-content: center; /* Center the button */
}

@media (max-width: 576px) {
  h1.intro-text {
    font-size: 24px;
  }

  .carousel-container {
    height: 400px;
  }

  .carousel-inner {
    height: 100%;
  }

  .carousel-control-prev.carousel-control-next{
    height: 20%;
  }



}


</style>
