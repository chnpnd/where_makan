<script setup>
import router from '../../routers';

</script>

<template>

  <div>
    <header>
    <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
    <div class='container-fluid '>
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
                    <h1>
                      Hawker Heaven: Food Worth Stopping For
                    </h1>
                    <!-- INPUT THE NAVBAR HERE -->
                    <div class="">
                        <router-link to="/map" class="btn custom-button btn-outline-light text-light btn-sm btn-min-block mx-2">Explore Me!</router-link> 
                        <!-- DO I INPUT MAP PAGE? -->
                        <router-link to="/Explore" class="btn custom-button btn-outline-light text-light btn-sm btn-min-block mx-2" href="">Surprise Me!</router-link>
                    </div>
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

