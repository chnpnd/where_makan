<template>

    <div class="home">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <HelloWorld msg="You did it!" />
    </div>
    
	<button @click="say('hello')">Say hello</button>
	<button @click="say('bye')">Say bye</button>
    
</template>

<script>
    function say(message) {
      alert(message)
    }
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Home',
    components:{
      HelloWorld
    }
  }
</script>

  
