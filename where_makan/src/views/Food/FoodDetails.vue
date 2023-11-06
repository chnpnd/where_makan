<template>
  <div class="container my-5 food-container">
    <div class="row">
      <div class="col-md-6">
        <img class="img-fluid" :src="food.url" :alt="food.name" />
      </div>
      <div class="col-md-6">
        <h1>{{ food.name }}</h1>
        <p class="lead"><strong>Price:</strong> ${{ food.price }}</p>
        <p class="lead"><strong>Allergens:</strong> {{ food.allergens || 'None' }}</p>
        <p class="lead"><strong>Spiciness:</strong> <span v-html="spicinessIcons"></span></p>
      </div>
    </div>
    <div v-if="nutrition" class="mt-4">
      <h2 class="mt-4">Nutritional Information</h2>
      <div class="table-responsive">
        <table class="table table-hover">
          <tbody>
            <tr v-for="(entry, index) in filteredEntries" :key="entry[0]">
              <th scope="row">{{ formatKey(entry[0]) }}</th>
              <td>{{ entry[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['foodId'],
  data() {
    return {
      food: null,
      nutrition: null,
    };
  },
  created() {
    // Fetch food details based on the foodId prop
    this.fetchFoodDetails();
  },
  computed: {
    filteredEntries() {
      const entries = Object.entries(this.nutrition.items[0]);
      // Skip the first entry
      entries.shift();
      return entries;
    },
    spicinessIcons() {
      // Assuming `food.spiciness` is a number indicating the spiciness level
      return '🌶'.repeat(this.food.spiciness);
    },
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
            this.fetchFoodNutritionDetails();
          }
          else
          {
              console.error('Food not found');
          }
      } catch (error) {
        console.error('Failed to fetch food details:', error);
      }
    },
    async fetchFoodNutritionDetails() {
      const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'rFgPJXwcrqxrYU54929ELQ==QcM4jP0kt1QUnd9D',
      };

      try {
        // Encode the query parameter to handle special characters
        var query = encodeURIComponent(this.food.name);
        const response = await fetch('https://api.calorieninjas.com/v1/nutrition?query=' + query, {
          method: 'GET', // Specify the method
          headers: headers, // Include headers in the fetch options
        });

        if (response.ok) {
          const data = await response.json();
          this.nutrition = data; // Or however you need to structure it based on your component's data.
        } else {
          // Log or handle HTTP error responses
          console.error('Nutrition not found, status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch food nutrition:', error);
      }
    },
    formatKey(key) {
      return key.split('_').join(' ').toUpperCase();
    }
  },
};
</script>

<style scoped>

.h1{
  text-align: left;
}
.food-container {
 max-width: 100%;
 margin: 50px auto;
 background-color: #f5f5f5;
 padding: 20px;
 border-radius: 10px;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
 font-family: 'Georgia', serif;
}

.food-image-container,
.food-details {
 width: 100%;
 box-sizing: border-box;
}

.food-details {
 padding-top: 20px;
}

.nutrition-table-container {
 overflow-x: auto; /* Allows table to be scrollable on small screens */
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
 border-radius: 8px;
 margin: 0 25%;
}

@media (min-width: 768px) {
 .food-image-container,
 .food-details {
    width: 50%;
 }

 .food-image-container {
    padding-right: 20px;
 }

 .food-details {
    padding-left: 20px;
    padding-top: 0;
 }

 .nutrition-table-container {
    margin: 0;
 }
}

</style>
