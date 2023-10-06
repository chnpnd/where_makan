<template>

    <div class="home">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <HelloWorld msg="You did it!" />
    </div>

    <div>
      <h1>Recommend Stalls Near Me</h1>
      <geolocation-tracker></geolocation-tracker>
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
    name: 'GeolocationTracker',
    components: {
        GeolocationTracker,
      },
    };
</script>
