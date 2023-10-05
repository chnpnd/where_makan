<template>

    <div class="home">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <HelloWorld msg="You did it!" />
    </div>

    <div>
        <h1>Your coordinates:</h1>
        <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>
    </div>
    
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Home',
    components:{
      HelloWorld
    }
  }

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
          this.$getLocation(options)
            .then(coordinates => {
              console.log(coordinates);
    });
          .catch(error => alert(error));

    }
  }
</script>

  
