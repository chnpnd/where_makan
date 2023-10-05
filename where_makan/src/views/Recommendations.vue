<template>

    <div class="recommendations">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <HelloWorld msg="You did it!" />
    </div>
 
</template>

<script>
  import GeoLocation from '@/components/GeoLocation.vue'

  export default {
    name: 'GeoLocation',
    components:{
      GeoLocation
    }
  }
</script>
