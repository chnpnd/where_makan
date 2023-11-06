<template>
    <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
            <button class="close-btn text-danger mx-2" @click="closeModal">×</button>
            <!-- <button @click="openModal">Open Questionnaire</button> -->
            <div v-if="page === 1">
                <!-- <h3>Question 1</h3> -->

                <label for="foodPreference" class="h3 mb-0">What type of food are you in the mood for today?</label>
                <hr>
                <select id="foodPreference" class="dropdowns" v-model="answers.food">
                    <option value="0">Chinese</option>
                    <option value="1">Malay</option>
                    <option value="2">Indian</option>
                    <option value="3">Vegetarian</option>
                    <option value="4">Japanese</option>
                    <option value="5">Western</option>
                    <option value="6">Indonesian</option>
                    <option value="7">Fusion</option>
                    <option value="8">Desserts and drinks</option>
                    <option value="9">Baked goods</option>
                </select>
                <input v-if="answers.food === 'Others'" type="text" v-model="answers.otherFood"
                    placeholder="Please specify">
                <div></div>
                <div class="button-container">
                    <button type="button" class="btn btn-danger text-white mt-2" @click="nextPage">Next</button>
                </div>

            </div>
            <template v-else-if="page === 2">

                <label for="foodAllergies" class="h3 mb-0">Any allergies?</label>
                <hr>
                <select id="foodAllergies" class="dropdowns" v-model="answers.foodAllergies">
                    <option value="soy">Soy</option>
                    <option value="wheat">Wheat</option>
                    <option value="shellfish">Shellfish</option>
                    <option value="dairy">Dairy</option>
                    <option value="none">None</option>
                </select>
                <div class="button-container">
                    <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
                    <button class="btn btn-danger text-white" @click="nextPage">Next</button>
                </div>
            </template>

            <template v-else-if="page === 3">
                <label for="spiciness" class="h3 mb-0">How spicy do you like your food?</label>
                <hr>
                <select id="spiciness" class="dropdowns" v-model="answers.spiciness">
                    <option value="1">Mild</option>
                    <option value="2">Medium</option>
                    <option value="3">Spicy</option>
                    <option value="4">Very Spicy</option>
                    <option value="0">I prefer non-spicy options</option>
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
                    <option value="belowFive">Below $5</option>
                    <option value="average">$5 - $10</option>
                    <option value="aboveTen">Above $10</option>
                </select>
                <div class="button-container">
                    <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
                    <button class="btn btn-danger text-white" @click="nextPage">Next</button>
                </div>

            </template>


            <template v-else-if="page === 5">
                <label for="explorePreference" class="h3 mb-0">Are you interested in trying out new hawker stalls or
                    restaurants in your
                    area?</label>
                <hr>
                <select id="explorePreference" class="dropdowns" v-model="answers.explorePreference">
                    <option value="yes">Yes, I love exploring new places</option>
                    <option value="no">No, I prefer sticking to my favorites</option>
                </select>
                <div class="button-container">
                    <button type="button" class="btn btn-secondary text-white mr-4" @click="prevPage">Previous</button>
                    <button class="btn btn-danger text-white" @click="closeModal(), filterHawkerStallId()">Submit</button>
                </div>

            </template>


        </div>

        
    </div>

    <div v-for:="stall in finalList">
        {{ stall.name }}
    </div>

</template>
  
<script>

export default {
    data() {
        return {
            showModal: false,
            page: 1,
            answers: {
                food: 0,
                foodAllergies: 'soy',
                budget: 'belowFive',
                spiciness: 1,
                travelDistance: 'lessThanOneKM',
                explorePreference: 'yes'
            },
            foodStalls: [],
            filteredFoodStall: [],
            finalList: [],
        };
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        }
    },
    created() {
    this.getAllData();  
    },
    methods: {


        nextPage() {
            this.page++;
        },
        prevPage() {
            this.page--;
        },
        closeModal() {
            // console.log(this.answers);
            this.submitAnswers();
            this.$emit('close');
        },
        async submitAnswers() {
            this.filteredFoods = [];
            this.finalList = [];
            // Handle the submission of answers here
            // console.log(this.answers);


            try {
                const foodsRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/all/food`);
                const foods = await foodsRes.json();

                const foodStallsRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/all/hawkerstore`);
                const stalls = await foodStallsRes.json();

                // const hawkerCentersRes = fetch(`https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`);
                // const centers = hawkerCentersRes.json();

                if (foodsRes.ok && foodStallsRes.ok) {
                    this.foods = foods;
                    this.stalls = stalls;


                    for (const stallItem of this.stalls) {
                        // Cuisine check 
                        if (stallItem["cuisine_type"] == this.answers["food"]) {
                            for (const foodItem of this.foods) {
                                if (foodItem['hawker_stall_id'] == stallItem["id"]) {
                                    this.filteredFoods.push(foodItem)
                                }
                            }
                        }
                    }
                    // console.log(await this.filteredFoods);
                    // this.foods = await this.filteredFoods;

                    for (const foodItem of this.filteredFoods) {
                        // Spiciness Check
                        if (foodItem["spiciness"] == this.answers["spiciness"]) {
                            // allergies check 
                            if (this.answers["foodAllergies"] != "none") {
                                if (foodItem["allergens"].toLowerCase().includes(this.answers["foodAllergies"].toLowerCase())) {
                                    // budget check 
                                    if (this.answers["budget"] == "belowFive") {
                                        if (foodItem["price"] <= 5) {
                                            this.finalList.push(foodItem);
                                        }
                                    } else if (this.answers["budget"] == "average") {
                                        if (foodItem["price"] <= 10 && foodItem["price"] >= 5) {
                                            this.finalList.push(foodItem);
                                        }
                                    } else {
                                        if (foodItem["price"] >= 10) {
                                            this.finalList.push(foodItem);
                                        }
                                    }
                                }
                            } else {
                                // budget check 
                                if (this.answers["budget"] == "belowFive") {
                                    if (foodItem["price"] <= 5) {
                                        this.finalList.push(foodItem);
                                    }
                                } else if (this.answers["budget"] == "average") {
                                    if (foodItem["price"] <= 10 && foodItem["price"] >= 5) {
                                        this.finalList.push(foodItem);
                                    }
                                } else {
                                    if (foodItem["price"] >= 10) {
                                        this.finalList.push(foodItem);
                                    }
                                }
                            }
                            // }
                        }
                    }
                    await console.log(this.finalList);
                    this.filterHawkerStallId();

                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }

        },
        async getAllData() {
        const fetchFromAPI = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch data");
                return await response.json();
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        };

        this.foodStalls = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/all/hawkerstore`);
    
    },
        filterHawkerStallId(){
            for (let i=0; i<this.finalList.length; i++){
                var food= this.finalList[i];
                for (let x=0; x<this.foodStalls.length; x++){
                    var stall = this.foodStalls[x];
                    if (food.hawker_stall_id === stall.id){
                        this.filteredFoodStall.push(stall);
                    }
                }
            }
        }

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
    z-index: 9999;
    /* Increase the z-index value */
}

.dropdowns {
    width: 100%;
    /* Set the width to 100% to make it wider */
    padding: 10px;
    /* Add padding for spacing */
    font-size: 20px;
    /* Adjust font size if needed */
    background-color: rgb(228, 221, 221);
}


#foodPreference option {
    font-size: 20px;
}


.modal-content {
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 10px;
    max-width: 1000px;
    position: relative;
    color: black;
    z-index: 7000;
    /* Increase the z-index value */

}

label {
    font-weight: bold;
    display: inline-block;
    margin-bottom: 10px;
}

input,
select,
textarea {
    width: 100%;
    border: 2px solid rgb(0, 0, 0);
    padding: 5px;
    margin-bottom: 10px;
    transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
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
    color: #007BFF;
    /* Make close button blue */
}

.close-btn:hover {
    opacity: 0.7;
}
</style>