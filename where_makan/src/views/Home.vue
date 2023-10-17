<template>
  <Header />
  <!-- <v-divider></v-divider> -->
  
  <div class="home-container">
    <div class="action-section">
      <button class="recommend-button" @click="toggleQuestionnaire">Recommend Me What to Eat!</button>
      <Questionnaire :showModal="showQuestionnaire" @close="toggleQuestionnaire" />
    </div>
    
    <v-divider></v-divider>
    
    <h1 class="homeH1 text-center">Food Nearby You:</h1>
    <v-divider></v-divider>
    
    <div class="map-section">
      <Map />
    </div>
    
    <v-divider></v-divider>
    <Homecards />
  </div>
</template>


<script>
import Header from '@/components/Home/HelloWorld.vue';
import Map from '@/components/Home/GoogleMap.vue'; // Moved to Home directory
import Homecards from '@/components/Home/HomeCards.vue';
import Questionnaire from '@/components/Home/Questionnaire.vue'; // Moved to Home directory

export default {
  name: 'Home',
  components: {
    Header,
    Map,
    Homecards,
    Questionnaire
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

.home-container {
    background-color: #f3e0d2; /* Soft pastel color inspired by shophouses */
    padding: 20px 30px; /* Some padding to space out content */
    display: flex;
    flex-direction: column;
    align-items: center; /* This will center the immediate child elements */
    font-family: 'Source Sans Pro', sans-serif;
}

.action-section {
    margin: 20px 0; /* Provide space above and below the button */
    width: 100%;
    max-width: 500px; /* Adjust as necessary */
    display: flex;
    justify-content: center; /* Center the button */
}

.recommend-button {
    background-color: #b08e6e; /* Vintage-inspired color */
    color: #fff; /* White text */
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-family: 'Playfair Display', serif; 
    cursor: pointer;
    transition: background-color 0.3s ease; /* Transition for smooth color change */
    text-transform: uppercase; /* Uppercase to make it look more bold */
    letter-spacing: 1px; /* Space between letters for vintage look */
}

.recommend-button:hover, .recommend-button:focus {
    background-color: #8a6d5b; /* Darker shade on hover/focus */
    outline: none;
    box-shadow: 0 0 0 3px rgba(176, 142, 110, 0.5); /* Vintage-inspired focus shadow */
}

.text-center {
    text-align: center;
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
    background-color: #d4af37; /* Vintage gold color */
    margin: 20px 0;
    width: 80%;
    align-self: center; /* Centering the divider */
}


/* Add other styles as required */
</style>

