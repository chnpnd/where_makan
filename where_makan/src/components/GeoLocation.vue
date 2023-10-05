<template>
  <div>
    <h1>Your coordinates:</h1>
    <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
          return {
            coordinates: {
              lat: 0,
              lng: 0,
            }
        }
    },
    //get users coordinates from browser request
      created() {
          this.$getlocation({})
              .then(coordinates => {
                  this.coordinates = coordinates;
              });
    
      }
    }
    
</script>

