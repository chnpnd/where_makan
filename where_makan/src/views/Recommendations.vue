<template>

    <div class="recommendations">
        <button @click="created()">Food Near Me</button> 
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
