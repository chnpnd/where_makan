<template>

<h1>My Rewards</h1>
<!--Ideally is to look at data set and use a for function to then show the rewards that users receive-->

    <div class = "container-fluid rewards">
        <div class = "row" v-for="reward in rewardOwn">
        
            <div class = "col-2"></div>

            <div class = "col-8">

                <div class = "row border border-primary rounded bg-light">

                    <div class = "col-1 rewardDesc">

                    </div>
                    
                    <div class = "col-8 rewardDesc">
                        <h3>{{ reward.item_id }}</h3>
                        <p>Terms and Condition Apply</p>
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
        <div class = "row" v-for="item in rewardExchange">
            <div class = "col-2"></div>

            <div class = "col-8">

                <div class = "row border border-primary rounded bg-light">
                    
                    <div class = "col-1 rewardDesc">

                    </div>
                    
                    <div class = "col-8 rewardDesc">
                        <h3>{{ item.name }}</h3>
                        <p>Terms and Condition Apply</p>
                        <p class="text-warning">50 (Points required to redeem)</p>
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
    data() {
      return {
        accId: 10,
        rewardOwn: [], //consumer_id, item_id, date
        rewardExchange: [], //name and quantity
        
      };
    },
    created() {
      // Fetch center details based on the centerId prop
      this.getRewardOwn();
      this.getRewardExchange();
    },
    methods: {
        async getRewardOwn() {
            const fetchFromAPI = async (url) => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error("Failed to fetch data");
                    return await response.json();
                } catch (error) {
                    console.error("An error occurred while fetching data:", error);
                }
            };

            this.rewardOwn = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/Reward/api/get/rewards`);
        },

        async getRewardExchange() {
            const fetchFromAPI = async (url) => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error("Failed to fetch data");
                    return await response.json();
                } catch (error) {
                    console.error("An error occurred while fetching data:", error);
                }
            };

            this.rewardExchange = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/Reward/api/get/item`);
        },

    }
  };

</script>

<style>

rewards.row {
    border: 1px solid;
    border-radius: 10px;
}
</style>

