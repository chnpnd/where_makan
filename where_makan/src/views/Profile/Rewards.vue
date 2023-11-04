<template>

<h1>My Rewards</h1>
<!--Ideally is to look at data set and use a for function to then show the rewards that users receive-->

    <div class = "container-fluid rewards">
        <div class = "row">
        
            <div class = "col-2"></div>

            <div class = "col-8">

                <div class = "row border border-primary rounded bg-light">

                    <div class = "col-3 rewardImage ">
                        <img src="" class="img-fluid" alt="Reward Image">
                    </div>
                    
                    <div class = "col-6 rewardDesc">
                        <h3>Rewards Name</h3>
                        <p>Reward Description ........................</p>
                        <p>Terms and Condition</p>
                        <p class="text-muted">Valid till 31 Dec 2023 </p>
                    </div>

                    <div class = "col-3 exchangeButton text-center">
                        <!--Should this "Use Now" button be used to bring user to the ordering page?-->
                        <button type="button" @click="useReward()" class="btn btn-outline-primary btn-block text-center span">Use Now</button>
                    </div>

                </div>
            </div>

            <div class = "col-2"></div>


        </div>
    </div>

    <h1>Exchange Points for Rewards here!</h1>

    <!--Rewards should populate itself base on the rewards database-->

    <div class = "container-fluid rewards">
        <div class = "row">
        
            <div class = "col-2"></div>

            <div class = "col-8">

                <div class = "row border border-primary rounded bg-light">

                    <div class = "col-3 rewardImage ">
                        <img src="" class="img-fluid" alt="Reward Image">
                    </div>
                    
                    <div class = "col-6 rewardDesc">
                        <h3>Rewards Name</h3>
                        <p>Reward Description ........................</p>
                        <p>Terms and Condition</p>
                        <p class="text-warning">300 (Points required to redeem)</p>
                    </div>

                    <div class = "col-3 exchangeButton text-center">
                        <button type="button" @click="exchangeReward()" class="btn btn-outline-primary btn-block text-center span">Redeem</button>
                    </div>

                </div>
            </div>

            <div class = "col-2"></div>


        </div>
    </div>
</template>

<script>
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
        },

        filterFav() {
            for (let i =0; i<this.foodStalls.length; i++){
                var stall = this.foodStalls[i];
                for (let x = 0; x<this.favFoodStall.length; x++)
                    if (stall.id === this.favFoodStall[x].hawker_stall_id){
                        this.filteredFoodStall.push(this.foodStalls[i])
            }
        }
     }
    }
  };

</script>

<style>

rewards.row {
    border: 1px solid;
    border-radius: 10px;
}
</style>

