<template>
    <div>
        <div class='row d-flex flex-wrap justify-between'>
                  <v-card v-for="(item, idx) in featured" :key="item.shopname"
                class="mx-auto"
                max-width="430"
                >
                <v-img
                max-height="500">
                  <BCarousel controls indicators>
                          <BCarouselSlide :img-src="item.image"  class="card-img-top img-featured " />
                          <BCarouselSlide :img-src="item.anotherImage"  class="card-img-top img-featured " />
                  </BCarousel>
                </v-img>
                <v-card-title>
                 <div>{{ item.shopname }}<span class="float-right"> 
                    <v-card-actions>
                    <v-btn
                  class="custom-button"
                  :icon="item.heart ? 'mdi:heart-outline' : 'mdi:heart'" @click="toggleHeart(idx)"
                  >
                  <Icon :icon="item.heart ? 'mdi:heart-outline' : 'mdi:heart'" />
                  </v-btn>
                </v-card-actions>
                </span>
                </div>   
                </v-card-title>

                <v-card-subtitle>
                  {{ item.featuredtitle }}
                </v-card-subtitle>

                <v-card-actions>
                  <router-link to="/explore">
                  <v-btn
                    color="orange-lighten-1"
                    variant="text"
                  >
                    Explore
                  </v-btn>
                </router-link>
                
                  <v-spacer></v-spacer>

                  <v-btn
                  class="custom-button"
                  :icon="item.show ? 'bxs:down-arrow' : 'bx:down-arrow'" @click="toggleShow(idx)"
                  >
                  <Icon :icon="item.show ? 'bxs:down-arrow' : 'bx:down-arrow'" />
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text>
                      {{ item.description }}
                    </v-card-text>
                  </div>
                </v-expand-transition>

                
              </v-card>
      </div>       
  </div>
  </template>
  
  <script>
  import { Carousel, Slide } from "vue-carousel";
  import { Icon } from '@iconify/vue';
  // ask about rating
  export default{
    components: {
      Carousel,
      Slide,
      Icon,
    },
      data(){
        return{
          featured: [
            {image: '../../../img/homecardimg/prawn.jpg',anotherImage: '../../../img/homecardimg/prawnfood.jpg', shopname: 'Prawn & Mee', address: 'Pasar 216 Bedok Central', description: "Two young hawker running a prawn food business like never before!",featuredtitle: 'Homemade Prawn & Pork rib noodles run by young hawkers',healthy: true, show : false,heart : false, },
            {image: '../../../img/homecardimg/prawn.jpg',anotherImage: '../../../img/homecardimg/prawnfood.jpg', shopname: 'Prawn & Mee', address: 'Pasar 216 Bedok Central', description: "Two young hawker running a prawn food business like never before!",featuredtitle: 'Homemade Prawn & Pork rib noodles run by young hawkers',healthy: true, show : false,heart : false, },
          ],
          
          loading: false,
          selection: 1,
          rating: 4,
        }
      },
      methods: {
        reserve () {
          this.loading = true
  
          setTimeout(() => (this.loading = false), 2000)
        },
        toggleHeart(idx) {
            this.images[idx].heart = !this.images[idx].heart;
        },
      },
      
  
  }
  
  </script>
  <style scoped>
  .custom-button {
    background-color: transparent !important;
    box-shadow: none; /* Remove the shadow */
    border: none; /* Remove any borders */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margin */
  }
  
  .img-featured {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    object-fit: cover;
  }
  
  .shop-title {
    white-space: normal;
    max-width: 100%;
  }
  
  </style>