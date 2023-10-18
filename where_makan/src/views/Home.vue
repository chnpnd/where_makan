<template>
  <div>
    <!-- <full-page :options="options"> -->
      <div class="section ">
        <Header />
      </div>
      <v-divider></v-divider>
      <div>
        <recommendedFoodCards />
      </div>
      <v-divider></v-divider>
      <div>
        <TopPickcards />
      </div>
    <!-- </full-page> -->
  </div>
</template>

<script>
  import Header from '@/components/Home/HelloWorld.vue';
  import Map from '@/GoogleMap.vue';
  import TopPickcards from '@/components/Home/HomeCards.vue';
  import recommendedFoodCards from '@/components/Home/recommendedCards.vue';
  import FullPage from 'vue-fullpage.js'

  export default {
    name: 'Home',
    components:{
      Header,
      Map,
      TopPickcards,
      recommendedFoodCards,
      FullPage,

    },
    data(){
    return{
      options: {
        paddingTop: '30px',
      }
    }
  },
  destroyed() {
      $.fn.fullpage.destroy('all');
  }
  }

</script>
<style>
/* .section1{
  background: gray;
}
.section2{
  background: yellow;
}
.section3{
  background: green;
} */
.section{
    width: 100vw;
    height: 100vh;
}
</style>
