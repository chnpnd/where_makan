<template>
  <div class="home">
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
    <HelloWorld msg="You did it!" />
    <button onclick="launchQuestionnaire()">Reccommend Me What to Eat!</button>
  </div>
</template>

<script >
import HelloWorld from '@/components/HelloWorld.vue';
export default {
  name: 'Home',
  inheritAttrs: false,
  components: {
    HelloWorld
  }, methods: {
    async launchQuestionnaire() {
      try {
        router.push({ path: 'Questionnaire' })
      } catch (error) {

      }
    }
  }

}


</script>



<!-- DO NOT DELETE - KRYSTAL's PART -->
