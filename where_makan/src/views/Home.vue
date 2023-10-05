<template>

    <div class="home">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <HelloWorld msg="You did it!" />
    </div>

    <div>
        <button>Nearby Me</button>
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

import GeoLocation from '@/components/GeoLocation.vue'
    export default {
    name: 'GeoLocation',
    components:{
        GeoLocation
    }
    }
</script>

  
