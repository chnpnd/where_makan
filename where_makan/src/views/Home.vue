<template>

    <div class="home">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <HelloWorld msg="You did it!" />
    </div>

    <button onclick="getLocation()">Try It</button>
    <p id="demo"></p>
    
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Home',
    components:{
      HelloWorld
    }
  }
    const x = document.getElementById("demo");
    
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    
    function showPosition(position) {
      x.innerHTML = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;
    }
</script>
