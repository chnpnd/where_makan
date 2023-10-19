<template>

    <div class="recommendations">
        <p> This is the recommendation page </p>
        <button @click="created()">Food Near Me</button> 
    </div><h1></h1>

    <Geolocation />
 
</template>

<script>
  import GeoLocation from '@/components/GeoLocation.vue'

  export default {
    name: 'Recommendations',
    components:{
      GeoLocation
    }
  }
</script>
