<template>

    <div class="home">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <HelloWorld msg="You did it!" />
    </div>
    
    <button @click="counter++">Add 1</button>
    
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Home',
    components:{
      HelloWorld
    }
  }
</script>

  
