<template>

    <div class="home">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <HelloWorld msg="You did it!" />
    </div>

</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue';
  export default {
    name: 'Home',
    components:{
      HelloWorld,
    },
  };

    import GeolocationTracker from './components/GeolocationTracker.vue';
    export default {
      components: {
        GeolocationTracker,
      },
    };
</script>
