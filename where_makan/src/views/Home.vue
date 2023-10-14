<template>
  <div class="home">
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
    <HelloWorld msg="You did it!" />
    <button @click="launchQuestionnaire">Recommend Me What to Eat!</button>
    <!-- Display the Questionnaire Modal -->
    <Questionnaire :showModal="showQuestionnaire" @close="closeQuestionnaire" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import Questionnaire from '@/views/Questionnaire.vue'; // Update the path

export default {
  name: 'Home',
  inheritAttrs: false,
  components: {
    HelloWorld,
    Questionnaire
  },
  data() {
    return {
      showQuestionnaire: false // A data property to conditionally show the modal
    };
  },
  methods: {
    launchQuestionnaire() {
      this.showQuestionnaire = true;
    },
    closeQuestionnaire() {
      this.showQuestionnaire = false;
    }
  }
}
</script>
