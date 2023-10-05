<template>
  <div>
    <h1 class="homeH1 text-center">RECENTLY FEATURED!</h1>
    <v-divider></v-divider>
    <div class='container-fluid'>
           <div class='row justify-content-center'>
               <div class='col-6'>
                <div class="card mb-3" v-for="item in featured" :key="item.shopname">
                    <div class="row no-gutters justify-content-center py-2">
                        <h5 class="card-title card-quote font-weight-bold text-center">{{ item.featuredtitle }}</h5>
                        <BCarousel controls indicators>
                          <BCarouselSlide :img-src="item.image"  class="card-img-top img-featured" />
                          <BCarouselSlide :img-src="item.anotherImage"  class="card-img-top img-featured" />
                        </BCarousel>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title font-weight-bold">{{ item.shopname }}</h5>
                      <p class="card-text">{{ item.address }}</p>
                      <!-- check w nelson n zhi jian if they have logos for the review stars -->
                      <p class="card-text"><small class="text-muted">Voted Healthier Choice</small></p>
                    </div>
                  </div>
              </div>
        </div>
      </div>
      <v-divider></v-divider>
      <h1 class="homeH1 text-center">TOP PICKS</h1>
      <v-divider></v-divider>
    <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
      <div class='container justify-content-center'>
        <div class='row justify-content-between'>
            <div class='col-md-4 d-flex' v-for="(duck, index) in images" :key="index">
              <div class="card mb-3 border-3 flex-fill">
                <BCarousel controls indicators>
                  <BCarouselSlide :img-src="duck.image"  class="card-img-top img-featured" />
                  <BCarouselSlide :img-src="duck.anotherImage" class="card-img-top img-featured" />
                </BCarousel>
                <div class="card-body d-flex flex-column justify-content-between">
                  <h5 class="card-title">{{ duck.shopname }}</h5>
                  <p class="card-text">{{ duck.description }}</p>
                  <router-link to="/Explore" class="btn btn-outline-dark ">Interested to find out more?</router-link>
                </div>
                
              </div> 
            </div> 
          </div>
        </div>

        
</div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default{
  components: {
    Carousel,
    Slide,
  },
    data(){
      return{
        images: [
        { image: '../../../img/homecardimg/duckshop.jpg', anotherImage: '../../../img/homecardimg/duckfood.jpg', shopname: 'Jin Ji Teochew Braised Duck & Kway Chap 金记潮州卤鸭', description: 'Must try duck rice!' },
        { image: '../../../img/homecardimg/fishsoupshop.jpg',anotherImage: '../../../img/homecardimg/fishsoupfood.jpg',  shopname: 'Hong Sheng Fish Soup 鸿升鱼汤' , description: 'Must try fish soup'},
        { image: '../../../img/homecardimg/wantonshop.jpg', anotherImage: '../../../img/homecardimg/wantonfood.jpg', shopname: '杜佛路佳纪云吞面 Dover Road Kai Kee Wanton Noodles' , description: 'Must try wanton noodles! slurp to your heart\'s content'},
      ],
        featured: [
          {image: '../../../img/homecardimg/prawn.jpg',anotherImage: '../../../img/homecardimg/prawnfood.jpg', shopname: 'Prawn & Mee', address: 'Pasar 216 Bedok Central', featuredtitle: 'Homemade Prawn & Pork rib noodles run by young hawkers', },
        ]
      }
    }
}

</script>
<style scoped>
.img-featured{
    width:100%; 
    height:100%; 
    border-radius: 30px;
    object-fit: cover;
}
</style>