<template>
  <div>
        <div class="d-flex flex-wrap justify-between">
        <v-card
        v-for="(pick, index) in images" :key="index"
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
        >
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img>
          <BCarousel controls indicators>
                  <BCarouselSlide :img-src="pick.image"  class="card-img-top img-featured" />
                  <BCarouselSlide :img-src="pick.anotherImage" class="card-img-top img-featured" />
          </BCarousel>
        </v-img>

    <v-card-item>
      <v-card-title class="shop-title">{{ pick.shopname }}<span class="float-right">
        <v-btn
            class="custom-button"
            :icon="pick.heart ? 'mdi:heart-outline' : 'mdi:heart'" @click="toggleHeart(index, 'images')"
          >
            <Icon :icon="pick.heart ? 'mdi:heart-outline' : 'mdi:heart'" />
          </v-btn>
        </span>
      </v-card-title>

      <v-card-subtitle>
        <div class="me-1">Local Favorite<span><Icon icon="bi:fire" /></span></div>
        <div class="me-1" v-if="pick.healthy">Voted by healthier choice</div>

        <v-rating
          hover
          readonly
          :length="5"
          :size="32"
          :model-value="3"
          active-color="primary"
        />
      </v-card-subtitle>
    
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <!-- rating insert here -->
        <v-rating
        v-model="rating"
        class="ma-2"
        density="compact"
      ></v-rating>

        <!-- <div class="text-grey ms-4">
          {{ duck.reviewRating }}
        </div> -->
      </v-row>
      

      <div>{{ pick.description }}</div>
    </v-card-text>

    <!-- <v-divider class="mx-4 mb-1"></v-divider> -->

    <!-- <v-card-title>Tonight's availability</v-card-title>

    <div class="px-4">
      <v-chip-group v-model="selection">
        <v-chip>5:30PM</v-chip>
        <v-chip>7:30PM</v-chip>
        <v-chip>8:00PM</v-chip>
        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </div> -->

    <v-card-actions>
      <v-btn
        color="orange-lighten-1"
        variant="text"
        @click="reserve"
      >
        Book to Order Now
      </v-btn>
    </v-card-actions>
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