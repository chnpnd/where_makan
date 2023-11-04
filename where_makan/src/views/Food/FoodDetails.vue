<template>
  <!-- <div v-if="showModal" class="modal-overlay"> -->
    <div v-if="food" class="food-container d-flex">
      <!-- <div class="modal-content"> -->
        <!-- <button class="close-btn text-danger mx-2" @click="closeModal">×</button> -->
        <div class="food-image-container mr-4">
          <img :src="food.url" alt="Food Image" class="food-image" />
        </div>
        <div class="food-details">
          <h1>{{ food.name }}</h1>
          <p><strong>Calories:</strong> {{ food.calories }} kcal</p>
          <p><strong>Sodium:</strong> {{ food.sodium }} mg</p>
          <p><strong>Allergens:</strong> {{ food.allergens }}</p>
          <p><strong>Spiciness:</strong> {{ Array(food.spiciness + 1).join('🌶') }}</p>
        </div>
      </div>
    <!-- </div> -->
  <!-- </div> -->
</template>

  
<script>
  export default {
    props: ['foodId'],
    data() {
      return {
        food: null,
      };
    },
    created() {
      // Fetch food details based on the foodId prop
      this.fetchFoodDetails();
    },
    methods: {
      async fetchFoodDetails() {
        try {
            console.log(this.foodId);
            const res = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/food/${this.foodId}`);
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                this.food = data;
            }
            else
            {
                console.error('Food not found');
            }
        } catch (error) {
          console.error('Failed to fetch food details:', error);
        }
      },
      closeModal() {
      this.$emit('close'); // Emit a custom event to notify the parent component to close the modal
    },
    },
  };
</script>
  
<style>
.food-container {
    max-width: 800px;
    margin: 50px auto;
    background-color: #f5e8d7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-family: 'Georgia', serif;
}

.food-image-container {
    flex-basis: 40%;
}

.food-image {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.food-details {
    flex-basis: 60%;
    color: #5a4134;
}

.food-details h1 {
    font-size: 24px;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #5a4134;
    padding-bottom: 10px;
}

/* .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
} */

</style>