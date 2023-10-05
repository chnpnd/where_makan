<template>

    <div class="recommendations">
        <button @click="create()">Food Near Me</button> 
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
