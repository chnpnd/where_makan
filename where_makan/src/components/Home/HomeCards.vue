<template>
  <div>
    <div class="card-container">
      <div class="card border-0 shadow-3 my-3" v-for="(pick, index) in images" :key="index">
        <!-- <img class="card-img-top" :src="pick.image" alt="Card image cap"> -->
        <BCarousel controls>
                  <BCarouselSlide :img-src="pick.image"  class="card-img-top img-featured" />
                  <BCarouselSlide :img-src="pick.anotherImage" class="card-img-top img-featured" />
          </BCarousel> 
        <h4 class="card-title my-4">{{ pick.shopname }}
          <span>
            <Icon :icon="pick.heart ? 'mdi:heart-outline' : 'mdi:heart'" @click="toggleHeart(index)" :class="{ 'red-heart': !pick.heart }"/>
        </span>
      </h4>
        <div class="card-body ">
          <p class="me-1">Local Favorite
            <span>
              <Icon icon="bi:fire" style="color: orange;"/>
            </span>
          </p>
          <div class="me-1" v-if="pick.healthy">Voted by healthier choice</div>
          <p class="card-text opacity-100">{{ pick.description }}
            
          </p>
        </div>
      </div> 
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
        images: [
        { image: '../../../img/homecardimg/duckshop.jpg', anotherImage: '../../../img/homecardimg/duckfood.jpg', shopname: 'Jin Ji Teochew Braised Duck & Kway Chap 金记潮州卤鸭', description: 'Must try duck rice!', healthy: false, reviewRating: 4.5, heart : false,},
        { image: '../../../img/homecardimg/fishsoupshop.jpg',anotherImage: '../../../img/homecardimg/fishsoupfood.jpg',  shopname: 'Hong Sheng Fish Soup 鸿升鱼汤' , description: 'Must try fish soup',healthy: true, reviewRating: 4.8,heart : false,},
        { image: '../../../img/homecardimg/wantonshop.jpg', anotherImage: '../../../img/homecardimg/wantonfood.jpg', shopname: '杜佛路佳纪云吞面 Dover Road Kai Kee Wanton Noodles' , description: 'Must try wanton noodles! slurp to your heart\'s content',healthy: true, reviewRating: 4.7,heart : false,},
      ],
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

.card-container {
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping to the next row */
  overflow-x: auto; /* Enable horizontal scrolling if needed */
}

.card {
  max-width: 30rem;
  margin-right: 10px;
  border-radius: 0;
  text-align: center;
}


.red-heart {
  color: red; /* Add your desired red color here */
}

</style>
