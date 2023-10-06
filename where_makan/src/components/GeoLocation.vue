<template>
  <div>
    <h1>Your coordinates:</h1>
    <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0,
        }
    }
},
  //get users coordinates from browser request
  methods:{
    created() {
      this.$getLocation(options)
        .then(coordinates => {
          console.log(coordinates)
  }

    }
  }
}
    
</script>

<style scoped>
    input
    {
        padding: 5px;
        margin-bottom: 2px;
    }

    button
    {
        margin-top: 20px;
    }
</style>
