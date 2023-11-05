<template>
        <div class="container custom-container">
                <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
            <div v-if="filteredFoodStall">
                    <div v-for="stall in filteredFoodStall" :key="stall.id" max-width="400" max-height="400" style="margin:10px; background-color: #ffffff;">
                        <router-link class= "text-decoration-none text-black row " style= "background-color: white;" :to="{ name: 'stall-details', params: { stallId: stall.id } }">
                            <div class = "col-4 custom-div justify-center">
                                <img class="img-fluid" :src="stall.store_url">
                            </div>
                            <div class="col">
                                {{ stall.name }} {{ stall.address }}
                            </div>
                        </router-link>
                    </div>
            </div> 
            <div v-else><h1>No food is available</h1></div>
    </div>


</template>

<script>
import user from "@/auth.js";

export default {
    props: ['centerId'], // This prop is automatically passed by Vue Router
    data() {
      return {
        accId: 10,
        center: null, // Initialize center as null
        favFoodStall: [],
        foodStalls: [],
        filteredFoodStall: [],
        
      };
    },
    created() {
      // Fetch center details based on the centerId prop
      this.fetchfav();
      this.getAllData();
      this.filterFav();
    },
    methods: {
        async fetchfav() {
            console.log("here")
            try {
            const response = await fetch(
                `https://stingray-app-4wa63.ondigitalocean.app/Favourite/api/get/favourite/${this.accId}`
            );
            if (response.ok) {
                this.favFoodStall = await response.json();
                this.favFoodStall = this.removeDuplicates(this.favFoodStall, hawker_stall_id);
                console.log(this.foodStall);
            } else {
                console.error('Failed to fetch all stall details:', response.statusText);
            }
            } catch (error) {
            console.error('An error occurred while fetching all stall details:', error);
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
            this.filterFav();
        },

        async filterFav() {
            for (let i =0; i<this.foodStalls.length; i++){
                var stall = this.foodStalls[i];
                for (let x = 0; x<this.favFoodStall.length; x++)
                    if (stall.id === this.favFoodStall[x].hawker_stall_id){
                        this.filteredFoodStall.push(this.foodStalls[i])
            }
        }
     },
}

    
  };

</script>

  <style>

.card-container .v-card {
  background-color: #f5e8d7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Add any other desired styling here */
}

.card-container .v-card-title {
    font-size: 24px;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #5a4134;
    padding-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.card-container .v-card-text {
    font-size: 10px;
    margin-bottom: 15px;
    letter-spacing: 2px;
    border-bottom: 2px solid #5a4134;
    padding-bottom: 10px;
    white-space: normal;
}

.card-container .v-card-title:hover {
    white-space: normal;
    text-overflow: unset;
}

.img {
 height: 10px;
 width: 10px;   
}

.custom-container {
    padding: 0;
}

.custom-div{
    padding:0px;
}

</style>