<template>
  <main class="snap-scroll-container">
      <section>
          <Introduction />
      </section>

      <section id="section-2">
        <div class="home-container mt-10">
          <div class="action-buttons mb-3">
              <button class="btn custom-button btn-outline-dark text-dark btn-sm mx-2n" @click="toggleQuestionnaire">Recommend Me What to Eat!</button>
              <Questionnaire :showModal="showQuestionnaire" @close="toggleQuestionnaire" />
          </div>
          <h1 class="homeH1 text-center">Recommendations</h1>
          <h1 class="homeH1 text-center">Hawker Centers Near You:</h1>
        <!-- <Homecards /> -->
        <Geolocation />
        </div>
      </section>

    <!--  <section>
        <v-divider></v-divider>
        <div class="home-container">
          <h1 class="homeH1 text-center">Hawkers Nearby You: </h1>
            <HawkerCard />
        </div>
      </section>
      -->

      <section>
        <v-divider></v-divider>
        <div class="home-container">
        <Video />
        </div>
      </section>

  </main>

</template>


<script>

import Map from '@/components/Home/GoogleMap.vue'; // Moved to Home directory
import Introduction from '@/components/Home/Introduction.vue';
import HawkerCard from '@/components/Home/HawkerCentreCards.vue'; // Moved to Home directory
import Homecards from '@/components/Home/HomeCards.vue';
import Questionnaire from '@/components/Home/Questionnaire.vue'; // Moved to Home directory
import Video from '@/components/Video.vue';
import { VDivider } from 'vuetify/components/VDivider';
import Geolocation from '@/components/GeolocationTracker.vue'


export default {
  name: 'Home',
  components: {
    Introduction,
    HawkerCard,
    Homecards,
    Questionnaire,
    Video,
    VDivider,
    Geolocation,
  },
  data() {
    return {
      showQuestionnaire: false
    };
  },
  methods: {
    toggleQuestionnaire() {
      this.showQuestionnaire = !this.showQuestionnaire;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro&display=swap');


/* .home-container {
    background-color: #f8f8f8; 
    display: flex;
    width:100%;
    flex-direction: column;
    align-items: center; 
    font-family: 'Source Sans Pro', sans-serif;
    min-height: 100vh;
    z-index: 1;
} */

.home-container{
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center both horizontally and vertically */
  min-height: 100vh;
  font-family: 'Source Sans Pro', sans-serif;
  z-index: 1;
}

.action-section {
    margin: 20px 0; /* Provide space above and below the button */
    width: 100%;
    max-width: 500px; /* Adjust as necessary */
    display: flex;
    justify-content: center; /* Center the button */
}

.homeH1 {
    font-size: 26px;
    color: #625d5d; /* Vintage text color */
    margin-top: 20px;
    margin-bottom: 20px; /* Space after the heading */
    font-family: 'Playfair Display', serif; 
}

.map-section {
    width: 100%;
    max-width: 1200px; /* You can adjust this if you want a maximum limit on map width */
    margin: 30px 0;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1); /* Adds a subtle shadow to lift the map a bit */
}

v-divider {
    height: 2px;
    background-color: black; /* Vintage gold color */
    margin: 20px 0;
    width: 80%;
    align-self: center; /* Centering the divider */
    
}

section {
  padding:10px;
  margin:10px;
}


/* Add other styles as required */
</style>

