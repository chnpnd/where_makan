<template>
    <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
            <button class="close-btn text-danger mx-2" @click="closeModal">×</button>
         <!-- <button @click="openModal">Open Questionnaire</button> -->
            <div v-if="page === 1">
                <!-- <h3>Question 1</h3> -->
                
                <label for="foodPreference" class="h3 mb-0" >What type of cuisine are you in the mood for today?</label>
                <hr>
                <select id="foodPreference" class="dropdowns" v-model="answers.food">
                    <option value="Chinese">Chinese</option>
                    <option value="Indian">Indian</option>
                    <option value="Thai">Thai</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Italian">Italian</option>
                    <option value="Others">Others</option>
                </select>
                <input v-if="answers.food === 'Others'" type="text" v-model="answers.otherFood"
                    placeholder="Please specify">
                <div></div>
                <div class="button-container">
                <button type="button" class="btn btn-danger text-white mt-2" @click="nextPage">Next</button>
                </div>
                
            </div>
            <template v-else-if="page === 2">
              <label for="foodAllergies" class="h3 mb-0">Do you have any food allergies or dietary restrictions?</label>
              <hr>
              <div class="checkbox-container">
                  <label id="content" for="peanuts" class="h5">Peanuts</label>
                  <span>
                  <input type="checkbox" id="peanuts" v-model="answers.peanuts">
                  </span>
              </div>
              <div class="checkbox-container">
                  <label id="content" for="wheat" class="h5">Wheat</label>
                  <span>
                    <input type="checkbox" id="wheat"  v-model="answers.wheat">
                </span>
              </div>
              <!-- Add more checkboxes for other options -->
              <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="nextPage">Next</button>
              </div>
              
          </template>

            <template v-else-if="page === 3">
                <label for="spiciness" class="h3 mb-0">How spicy do you like your food?</label>
                <hr>
                <select id="spiciness" class="dropdowns" v-model="answers.spiciness">
                    <option value="Mild">Mild (1)</option>
                    <option value="Medium">Medium (2)</option>
                    <option value="Spicy">Spicy (3)</option>
                    <option value="Very Spicy">Very Spicy (4)</option>
                    <option value="Non-spicy">I prefer non-spicy options</option>
                </select>
                <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="nextPage">Next</button>
              </div>
                

            </template>

            <template v-else-if="page === 4">
                <label for="budget" class="h3 mb-0">What's your budget for this meal (per person)?</label>
                <hr>
                <select id="budget" class="dropdowns" v-model="answers.budget">
                    <option value="Below $5">Below $5</option>
                    <option value="$5 - $10">$5 - $10</option>
                    <option value="Above $10">Above $10</option>
                </select>
                <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="nextPage">Next</button>
              </div>
                
            </template>

            <template v-else-if="page === 5">
                <label for="dishPreference" class="h3 mb-0">Are you looking for a specific dish/cuisine or a
                    recommendation?</label>
                    <hr>
                <select id="dishPreference" class="dropdowns" v-model="answers.dishPreference">
                    <option value="Specific dish/cuisine">Specific dish/cuisine</option>
                    <option value="Recommend something based on my preferences">Recommend something based on my preferences
                    </option>
                </select>
                <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="nextPage">Next</button>
              </div>
                
            </template>

            <template v-else-if="page === 6">
                <label for="travelDistance" class="h3 mb-0">How far are you willing to travel for your meal?</label>
                <hr>
                <select id="travelDistance" class="dropdowns" v-model="answers.travelDistance">
                    <option value="Within 1 mile">Within 1 mile</option>
                    <option value="1-3 miles">1-3 miles</option>
                    <option value="3-5 miles">3-5 miles</option>
                    <option value="Any distance is fine">Any distance is fine</option>
                </select>
                <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="nextPage">Next</button>
              </div>
                
            </template>

            <template v-else-if="page === 7">
                <label for="orderMethod" class="h3 mb-0">Would you like to order for pickup or delivery?</label>
                <hr>
                <select id="orderMethod" class="dropdowns" v-model="answers.orderMethod">
                    <option value="Pickup">Pickup</option>
                    <option value="Delivery">Delivery</option>
                </select>
                <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="nextPage">Next</button>
              </div>
                
            </template>

            <template v-else-if="page === 8">
                <label for="explorePreference" class="h3 mb-0">Are you interested in trying out new hawker stalls or restaurants in your
                    area?</label>
                    <hr>
                <select id="explorePreference" class="dropdowns" v-model="answers.explorePreference">
                    <option value="Yes, I love exploring new places">Yes, I love exploring new places</option>
                    <option value="No, I prefer sticking to my favorites">No, I prefer sticking to my favorites</option>
                </select>
                <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="nextPage">Next</button>
              </div>
                
            </template>

            <template v-else-if="page === 9">
                <label for="dietaryPreference" class="h3 mb-0">Do you have any specific dietary preferences (e.g., vegetarian, vegan,
                    halal)?</label>
                    <hr>
                <select id="dietaryPreference" class="dropdowns" v-model="answers.dietaryPreference">
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Halal">Halal</option>
                    <option value="None">None</option>
                </select>
                <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="nextPage">Next</button>
              </div>
            </template>

            <template v-else-if="page === 10">
                <label for="specialRequests" class="h3 mb-0">Are there any additional preferences or special requests you have for your
                    meal?</label>
                    <hr>
                <textarea id="specialRequests" class="dropdowns" v-model="answers.specialRequests"
                    placeholder="Enter your preferences or requests here"></textarea>

                <div class="button-container">
              <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
              <button class="btn btn-danger text-white" @click="submitAnswers">Submit</button>
              </div>
            </template>
        </div>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            showModal: false,
            page: 1,
            answers: {
                food: '',
                budget: '',
                spiciness: '',
            },
        };
    },
    props: {
        showModal: {
            type: Boolean,
            required: true, 
        }
    },
    methods: {
        nextPage() {
            this.page++;
        },
        prevPage() {
            this.page--;
        },
        closeModal() {
        this.$emit('close');
        },
        submitAnswers() {
            // Handle the submission of answers here
            console.log(this.answers);
            this.page = 1;
            this.answers = {
                food: '',
                budget: '',
                spiciness: '',
            };
            this.$emit('close');
        },
       
    },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Increase the z-index value */
}

.dropdowns {
  width: 100%; /* Set the width to 100% to make it wider */
  padding: 10px; /* Add padding for spacing */
  font-size: 20px; /* Adjust font size if needed */
  background-color: rgb(228, 221, 221);
}


#foodPreference option{
    font-size: 20px;
}


.modal-content {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  max-width: 1000px;
  position: relative;
  color: black;
  z-index: 7000; /* Increase the z-index value */
   
}

label {
  font-weight: bold;
  display: inline-block;
  margin-bottom: 10px;
}

input, select, textarea {
  width: 100%;
  border: 2px solid rgb(0, 0, 0);
  padding: 5px;
  margin-bottom: 10px;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  border-color: #007BFF;
}

.checkbox-container {
  display: flex; 
  align-items: center; 
  margin-bottom: 10px;
}

input[type="checkbox"] {
  margin-right: 100px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: opacity 0.3s;
  color: #007BFF; /* Make close button blue */
}

.close-btn:hover {
  opacity: 0.7;
}




</style>