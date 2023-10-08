<template>
  <div>
    <div>
      <Header />
    </div>
    <v-divider></v-divider>
    <h1 class="homeH1 text-center">Food Nearby You:</h1>
    <v-divider></v-divider>
    <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
    <div id="map">
      <Map />
    </div>
    <v-divider></v-divider>
    <Homecards />
  </div>
</template>

<script>
  import Header from '@/components/Home/HelloWorld.vue';
  import Map from '@/GoogleMap.vue';
  import Homecards from '@/components/Home/Homecards.vue';
  export default {
    name: 'Home',
    components:{
      Header,
      Map,
      Homecards,

    }
  }

</script>
<style>





</style>
